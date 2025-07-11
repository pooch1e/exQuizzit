"use client";

import { FaEnvelope, FaStar, FaCoins, FaMedal, FaCalendarAlt } from "react-icons/fa";
import CountUp from "react-countup";

export const ProfileBody = ({ user }) => {
  const { userName, email, highScore, quizzBuckTotal, createdAt } = user;

  const getLevel = (score) => {
    if (score >= 1000) return { label: "Legend", color: "bg-red-500", icon: <FaMedal className="text-white" /> };
    if (score >= 500) return { label: "Pro", color: "bg-yellow-500", icon: <FaMedal className="text-white" /> };
    if (score >= 200) return { label: "Rookie", color: "bg-blue-500", icon: <FaMedal className="text-white" /> };
    return { label: "Newbie", color: "bg-gray-400", icon: <FaMedal className="text-white" /> };
  };

  const level = getLevel(highScore);

  // Format join date
  const formattedJoinDate = new Date(createdAt).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="w-full flex flex-col items-center gap-6 text-center">
      {/* Username */}
      <h2 className="text-3xl font-bold text-purple-700">{userName}</h2>

      {/* Email */}
      <p className="flex items-center justify-center gap-2 text-sm text-gray-500">
        <FaEnvelope /> {email}
      </p>

      {/* Member since */}
      <p className="flex items-center justify-center gap-2 text-sm text-gray-500">
        <FaCalendarAlt /> Member since {formattedJoinDate}
      </p>

      {/* Level Badge */}
      <div
        className={`flex items-center gap-2 px-4 py-1 mt-2 rounded-full text-white font-semibold shadow ${level.color}`}
      >
        {level.icon}
        <span>Level: {level.label}</span>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mt-4 w-full max-w-xs">
        {/* High Score Card */}
        <div className="bg-white p-4 rounded-xl shadow-md border hover:shadow-xl transition duration-300">
          <div className="flex flex-col items-center text-purple-700">
            <FaStar size={24} />
            <p className="text-sm mt-2">High Score</p>
            <p className="text-xl font-bold">
              <CountUp end={highScore} duration={1.2} />
            </p>
          </div>
        </div>

        {/* Quiz Bucks Card */}
        <div className="bg-white p-4 rounded-xl shadow-md border hover:shadow-xl transition duration-300">
          <div className="flex flex-col items-center text-yellow-600">
            <FaCoins size={24} />
            <p className="text-sm mt-2">Quiz Bucks</p>
            <p className="text-xl font-bold">
              <CountUp end={quizzBuckTotal} duration={1.2} prefix="$" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
