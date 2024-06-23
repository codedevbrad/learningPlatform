'use client'
import React, { useState, ChangeEvent, KeyboardEvent } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { action_updateTopicStatus, action_updateTopicDetails } from "../actions"
import { ExtendedConcepts } from '@/../prisma/schema.types'

import AddConceptPopup  from './ui/concept.popup.add'
import DeleteConceptModal from './ui/concept.popup.del'

import AddTopicModal    from './ui/topic.popup.add'
import DeleteTopicPopup from './ui/topic.popup.del'

import Link from 'next/link'

import { useToast } from "@/components/ui/use-toast"


 // Define interface for ConceptsTableProps
interface ConceptsTableProps {
  conceptsState: ExtendedConcepts[];
}

// Define ConceptsTable functional component.
const ConceptsTable: React.FC<ConceptsTableProps> = ({ conceptsState }) => {

  const { toast } = useToast()
  
  // State hooks
  const [concepts, setConcepts] = useState<ExtendedConcepts[]>(conceptsState);
  const [editingCell, setEditingCell] = useState<{ conceptId: string | null; topicId: string | null; field: string | null }>({ conceptId: null, topicId: null, field: null });
  const [editInputValue, setEditInputValue] = useState<string>("");

  const updateTableFunction = ( array: React.SetStateAction<ExtendedConcepts[]> , toastMessage : string ) => {
    setConcepts( array );
    toast({
      title: toastMessage,
      className: 'bg-blue-700 text-white'
    })
  };

  // Event handlers
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
      } 
      else if (field === 'description') {
        data.description = editInputValue;
      }

      const updatedTopics = await action_updateTopicDetails(topicId, data);
      setConcepts(updatedTopics);
      console.log("Updated topic", topicId, "field:", field, "with value:", editInputValue);
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
      const updatedTopics = await action_updateTopicStatus(topicId, newStatus);
      setConcepts(updatedTopics);
    } 
    catch (error) {
      console.error("Error updating topic status:", error);
    }
  };

  return (
    <div>
        <div>
          <div className="flex mt-2">
              <div className="flex justify-center fixed bottom-0 bg-white h-20 left-0 w-full items-center z-50">
                  <AddConceptPopup updateTable={ updateTableFunction } />
              </div>
          </div>
        </div>

        <div className="mb-20">
              { concepts.map( ( concept ) => (
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
                            <DeleteConceptModal updateTable={ updateTableFunction } conceptId={ concept.id } />
                        </div>
                    </div>

                    <Table>
                      <TableCaption>Topics for {concept.title}</TableCaption>
                      <TableHeader className="bg-gray-100">
                        <TableRow>
                          <TableHead className="">Topic</TableHead>
                          <TableHead className="w-auto">Description</TableHead>
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
                                  <div className={` cursor-pointer border px-2 py-1 rounded border-${topic.active ? 'black bg-black text-white' : 'gray-300'}`}>
                                    {topic.active ? 'Active' : 'Inactive'}
                                  </div>
                                </div>
                            </TableCell>

                            <TableCell className="font-medium">
                              <div className="flex mt-2">
                                <Link href={`/admin/edit/${topic.id}`}>
                                    <div className={`border px-2 py-1 rounded border-gray-200 hover:bg-black hover:text-white`}>
                                      edit topic
                                    </div>
                                </Link>
                              </div>
                            </TableCell>

                            <TableCell className="cursor-pointer">
                                <DeleteTopicPopup topicId={ topic.id } updateTable={ updateTableFunction }/>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className="flex mt-2 justify-end">
                        <AddTopicModal updateTable={ updateTableFunction } conceptId={ concept.id } />
                    </div>
                  </div>
              ))}
        </div>
    </div>
  );
};

export default ConceptsTable; 