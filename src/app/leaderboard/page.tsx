'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SpaceBackground from '@/components/SpaceBackground';

interface Game {
  id: string;
  score: number;
  createdAt: string;
  user: {
    userName: string;
  };
}

interface User {
  userId: string;
  userName: string;
  highScore: number;
  questionsCorrect: number;
}

export default function LeaderboardPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'recent' | 'highscores'>('highscores');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gamesResponse, usersResponse] = await Promise.all([
          fetch('/api/games'),
          fetch('/api/users')
        ]);
        
        const gamesData = await gamesResponse.json();
        const usersData = await usersResponse.json();
        
        setGames(gamesData);
        setUsers(usersData.sort((a: User, b: User) => b.highScore - a.highScore));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <SpaceBackground className="flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400 mx-auto"></div>
          <p className="mt-4 text-xl text-blue-200">Loading Leaderboard...</p>
        </div>
      </SpaceBackground>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMedal = (position: number) => {
    switch (position) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${position}`;
    }
  };

  return (
    <SpaceBackground className="p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🏆 Leaderboard</h1>
          <p className="text-blue-200">See how you rank against other players!</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 shadow-md border border-white/20">
            <button
              onClick={() => setActiveTab('highscores')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'highscores'
                  ? 'bg-purple-600 text-white'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              High Scores
            </button>
            <button
              onClick={() => setActiveTab('recent')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'recent'
                  ? 'bg-purple-600 text-white'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              Recent Games
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {activeTab === 'highscores' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Top Players</h2>
              {users.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">No players yet. Be the first to play!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {users.slice(0, 10).map((user, index) => (
                    <div
                      key={user.userId}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        index < 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl font-bold w-12 text-center">
                          {getMedal(index + 1)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{user.userName}</p>
                          <p className="text-sm text-gray-600">
                            {user.questionsCorrect} questions correct
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-indigo-600">{user.highScore}</p>
                        <p className="text-sm text-gray-600">points</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'recent' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Recent Games</h2>
              {games.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">No games played yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {games.slice(0, 20).map((game) => (
                    <div
                      key={game.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-200"
                    >
                      <div>
                        <p className="font-semibold text-gray-800">{game.user.userName}</p>
                        <p className="text-sm text-gray-600">{formatDate(game.createdAt)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-indigo-600">{game.score}</p>
                        <p className="text-sm text-gray-600">points</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="text-center mt-8 space-y-4">
          <Link
            href="/quiz"
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold text-lg"
          >
            Play Quiz 🚀
          </Link>
          <div>
            <Link
              href="/home"
              className="inline-block bg-slate-600 text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition-colors font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </SpaceBackground>
  );
}
