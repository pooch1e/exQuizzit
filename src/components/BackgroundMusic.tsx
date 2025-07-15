"use client";

import { useAudio } from "@/contexts/AudioContext";

interface BackgroundMusicProps {
  className?: string;
}

export default function BackgroundMusic({
  className = "",
}: BackgroundMusicProps) {
  const { isMuted, isPlaying, toggleMute, startMusic } = useAudio();

  const handleClick = () => {
    console.log(
      "BackgroundMusic clicked - isMuted:",
      isMuted,
      "isPlaying:",
      isPlaying
    );
    if (!isPlaying && !isMuted) {
      startMusic();
    } else {
      toggleMute();
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 ${className}`}>
      <button
        onClick={handleClick}
        className="bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20 hover:bg-white/20 transition-all duration-200 hover:scale-110"
        title={
          !isPlaying && !isMuted
            ? "Start Music"
            : isMuted
            ? "Unmute Music"
            : "Mute Music"
        }
      >
        {!isPlaying && !isMuted ? (
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 5v14l11-7z"
            />
          </svg>
        ) : isMuted ? (
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
