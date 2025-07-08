'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { countries } from '../../data/development-data/countries-data.js';

interface Country {
  userId: number;
  name: string;
  flagUrl: string;
  capital: string;
  currency: string;
  population: number;
}

interface TriviaQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  country?: Country;
  flagOptions?: Country[]; // For flag questions, store Country objects separately
  type: 'flag' | 'trivia';
}

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(10);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [showCorrectModal, setShowCorrectModal] = useState(false);
  const [triviaQuestions, setTriviaQuestions] = useState<TriviaQuestion[]>([]);

  // Initialize quiz with local countries data and trivia
  useEffect(() => {
    const initializeQuiz = async () => {
      try {
        // Fetch trivia questions
        const response = await fetch('https://opentdb.com/api.php?amount=25&category=22&type=multiple');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.response_code !== 0 || !data.results || data.results.length === 0) {
          throw new Error(`API returned error code: ${data.response_code}`);
        }
        
        setTriviaQuestions(data.results);
        generateMixedQuestions(countries, data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trivia questions:', error);
        // Fallback to just flag questions
        generateQuestions(countries);
        setLoading(false);
      }
    };

    initializeQuiz();
  }, []);

  // Timer countdown effect
  useEffect(() => {
    if (timeLeft > 0 && !showResult && !showGameOverModal && !showCorrectModal && !quizComplete && !loading) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult && !showGameOverModal && !showCorrectModal) {
      // Time's up!
      handleTimeUp();
    }
  }, [timeLeft, showResult, showGameOverModal, showCorrectModal, quizComplete, loading]);

  // Generate quiz questions - only flag questions, no limit
  const generateQuestions = (countriesData: Country[]) => {
    const shuffledCountries = [...countriesData].sort(() => Math.random() - 0.5);
    
    const generatedQuestions: Question[] = shuffledCountries.map((country, index) => {
      const question = `What is the national flag of ${country.name}?`;
      const correctAnswer = country.name;
      const flagOptions = generateFlagOptions(country, countriesData);
      
      return {
        id: index + 1,
        question,
        options: flagOptions.map(c => c.name), // Store country names as strings
        correctAnswer,
        country,
        flagOptions, // Store full Country objects for rendering flags
        type: 'flag'
      };
    });
    
    setQuestions(generatedQuestions);
  };

  // Generate mixed questions from both countries and trivia
  const generateMixedQuestions = (countriesData: Country[], triviaData: TriviaQuestion[]) => {
    if (!triviaData || triviaData.length === 0) {
      generateQuestions(countriesData);
      return;
    }
    
    // Use all available countries for flag questions
    const flagQuestions: Question[] = countriesData.map((country, index) => {
      const flagOptions = generateFlagOptions(country, countriesData);
      return {
        id: index + 1,
        question: `What is the national flag of ${country.name}?`,
        options: flagOptions.map(c => c.name),
        correctAnswer: country.name,
        country,
        flagOptions,
        type: 'flag'
      };
    });

    // Use all available trivia questions
    const triviaQuestionsMapped: Question[] = triviaData.map((trivia, index) => ({
      id: index + flagQuestions.length + 1,
      question: decodeHTML(trivia.question),
      options: shuffleStringArray([
        decodeHTML(trivia.correct_answer),
        ...trivia.incorrect_answers.map(answer => decodeHTML(answer))
      ]),
      correctAnswer: decodeHTML(trivia.correct_answer),
      type: 'trivia'
    }));

    // Combine and shuffle both types together
    const allQuestions = [...flagQuestions, ...triviaQuestionsMapped];
    const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);
    
    setQuestions(shuffledQuestions);
  };

  // Decode HTML entities in trivia questions
  const decodeHTML = (html: string) => {
    if (typeof document !== 'undefined') {
      const txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
    }
    // Fallback for server-side rendering
    return html
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
  };

  const generateFlagOptions = (correct: Country, allCountries: Country[]) => {
    const options = [correct];
    const otherCountries = allCountries.filter(c => c.userId !== correct.userId);
    
    while (options.length < 4) {
      const randomCountry = otherCountries[Math.floor(Math.random() * otherCountries.length)];
      if (!options.find(option => option.userId === randomCountry.userId)) {
        options.push(randomCountry);
      }
    }
    
    return shuffleArray(options);
  };

  const shuffleArray = (array: Country[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const shuffleStringArray = (array: string[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    
    // Immediately check if the answer is correct
    const isCorrect = answer === questions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      handleCorrectAnswer();
    } else {
      // Wrong answer - show game over modal
      handleWrongAnswer();
    }
  };

  const handleTimeUp = () => {
    // Time ran out - show game over modal
    setShowGameOverModal(true);
  };

  const handleWrongAnswer = () => {
    // Show game over modal for wrong answer
    setShowGameOverModal(true);
  };

  const handleTryAgain = () => {
    setShowGameOverModal(false);
    setSelectedAnswer('');
    setTimeLeft(10);
    setCurrentQuestion(0); // Reset to first question
    setScore(0); // Reset score
    
    // Generate new mixed questions for a fresh start
    if (triviaQuestions.length > 0) {
      generateMixedQuestions(countries, triviaQuestions);
    } else {
      generateQuestions(countries);
    }
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
      setTimeLeft(10); // Reset timer for next question
    } else {
      setQuizComplete(true);
    }
  };

  const saveScore = async () => {
    try {
      const response = await fetch('/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          score: score,
          userId: 'temp-user-id' // Replace with actual user ID from auth
        }),
      });
      
      if (response.ok) {
        console.log('Score saved successfully');
      }
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer('');
    setShowResult(false);
    setQuizComplete(false);
    setTimeLeft(10);
    
    if (triviaQuestions.length > 0) {
      generateMixedQuestions(countries, triviaQuestions);
    } else {
      generateQuestions(countries);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-xl text-gray-600">Loading Quiz...</p>
        </div>
      </div>
    );
  }

  if (quizComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
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
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
            >
              Play Again
            </button>
            <button
              onClick={() => router.push('/')}
              className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600">Error loading quiz questions</p>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Score and Timer Display */}
        <div className="mb-8 flex justify-between items-center">
          <span className="text-lg font-medium text-gray-600">
            Score: {score}
          </span>
          <div className={`text-2xl font-bold px-4 py-2 rounded-full ${
            timeLeft <= 3 ? 'bg-red-100 text-red-600' : 
            timeLeft <= 5 ? 'bg-yellow-100 text-yellow-600' : 
            'bg-green-100 text-green-600'
          }`}>
            {timeLeft}s
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            {question.question}
          </h2>

          <div className={`grid gap-6 ${question.type === 'flag' ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {question.type === 'flag' && question.flagOptions ? (
              // Render flag options
              question.flagOptions.map((country, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(country.name)}
                  disabled={showResult}
                  className={`p-4 rounded-lg border-2 text-center font-medium transition-all duration-200 hover:shadow-lg ${
                    showResult
                      ? country.name === question.correctAnswer
                        ? 'bg-green-100 border-green-500 shadow-green-200'
                        : country.name === selectedAnswer
                        ? 'bg-red-100 border-red-500 shadow-red-200'
                        : 'bg-gray-100 border-gray-300'
                      : selectedAnswer === country.name
                      ? 'bg-indigo-100 border-indigo-500 shadow-indigo-200'
                      : 'bg-gray-50 border-gray-300 hover:bg-indigo-50 hover:border-indigo-300'
                  }`}
                >
                  <div className="flex items-center justify-center h-24">
                    <img 
                      src={country.flagUrl} 
                      alt={`Flag of ${country.name}`}
                      className="max-w-full max-h-full object-contain rounded-md shadow-sm"
                    />
                  </div>
                </button>
              ))
            ) : (
              // Render text options for trivia questions
              question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showResult}
                  className={`p-6 rounded-lg border-2 text-left font-medium transition-all duration-200 hover:shadow-lg ${
                    showResult
                      ? option === question.correctAnswer
                        ? 'bg-green-100 border-green-500 shadow-green-200'
                        : option === selectedAnswer
                        ? 'bg-red-100 border-red-500 shadow-red-200'
                        : 'bg-gray-100 border-gray-300'
                      : selectedAnswer === option
                      ? 'bg-indigo-100 border-indigo-500 shadow-indigo-200'
                      : 'bg-gray-50 border-gray-300 hover:bg-indigo-50 hover:border-indigo-300'
                  }`}
                >
                  <div className="text-lg font-semibold text-gray-800 leading-relaxed">
                    {option}
                  </div>
                </button>
              ))
            )}
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
              <h2 className="text-3xl font-bold text-red-600 mb-4">
                {timeLeft === 0 ? "⏰ Time's Up!" : "❌ Wrong Answer!"}
              </h2>
              
              {/* Show correct flag for flag questions */}
              {questions[currentQuestion]?.type === 'flag' && questions[currentQuestion]?.country && (
                <div className="mb-6">
                  <p className="text-lg text-gray-600 mb-4">
                    The correct answer was:
                  </p>
                  <div className="flex items-center justify-center h-20 mb-4">
                    <img 
                      src={questions[currentQuestion].country!.flagUrl} 
                      alt={`Flag of ${questions[currentQuestion].country!.name}`}
                      className="max-w-full max-h-full object-contain rounded-md shadow-md"
                    />
                  </div>
                  <p className="text-xl font-bold text-gray-800 mb-4">
                    {questions[currentQuestion].correctAnswer}
                  </p>
                </div>
              )}

              {/* Show text answer for trivia questions */}
              {questions[currentQuestion]?.type === 'trivia' && (
                <div className="mb-6">
                  <p className="text-lg text-gray-600 mb-2">
                    The correct answer was:
                  </p>
                  <p className="text-xl font-bold text-gray-800 mb-4">
                    {questions[currentQuestion]?.correctAnswer}
                  </p>
                </div>
              )}

              <p className="text-gray-600 mb-8">
                Final Score: <span className="font-semibold">{score}</span>
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={handleTryAgain}
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                >
                  Try Again 🔄
                </button>
                <button
                  onClick={handleGoHome}
                  className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  Back to Home 🏠
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Correct Answer Modal */}
        {showCorrectModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
              <h2 className="text-3xl font-bold text-green-600 mb-6">
                ✅ Correct!
              </h2>
              
              {questions[currentQuestion]?.type === 'flag' && questions[currentQuestion]?.country && (
                <div className="mb-6">
                  <img 
                    src={questions[currentQuestion].country!.flagUrl} 
                    alt={`Flag of ${questions[currentQuestion].country!.name}`}
                    className="w-24 h-16 mx-auto rounded-md shadow-md object-cover mb-4"
                  />
                  <p className="text-xl font-bold text-gray-800">
                    {questions[currentQuestion].country!.name}
                  </p>
                </div>
              )}

              {questions[currentQuestion]?.type === 'trivia' && (
                <div className="mb-6">
                  <p className="text-xl font-bold text-gray-800">
                    {questions[currentQuestion].correctAnswer}
                  </p>
                </div>
              )}

              {questions[currentQuestion]?.type === 'flag' && questions[currentQuestion]?.country && (
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    💡 Did You Know?
                  </h3>
                  <p className="text-blue-700">
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
      </div>
    </div>
  );
}
