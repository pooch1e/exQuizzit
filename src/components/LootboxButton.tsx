'use client';

import { useState, useEffect } from 'react';

interface User {
  userName: string;
  quizzBuckTotal: number;
  userId: string;
}

interface LootboxButtonProps {
  currentUser: User | null;
  showLootbox: boolean;
  setShowLootbox: (show: boolean) => void;
  updateUserQuizzBucks: (newAmount: number) => void;
}

export default function LootboxButton({
  currentUser,
  showLootbox,
  setShowLootbox,
  updateUserQuizzBucks,
}: LootboxButtonProps) {
  const [userQuizzBucks, setUserQuizzBucks] = useState(
    currentUser?.quizzBuckTotal || 0
  );
  console.log(showLootbox, updateUserQuizzBucks);

  // Update QuizzBucks when currentUser changes
  useEffect(() => {
    if (currentUser?.quizzBuckTotal !== undefined) {
      setUserQuizzBucks(currentUser.quizzBuckTotal);
    }
  }, [currentUser]);

  const openLootbox = () => {
    setShowLootbox(true);
  };

  return (
    <button
      onClick={openLootbox}
      className={`block w-full py-3 px-6 rounded-lg hover:scale-110 transition-all duration-200 font-semibold ${
        userQuizzBucks >= 100
          ? 'bg-amber-600 text-white hover:bg-amber-700'
          : 'bg-gray-400 text-gray-200 cursor-not-allowed'
      }`}
      disabled={userQuizzBucks < 100}>
      Open Loot Box - 100 QB 💰
    </button>
  );
}
