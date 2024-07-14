import React from 'react';
import Title from '@/app/reusables/content/title';

interface VideoBlockProps {
  url: string;
  title: string;
  type: 'video';
  sourceType: 'youtube' | 'upload';
  id?: string;
}

export const videoBlockObject: VideoBlockProps = {
  url: 'ca1vIYmGyYA',
  title: '',
  type: 'video',
  sourceType: 'youtube',
};

interface VideoViewProps {
  data: VideoBlockProps;
}

const VideoViewComponent: React.FC<VideoViewProps> = ({ data }) => {
  return (
    <div className="mt-4">
      <Title title={data.title} variant="subheading1" noMargin={false} />
      <div className="flex justify-center mt-4">
        {data.sourceType === 'youtube' ? (
          <iframe
            width="853"
            height="480"
            src={`https://www.youtube.com/embed/${data.url}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
            className="rounded-lg"
          />
        ) : (
          <video
            width="853"
            height="480"
            controls
            className="rounded-lg"
          >
            <source src={data.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
};

export default VideoViewComponent;
export type { VideoBlockProps, VideoViewProps };