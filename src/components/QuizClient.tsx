"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
  type: "flag" | "trivia";
}

interface QuizClientProps {
  initialQuestions: Question[];
}

export default function QuizClient({ initialQuestions }: QuizClientProps) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [showCorrectModal, setShowCorrectModal] = useState(false);
  const [isLoadingNewQuiz, setIsLoadingNewQuiz] = useState(false);

  // Timer countdown effect
  useEffect(() => {
    if (
      timeLeft > 0 &&
      !showResult &&
      !showGameOverModal &&
      !showCorrectModal &&
      !quizComplete
    ) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (
      timeLeft === 0 &&
      !showResult &&
      !showGameOverModal &&
      !showCorrectModal
    ) {
      handleTimeUp();
    }
  }, [timeLeft, showResult, showGameOverModal, showCorrectModal, quizComplete]);

  const loadNewQuestions = async () => {
    setIsLoadingNewQuiz(true);
    try {
      const response = await fetch("/api/quiz/questions");
      const data = await response.json();

      if (data.success) {
        setQuestions(data.questions);
      }
    } catch (error) {
      console.error("Error loading new questions:", error);
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

  const handleTimeUp = () => {
    setShowGameOverModal(true);
  };

  const handleWrongAnswer = () => {
    setShowGameOverModal(true);
  };

  const handleTryAgain = async () => {
    setShowGameOverModal(false);
    setSelectedAnswer("");
    setTimeLeft(10);
    setCurrentQuestion(0);
    setScore(0);

    await loadNewQuestions();
  };

  const handleGoHome = () => {
    router.push("/home");
  };

  const getDidYouKnowFact = (country: Country) => {
    const facts = [
      {
        type: "capital",
        text: `The capital of ${country.name} is ${country.capital}.`,
      },
      {
        type: "currency",
        text: `The currency used in ${country.name} is the ${country.currency}.`,
      },
      {
        type: "population",
        text: `${
          country.name
        } has a population of approximately ${country.population.toLocaleString()} people.`,
      },
    ];

    return facts[Math.floor(Math.random() * facts.length)];
  };

  const handleCorrectAnswer = () => {
    setScore(score + 1);
    setShowCorrectModal(true);
  };

  const handleNextFromCorrect = () => {
    setShowCorrectModal(false);
    setSelectedAnswer("");

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(10);
    } else {
      setQuizComplete(true);
    }
  };

  const restartQuiz = async () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer("");
    setShowResult(false);
    setQuizComplete(false);
    setTimeLeft(10);

    await loadNewQuestions();
  };

  if (isLoadingNewQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-xl text-gray-600">Loading New Quiz...</p>
        </div>
      </div>
    );
  }

  if (quizComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Quiz Complete! 🎉
          </h1>
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
              onClick={() => router.push("/")}
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
          <div
            className={`text-2xl font-bold px-4 py-2 rounded-full ${
              timeLeft <= 3
                ? "bg-red-100 text-red-600"
                : timeLeft <= 5
                ? "bg-yellow-100 text-yellow-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {timeLeft}s
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            {question.question}
          </h2>

          <div
            className={`grid gap-6 ${
              question.type === "flag" ? "grid-cols-2" : "grid-cols-1"
            }`}
          >
            {question.type === "flag" && question.flagOptions
              ? // Render flag options
                question.flagOptions.map((country, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(country.name)}
                    disabled={showResult}
                    className={`p-4 rounded-lg border-2 text-center font-medium transition-all duration-200 hover:shadow-lg ${
                      showResult
                        ? country.name === question.correctAnswer
                          ? "bg-green-100 border-green-500 shadow-green-200"
                          : country.name === selectedAnswer
                          ? "bg-red-100 border-red-500 shadow-red-200"
                          : "bg-gray-100 border-gray-300"
                        : selectedAnswer === country.name
                        ? "bg-indigo-100 border-indigo-500 shadow-indigo-200"
                        : "bg-gray-50 border-gray-300 hover:bg-indigo-50 hover:border-indigo-300"
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
              : // Render text options for trivia questions
                question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={showResult}
                    className={`p-6 rounded-lg border-2 text-left font-medium transition-all duration-200 hover:shadow-lg ${
                      showResult
                        ? option === question.correctAnswer
                          ? "bg-green-100 border-green-500 shadow-green-200"
                          : option === selectedAnswer
                          ? "bg-red-100 border-red-500 shadow-red-200"
                          : "bg-gray-100 border-gray-300"
                        : selectedAnswer === option
                        ? "bg-indigo-100 border-indigo-500 shadow-indigo-200"
                        : "bg-gray-50 border-gray-300 hover:bg-indigo-50 hover:border-indigo-300"
                    }`}
                  >
                    <div className="text-lg font-semibold text-gray-800 leading-relaxed">
                      {option}
                    </div>
                  </button>
                ))}
          </div>

          {showResult && (
            <div className="mt-6 text-center">
              <p
                className={`text-lg font-semibold ${
                  selectedAnswer === question.correctAnswer
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {selectedAnswer === question.correctAnswer
                  ? "✅ Correct!"
                  : "❌ Incorrect"}
              </p>
              {selectedAnswer !== question.correctAnswer && (
                <p className="text-gray-600 mt-2">
                  The correct answer was:{" "}
                  <strong>{question.correctAnswer}</strong>
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
              {questions[currentQuestion]?.type === "flag" &&
                questions[currentQuestion]?.country && (
                  <div className="mb-6">
                    <p className="text-lg text-gray-600 mb-4">
                      The correct answer was:
                    </p>
                    <div className="flex items-center justify-center h-20 mb-4">
                      <img
                        src={questions[currentQuestion].country!.flagUrl}
                        alt={`Flag of ${
                          questions[currentQuestion].country!.name
                        }`}
                        className="max-w-full max-h-full object-contain rounded-md shadow-md"
                      />
                    </div>
                    <p className="text-xl font-bold text-gray-800 mb-4">
                      {questions[currentQuestion].correctAnswer}
                    </p>
                  </div>
                )}

              {/* Show text answer for trivia questions */}
              {questions[currentQuestion]?.type === "trivia" && (
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

              {questions[currentQuestion]?.type === "flag" &&
                questions[currentQuestion]?.country && (
                  <div className="mb-6">
                    <img
                      src={questions[currentQuestion].country!.flagUrl}
                      alt={`Flag of ${
                        questions[currentQuestion].country!.name
                      }`}
                      className="w-24 h-16 mx-auto rounded-md shadow-md object-cover mb-4"
                    />
                    <p className="text-xl font-bold text-gray-800">
                      {questions[currentQuestion].country!.name}
                    </p>
                  </div>
                )}

              {questions[currentQuestion]?.type === "trivia" && (
                <div className="mb-6">
                  <p className="text-xl font-bold text-gray-800">
                    {questions[currentQuestion].correctAnswer}
                  </p>
                </div>
              )}

              {questions[currentQuestion]?.type === "flag" &&
                questions[currentQuestion]?.country && (
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">
                      💡 Did You Know?
                    </h3>
                    <p className="text-blue-700">
                      {
                        getDidYouKnowFact(questions[currentQuestion].country!)
                          .text
                      }
                    </p>
                  </div>
                )}

              <p className="text-gray-600 mb-6">
                Score:{" "}
                <span className="font-semibold text-green-600">{score}</span>
              </p>

              <button
                onClick={handleNextFromCorrect}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                {currentQuestion + 1 >= questions.length
                  ? "Finish Quiz 🎉"
                  : "Next Question ➡️"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
