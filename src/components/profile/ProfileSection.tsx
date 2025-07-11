"use client";

import { ProfileHeader } from "./ProfileHeader";
import { ProfileBody } from "./ProfileBody";

interface User {
  userId: string;
  email: string;
  userName: string | null;
  avatar: string | null;
  highScore: number;
  quizzBuckTotal: number;
  questionsCorrect: number;
  createdAt: Date;
}

interface ProfileSectionProps {
  user: User;
}

export const ProfileSection = ({ user }: ProfileSectionProps) => {
  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <ProfileHeader user={user} />

      <ProfileBody user={user} />
    </div>
  );
};

