'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from './lib/supabaseClient';

export default function SeedUserPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [suppressErrors, setSuppressErrors] = useState(false);

  const router = useRouter();

  async function handleSeedSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!username || !password) {
      setErrorMessage('Please fill in both username and password.');
      return;
    }

    const { error } = await supabase.from('users').insert([
      {
        id: uuidv4(),
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
      setPassword('');
      setTimeout(() => {
        router.push('/home');
      }, 1000);
    }
  }

  //save Username to local storage

  const handleLogInButton = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username) {
      setErrorMessage('Please enter a username');
      return;
    }

    try {
      const response = await fetch(
        `/api/users/${encodeURIComponent(username)}`
      );

      if (!response.ok) {
        setErrorMessage('User not found');
        return;
      }

      const userData = await response.json();

      const formData = new FormData();
      formData.append('username', userData.userName);
      formData.append('userId', userData.userId.toString());

      const loginResponse = await fetch('/api/login', {
        method: 'POST',
        body: formData,
      });

      const loginData = await loginResponse.json();

      if (loginData.success) {
        router.push('/home');
      } else {
        setErrorMessage(loginData.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Network error occurred');
    }
  };

  async function handleGuestClick() {
    setErrorMessage('');
    setSuccessMessage('');
    setSuppressErrors(true);

    try {
      const formData = new FormData();
      formData.append('username', 'guest');
      formData.append('userId', '0');

      const response = await fetch('/api/login', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        router.push('/home');
      } else {
        console.warn('Guest login error:', data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Guest login error:', error);
    }
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

        {/* Password */}
        <label className="block mb-2 font-semibold text-gray-700">
          Password
        </label>
        <div className="flex items-center border-2 border-blue-400 rounded mb-4 px-3 py-2">
          <input
            type="password"
            className="w-full focus:outline-none bg-transparent"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Error Message */}
        {errorMessage && !suppressErrors && (
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
