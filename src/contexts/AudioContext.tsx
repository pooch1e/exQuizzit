"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import {
  generateCorrectSound,
  generateIncorrectSound,
} from "@/utils/soundEffects";

interface AudioContextType {
  isMuted: boolean;
  isPlaying: boolean;
  toggleMute: () => void;
  startMusic: () => void;
  playCorrectSound: () => void;
  playIncorrectSound: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioReady, setAudioReady] = useState(false);

  const startMusic = useCallback(() => {
    if (audioRef.current && audioReady) {
      audioRef.current.volume = isMuted ? 0 : 0.3;

      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          console.log("Music started successfully");
        })
        .catch((e) => {
          console.error("Play error:", e);
        });
    }
  }, [isMuted, audioReady]);

  useEffect(() => {
    // Create audio element only once
    if (!audioRef.current) {
      const audio = new Audio("/background-music.mp3");
      audio.loop = true;
      audio.volume = 0.3;
      audio.preload = "auto";
      audioRef.current = audio;

      // Add event listeners to track audio state
      audio.addEventListener("canplaythrough", () => {
        console.log("Audio can play through");
        setAudioReady(true);
      });

      audio.addEventListener("play", () => {
        setIsPlaying(true);
        console.log("Audio playing");
      });

      audio.addEventListener("pause", () => {
        setIsPlaying(false);
        console.log("Audio paused");
      });

      audio.addEventListener("ended", () => {
        setIsPlaying(false);
        console.log("Audio ended");
      });

      audio.addEventListener("error", (e) => {
        console.error("Audio error:", e);
      });
    }

    // Add user interaction handler
    const handleUserInteraction = () => {
      if (audioRef.current && audioReady && !isPlaying) {
        console.log("User interaction detected, attempting to start music");
        startMusic();
      }
    };

    // Add event listeners for user interaction
    document.addEventListener("click", handleUserInteraction, { once: true });
    document.addEventListener("keydown", handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };
  }, [audioReady, isPlaying, startMusic]);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = 0.3;
        if (!isPlaying) {
          audioRef.current
            .play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch((e) => console.log("Play error:", e));
        }
      } else {
        audioRef.current.volume = 0;
      }
      setIsMuted(!isMuted);
    }
  };

  const playCorrectSound = () => {
    if (!isMuted) {
      try {
        generateCorrectSound();
      } catch (error) {
        console.log("Correct sound error:", error);
      }
    }
  };

  const playIncorrectSound = () => {
    if (!isMuted) {
      try {
        generateIncorrectSound();
      } catch (error) {
        console.log("Incorrect sound error:", error);
      }
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isMuted,
        isPlaying,
        toggleMute,
        startMusic,
        playCorrectSound,
        playIncorrectSound,
      }}
    >
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
