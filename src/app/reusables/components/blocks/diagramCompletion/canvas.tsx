import React, { useMemo, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  OnConnect,
  Node,
  Edge,
  Handle,
  Position,
  NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { Switch } from "@/components/ui/switch";


import { Resizable } from 're-resizable';
import Title from '@/app/reusables/content/title';


function UserGuess({ guess }: { guess: string }) {
  return <div>{guess}</div>;
}

const EditableNode: React.FC<NodeProps> = ({ data, id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data?.label || 'No Label');
  const [guess, setGuess] = useState(data?.guess || false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // Track if the drop is correct
  const [guessed, setGuessed] = useState('Guess the option'); // Track the guessed label

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
    if (data.displayMode !== 'lesson') {
      data.onLabelChange(id, e.target.value);
    }
  };

  const toggleEdit = () => {
    if (data.displayMode !== 'lesson') {
      setIsEditing((prev) => !prev);
    }
  };

  const handleGuessChange = () => {
    if (data.displayMode !== 'lesson') {
      setGuess((prev) => !prev);
      data.onGuessChange(id, !guess);
    }
  };

  // Drag-and-drop handling
  const handleDrop = (e: React.DragEvent) => {
    const draggedLabel = e.dataTransfer.getData('label'); // Get the dragged label
    setIsCorrect(draggedLabel === label); // Check if the guess matches the correct node label
    setGuessed(draggedLabel); // Update the guessed label to the dropped label
  };

  const allowDrop = (e: React.DragEvent) => {
    e.preventDefault(); // Allow dropping
  };

  // Change node color based on guess state or correctness
  const nodeColor =
    isCorrect === true
      ? 'bg-green-400'
      : isCorrect === false
      ? 'bg-red-400'
      : guess
      ? 'bg-black'
      : 'bg-gray-300';
  const nodeTextColor = guess ? 'text-white' : 'text-black';

  return (
    <div
      className={`w-[120px] min-h-[50px] custom-node ${nodeColor} ${nodeTextColor} p-2 text-sm rounded-md`}
      onClick={toggleEdit}
      onDrop={handleDrop} // Enable dropping even in lesson mode
      onDragOver={allowDrop} // Enable drop target even in lesson mode
    >
      {isEditing ? (
        <input
          value={label}
          onChange={handleLabelChange}
          onBlur={toggleEdit}
          autoFocus
          className="text-black"
        />
      ) : (
        <div>
          {guess && data.displayMode === 'lesson' ? (
            <UserGuess guess={guessed} />
          ) : (
            label
          )}
        </div>
      )}

      {data.displayMode !== 'lesson' && (
        <div className="mt-2 flex items-center">
          <span className="mr-2">Guess</span>
          <Switch checked={guess} onCheckedChange={handleGuessChange} />
        </div>
      )}

      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};

const RectangleNode: React.FC<NodeProps> = ({ id, data }) => {

  return (
    <Resizable className="border-2 border-gray-600 p-2 text-sm rounded-md relative bg-transparent" 
    defaultSize={{
        width: 150,
        height: 300,    
    }}
    onResizeStop={(e, direction, ref, d) => {
        console.log('hey')
      }}
    >
    </Resizable>
  );
};

  

interface DiagramCanvasProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: OnConnect;
  handleLabelChange: (nodeId: string, newLabel: string) => void;
  handleGuessChange: (nodeId: string, newGuess: boolean) => void;
  addNode: () => void;
  addRectangle: () => void;
  displayMode: 'admin' | 'lesson';
}


const DiagramCanvas: React.FC<DiagramCanvasProps> = ({
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    handleLabelChange,
    handleGuessChange,
    addNode,
    addRectangle,
    displayMode,
  }) => {
    const nodeTypes = {
      editableNode: EditableNode,
      rectangleNode: RectangleNode, // Add rectangle node type
    };
  
    const guessableNodes = useMemo(() => {
      return displayMode === 'lesson' ? nodes.filter((node) => node.data.guess === true) : [];
    }, [nodes, displayMode]);
  
    const handleDragStart = (e: React.DragEvent, nodeId: string, label: string) => {
      e.dataTransfer.setData('nodeId', nodeId);
      e.dataTransfer.setData('label', label);
    };
  
    return (
      <>
        <div>
          <Title title="Guesses" variant="subheading2" />
          <ul className="flex flex-row space-x-5">
            {guessableNodes.map((node) => (
              <li
                key={node.id}
                className="p-2 bg-gray-100 rounded-md my-2"
                draggable
                onDragStart={(e) => handleDragStart(e, node.id, node.data.label)}
              >
                {node.data.label}
              </li>
            ))}
          </ul>
        </div>

        {/* <Resizable
        defaultSize={{
            width: 320,
            height: 200,
        }}
        className='bg-black text-white'
        >
        Sample with default size
        </Resizable> */}

        <div style={{ height: 600, marginTop: '20px', border: '1px solid #ddd', position: 'relative' }}>
          {displayMode === 'admin' && (
            <Menubar className="absolute top-2 left-2 z-10 bg-white">
              <MenubarMenu>
                <MenubarTrigger>Actions</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={addNode}>Add Node </MenubarItem>
                  <MenubarItem onClick={addRectangle}>Add Rectangle </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          )}
  
          <ReactFlow
            nodes={nodes.map((node) => ({
              ...node,
              type: node.data.type === 'rectangle' ? 'rectangleNode' : 'editableNode', // Use 'rectangleNode' for rectangle type
              data: {
                ...node.data,
                displayMode,
                onLabelChange: handleLabelChange,
                onGuessChange: handleGuessChange,
              },
            }))}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            nodesDraggable={displayMode === 'admin'} // disable when resizing rectangle nodes.
            nodesConnectable={displayMode === 'admin'}
            panOnDrag={true} // disable when resizing rectangle nodes.
          >
            <Background />
            <MiniMap />
            <Controls />
          </ReactFlow>
        </div>
      </>
    );
  };
  
export default DiagramCanvas;

/*
    when clicking on drag mode in the rectangle node, 
    disable the nodesDraggable and panOnDrag to enable resizing. flip state back when finished.

    track the width and height as a state in the rectangle node and update back to the nodes. 
*/