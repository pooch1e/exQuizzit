'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SpaceBackground from '@/components/SpaceBackground';
import EarthAnimation from '@/components/EarthAnimation';
import BackgroundMusic from '@/components/BackgroundMusic';
import LootboxSpinner from '@/components/LootboxSpinner';

interface Theme {
  color: string;
  name: string;
  bgColor: string;
  textColor: string;
}

interface User {
  userName: string;
  userId: number;
  quizzBuckTotal: number;
}

export default function HomeClient() {
  const [currentUser, setCurrentUser] = useState<string>('Guest');
  const [userId, setUserId] = useState<number | null>(null);
  const [quizzBucks, setQuizzBucks] = useState<number>(0);
  const [showLootbox, setShowLootbox] = useState(false);
  console.log(userId);

  // Get current user from cookies
  useEffect(() => {
    const getCookie = (name: string): string | undefined => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
    };

    const username = getCookie('username');
    if (username) {
      setCurrentUser(username);
      // Fetch user's QuizzBucks from your API
      fetchUserData(username);
    }
  }, []);

  const fetchUserData = async (username: string): Promise<void> => {
    try {
      // Use the getUsers utility to get user data
      const response = await fetch(`/api/users`);
      if (response.ok) {
        const users: User[] = await response.json();
        const user = users.find((u: User) => u.userName === username);
        if (user) {
          setQuizzBucks(user.quizzBuckTotal || 0);
          // Store userId for updates
          setUserId(user.userId);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // const updateUserQuizzBucks = async (newAmount: number): Promise<void> => {
  //   if (!userId) return;

  //   try {
  //     const response = await fetch('/api/users', {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         id: userId,
  //         data: newAmount,
  //       }),
  //     });

  //     if (response.ok) {
  //       setQuizzBucks(newAmount);
  //     }
  //   } catch (error) {
  //     console.error('Error updating QuizzBucks:', error);
  //   }
  // };

  const handleLootboxSpin = (): boolean => {
    // Make it free for now - always return true
    return true;
  };

  const handleThemeWin = (theme: Theme): void => {
    console.log(`Player won ${theme.name} theme!`);
    // Here you could save the won theme to the user's profile
    // For now, it's just logged

    // You could potentially award QuizzBucks for winning themes
    // updateUserQuizzBucks(quizzBucks + 50); // Example: award 50 QB for winning
  };

  const openLootbox = (): void => {
    setShowLootbox(true);
  };

  const closeLootbox = (): void => {
    setShowLootbox(false);
  };

  return (
    <SpaceBackground className="flex items-center justify-center p-4">
      <BackgroundMusic />
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl thick-yellow-border p-8 max-w-md w-full text-center mt-16 relative">
        {/* Profile Section in Top Right Corner of Card */}
        <div className="absolute top-4 right-4 flex items-center gap-3 z-40">
          <div className="text-right">
            <div className="text-gray-700 font-semibold text-sm">
              {currentUser}
            </div>
            <div className="text-yellow-600 font-bold text-xs">
              {quizzBucks} QB
            </div>
          </div>
          <Link href="/home/profile">
            <div className="w-12 h-12 bg-gray-300 rounded-full border-2 border-purple-600 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-gray-600">
                <path
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </Link>
        </div>

        <h1
          className="text-6xl font-black text-yellow-400 mb-2 tracking-wide font-mono drop-shadow-lg mt-8"
          style={{
            textShadow:
              '1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black',
          }}>
          exQuizzit
        </h1>

        {/* Earth Animation */}
        <EarthAnimation />

        <p className="text-gray-600 mb-8">
          Test your knowledge of countries around the world!
        </p>

        <div className="space-y-4">
          <Link
            href="/quiz"
            className="block w-full bg-purple-600 text-white py-4 px-6 rounded-lg hover:bg-purple-700 hover:scale-110 transition-all duration-200 font-semibold text-lg">
            Start Quiz 🚀
          </Link>

          <Link
            href="/leaderboard"
            className="block w-full bg-slate-600 text-white py-3 px-6 rounded-lg hover:bg-slate-700 hover:scale-110 transition-all duration-200 font-semibold">
            View Leaderboard 🏆
          </Link>

          <button
            onClick={openLootbox}
            className="block w-full bg-amber-600 text-white py-3 px-6 rounded-lg hover:bg-amber-700 hover:scale-110 transition-all duration-200 font-semibold">
            Open Loot Box - FREE! 🎁
          </button>
        </div>
      </div>

      {/* Lootbox Modal */}
      {showLootbox && (
        <div className="fixed inset-0 z-50">
          <SpaceBackground className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl thick-yellow-border p-8 max-w-lg w-full mx-4 relative">
              <button
                onClick={closeLootbox}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold">
                ×
              </button>
              <h2 className="text-2xl font-bold text-center mb-6 text-yellow-400">
                Spin to win
              </h2>
              <LootboxSpinner
                onSpin={handleLootboxSpin}
                onWin={handleThemeWin}
              />
            </div>
          </SpaceBackground>
        </div>
      )}
    </SpaceBackground>
  );
}
