"use client";

import React, { useState, useEffect, useRef } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import SliderCustom from "@/components/custom/slider";

interface Song {
  title: string;
  src: string;
}

const TimerMusicPlayer: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [musicPlaying, setMusicPlaying ] = useState( false );
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [volume, setVolume] = useState(50); // Volume state (0 to 100)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false); // State to control the popover's open status

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const songs: Song[] = [
    { title: "cozy", src: "/audio/cozy.mp3" },
    { title: "focus", src: "/audio/focus.mp3" },
    { title: "lofi", src: "/audio/lofi.mp3" },
    { title: "lofium", src: "/audio/lofium.mp3" },
    { title: "moonshine", src: "/audio/moonshine.mp3" },
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }
    if (time <= 0) {
      setIsRunning(false);
      setTime(0);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100; // Update audio element volume
    }
  }, [volume]);

  const handleAddMinute = () => setTime((prev) => prev + 60);
  const handlePauseResume = () => setIsRunning((prev) => !prev);
  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  const handlePopoverOpen = () => {
    if (!selectedSong) {
      setSelectedSong(songs[0]);
      setTime(300); // 5 minutes in seconds
      setIsRunning(true);
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.play();
      }
    }
  };

  const handleSongChange = (newSong: Song) => {
    setSelectedSong(newSong);
    if (audioRef.current) {
      audioRef.current.pause(); // Stop current song
      audioRef.current.load(); // Load the new song
      audioRef.current.play(); // Play the new song
    }
  };

  function handleMusic ( ) {
    if (audioRef.current) {
        if ( musicPlaying ) {
            audioRef.current.pause();
            setMusicPlaying( false );
        }
        else {
            audioRef.current.play();
            setMusicPlaying( true );
        }
    }
  }

  const handleSongEnd = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset the song to the beginning
      audioRef.current.play(); // Start the song again
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50">
      <Popover
        onOpenChange={(open) => {
          if (open) {
            handlePopoverOpen();
          }
        }}
        open={isPopoverOpen}
      >
        <PopoverTrigger asChild>
          <button
            className="w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 focus:outline-none"
            onClick={() => setIsPopoverOpen( prev => !prev )} // Manually toggle popover open
          >
            <span className="text-white"> 🎵 </span>
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="bg-gray-800 text-white p-4 rounded-lg shadow-2xl w-64"
          side="bottom"
          align="end"
        >
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Timer & Music Player</h2>
          </div>

          <div className="mb-4">
            <div className="text-center text-3xl font-bold mb-2">
              {Math.floor(time / 60)
                .toString()
                .padStart(2, "0")}
              :
              {(time % 60).toString().padStart(2, "0")}
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleAddMinute}
                className="bg-green-500 px-2 py-1 rounded hover:bg-green-600"
              >
                +1 Min
              </button>
              <button
                onClick={handlePauseResume}
                className="bg-blue-500 px-2 py-1 rounded hover:bg-blue-600"
              >
                {isRunning ? "Pause" : "Resume"}
              </button>
              <button
                onClick={handleReset}
                className="bg-red-500 px-2 py-1 rounded hover:bg-red-600"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Choose a Song:</label>
            <select
              className="w-full bg-gray-700 rounded p-2"
              onChange={(e) =>
                handleSongChange(
                  songs.find((song) => song.title === e.target.value) || songs[0]
                )
              }
              value={selectedSong?.title || ""}
            >
              {songs.map((song, index) => (
                <option key={index} value={song.title}>
                  {song.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-row justify-center my-4">
                <div className={`w-12 h-12 rounded-full bg-white flex items-center justify-center ${
                        musicPlaying ? "animate-spin-slow" : ""
                }`} >
                    🎵
                </div>
          </div>

          <div>
                <span onClick={ () => handleMusic() }> { musicPlaying ? 'pause' : 'resume' } </span>
          </div>

          {selectedSong && (
            <div>
              <p className="mb-2 text-sm text-center">Now Playing: {selectedSong.title}</p>
              <audio ref={audioRef} className="w-full" autoPlay onEnded={ handleSongEnd }>
                <source src={selectedSong.src} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          <SliderCustom state={ volume } setState={ setVolume } title={ 'Set the volume' } />
        
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TimerMusicPlayer;