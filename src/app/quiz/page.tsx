'use client';

import { useEffect, useState } from 'react';
import QuizClient from '../../components/QuizClient';

interface Country {
  userId: number;
  name: string;
  flagUrl: string;
  capital: string;
  currency: string;
  population: number;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  country?: Country;
  flagOptions?: Country[];
  type: 'flag' | 'trivia';
}

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        // Client-side fetch - will automatically use the current origin
        const response = await fetch('/api/quiz/questions');
        
        if (!response.ok) {
          throw new Error('Failed to fetch quiz questions');
        }
        
        const data = await response.json();
        
        if (data.success) {
          setQuestions(data.questions);
        } else {
          throw new Error('API returned unsuccessful response');
        }
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
        setError('Failed to load quiz questions. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
        {/* Space background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-blue-200 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-32 left-1/3 w-1 h-1 bg-purple-200 rounded-full animate-pulse delay-2000"></div>
          <div className="absolute top-40 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-3000"></div>
          <div className="absolute bottom-20 right-10 w-1 h-1 bg-purple-200 rounded-full animate-pulse delay-1500"></div>
          <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-2500"></div>
        </div>
        <div className="text-xl text-blue-200 relative z-10">Loading quiz questions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
        {/* Space background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-blue-200 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-32 left-1/3 w-1 h-1 bg-purple-200 rounded-full animate-pulse delay-2000"></div>
        </div>
        <div className="text-center relative z-10">
          <p className="text-xl text-red-400">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
        {/* Space background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-blue-200 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-32 left-1/3 w-1 h-1 bg-purple-200 rounded-full animate-pulse delay-2000"></div>
        </div>
        <div className="text-xl text-blue-200 relative z-10">No questions available.</div>
      </div>
    );
  }

  return <QuizClient initialQuestions={questions} />;
}
