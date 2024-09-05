
// ImageBlock.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Title from '@/app/reusables/content/title';

// image.types.ts
export interface ImageBlockProps {
  title: string;
  imageUrl: string;
  type: 'image' | 'video'; // Type to distinguish between image and video
  id?: string;
  position?: 'left' | 'center' | 'right';
  responsive?: boolean;
  mediaType?: 'image' | 'video'; // New property to differentiate media types
}

interface ImageBlockUsageProps {
  data: ImageBlockProps;
}

export const imageObject: ImageBlockProps = {
  title: '',
  imageUrl: '',
  type: 'image',
  position: 'center',
  responsive: true, 
  mediaType: 'image'
};


const ImageBlock: React.FC<ImageBlockUsageProps> = ({ data }) => {
  const positionClass =
    data.position === 'left'
      ? 'justify-start'
      : data.position === 'right'
      ? 'justify-end'
      : 'justify-center';

  return (
    <div className='flex flex-col'>
      <Title title={data.title} variant="subheading1" noMargin={false} />
      <div className={`mt-4 w-full flex ${positionClass}`}>
        {data.imageUrl ? (
          <div className={`flex ${positionClass} ${data.responsive ? 'w-3/4' : 'w-3/4'} items-center relative`}>
            {data.mediaType === 'video' ? (
              <video
                src={data.imageUrl}
                controls
                className="rounded-md"
                style={{ width: data.responsive ? '100%' : '800px', height: data.responsive ? 'auto' : '650px' }}
              />
            ) : (
              <Image
                src={data.imageUrl}
                alt={data.title}
                layout={data.responsive ? 'responsive' : 'intrinsic'}
                width={800}
                height={650}
                objectFit="contain"
                className="rounded-md"
              />
            )}
          </div>
        ) : (
          <p>No media available. Please upload an image or video.</p>
        )}
      </div>
    </div>
  );
};

export default ImageBlock;
