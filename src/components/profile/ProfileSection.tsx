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
  console.log("inside profile section");

  return (
    <div className="text-center">
      <ProfileHeader user={user} />

      <ProfileBody user={user} />
    </div>
  );
};
