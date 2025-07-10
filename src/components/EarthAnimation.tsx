'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

// Flag emojis and their country names
const flags = [
  { emoji: '🇺🇸', name: 'USA' },
  { emoji: '🇬🇧', name: 'UK' },
  { emoji: '🇫🇷', name: 'France' },
  { emoji: '🇩🇪', name: 'Germany' },
  { emoji: '🇯🇵', name: 'Japan' },
  { emoji: '🇨🇦', name: 'Canada' },
  { emoji: '🇦🇺', name: 'Australia' },
  { emoji: '🇧🇷', name: 'Brazil' },
  { emoji: '🇮🇳', name: 'India' },
  { emoji: '🇨🇳', name: 'China' },
  { emoji: '🇪🇸', name: 'Spain' },
  { emoji: '🇮🇹', name: 'Italy' }
];

const EarthAnimation = () => {
  const [rotationAngle, setRotationAngle] = useState(0);

  // Animate all flags together in a synchronized circle
  useEffect(() => {
    const interval = setInterval(() => {
      setRotationAngle(prev => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center my-8">
      <div className="relative w-64 h-64">
        {/* Cartoon Earth Image */}
        <div className="absolute inset-0 w-full h-full z-10 flex items-center justify-center">
          <div className="w-48 h-48 relative">
            <Image
              src="/earth-cartoon.svg"
              alt="Cartoon Earth"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Rotating Flags in Synchronized Circle */}
        {flags.map((flag, index) => {
          // Calculate angle for each flag based on index and rotation
          const angleOffset = (360 / flags.length) * index; // Evenly space flags
          const currentAngle = rotationAngle + angleOffset;
          const radian = (currentAngle * Math.PI) / 180;
          const radius = 120; // Distance from center
          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius;
          
          return (
            <div
              key={index}
              className="absolute text-2xl transition-all duration-75 ease-linear z-20 hover:scale-125 hover:z-30"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
              }}
              title={flag.name}
            >
              {/* Clean flag without bubble background */}
              <span className="drop-shadow-lg filter">
                {flag.emoji}
              </span>
            </div>
          );
        })}

        {/* Orbital rings for visual effect */}
        <div className="absolute inset-0 border border-blue-200/30 rounded-full animate-pulse" 
             style={{ margin: '24px' }} />
        <div className="absolute inset-0 border border-green-200/20 rounded-full animate-pulse" 
             style={{ margin: '8px', animationDelay: '1s' }} />
      </div>
    </div>
  );
};

export default EarthAnimation;