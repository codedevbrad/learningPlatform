import React, { useState, useMemo } from 'react';
import { useNodesState, useEdgesState, addEdge, OnConnect } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import DiagramCanvas from './canvas';
import Title from '@/app/reusables/content/title';
import { Button } from '@/components/ui/button';

interface DiagramCompletionProps {
  title: string;
  content: string;
  nodesData: any;
  type: 'diagramCompletion';
}

interface DiagramCompletionUsageProps {
  data: DiagramCompletionProps;
}

interface NewNodeObjectProps {
  data: { label: string; guess: boolean };
  position: {
    x: number;
    y: number;
  };
  type: 'editableNode';
}

export const NewNodeObject: NewNodeObjectProps = {
  data: { label: 'New Node', guess: false },
  position: {
    x: Math.random() * 250,
    y: Math.random() * 250,
  },
  type: 'editableNode',
};

export const NewRectangleObject = {
    data: { type: 'rectangle' }, // New type for rectangle
    position: {
      x: Math.random() * 250,
      y: Math.random() * 250,
    },
    type: 'rectangleNode',
};
  

export const diagramCompletionObject: DiagramCompletionProps = {
  title: '',
  content: '',
  nodesData: {
    initialNodes: [],
    initialEdges: [],
  },
  type: 'diagramCompletion',
};


const DiagramCompletionComponent: React.FC<DiagramCompletionUsageProps> = ({ data }) => {
  const [nodes, onNodesChange] = useNodesState(data.nodesData.initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(data.nodesData.initialEdges);

  const onConnect: OnConnect = (connection) => setEdges((eds) => addEdge(connection, eds));

  return (
    <div className="mt-4">
      <Title title={data.title} variant="heading" className="my-3" />
      <p>{data.content}</p>

      <div className="">
        <div>
          <Button> Test my try </Button>
        </div>

        <div style={{ height: 400 }}>
          <DiagramCanvas
            nodes={nodes}
            edges={edges}
            onConnect={onConnect}
            displayMode={'lesson'}
          />
        </div>
      </div>
    </div>
  );
};

export default DiagramCompletionComponent;
export type { DiagramCompletionProps, DiagramCompletionUsageProps };
