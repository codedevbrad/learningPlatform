import React from 'react';

type ImageMedia = {
  type: 'image'
  url: string
  bucketId: string
}
type VideoMedia = {
  type: 'video'
  url: {
    src: string
    thumbnail: string
  }
  bucketId: string
}

type MediaItem = ImageMedia | VideoMedia;


type CustomMediaProps = {
  src: string;
  controls?: boolean;
  autoPlay?: boolean;
  className?: string;
};

const ReusableMedia: React.FC<CustomMediaProps> = ({
  src,
  controls = false,
  autoPlay = false,
  className = '',
}) => {
  return (
    <div className="flex justify-center ">
      <video
        src={src}
        controls={controls}
        className={`w-[90%] rounded-2xl ${className} `}
      >
          Your browser does not support the video tag.
      </video>
     </div>
  );
};


export default ReusableMedia;