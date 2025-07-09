'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SpaceBackground from './SpaceBackground';

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

interface QuizClientProps {
  initialQuestions: Question[];
}

export default function QuizClient({ initialQuestions }: QuizClientProps) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [showCorrectModal, setShowCorrectModal] = useState(false);
  const [isLoadingNewQuiz, setIsLoadingNewQuiz] = useState(false);

  const loadNewQuestions = async () => {
    setIsLoadingNewQuiz(true);
    try {
      const response = await fetch('/api/quiz/questions');
      const data = await response.json();
      
      if (data.success) {
        setQuestions(data.questions);
      }
    } catch (error) {
      console.error('Error loading new questions:', error);
    } finally {
      setIsLoadingNewQuiz(false);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    
    const isCorrect = answer === questions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      handleCorrectAnswer();
    } else {
      handleWrongAnswer();
    }
  };

  const handleWrongAnswer = () => {
    setShowGameOverModal(true);
  };

  const handleTryAgain = async () => {
    setShowGameOverModal(false);
    setSelectedAnswer('');
    setCurrentQuestion(0);
    setScore(0);
    
    await loadNewQuestions();
  };

  const handleGoHome = () => {
    router.push('/');
  };

  const getDidYouKnowFact = (country: Country) => {
    const facts = [
      {
        type: 'capital',
        text: `The capital of ${country.name} is ${country.capital}.`
      },
      {
        type: 'currency',
        text: `The currency used in ${country.name} is the ${country.currency}.`
      },
      {
        type: 'population',
        text: `${country.name} has a population of approximately ${country.population.toLocaleString()} people.`
      }
    ];
    
    return facts[Math.floor(Math.random() * facts.length)];
  };

  const handleCorrectAnswer = () => {
    setScore(score + 1);
    setShowCorrectModal(true);
  };

  const handleNextFromCorrect = () => {
    setShowCorrectModal(false);
    setSelectedAnswer('');
    
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const restartQuiz = async () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer('');
    setShowResult(false);
    setQuizComplete(false);
    
    await loadNewQuestions();
  };

  if (isLoadingNewQuiz) {
    return (
      <SpaceBackground className="flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400 mx-auto"></div>
          <p className="mt-4 text-xl text-blue-200">Loading New Quiz...</p>
        </div>
      </SpaceBackground>
    );
  }

  if (quizComplete) {
    return (
      <SpaceBackground className="flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8 max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete! 🎉</h1>
          <div className="text-6xl font-bold text-green-600 mb-4">
            {score}/{questions.length}
          </div>
          <p className="text-lg text-gray-600 mb-6">
            You scored {Math.round((score / questions.length) * 100)}%!
          </p>
          <div className="space-y-3">
            <button
              onClick={restartQuiz}
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              Play Again
            </button>
            <button
              onClick={() => router.push('/')}
              className="w-full bg-slate-600 text-white py-3 px-6 rounded-lg hover:bg-slate-700 transition-colors font-semibold"
            >
              Back to Home
            </button>
          </div>
        </div>
      </SpaceBackground>
    );
  }

  if (questions.length === 0) {
    return (
      <SpaceBackground className="flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-400">Error loading quiz questions</p>
        </div>
      </SpaceBackground>
    );
  }

  const question = questions[currentQuestion];

  return (
    <SpaceBackground className="p-2 sm:p-4">
      <div className="max-w-lg mx-auto pt-2 sm:pt-4">
        {/* Score Display */}
        <div className="mb-4 flex justify-center items-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-white/20">
            <span className="text-base sm:text-lg font-medium text-white">
              Score: <span className="text-blue-300 font-bold">{score}</span>
            </span>
          </div>
        </div>

        {/* Question Card - Square Shape */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-4 sm:p-6 mb-4 sm:mb-6 aspect-square flex flex-col justify-center mx-auto max-w-sm">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 text-center leading-tight mb-2 sm:mb-4">
            {question.question}
          </h2>
          
          {/* Flag Display for Flag Questions */}
          {question.type === 'flag' && question.country && (
            <div className="flex items-center justify-center">
              <div className="w-32 h-20 sm:w-40 sm:h-24 md:w-48 md:h-28 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-gray-200 shadow-md">
                <img 
                  src={question.country.flagUrl} 
                  alt={`Flag of ${question.country.name}`}
                  className="max-w-full max-h-full object-contain rounded"
                />
              </div>
            </div>
          )}
        </div>

        {/* Answer Buttons - 2x2 Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6 max-w-sm mx-auto">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              disabled={showResult}
              className={`p-2 sm:p-3 md:p-4 rounded-xl border-2 text-center font-medium transition-all duration-200 hover:shadow-lg min-h-[60px] sm:min-h-[70px] md:min-h-[80px] flex items-center justify-center ${
                showResult
                  ? option === question.correctAnswer
                    ? 'bg-green-100 border-green-500 shadow-green-200'
                    : option === selectedAnswer
                    ? 'bg-red-100 border-red-500 shadow-red-200'
                    : 'bg-gray-100 border-gray-300'
                  : selectedAnswer === option
                  ? 'bg-purple-100 border-purple-500 shadow-purple-200'
                  : 'bg-gray-50 border-gray-300 hover:bg-purple-50 hover:border-purple-300 active:bg-purple-100'
              }`}
            >
              <div className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 leading-tight text-center break-words">
                {option}
              </div>
            </button>
          ))}
        </div>

        {showResult && (
          <div className="mt-6 text-center">
            <p className={`text-lg font-semibold ${
              selectedAnswer === question.correctAnswer ? 'text-green-600' : 'text-red-600'
            }`}>
              {selectedAnswer === question.correctAnswer ? '✅ Correct!' : '❌ Incorrect'}
            </p>
            {selectedAnswer !== question.correctAnswer && (
              <p className="text-gray-600 mt-2">
                The correct answer was: <strong>{question.correctAnswer}</strong>
              </p>
            )}
          </div>
        )}
      </div>

      {/* Game Over Modal */}
      {showGameOverModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8 max-w-sm w-full text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-red-600 mb-4">
              ❌ Wrong Answer!
            </h2>
            
            {/* Show correct flag for flag questions */}
            {questions[currentQuestion]?.type === 'flag' && questions[currentQuestion]?.country && (
              <div className="mb-6">
                <p className="text-base sm:text-lg text-gray-600 mb-4">
                  The correct answer was:
                </p>
                <div className="flex items-center justify-center h-16 sm:h-20 mb-4">
                  <img 
                    src={questions[currentQuestion].country!.flagUrl} 
                    alt={`Flag of ${questions[currentQuestion].country!.name}`}
                    className="max-w-full max-h-full object-contain rounded-md shadow-md"
                  />
                </div>
                <p className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
                  {questions[currentQuestion].correctAnswer}
                </p>
              </div>
            )}

            {/* Show text answer for trivia questions */}
            {questions[currentQuestion]?.type === 'trivia' && (
              <div className="mb-6">
                <p className="text-base sm:text-lg text-gray-600 mb-2">
                  The correct answer was:
                </p>
                <p className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
                  {questions[currentQuestion]?.correctAnswer}
                </p>
              </div>
            )}

            <p className="text-gray-600 mb-6 sm:mb-8">
              Final Score: <span className="font-semibold">{score}</span>
            </p>
            
            <div className="space-y-3">
              <button
                onClick={handleTryAgain}
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
              >
                Try Again 🔄
              </button>
              <button
                onClick={handleGoHome}
                className="w-full bg-slate-600 text-white py-3 px-6 rounded-lg hover:bg-slate-700 transition-colors font-semibold"
              >
                Back to Home 🏠
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Correct Answer Modal */}
      {showCorrectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8 max-w-sm w-full text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-green-600 mb-6">
              ✅ Correct!
            </h2>
            
            {questions[currentQuestion]?.type === 'flag' && questions[currentQuestion]?.country && (
              <div className="mb-6">
                <img 
                  src={questions[currentQuestion].country!.flagUrl} 
                  alt={`Flag of ${questions[currentQuestion].country!.name}`}
                  className="w-20 h-12 sm:w-24 sm:h-16 mx-auto rounded-md shadow-md object-cover mb-4"
                />
                <p className="text-lg sm:text-xl font-bold text-gray-800">
                  {questions[currentQuestion].country!.name}
                </p>
              </div>
            )}

            {questions[currentQuestion]?.type === 'trivia' && (
              <div className="mb-6">
                <p className="text-lg sm:text-xl font-bold text-gray-800">
                  {questions[currentQuestion].correctAnswer}
                </p>
              </div>
            )}

            {questions[currentQuestion]?.type === 'flag' && questions[currentQuestion]?.country && (
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-blue-800 mb-2">
                  💡 Did You Know?
                </h3>
                <p className="text-sm sm:text-base text-blue-700">
                  {getDidYouKnowFact(questions[currentQuestion].country!).text}
                </p>
              </div>
            )}

            <p className="text-gray-600 mb-6">
              Score: <span className="font-semibold text-green-600">{score}</span>
            </p>
            
            <button
              onClick={handleNextFromCorrect}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              {currentQuestion + 1 >= questions.length ? 'Finish Quiz 🎉' : 'Next Question ➡️'}
            </button>
          </div>
        </div>
      )}
    </SpaceBackground>
  );
}
