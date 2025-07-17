import QuizContent from '@/components/quiz/QuizContent';

import { Suspense } from 'react';
import Loading from './loading';

//main component
export default async function QuizPage() {
  return (
    <Suspense fallback={<Loading />}>
      <QuizContent />
    </Suspense>
  );
}
