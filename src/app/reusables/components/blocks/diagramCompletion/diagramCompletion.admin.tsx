'use client';
import React, { useState, useRef, useCallback } from 'react';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DiagramCompletionComponent, { DiagramCompletionProps } from './diagramCompletion';
import AdminBlockTemplate from '../../templates/admin/admin.block.form';
import { AdminToolsProps } from '@/app/(pages)/(authed)/admin/_types/type.adminTools';
import { Textarea } from '@/components/ui/textarea';
import DiagramCanvas from './canvas';
import { NewNodeObject , NewRectangleObject } from './diagramCompletion';

// Importing React Flow helper functions
import { addEdge, applyNodeChanges, applyEdgeChanges, OnConnect } from '@xyflow/react';

interface DiagramCompletionBlockProps {
  data: DiagramCompletionProps;
  blockIndex: number;
  adminTools: AdminToolsProps;
}

const DiagramCompletionAdminBlock: React.FC<DiagramCompletionBlockProps> = ({
  data,
  adminTools,
  blockIndex,
}) => {
  const [formData, setFormData] = useState<DiagramCompletionProps>(data);
  const [savedData, setSavedData] = useState<DiagramCompletionProps | null>(data);
  const [isSaved, setIsSaved] = useState(true);

  const formRef = useRef(null);

  // React Flow related state and handlers
  const onNodesChange = useCallback(
    (changes) => {
      setFormData((prevData) => ({
        ...prevData,
        nodesData: {
          ...prevData.nodesData,
          initialNodes: applyNodeChanges(changes, prevData.nodesData.initialNodes),
        },
      }));
      setIsSaved(false); // Mark form as unsaved when nodes change
    },
    []
  );

  const onEdgesChange = useCallback(
    (changes) => {
      setFormData((prevData) => ({
        ...prevData,
        nodesData: {
          ...prevData.nodesData,
          initialEdges: applyEdgeChanges(changes, prevData.nodesData.initialEdges),
        },
      }));
      setIsSaved(false); // Mark form as unsaved when edges change
    },
    []
  );

  const onConnect: OnConnect = useCallback(
    (connection) => {
      setFormData((prevData) => ({
        ...prevData,
        nodesData: {
          ...prevData.nodesData,
          initialEdges: addEdge(connection, prevData.nodesData.initialEdges),
        },
      }));
      setIsSaved(false); // Mark form as unsaved when edges are connected
    },
    []
  );

  // Handler for changing node label
  const handleLabelChange = (nodeId: string, newLabel: string) => {
    setFormData((prevData) => ({
      ...prevData,
      nodesData: {
        ...prevData.nodesData,
        initialNodes: prevData.nodesData.initialNodes.map((node) =>
          node.id === nodeId ? { ...node, data: { ...node.data, label: newLabel } } : node
        ),
      },
    }));
    setIsSaved(false); // Mark form as unsaved when label changes
  };

  // Handler for changing the guess state
  const handleGuessChange = (nodeId: string, newGuess: boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      nodesData: {
        ...prevData.nodesData,
        initialNodes: prevData.nodesData.initialNodes.map((node) =>
          node.id === nodeId ? { ...node, data: { ...node.data, guess: newGuess } } : node
        ),
      },
    }));
    setIsSaved(false); // Mark form as unsaved when guess state changes
  };

  // Handler to add a new node
  const addNode = () => {
    setFormData((prevData) => ({
      ...prevData,
      nodesData: {
        ...prevData.nodesData,
        initialNodes: [...prevData.nodesData.initialNodes, { ...NewNodeObject, id: `${formData.nodesData.initialNodes.length + 1}` }],
      },
    }));
    setIsSaved(false);
  };

  const addRectangleNode = () => {
    console.log('adding new rectangle')
    setFormData((prevData) => ({
        ...prevData,
        nodesData: {
          ...prevData.nodesData,
          initialNodes: [...prevData.nodesData.initialNodes, { ...NewRectangleObject, id: `${formData.nodesData.initialNodes.length + 1}` }],
        },
      }));
      setIsSaved(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setIsSaved(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSavedData(formData); // Save the current formData
    setIsSaved(true);
    adminTools.updateDataBlock({ type: 'update', blockData: formData, blockIndex });
  };

  const handleDelete = () => {
    adminTools.updateDataBlock({ type: 'delete', blockData: null, blockIndex });
  };

  const form = (
    <form onSubmit={handleSubmit} ref={formRef}>
      <CardContent className="space-y-2 px-0">
        <div className="space-y-1">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            wordLimit={400}
          />
        </div>

        {/* Pass the node and edge data to DiagramCanvas */}
        <DiagramCanvas
          nodes={formData.nodesData.initialNodes}
          edges={formData.nodesData.initialEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          handleLabelChange={handleLabelChange}
          handleGuessChange={handleGuessChange} // Pass the guess change handler
          addNode={addNode} // Pass the addNode function
          addRectangle={ addRectangleNode }
          displayMode={'admin'}
        />
      </CardContent>
    </form>
  );

  // The preview, which only renders the saved version
  const preview = savedData ? (
    <DiagramCompletionComponent data={savedData} />
  ) : (
    <p>No data available. Please fill out the form.</p>
  );

  return (
    <AdminBlockTemplate
      title="Diagram Completion"
      description="Complete the diagram and click save."
      form={form}
      savedData={preview}
      formRef={formRef}
      isSaved={isSaved}
      removeItem={handleDelete}
    />
  );
};

export default DiagramCompletionAdminBlock;
