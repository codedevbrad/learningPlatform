'use client'
import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { action__getConcepts, action_updateTopicStatus, action_updateTopicDetails } from "../actions"
import { ExtendedConcepts } from '@/../prisma/schema.types'
import AddConceptPopup from './ui/concept.popup.add'
import ConceptControlDropdown from './ui/concept.popup.control'
import AddTopicModal from './ui/topic.popup.add'
import TopicControlModal from './ui/topic.popup.control'
import Link from 'next/link'
import { useToast } from "@/components/ui/use-toast"
import useSWR, { mutate } from 'swr'
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from "@dnd-kit/core"
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable"

const SortableRow = ({ topic, conceptId, editingCell, editInputValue, handleDoubleClick, handleInputChange, handleInputBlur, handleKeyPress, handleStatusCellClick, updateTableFunction }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: topic.id });

  const style = {
    transform: transform ? `translate3d(0, ${transform.y}px, 0)` : undefined,
    transition,
  };

  return (
    <TableRow ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TableCell
        className="font-medium"
        onDoubleClick={() => handleDoubleClick(conceptId, topic.id, 'title', topic.title)}
      >
        {editingCell.conceptId === conceptId && editingCell.topicId === topic.id && editingCell.field === 'title' ? (
          <input
            className="w-full p-3"
            value={editInputValue}
            onChange={handleInputChange}
            onBlur={() => handleInputBlur(conceptId, topic.id, 'title')}
            onKeyPress={(e) => handleKeyPress(e, conceptId, topic.id, 'title')}
            autoFocus
          />
        ) : (
          topic.title
        )}
      </TableCell>

      <TableCell
        className="font-medium"
        onDoubleClick={() => handleDoubleClick(conceptId, topic.id, 'description', topic.description)}
      >
        {editingCell.conceptId === conceptId && editingCell.topicId === topic.id && editingCell.field === 'description' ? (
          <textarea
            className="w-full resize-none p-2"
            value={editInputValue}
            onChange={handleInputChange}
            onBlur={() => handleInputBlur(conceptId, topic.id, 'description')}
            onKeyPress={(e) => handleKeyPress(e, conceptId, topic.id, 'description')}
            autoFocus
          />
        ) : (
          topic.description
        )}
      </TableCell>

      <TableCell className="font-medium" onClick={() => handleStatusCellClick(topic.id, topic.active)}>
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

      <TableCell className="cursor-pointer">
        <TopicControlModal topicId={topic.id} updateTable={(tableData, msg) => updateTableFunction(msg)} />
      </TableCell>
    </TableRow>
  );
};


const TopicsTable = ({ concept, updateTableFunction }) => {
  const [editingCell, setEditingCell] = useState<{ conceptId: string | null; topicId: string | null; field: string | null }>({ conceptId: null, topicId: null, field: null });
  const [editInputValue, setEditInputValue] = useState<string>("");
  const [topics, setTopics] = useState(concept.topics);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { axis: 'y' }}));

  const handleDoubleClick = (conceptId: string, topicId: string, field: string, currentValue: string) => {
    setEditingCell({ conceptId, topicId, field });
    setEditInputValue(currentValue);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleInputBlur = async (conceptId: string, topicId: string, field: string) => {
    try {
      const data: { title?: string; description?: string } = {};
      if (field === 'title') {
        data.title = editInputValue;
      } else if (field === 'description') {
        data.description = editInputValue;
      }

      await action_updateTopicDetails(topicId, data);
      updateTableFunction('Updated topic');
      setEditingCell({ conceptId: null, topicId: null, field: null });
    } 
    catch (error) {
      console.error(`Failed to update topic details: ${error.message}`);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>, conceptId: string, topicId: string, field: string) => {
    if (e.key === 'Enter') {
      handleInputBlur(conceptId, topicId, field);
    }
  };

  const handleStatusCellClick = async (topicId: string, currentStatus: boolean) => {
    try {
      const newStatus = !currentStatus;
      await action_updateTopicStatus(topicId, newStatus);
      updateTableFunction('Updated topic status');
    } catch (error) {
      console.error("Error updating topic status:", error);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setTopics((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
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
          <TableBody>
            {topics.map((topic) => (
              <SortableRow key={topic.id} topic={topic} conceptId={concept.id} editingCell={editingCell} editInputValue={editInputValue} handleDoubleClick={handleDoubleClick} handleInputChange={handleInputChange} handleInputBlur={handleInputBlur} handleKeyPress={handleKeyPress} handleStatusCellClick={handleStatusCellClick} updateTableFunction={updateTableFunction} />
            ))}
          </TableBody>
        </Table>
      </SortableContext>
    </DndContext>
  );
};


const ConceptCard = ({ concept, updateTableFunction }) => {
  return (
    <div className="my-4 p-4 border border-gray-200 rounded-lg">
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
          <p className="text-md mb-4">{concept.description}</p>
        </div>
        <div>
          <ConceptControlDropdown updateTable={(tableData, msg) => updateTableFunction(msg)} conceptId={concept.id} concept={concept} />
        </div>
      </div>
      <TopicsTable concept={concept} updateTableFunction={updateTableFunction} />
      <div className="flex mt-2 justify-end">
        <AddTopicModal updateTable={() => updateTableFunction('Added new topic')} conceptId={concept.id} />
      </div>
    </div>
  );
};


const ConceptsTable = () => {
  const { toast } = useToast();

  const fetcher = async () => {
    const data = await action__getConcepts();
    return data;
  };

  const { data: concepts, error, isLoading, isValidating } = useSWR('fetchConcepts', fetcher, {
    onSuccess: (data) => {
      console.log('Data fetched successfully:', data);
    },
    onError: (error) => {
      console.log('Error fetching data:', error);
    },
  });

  useEffect(() => {
    console.log('Concepts from cache:', !isValidating);
  }, []);

  if (isLoading) {
    console.log('Loading data...');
    return <div>Loading...</div>;
  }
  if (error) {
    console.log('Error loading data');
    return <div>Error loading data</div>;
  }

  const updateTableFunction = async (toastMessage: string) => {
    const updatedConcepts = await fetcher();
    mutate('fetchConcepts', updatedConcepts, false);
    toast({ title: toastMessage });
  };

  return (
    <div>
      <div className="flex mt-2">
        <div className="flex justify-center fixed bottom-0 bg-white h-20 left-0 w-full items-center z-50">
          <AddConceptPopup updateTable={() => updateTableFunction('Added new concept')} />
        </div>
      </div>
      <div className="mb-20">
        {concepts.map((concept: ExtendedConcepts) => (
          <ConceptCard key={concept.id} concept={concept} updateTableFunction={updateTableFunction} />
        ))}
      </div>
    </div>
  );
};


export default ConceptsTable;


/*
'use client';
import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { action__getConcepts, action_updateTopicStatus, action_updateTopicDetails } from "../actions";
import { ExtendedConcepts } from '@/../prisma/schema.types';
import AddConceptPopup from './ui/concept.popup.add';
import ConceptControlDropdown from './ui/concept.popup.control';
import AddTopicModal from './ui/topic.popup.add';
import TopicControlModal from './ui/topic.popup.control';
import Link from 'next/link';
import { useToast } from "@/components/ui/use-toast";
import useSWR, { mutate } from 'swr';
import TopicLanguagesControlDropdown from './ui/topic.languages.popup.edit';

const ConceptsTable = () => {
  const { toast } = useToast();

  const fetcher = async () => {
    const data = await action__getConcepts();
    return data;
  };

  const { data: concepts, error, isLoading, isValidating } = useSWR('fetchConcepts', fetcher, {
    onSuccess: (data) => {
      console.log('Data fetched successfully:', data);
    },
    onError: (error) => {
      console.log('Error fetching data:', error);
    },
  });

  const [editingCell, setEditingCell] = useState<{ conceptId: string | null; topicId: string | null; field: string | null }>({ conceptId: null, topicId: null, field: null });
  const [editInputValue, setEditInputValue] = useState<string>("");

  
  useEffect(( ) => {
    console.log('Concepts from cache:', !isValidating);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

  if (isLoading) {
    console.log('Loading data...');
    return <div>Loading...</div>;
  }
  if (error) {
    console.log('Error loading data');
    return <div>Error loading data</div>;
  }

  const updateTableFunction = async (toastMessage: string) => {
    const updatedConcepts = await fetcher();
    mutate('fetchConcepts', updatedConcepts, false);
    toast({ title: toastMessage });
  };

  const handleDoubleClick = (conceptId: string, topicId: string, field: string, currentValue: string) => {
    setEditingCell({ conceptId, topicId, field });
    setEditInputValue(currentValue);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleInputBlur = async (conceptId: string, topicId: string, field: string) => {
    try {
      const data: { title?: string; description?: string } = {};
      if (field === 'title') {
        data.title = editInputValue;
      } else if (field === 'description') {
        data.description = editInputValue;
      }

      await action_updateTopicDetails(topicId, data);
      updateTableFunction('Updated topic');
      setEditingCell({ conceptId: null, topicId: null, field: null });
    } 
    catch (error) {
      console.error(`Failed to update topic details: ${error.message}`);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>, conceptId: string, topicId: string, field: string) => {
    if (e.key === 'Enter') {
      handleInputBlur(conceptId, topicId, field);
    }
  };

  const handleStatusCellClick = async (topicId: string, currentStatus: boolean) => {
    try {
      const newStatus = !currentStatus;
      await action_updateTopicStatus(topicId, newStatus);
      updateTableFunction('Updated topic status');
    } catch (error) {
      console.error("Error updating topic status:", error);
    }
  };

  return (
    <div>
      <div>
        <div className="flex mt-2">
          <div className="flex justify-center fixed bottom-0 bg-white h-20 left-0 w-full items-center z-50">
            <AddConceptPopup updateTable={() => updateTableFunction('Added new concept')} />
          </div>
        </div>
      </div>

      <div className="mb-20">
        { concepts.map((concept: ExtendedConcepts) => (
          <div key={concept.id} className="my-4 p-4 border border-gray-200 rounded-lg">
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
                <p className="text-md mb-4">{concept.description}</p>
              </div>
              <div>
                <ConceptControlDropdown updateTable={( tableData, msg ) => updateTableFunction(msg)} conceptId={concept.id} concept={concept} />
              </div>
            </div>

            <Table>
              <TableCaption>Topics for {concept.title}</TableCaption>
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="">Topic</TableHead>
                  <TableHead className="">Description</TableHead>
                  <TableHead className="">Status</TableHead>
                  <TableHead className="">Edit your page</TableHead>
                  <TableHead className=""> </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {concept.topics.map((topic) => (
                  <TableRow key={topic.id}>
                    <TableCell
                      className="font-medium"
                      onDoubleClick={() => handleDoubleClick(concept.id, topic.id, 'title', topic.title)}
                    >
                      {editingCell.conceptId === concept.id && editingCell.topicId === topic.id && editingCell.field === 'title' ? (
                        <input
                          className="w-full p-3"
                          value={editInputValue}
                          onChange={handleInputChange}
                          onBlur={() => handleInputBlur(concept.id, topic.id, 'title')}
                          onKeyPress={(e) => handleKeyPress(e, concept.id, topic.id, 'title')}
                          autoFocus
                        />
                      ) : (
                        topic.title
                      )}
                    </TableCell>

                    <TableCell
                      className="font-medium"
                      onDoubleClick={() => handleDoubleClick(concept.id, topic.id, 'description', topic.description)}
                    >
                      {editingCell.conceptId === concept.id && editingCell.topicId === topic.id && editingCell.field === 'description' ? (
                        <textarea
                          className="w-full resize-none p-2"
                          value={editInputValue}
                          onChange={handleInputChange}
                          onBlur={() => handleInputBlur(concept.id, topic.id, 'description')}
                          onKeyPress={(e) => handleKeyPress(e, concept.id, topic.id, 'description')}
                          autoFocus
                        />
                      ) : (
                        topic.description
                      )}
                    </TableCell>

                    <TableCell className="font-medium" onClick={() => handleStatusCellClick(topic.id, topic.active)}>
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

                    <TableCell className="cursor-pointer">
                      <TopicControlModal topicId={topic.id} updateTable={( tableData, msg ) => updateTableFunction(msg)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex mt-2 justify-end">
              <AddTopicModal updateTable={() => updateTableFunction('Added new topic')} conceptId={concept.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConceptsTable;
*/