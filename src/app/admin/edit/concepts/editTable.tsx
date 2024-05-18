'use client'
// Import necessary components and functions
import React, { useState, ChangeEvent, KeyboardEvent } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { action_updateTopicStatus, action_updateTopicDetails } from "./actions"

import { ConceptType } from '../../../../../prisma/schema.types'

// Define interface for ConceptsTableProps
interface ConceptsTableProps {
  conceptsState: ConceptType[];
}

// Define ConceptsTable functional component
const ConceptsTable: React.FC<ConceptsTableProps> = ({ conceptsState }) => {
  // State hooks
  const [concepts, setConcepts] = useState<ConceptType[]>(conceptsState);
  const [editingCell, setEditingCell] = useState<{ conceptId: string | null; topicId: string | null; field: string | null }>({ conceptId: null, topicId: null, field: null });
  const [editInputValue, setEditInputValue] = useState<string>("");

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
      // Initialize an empty object to hold the data to be updated
      const data: { title?: string; description?: string } = {};

      // Check if the field is 'title' or 'description' and add it to the data object accordingly
      if (field === 'title') {
        data.title = editInputValue;
      } else if (field === 'description') {
        data.description = editInputValue;
      }

      // Call the action_updateTopicDetails function with the updated data
      const updatedTopics = await action_updateTopicDetails(topicId, data);
      setConcepts(updatedTopics);
      console.log("Updated topic", topicId, "field:", field, "with value:", editInputValue);
      setEditingCell({ conceptId: null, topicId: null, field: null });
    } catch (error) {
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
    } catch (error) {
      console.error("Error updating topic status:", error);
    }
  };

  // Render
  return (
    <div>
      {concepts.map((concept) => (
        <div key={concept.id} className="my-4 p-4 border border-gray-200 rounded-lg">
          <div>
            <h2 className="text-2xl font-bold mb-2">{concept.title}</h2>
            <p className="text-lg mb-4">{concept.description}</p>
          </div>

          <Table>
            <TableCaption>Topics for {concept.title}</TableCaption>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="">Topic</TableHead>
                <TableHead className="w-auto">Description</TableHead>
                <TableHead className="">Resources</TableHead>
                <TableHead className="">Status</TableHead>
                <TableHead className="">Edit your page</TableHead>
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
                  
                  <TableCell className="font-medium">
                    <div className="flex mt-2">
                      <div className={`border px-2 py-1 rounded border-gray-200`}>
                        Resources
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="font-medium" onClick={() => handleStatusCellClick(topic.id, topic.active)}>
                    <div className="flex mt-2">
                      <div className={`border px-2 py-1 rounded border-${topic.active ? 'black bg-black text-white' : 'gray-300'}`}>
                        {topic.active ? 'Active' : 'Inactive'}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="font-medium">
                    <div className="flex mt-2">
                      <div className={`border px-2 py-1 rounded border-gray-200`}>
                        edit
                      </div>
                    </div>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
};

export default ConceptsTable;