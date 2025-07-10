import { shuffleArray } from "../utils/shuffleArray.ts";
import { decodeHTML } from "../utils/decodeHTML.ts";

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
  type: "flag" | "trivia";
  countryData?: {
    name: string;
    capital: string;
    currency: string;
    population: number;
  };
}

interface TriviaQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export class QuestionService {
  generateFlagQuestions(countries: Country[]): Question[] {
    return countries.map((country, index) => {
      const flagOptions = this.generateFlagOptions(country, countries);
      return {
        id: index + 1,
        question: `Which flag belongs to ${country.name}?`, // Just text question
        options: flagOptions.map((c) => c.flagUrl), // Flag URLs as options
        correctAnswer: country.flagUrl,
        type: "flag",
        // Include country data for "Did You Know" facts
        countryData: {
          name: country.name,
          capital: country.capital,
          currency: country.currency,
          population: country.population,
        },
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
      type: "trivia",
    }));
  }

  combineAndShuffle(
    flagQuestions: Question[],
    triviaQuestions: Question[]
  ): Question[] {
    const combinedQuestions: Question[] = [];

    // Shuffle both arrays first
    const shuffledFlags = shuffleArray([...flagQuestions]);
    const shuffledTrivia = shuffleArray([...triviaQuestions]);

    let flagIndex = 0;
    let triviaIndex = 0;
    let questionCount = 0;

    // Create pattern: flag, flag, trivia, flag, flag, trivia, etc.
    while (
      flagIndex < shuffledFlags.length ||
      triviaIndex < shuffledTrivia.length
    ) {
      questionCount++;

      // Every 3rd question should be trivia (if available)
      if (questionCount % 3 === 0 && triviaIndex < shuffledTrivia.length) {
        combinedQuestions.push(shuffledTrivia[triviaIndex]);
        triviaIndex++;
      }
      // Otherwise use flag questions (if available)
      else if (flagIndex < shuffledFlags.length) {
        combinedQuestions.push(shuffledFlags[flagIndex]);
        flagIndex++;
      }
      // If no more flag questions, use remaining trivia
      else if (triviaIndex < shuffledTrivia.length) {
        combinedQuestions.push(shuffledTrivia[triviaIndex]);
        triviaIndex++;
      }
    }

    return combinedQuestions;
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
