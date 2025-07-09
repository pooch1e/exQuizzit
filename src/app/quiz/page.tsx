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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading quiz questions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">No questions available.</div>
      </div>
    );
  }

  return <QuizClient initialQuestions={questions} />;
}
