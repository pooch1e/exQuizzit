"use client";

import { useState, useRef } from "react";

interface Theme {
  color: string;
  name: string;
  bgColor: string;
  textColor: string;
}

const themes: Theme[] = [
  { color: "red", name: "Crimson", bgColor: "bg-red-500", textColor: "text-red-500" },
  { color: "orange", name: "Fire", bgColor: "bg-orange-500", textColor: "text-orange-500" },
  { color: "yellow", name: "Leopard", bgColor: "bg-yellow-500", textColor: "text-yellow-500" },
  { color: "green", name: "Jungle", bgColor: "bg-green-500", textColor: "text-green-500" },
  { color: "blue", name: "Ocean", bgColor: "bg-blue-500", textColor: "text-blue-500" },
  { color: "purple", name: "Luxury", bgColor: "bg-purple-500", textColor: "text-purple-500" },
  { color: "white", name: "Checkered", bgColor: "bg-white", textColor: "text-gray-800" },
  { color: "black", name: "Deep Space", bgColor: "bg-black", textColor: "text-black" },
];

interface LootboxSpinnerProps {
  onSpin: () => Promise<boolean> | boolean; // Returns true if spin is allowed (enough coins)
  onWin: (theme: Theme) => void;
}

export default function LootboxSpinner({ onSpin, onWin }: LootboxSpinnerProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [wonTheme, setWonTheme] = useState<Theme | null>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);

  const handleSpin = async () => {
    if (isSpinning) return;

    // Check if player can spin (handle both sync and async)
    const canSpin = await onSpin();
    if (!canSpin) {
      return;
    }

    setIsSpinning(true);
    setShowResult(false);

    // Random theme selection
    const randomIndex = Math.floor(Math.random() * themes.length);
    const selectedTheme = themes[randomIndex];

    // Calculate rotation for the spinner
    const segmentAngle = 360 / themes.length; // 45 degrees per segment
    const baseRotation = 1440; // 4 full rotations
    const targetRotation = baseRotation + (randomIndex * segmentAngle);

    // Apply rotation to spinner
    if (spinnerRef.current) {
      spinnerRef.current.style.transform = `rotate(${targetRotation}deg)`;
    }

    // Wait for animation to complete
    setTimeout(() => {
      setIsSpinning(false);
      setWonTheme(selectedTheme);
      setShowResult(true);
      onWin(selectedTheme);
    }, 3000);
  };

  const closeResult = () => {
    setShowResult(false);
    setWonTheme(null);
    // Reset spinner rotation
    if (spinnerRef.current) {
      spinnerRef.current.style.transform = 'rotate(0deg)';
    }
  };

  return (
    <div className="relative">
      {/* Spinner Wheel */}
      <div className="relative w-64 h-64 mx-auto mb-4">
        <div
          ref={spinnerRef}
          className="w-full h-full rounded-full border-4 border-gray-800 relative overflow-hidden transition-transform duration-3000 ease-out"
          style={{
            background: `conic-gradient(
              #ef4444 0deg 45deg,
              #f97316 45deg 90deg,
              #eab308 90deg 135deg,
              #22c55e 135deg 180deg,
              #3b82f6 180deg 225deg,
              #a855f7 225deg 270deg,
              #ffffff 270deg 315deg,
              #000000 315deg 360deg
            )`,
          }}
        >
        </div>

        {/* Spinner pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-yellow-400 drop-shadow-lg"></div>
        </div>
      </div>

      {/* Spin Button */}
      <button
        onClick={handleSpin}
        disabled={isSpinning}
        className={`block w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
          isSpinning
            ? 'bg-gray-500 cursor-not-allowed'
            : 'bg-amber-600 hover:bg-amber-700 hover:scale-105'
        }`}
      >
        {isSpinning ? 'Spinning...' : 'Open Loot Box - 100 QB 💰'}
      </button>

      {/* Result Modal */}
      {showResult && wonTheme && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">🎉 Congratulations! 🎉</h2>
            <div className={`w-16 h-16 ${wonTheme.bgColor} rounded-full mx-auto mb-4 border-4 border-gray-800`}></div>
            <h3 className={`text-xl font-bold ${wonTheme.textColor} mb-2`}>
              You won the {wonTheme.name} Theme!
            </h3>
            <p className="text-gray-600 mb-6">
              This theme has been added to your collection.
            </p>
            <button
              onClick={closeResult}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Awesome!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
