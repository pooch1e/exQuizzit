import { shuffleArray } from '../utils/shuffleArray.ts';
import { decodeHTML } from '../utils/decodeHTML.ts';

export class QuestionService {
  generateFlagQuestions(countries: Country[]): Question[] {
    return countries.map((country, index) => {
      const flagOptions = this.generateFlagOptions(country, countries);
      return {
        id: index + 1,
        question: `Which flag belongs to ${country.name}?`, // Just text question
        options: flagOptions.map((c) => c.flagUrl), // Flag URLs as options
        correctAnswer: country.flagUrl,
        type: 'flag',
      };
    });
  }

  generateTriviaQuestions(triviaData: TriviaQuestion[]): Question[] {
    return triviaData.map((trivia, index) => ({
      id: index + 1000, // Offset to avoid ID conflicts
      question: decodeHTML(trivia.question),
      options: shuffleArray([
        decodeHTML(trivia.correct_answer),
        ...trivia.incorrect_answers.map((answer) => decodeHTML(answer)),
      ]),
      correctAnswer: decodeHTML(trivia.correct_answer),
      type: 'trivia',
    }));
  }

  combineAndShuffle(questions: Question[]): Question[] {
    return shuffleArray(questions);
  }

  private generateFlagOptions(
    correct: Country,
    allCountries: Country[]
  ): Country[] {
    const options = [correct];
    const otherCountries = allCountries.filter(
      (c) => c.userId !== correct.userId
    );

    while (options.length < 4) {
      const randomCountry =
        otherCountries[Math.floor(Math.random() * otherCountries.length)];
      if (!options.find((option) => option.userId === randomCountry.userId)) {
        options.push(randomCountry);
      }
    }

    return shuffleArray(options);
  }
}
