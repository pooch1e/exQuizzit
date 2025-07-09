import { NextResponse } from 'next/server';
import { countries } from '../../../../data/development-data/countries-data.js';
// change to supabase

interface Country {
  userId: number;
  name: string;
  flagUrl: string;
  capital: string;
  currency: string;
  population: number;
}

interface TriviaQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  country?: Country;
  flagOptions?: Country[];
  type: 'flag' | 'trivia';
}
//TODO extract out utils
// Utility functions
function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

function decodeHTML(html: string): string {
  return html
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function generateFlagOptions(correct: Country, allCountries: Country[]): Country[] {
  const options = [correct];
  const otherCountries = allCountries.filter(c => c.userId !== correct.userId);
  
  while (options.length < 4) {
    const randomCountry = otherCountries[Math.floor(Math.random() * otherCountries.length)];
    if (!options.find(option => option.userId === randomCountry.userId)) {
      options.push(randomCountry);
    }
  }
  
  return shuffleArray(options);
}

export async function GET(request: Request) {
  try {
    // Fetch trivia questions from our API with increased timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    let triviaQuestions: TriviaQuestion[] = [];
    
    try {
      // Get the host from the request headers to support any port
      const url = new URL(request.url);
      const baseUrl = `${url.protocol}//${url.host}`;
      
      const triviaResponse = await fetch(
        `${baseUrl}/api/trivia`,
        { 
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      
      clearTimeout(timeoutId);
      
      if (triviaResponse.ok) {
        const triviaData = await triviaResponse.json();
        if (triviaData.success && triviaData.data) {
          triviaQuestions = triviaData.data;
          console.log(`Loaded ${triviaQuestions.length} trivia questions`);
        } else {
          console.log('No trivia data available or API failed');
        }
      } else {
        console.log(`Trivia API request failed with status: ${triviaResponse.status}`);
      }
    } catch (fetchError) {
      clearTimeout(timeoutId);
      console.error('Error fetching trivia questions:', fetchError);
      console.log('Continuing with flag questions only');
    }

    // Generate flag questions from a limited set of countries (30 for better performance)
    const limitedCountries = countries.slice(0, 30);
    const flagQuestions: Question[] = limitedCountries.map((country: Country, index: number) => {
      const flagOptions = generateFlagOptions(country, limitedCountries);
      return {
        id: index + 1,
        question: `What is the national flag of ${country.name}?`,
        options: flagOptions.map(c => c.name),
        correctAnswer: country.name,
        country,
        flagOptions,
        type: 'flag'
      };
    });

    // Generate trivia questions if available (limit to 20 for better performance)
    const triviaQuestionsLimited = triviaQuestions.slice(0, 20);
    const triviaQuestionsMapped: Question[] = triviaQuestionsLimited.map((trivia, index) => ({
      id: index + flagQuestions.length + 1,
      question: decodeHTML(trivia.question),
      options: shuffleArray([
        decodeHTML(trivia.correct_answer),
        ...trivia.incorrect_answers.map(answer => decodeHTML(answer))
      ]),
      correctAnswer: decodeHTML(trivia.correct_answer),
      type: 'trivia'
    }));

    // Combine and shuffle all questions
    const allQuestions = [...flagQuestions, ...triviaQuestionsMapped];
    const shuffledQuestions = shuffleArray(allQuestions);

    return NextResponse.json({
      success: true,
      questions: shuffledQuestions,
      stats: {
        flagQuestions: flagQuestions.length,
        triviaQuestions: triviaQuestionsMapped.length,
        total: shuffledQuestions.length
      }
    });

  } catch (error) {
    console.error('Error generating quiz questions:', error);
    
    // Fallback to just flag questions (limited for performance)
    const limitedCountries = countries.slice(0, 30);
    const flagQuestions: Question[] = limitedCountries.map((country: Country, index: number) => {
      const flagOptions = generateFlagOptions(country, limitedCountries);
      return {
        id: index + 1,
        question: `What is the national flag of ${country.name}?`,
        options: flagOptions.map(c => c.name),
        correctAnswer: country.name,
        country,
        flagOptions,
        type: 'flag'
      };
    });

    const shuffledQuestions = shuffleArray(flagQuestions);

    return NextResponse.json({
      success: true,
      questions: shuffledQuestions,
      fallback: true,
      stats: {
        flagQuestions: flagQuestions.length,
        triviaQuestions: 0,
        total: shuffledQuestions.length
      }
    });
  }
}
