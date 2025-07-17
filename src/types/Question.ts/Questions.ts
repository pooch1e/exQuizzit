export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  type: 'flag' | 'trivia';
  countryData?: {
    name: string;
    capital: string;
    currency: string;
    population: number;
  };
}
