import QuizContent from '@/components/quiz/QuizContent';

import { Suspense } from 'react';
import Loading from './loading';

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

//main component
export default async function QuizPage() {
  return (
    <Suspense fallback={<Loading />}>
      <QuizContent />
    </Suspense>
  );
}
