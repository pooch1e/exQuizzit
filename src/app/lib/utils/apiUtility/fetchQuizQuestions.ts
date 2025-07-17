import { Question } from '@/types/Question.ts/Questions';

export async function fetchQuizQuestions(): Promise<Question[] | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const result = await fetch(`${baseUrl}/api/quiz/questions`);

    if (!result.ok) {
      console.log('error fetching quiz questions');
      return null;
    }

    const data = await result.json();

    // Ensure each question has the required 'type' property
    if (
      !Array.isArray(data.questions) ||
      data.questions.some((q: Question) => !q.type)
    ) {
      console.error('Fetched questions missing required "type" property.');
      return null;
    }

    return data.questions as Question[];
  } catch (err) {
    console.log(err);
    return null;
  }
}
