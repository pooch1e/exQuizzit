interface TriviaQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export class TriviaService {
  private timeoutId = 10000;

  async fetchQuestions(baseUrl: string): Promise<TriviaQuestion[]> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutId);

    try {
      const response = await fetch(`${baseUrl}/api/trivia`, {
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json' },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.data) {
        return data.data;
      }

      return [];
    } catch (error) {
      clearTimeout(timeoutId);
      console.error('Error fetching trivia questions:', error);
      return []; // Return empty array on failure
    }
  }
}
