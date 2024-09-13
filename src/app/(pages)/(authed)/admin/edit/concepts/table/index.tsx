'use client'
import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react'
import useSWR, { mutate } from 'swr'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { action__getConcepts, action_updateTopicStatus, action_updateTopicDetails, action__updateTopicPositions, action_updateConceptPositions } from "../actions"
import { ExtendedConcepts } from '@/../prisma/schema.types'
import AddConceptPopup from './ui/concept.popup.add'
import ConceptControlDropdown from './ui/concept.popup.control'
import AddTopicModal from './ui/topic.popup.add'
import TopicControlModal from './ui/topic.popup.control'
import Link from 'next/link'
import { useToast } from "@/components/ui/use-toast"

import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from "@dnd-kit/core"
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Button } from "@/components/ui/button"

import LoadingButton from '@/app/reusables/themes/saveButton2'


// Topic Component ...
const Topic = ({ topic, conceptId, updateTableFunction, editingCell, setEditingCell, editInputValue, setEditInputValue }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: topic.id });

  // Apply Y-axis only transformation
  const style = {
    transform: CSS.Transform.toString(
      transform
        ? { ...transform, x: 0 }
        : undefined
    ),
    transition,
  };

  const handleDoubleClick = (field, currentValue) => {
    setEditingCell({ conceptId, topicId: topic.id, field });
    setEditInputValue(currentValue);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleInputBlur = async (field) => {
    try {
      const data: { title?: string; description?: string } = {};
      if (field === 'title') {
        data.title = editInputValue;
      } else if (field === 'description') {
        data.description = editInputValue;
      }

      await action_updateTopicDetails(topic.id, data);
      updateTableFunction('Updated topic');
      setEditingCell({ conceptId: null, topicId: null, field: null });
    } 
    catch (error) {
      console.error(`Failed to update topic details: ${error.message}`);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>, field) => {
    if (e.key === 'Enter') {
      handleInputBlur(field);
    }
  };

  const handleStatusCellClick = async () => {
    try {
      const newStatus = !topic.active;
      await action_updateTopicStatus(topic.id, newStatus);
      updateTableFunction('Updated topic status');
    } 
    catch (error) {
      console.error("Error updating topic status:", error);
    }
  };

  return (
    <TableRow ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TableCell
        className="font-medium flex"
        onDoubleClick={() => handleDoubleClick('title', topic.title)}
      >
        {editingCell.conceptId === conceptId && editingCell.topicId === topic.id && editingCell.field === 'title' ? (
          <input
            className="w-full p-3"
            value={editInputValue}
            onChange={handleInputChange}
            onBlur={() => handleInputBlur('title')}
            onKeyPress={(e) => handleKeyPress(e, 'title')}
            autoFocus
          />
        ) : (
          topic.title
        )}
      </TableCell>

      <TableCell
        className="font-medium"
        onDoubleClick={() => handleDoubleClick('description', topic.description)}
      >
        {editingCell.conceptId === conceptId && editingCell.topicId === topic.id && editingCell.field === 'description' ? (
          <textarea
            className="w-full resize-none p-2"
            value={editInputValue}
            onChange={handleInputChange}
            onBlur={() => handleInputBlur('description')}
            onKeyPress={(e) => handleKeyPress(e, 'description')}
            autoFocus
          />
        ) : (
          topic.description
        )}
      </TableCell>

      <TableCell className="font-medium" onClick={handleStatusCellClick}>
        <div className="flex mt-2">
          <div className={`cursor-pointer border px-2 py-1 rounded ${topic.active ? 'bg-black text-white border-black' : 'border-gray-300'}`}>
            {topic.active ? 'Active' : 'Inactive'}
          </div>
        </div>
      </TableCell>

      <TableCell className="font-medium">
        <div className="flex mt-2">
          <Link href={`/admin/edit/concepts/${topic.id}`}>
            <div className="border px-2 py-1 rounded border-gray-200 hover:bg-black hover:text-white">
              edit page
            </div>
          </Link>
        </div>
      </TableCell>

      <TableCell className="flex justify-end ">
        <TopicControlModal topicId={topic.id} updateTable={(tableData, msg) => updateTableFunction(msg)} />
      </TableCell>
    </TableRow>
  );
};


// Concept Component ...
const Concept = ({ concept, updateTableFunction, editInputValue, setEditInputValue, setEditingCell, editingCell, handleDragEndConcept }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: concept.id });

  // Apply Y-axis only transformation for Concept
  const style = {
    transform: CSS.Transform.toString(
      transform
        ? { ...transform, x: 0 }
        : undefined
    ),
    transition,
  };

  const [topics, setTopics] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // New state to track saving

  useEffect(() => {
    setTopics(concept.topics);
  }, [concept.topics]);

  const handleDragEndTopics = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTopics((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
      setIsSorted(true);
    }
  };

  const handleUpdateSorted = async () => {
    try {
      setIsSaving(true); // Start saving state

      // remaps the topics as an id and position. needs to update the api with the new order ...
      let topicsSortedMap = topics.map((topic, index) => {
        return {
          topicId: topic.id,
          position: index
        }
      });

      await action__updateTopicPositions({
        conceptId: concept.id,
        topicPositions: topicsSortedMap
      });

      setIsSaving(false); // End saving state
      setIsSorted(false);
      console.log('updating positions');
    }
    catch (error) {
      setIsSaving(false); // End saving state in case of error
      console.error(error);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  );

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="my-4 p-4 border border-gray-200 rounded-lg">
      <div className="flex flex-row">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">
            {concept.title}
            {concept.categories.map(category => (
              <span
                key={category.id}
                className="ml-2 relative bottom-0.5 px-2 py-1 text-sm font-medium rounded border border-gray-200"
                style={{ backgroundColor: category.color }}
              >
                {category.name}
              </span>
            ))}
          </h2>
          <p className="text-md mb-4">
            {concept.description}
          </p>
        </div>
        <div className='flex flex-row space-x-5'>
          {isSorted && (
            <div className='flex justify-end mb-5'>
              <LoadingButton onClick={handleUpdateSorted} isLoading={isSaving} className="btn">
                Update Table
              </LoadingButton>
            </div>
          )}
          <ConceptControlDropdown updateTable={(tableData, msg) => updateTableFunction(msg)} conceptId={concept.id} concept={concept} />
        </div>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndTopics}>
        <SortableContext items={topics.map(topic => topic.id)} strategy={verticalListSortingStrategy}>
          <Table>
            <TableCaption>Topics for {concept.title}</TableCaption>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead>Topic</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Edit your page</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className=''>
              {topics.map((topic) => (
                <Topic
                  key={topic.id}
                  topic={topic}
                  conceptId={concept.id}
                  updateTableFunction={updateTableFunction}
                  editingCell={editingCell}
                  setEditingCell={setEditingCell}
                  editInputValue={editInputValue}
                  setEditInputValue={setEditInputValue}
                />
              ))}
            </TableBody>
          </Table>
        </SortableContext>
      </DndContext>

      <div className="flex mt-2 justify-end">
        <AddTopicModal updateTable={() => updateTableFunction('Added new topic')} conceptId={concept.id} />
      </div>
    </div>
  );
};


// Concept Table Component ...
const ConceptsTable = () => {
  const { toast } = useToast();
  const [editInputValue, setEditInputValue] = useState<string>("");
  const [editingCell, setEditingCell] = useState<{ conceptId: string | null; topicId: string | null; field: string | null }>({ conceptId: null, topicId: null, field: null });
  const [concepts, setConcepts] = useState<ExtendedConcepts[]>([]);
  const [isSorted, setIsSorted] = useState(false); // New state to track sorting
  const [isSaving, setIsSaving] = useState(false); // New state to track saving

  const fetcher = async () => {
    const data = await action__getConcepts();
    setConcepts(data);
    return data;
  };

  const { data, error, isLoading, isValidating } = useSWR('fetchConcepts', fetcher, {
    onSuccess: (data) => {
      console.log('Data fetched successfully:', data);
    },
    onError: (error) => {
      console.log('Error fetching data:', error);
    },
  });

  useEffect(() => {
    console.log('Concepts from cache:', !isValidating);
  }, [isValidating]);

  const updateTableFunction = async (toastMessage: string) => {
    const updatedConcepts = await fetcher();
    mutate('fetchConcepts', updatedConcepts, false);
    toast({ title: toastMessage });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  );

  const handleDragEndConcept = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setConcepts((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
      setIsSorted(true); // Set sorting state to true
    }
  };

  const handleUpdateConceptPositions = async () => {
    try {
      setIsSaving(true); // Start saving state

      // Create a new map of the concepts with id and position
      let conceptsSortedMap = concepts.map((concept, index) => {
        return {
          conceptId: concept.id,
          position: index
        }
      });

      // Update the backend with the new order
      let conceptsUpdated = await action_updateConceptPositions({
        conceptPositions: conceptsSortedMap
      });

      setIsSaving(false); // End saving state
      setIsSorted(false);
      console.log('Updating positions', conceptsUpdated);
    } 
    catch (error) {
      setIsSaving(false); // End saving state in case of error
      console.error('Error updating concept positions:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndConcept}>
      <SortableContext items={concepts.map(concept => concept.id)} strategy={verticalListSortingStrategy}>
        <div>

          <div className="flex mt-2">
            <div className="flex justify-center fixed bottom-0 bg-white h-20 left-0 w-full items-center z-50">
              <AddConceptPopup updateTable={() => updateTableFunction('Added new concept')} />
            </div>
          </div>

          <div className='flex flex-row gap-x-3 justify-end'>
              <Button variant={'outline'}>
                    <Link href={'/authed/content/concepts'} target="_blank" rel="noopener noreferrer">
                      View concepts In Bootcamp
                    </Link>
              </Button>
              
              {isSorted && (
                <div className="flex justify-end mb-5">
                    <LoadingButton onClick={handleUpdateConceptPositions} isLoading={isSaving} className="btn">
                       Update Concept Positions
                    </LoadingButton>
                </div>
              )}
          </div>

          <div className="mb-20">
            {concepts.map((concept) => (
              <Concept
                key={concept.id}
                concept={concept}
                updateTableFunction={updateTableFunction}
                editInputValue={editInputValue}
                setEditInputValue={setEditInputValue}
                setEditingCell={setEditingCell}
                editingCell={editingCell}
                handleDragEndConcept={handleDragEndConcept}
              />
            ))}
          </div>

        </div>
      </SortableContext>
    </DndContext>
  );
};


export default ConceptsTable;