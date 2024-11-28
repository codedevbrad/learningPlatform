'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface ResourceType {
  title: string;
  description: string;
  url: string;
  imgUrl: string;
}

export type {
  ResourceType
};

function ResourceComponent({ resource, viewType = 'embedded' }: { resource: ResourceType; viewType?: string }) {
  const { title, description, url, imgUrl } = resource;

  return (
    <>
      <div className="border m-4 p-4 rounded-lg flex flex-row cursor-pointer">
        <div className='flex items-center justify-center'>
          <Image width={ 40 } height={ 20 } src={imgUrl} alt={title} className="w-40 h-20 object-cover rounded-lg" />
        </div>
        <div className="flex flex-col justify-center pl-4">
          {viewType === 'embedded' && (
            <div onClick={ () => console.log('hey')}>
              <h2 className="text-lg font-semibold">{title}</h2>
              <p>{description}</p>
              <span> { url } </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ResourceComponent;