"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "./lib/supabaseClient";

export default function SeedUserPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  async function handleSeedSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!username || !email) {
      setErrorMessage("Please fill in both username and email.");
      return;
    }

    const { error } = await supabase.from("users").insert([
      {
        id: uuidv4(),
        email,
        userName: username,
        createdAt: new Date().toISOString(),
        highScore: 0,
        quizzBuckTotal: 0,
        questionsCorrect: 0,
        avatar: null,
      },
    ]);

    if (error) {
      console.error("Insert failed:", error.message);
      setErrorMessage("❌ Failed to add user to database.");
    } else {
      setSuccessMessage("✅ User added successfully!");
      setUsername("");
      setEmail("");
      setTimeout(() => {
        router.push("/home");
      }, 1000);
    }
  }

  function handleGuestClick() {
    router.push("/home");
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      <form
        onSubmit={handleSeedSubmit}
        className="bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl w-full max-w-md border-4 border-yellow-400"
      >
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6 drop-shadow-md">
          🎮 exQuizzit
        </h1>

        {/* Email */}
        <label className="block mb-2 font-semibold text-gray-700">Email</label>
        <div className="flex items-center border-2 border-blue-400 rounded mb-4 px-3 py-2">
          <span className="text-xl text-gray-600 mr-2">📧</span>
          <input
            type="email"
            className="w-full focus:outline-none bg-transparent"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Username */}
        <label className="block mb-2 font-semibold text-gray-700">
          Username
        </label>
        <div className="flex items-center border-2 border-blue-400 rounded mb-4 px-3 py-2">
          <span className="text-xl text-gray-600 mr-2">🎮</span>
          <input
            type="text"
            className="w-full focus:outline-none bg-transparent"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Error Message */}
        {errorMessage && (
          <p className="text-red-600 text-sm font-semibold mb-4">
            {errorMessage}
          </p>
        )}

        {/* Success Message */}
        {successMessage && (
          <p className="text-green-600 text-sm font-semibold mb-4">
            {successMessage}
          </p>
        )}

        <div className="mt-6 space-y-4">
          <button
            type="submit"
            className="w-full bg-yellow-400 text-blue-900 font-bold py-2 rounded hover:bg-yellow-300 transition duration-200 shadow-md"
          >
            🚀 Seed User
          </button>

          <button
            onClick={handleGuestClick}
            className="w-full bg-yellow-400 text-blue-900 font-bold py-2 rounded hover:bg-yellow-300 transition duration-200 shadow-md"
          >
            🎮 Continue as Guest
          </button>
        </div>
      </form>
    </main>
  );
}
