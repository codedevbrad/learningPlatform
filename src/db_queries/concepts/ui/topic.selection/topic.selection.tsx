'use client';

import React from 'react';
import useSWR from 'swr';
import SelectBox from '@/components/custom/SelectBox';
import { ACTION___gettopics } from './actions';

const RenderTopicsAsSelect: React.FC = ({ chosenTopic }) => {
  const fetcher = async () => {
    try {
      const topics = await ACTION___gettopics();
      console.log( 'topics' , topics )
      return topics;
    } catch (error) {
      console.error('Failed to fetch topics:', error);
      throw error;
    }
  };

  const { data: topics, error, isValidating } = useSWR('topics', fetcher);

  if (isValidating) {
    return <p>Loading topics...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error.message}</p>;
  }

  if (!topics || topics.length === 0) {
    return <p>No topics available</p>;
  }

  return (
    <SelectBox
      items={topics.map((topic: { id: string; title: string; }) => ({
        label: topic.title,
        value: topic.id,
      }))} 
      selected={ (item) => chosenTopic( item ) }   
    />
  );
};

export default RenderTopicsAsSelect;
