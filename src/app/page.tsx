'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from './lib/supabaseClient';
import { users } from '../data/test-data/index.js';

export default function SeedUserPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const router = useRouter();

  async function handleSeedSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!username || !email) {
      setErrorMessage('Please fill in both username and email.');
      return;
    }

    const { error } = await supabase.from('users').insert([
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
      console.error('Insert failed:', error.message);
      setErrorMessage('❌ Failed to add user to database.');
    } else {
      setSuccessMessage('✅ User added successfully!');
      setUsername('');
      setEmail('');
      setTimeout(() => {
        router.push('/home');
      }, 1000);
    }
  }

  console.log(username, 'setting username');
  //handle username click
  // save username in global state/context
  //for example Alice

  //save Username to local storage

  const handleLogInButton = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const foundUser = users.find((user) => user.userName === username);
    console.log(foundUser, 'found user from find users');

    if (foundUser) {
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
    }
    router.push('/home');
  };

  function handleGuestClick() {
    router.push('/home');
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      <form
        onSubmit={handleSeedSubmit}
        className="bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl w-full max-w-md border-4 border-yellow-400">
        <h1
          className="text-6xl font-black text-yellow-400 mb-6 tracking-wide font-mono drop-shadow-lg text-center"
          style={{
            textShadow:
              '1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black',
          }}>
          exQuizzit
        </h1>

        {/* Email */}
        <label className="block mb-2 font-semibold text-gray-700">Email</label>
        <div className="flex items-center border-2 border-blue-400 rounded mb-4 px-3 py-2">
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
            onClick={handleLogInButton}
            className="w-full bg-yellow-400 text-blue-900 font-bold py-2 rounded hover:bg-yellow-300 transition duration-200 shadow-md">
            Log In
          </button>

          <button
            onClick={handleGuestClick}
            className="w-full bg-yellow-400 text-blue-900 font-bold py-2 rounded hover:bg-yellow-300 transition duration-200 shadow-md">
            Continue as Guest
          </button>
        </div>
      </form>
    </main>
  );
}
