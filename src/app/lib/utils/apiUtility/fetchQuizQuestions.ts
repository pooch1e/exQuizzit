import { Question } from '@/types/Question.ts/Questions';

export async function fetchQuizQuestions(): Promise<Question[] | null> {
  try {
    // For client-side requests, use relative URLs
    // For server-side requests, use full URL only when needed
    const isServer = typeof window === 'undefined';

    let url: string;

    if (isServer) {
      // During build/server-side, use the full URL
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : 'http://localhost:3000';
      url = `${baseUrl}/api/quiz/questions`;
    } else {
      // Client-side, use relative URL
      url = '/api/quiz/questions';
    }

    console.log('Fetching from:', url);

    const result = await fetch(url, {
      // Add timeout and error handling
      signal: AbortSignal.timeout(10000), // 10 second timeout
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!result.ok) {
      console.error(
        'Error fetching quiz questions:',
        result.status,
        result.statusText
      );
      return null;
    }

    const data = await result.json();
    console.log('Fetched questions correctly', data.questions);

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
    console.error('Failed to fetch quiz questions:', err);
    return null;
  }
}
