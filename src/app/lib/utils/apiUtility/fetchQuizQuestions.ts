// Define the Question interface
interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  // Add other properties as needed
}

export async function fetchQuizQuestions(): Promise<Question[] | null> {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';

    const result = await fetch(`${baseUrl}/api/quiz/questions`);

    if (!result.ok) {
      console.log('error fetching quiz questions');
      return null;
    }

    const data = await result.json();
    return data.questions;
  } catch (err) {
    console.log(err);
    return null;
  }
}
