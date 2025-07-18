// app/api/quiz/route.ts
import { NextResponse } from "next/server";
import { TriviaService } from "../../../lib/services/triviaService.ts";
import { CountryService } from "../../../lib/services/CountryService.ts";
import { QuestionService } from "../../../lib/services/QuestionService.ts";

export async function GET(request: Request) {
  try {
    // Initialize services
    const triviaService = new TriviaService();
    const countryService = new CountryService();
    const quizService = new QuestionService();

    // Get base URL for trivia API
    const url = new URL(request.url);
    const baseUrl = `${url.protocol}//${url.host}`;

    // Fetch data in parallel
    const [triviaQuestions, countries] = await Promise.all([
      triviaService.fetchQuestions(baseUrl),
      countryService.getCountries(),
    ]);

    // Generate questions
    const flagQuestions = quizService.generateFlagQuestions(countries);
    const triviaQuestionsMapped = quizService.generateTriviaQuestions(
      triviaQuestions.slice(0, 20) // Limit for performance
    );

    // Combine with specific pattern: every 3rd question is trivia
    const shuffledQuestions = quizService.combineAndShuffle(
      flagQuestions,
      triviaQuestionsMapped
    );

    return NextResponse.json({
      success: true,
      questions: shuffledQuestions,
      stats: {
        flagQuestions: flagQuestions.length,
        triviaQuestions: triviaQuestionsMapped.length,
        total: shuffledQuestions.length,
      },
    });
  } catch (error) {
    console.error("Error generating quiz questions:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate quiz questions",
      },
      { status: 500 }
    );
  }
}
