import React from 'react';

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="text-white w-10 h-10" style={{ opacity: 0.7 }}>
    <path d="M8 5v14l11-7z" />
  </svg>
);

type VideoReference = {
  url: string;
  title: string;
  description: string;
  imageUrl: string;
  type: string;
};

type ReusableVideoComponentProps = {
  reference: VideoReference;
};

const ReusableVideoComponent: React.FC<ReusableVideoComponentProps> = ({ reference }) => {
  const { title, description, imageUrl, url } = reference;

  return (
    <a href={url} target="_blank" 
    rel="noopener noreferrer" 
    className="p-4 shadow-md shadow-purple-900 max-w-4xl mx-auto flex items-center bg-purple-950 rounded-lg transition-shadow duration-300 ease-in-out no-underline">
      <div className="relative flex-none aspect-w-16 aspect-h-9 w-20">
        <img src={imageUrl} alt={`Cover for ${title}`} className="rounded-lg w-full h-full object-cover" />
        <div className="absolute inset-0 flex justify-center items-center">
          <PlayIcon />
        </div>
      </div>
      <div className="ml-4 flex-grow">
        <h2 className="text-lg font-bold truncate text-white">{title}</h2>
        <p className="mt-1 text-white text-sm truncate">{description}</p>
      </div>
    </a>
  );
};

export default ReusableVideoComponent;
export type { VideoReference };
