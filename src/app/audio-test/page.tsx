"use client";

import { useAudio } from "../../contexts/AudioContext";
import { useState } from "react";

export default function AudioTest() {
  const {
    isMuted,
    isPlaying,
    toggleMute,
    startMusic,
    playCorrectSound,
    playIncorrectSound,
  } = useAudio();
  const [testAudio, setTestAudio] = useState<HTMLAudioElement | null>(null);

  const testDirectAudio = () => {
    if (testAudio) {
      testAudio.pause();
      setTestAudio(null);
    } else {
      const audio = new Audio("/background-music.mp3");
      audio.volume = 0.3;
      audio.loop = true;
      audio
        .play()
        .then(() => {
          setTestAudio(audio);
        })
        .catch((e) => {
          console.error("Direct audio test failed:", e);
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Audio Test Page</h1>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Audio Context Status
          </h2>
          <div className="space-y-2 text-white">
            <p>
              Is Muted:{" "}
              <span className={isMuted ? "text-red-400" : "text-green-400"}>
                {isMuted ? "Yes" : "No"}
              </span>
            </p>
            <p>
              Is Playing:{" "}
              <span className={isPlaying ? "text-green-400" : "text-red-400"}>
                {isPlaying ? "Yes" : "No"}
              </span>
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Audio Controls
          </h2>
          <div className="space-y-4">
            <button
              onClick={startMusic}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Start Background Music
            </button>

            <button
              onClick={toggleMute}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              {isMuted ? "Unmute" : "Mute"} Music
            </button>

            <button
              onClick={playCorrectSound}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Play Correct Sound
            </button>

            <button
              onClick={playIncorrectSound}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Play Incorrect Sound
            </button>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Direct Audio Test
          </h2>
          <button
            onClick={testDirectAudio}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            {testAudio ? "Stop" : "Play"} Direct Audio Test
          </button>
          <p className="text-white/70 mt-2 text-sm">
            This bypasses the AudioContext and plays the music file directly
          </p>
        </div>
      </div>
    </div>
  );
}
