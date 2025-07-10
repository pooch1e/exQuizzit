"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SpaceBackground from "./SpaceBackground";

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
  countryData?: {
    name: string;
    capital: string;
    currency: string;
    population: number;
  };
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
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [showDidYouKnow, setShowDidYouKnow] = useState(false);
  const [showWrongAnswer, setShowWrongAnswer] = useState(false);
  const [isLoadingNewQuiz, setIsLoadingNewQuiz] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  // Timer countdown effect
  useEffect(() => {
    if (timeLeft > 0 && !showDidYouKnow && !showWrongAnswer && !quizComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showDidYouKnow && !showWrongAnswer) {
      handleTimeUp();
    }
  }, [timeLeft, showDidYouKnow, showWrongAnswer, quizComplete]);

  const handleTimeUp = () => {
    setShowWrongAnswer(true);
  };

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

  const handleWrongAnswer = () => {
    setShowWrongAnswer(true);
  };

  const handleTryAgain = async () => {
    setShowGameOverModal(false);
    setShowWrongAnswer(false);
    setSelectedAnswer("");
    setCurrentQuestion(0);
    setScore(0);
    setShowDidYouKnow(false);
    setTimeLeft(10); // Reset timer

    await loadNewQuestions();
  };

  const handleGoHome = () => {
    router.push("/home");
  };

  const getDidYouKnowFact = (
    country:
      | Country
      | { name: string; capital: string; currency: string; population: number }
  ) => {
    console.log("Country data:", country); // Debug log

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

    const selectedFact = facts[Math.floor(Math.random() * facts.length)];
    console.log("Selected fact:", selectedFact); // Debug log
    return selectedFact;
  };

  const handleCorrectAnswer = () => {
    setScore(score + 1);
    setShowDidYouKnow(true);
  };

  const handleNextFromCorrect = () => {
    setShowDidYouKnow(false);
    setSelectedAnswer("");
    setTimeLeft(10); // Reset timer

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const handleNextFromWrong = () => {
    setShowWrongAnswer(false);
    setSelectedAnswer("");
    setTimeLeft(10); // Reset timer

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
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
    setShowDidYouKnow(false);
    setShowWrongAnswer(false);
    setTimeLeft(10); // Reset timer

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
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              Play Again
            </button>
            <button
              onClick={() => router.push("/")}
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
        {/* Score and Bucks Display */}
        <div className="mb-4 flex justify-between items-center px-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-white/20">
            <span className="text-base sm:text-lg font-medium text-white">
              🪙 QuizzBucks:{" "}
              <span className="text-yellow-300 font-bold">0</span>
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-white/20">
            <span className="text-base sm:text-lg font-medium text-white">
              Score: <span className="text-blue-300 font-bold">{score}</span>
            </span>
          </div>
        </div>

        {/* Question Card - Square Shape */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl thick-yellow-border p-4 sm:p-6 mb-4 sm:mb-6 aspect-square flex flex-col justify-center mx-auto max-w-sm">
          {!showDidYouKnow && !showWrongAnswer ? (
            <>
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 text-center leading-tight mb-2 sm:mb-4">
                {question.question}
              </h2>
            </>
          ) : showDidYouKnow ? (
            /* Did You Know Section */
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-green-600 mb-4">
                ✅ Correct!
              </h2>

              {question.type === "flag" &&
                (question.country || question.countryData) && (
                  <div className="mb-4">
                    <img
                      src={question.country?.flagUrl || question.correctAnswer}
                      alt={`Flag of ${
                        question.country?.name || question.countryData?.name
                      }`}
                      className="w-20 h-12 sm:w-24 sm:h-16 mx-auto rounded-md shadow-md object-cover mb-2"
                    />
                    <p className="text-lg sm:text-xl font-bold text-gray-800">
                      {question.country?.name || question.countryData?.name}
                    </p>
                  </div>
                )}

              {question.type === "trivia" && (
                <div className="mb-4">
                  <p className="text-lg sm:text-xl font-bold text-gray-800">
                    {question.correctAnswer}
                  </p>
                </div>
              )}

              {/* Did You Know section - show for flag questions */}
              {question.type === "flag" &&
                (question.country || question.countryData) && (
                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <h3 className="text-base font-semibold text-blue-800 mb-2">
                      💡 Did You Know?
                    </h3>
                    <p className="text-sm text-blue-700">
                      {(() => {
                        const countryInfo =
                          question.country || question.countryData!;
                        console.log("Rendering fact for country:", countryInfo);
                        const fact = getDidYouKnowFact(countryInfo);
                        console.log("Fact to render:", fact.text);
                        return fact.text;
                      })()}
                    </p>
                  </div>
                )}

              <button
                onClick={handleNextFromCorrect}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                {currentQuestion + 1 >= questions.length
                  ? "Finish Quiz 🎉"
                  : "Next Question ➡️"}
              </button>
            </div>
          ) : (
            /* Wrong Answer Section */
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-red-600 mb-4">
                ❌ Wrong Answer!
              </h2>

              {/* Show correct flag for flag questions */}
              {question.type === "flag" &&
                (question.country || question.countryData) && (
                  <div className="mb-4">
                    <p className="text-base sm:text-lg text-gray-600 mb-4">
                      The correct answer was:
                    </p>
                    <img
                      src={question.country?.flagUrl || question.correctAnswer}
                      alt={`Flag of ${
                        question.country?.name || question.countryData?.name
                      }`}
                      className="w-20 h-12 sm:w-24 sm:h-16 mx-auto rounded-md shadow-md object-cover mb-2"
                    />
                    <p className="text-lg sm:text-xl font-bold text-gray-800">
                      {question.country?.name || question.countryData?.name}
                    </p>
                  </div>
                )}

              {/* Show correct answer for trivia questions */}
              {question.type === "trivia" && (
                <div className="mb-4">
                  <p className="text-base sm:text-lg text-gray-600 mb-2">
                    The correct answer was:
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-gray-800">
                    {question.correctAnswer}
                  </p>
                </div>
              )}

              <p className="text-gray-600 mb-4">
                Final Score: <span className="font-semibold">{score}</span>
              </p>

              <div className="space-y-2">
                <button
                  onClick={handleTryAgain}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold text-sm"
                >
                  Try Again 🔄
                </button>
                <button
                  onClick={handleGoHome}
                  className="w-full bg-slate-600 text-white py-2 px-4 rounded-lg hover:bg-slate-700 transition-colors font-semibold text-sm"
                >
                  Back to Home 🏠
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Timer Bar - Only show when not in result states */}
        {!showDidYouKnow && !showWrongAnswer && (
          <div className="mb-4 sm:mb-6 max-w-sm mx-auto">
            <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-yellow-400 transition-all ease-linear"
                style={{
                  width: `${(timeLeft / 10) * 100}%`,
                  transitionDuration: timeLeft === 10 ? "0ms" : "1000ms",
                }}
              />
            </div>
          </div>
        )}

        {/* Answer Buttons - 2x2 Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6 max-w-sm mx-auto">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() =>
                !showDidYouKnow &&
                !showWrongAnswer &&
                handleAnswerSelect(option)
              }
              disabled={showDidYouKnow || showWrongAnswer}
              className={`p-2 sm:p-3 md:p-4 rounded-xl text-center font-medium transition-all duration-200 min-h-[60px] sm:min-h-[70px] md:min-h-[80px] flex items-center justify-center ${
                showDidYouKnow || showWrongAnswer
                  ? option === question.correctAnswer
                    ? "bg-green-100 border-4 border-green-600 shadow-green-200"
                    : option === selectedAnswer
                    ? "bg-red-100 border-2 border-red-500 shadow-red-200"
                    : "bg-gray-100 border-2 border-gray-300"
                  : selectedAnswer === option
                  ? "bg-purple-100 border-2 border-purple-500 shadow-purple-200"
                  : "bg-gray-50 border-2 border-gray-300 hover:bg-gray-200 hover:border-4 hover:border-yellow-400 active:bg-purple-100 hover:shadow-lg"
              }`}
            >
              {question.type === "flag" ? (
                <div className="w-full h-full flex items-center justify-center p-1">
                  <img
                    src={option}
                    alt={`Flag option ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                    style={{ aspectRatio: "3/2" }}
                  />
                </div>
              ) : (
                <div className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 leading-tight text-center break-words">
                  {option}
                </div>
              )}
            </button>
          ))}
        </div>

        {showResult && !showDidYouKnow && (
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
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8 max-w-sm w-full text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-red-600 mb-4">
              ❌ Wrong Answer!
            </h2>

            {/* Show correct flag for flag questions */}
            {questions[currentQuestion]?.type === "flag" &&
              questions[currentQuestion]?.country && (
                <div className="mb-6">
                  <p className="text-base sm:text-lg text-gray-600 mb-4">
                    The correct answer was:
                  </p>
                  <div className="flex items-center justify-center h-16 sm:h-20 mb-4">
                    <img
                      src={questions[currentQuestion].country!.flagUrl}
                      alt={`Flag of ${
                        questions[currentQuestion].country!.name
                      }`}
                      className="max-w-full max-h-full object-contain rounded-md shadow-md"
                    />
                  </div>
                  <p className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
                    {questions[currentQuestion].correctAnswer}
                  </p>
                </div>
              )}

            {/* Show text answer for trivia questions */}
            {questions[currentQuestion]?.type === "trivia" && (
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
    </SpaceBackground>
  );
}
