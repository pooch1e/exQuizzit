import QuizClient from '@/components/quiz/QuizClient';

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

async function fetchQuizQuestions(): Promise<Question[] | null> {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';

    const result = await fetch(`${baseUrl}/api/quiz/questions`);
    if (!result.ok) {
      console.log('error fetching quiz questions');
    }
    const data = await result.json();
    return data.questions;
  } catch (err) {
    console.log(err);
  }
}

//loading component
function LoadingQuestions() {
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
      <div className="text-xl text-blue-200 relative z-10">
        Loading quiz questions...
      </div>
    </div>
  );
}

//main component
export default async function QuizPage() {
  let questions: Question[];

  try {
    questions = await fetchQuizQuestions();
  } catch (err) {
    console.log(err, 'err in fetching quiz questions');
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
        {/* Space background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-blue-200 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-32 left-1/3 w-1 h-1 bg-purple-200 rounded-full animate-pulse delay-2000"></div>
        </div>
        <div className="text-center relative z-10">
          <p className="text-xl text-red-400">{err}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
            Try Again
          </button>
        </div>
      </div>
    );
  }
  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
        {/* Space background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-blue-200 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-32 left-1/3 w-1 h-1 bg-purple-200 rounded-full animate-pulse delay-2000"></div>
        </div>
        <div className="text-xl text-blue-200 relative z-10">
          No questions available.
        </div>
      </div>
    );
  }

  return <QuizClient initialQuestions={questions} />;
}
