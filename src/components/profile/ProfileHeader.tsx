"use client";
import Image from "next/image";

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

interface ProfileHeaderProps {
  user: User;
}

export const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  // save profile image in useState

  return (
    <div className="flex justify-center mb-4">
      {user.avatar ? (
        <Image
          src={user.avatar.replace("/svg?", "/png?")}
          alt="Avatar image"
          width={100}
          height={100}
          className={"rounded-full border-4 border-purple-600 shadow-lg"}
        />
      ) : (
        <div className="w-[100px] h-[100px] bg-gray-300 rounded-full border-4 border-purple-600 shadow-lg flex items-center justify-center">
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            className="text-gray-600"
          >
            <path
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              fill="currentColor"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
