"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

interface AudioContextType {
  isMuted: boolean;
  isPlaying: boolean;
  toggleMute: () => void;
  startMusic: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element only once
    if (!audioRef.current) {
      const audio = new Audio('/background-music.mp3');
      audio.loop = true;
      audio.volume = 0.3;
      audioRef.current = audio;

      // Try to auto-play
      const playMusic = async () => {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (error) {
          console.log("Autoplay blocked:", error);
        }
      };

      playMusic();
    }

    return () => {
      // Don't cleanup audio here - we want it to persist
    };
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = 0.3;
        if (!isPlaying) {
          audioRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch(e => console.log("Play error:", e));
        }
      } else {
        audioRef.current.volume = 0;
      }
      setIsMuted(!isMuted);
    }
  };

  const startMusic = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(e => console.log("Play error:", e));
    }
  };

  return (
    <AudioContext.Provider value={{ isMuted, isPlaying, toggleMute, startMusic }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
