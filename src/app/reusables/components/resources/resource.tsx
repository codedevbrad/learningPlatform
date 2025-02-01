'use client';
import { useEffect } from 'react';

/*
  DISPLAYS A RESOURCE IN A IFRAME.
*/

function EmbeddedVideoDisplay({ url, closeDisplay }) {
  // Function to extract YouTube video ID from the URL
  const extractYouTubeId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Check if the URL is a YouTube link
  const youtubeId = extractYouTubeId(url);

  useEffect(() => {
    // Disable scrolling when the component is mounted
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling when the component is unmounted
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="rounded-2xl absolute top-32 w-full h-[800px] inset-0 bg-black bg-opacity-90 flex justify-center items-center z-30">
      <button
        className="absolute top-4 right-4 bg-white p-1 rounded z-10"
        onClick={closeDisplay}
      >
        ✕
      </button>
      <div className="relative w-full h-full flex justify-center items-start mt-44">
        {youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={'resource youtube video'}
            className="w-[90%] h-3/4 border-none"
            allowFullScreen
          />
        ) : (
          <p className="text-white">Invalid YouTube URL</p>
        )}
      </div>
    </div>
  );
}

export default EmbeddedVideoDisplay;
