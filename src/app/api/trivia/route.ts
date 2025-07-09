import { NextResponse } from 'next/server';

interface TriviaQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface TriviaApiResponse {
  response_code: number;
  results: TriviaQuestion[];
}

// Cache trivia questions for 5 minutes
let cachedTrivia: TriviaQuestion[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function GET() {
  try {
    // Check if we have cached data and it's still valid
    const now = Date.now();
    if (cachedTrivia && (now - cacheTimestamp) < CACHE_DURATION) {
      return NextResponse.json({ 
        success: true, 
        data: cachedTrivia,
        cached: true 
      });
    }

    // Fetch ALL available geography questions by making multiple requests
    const allTriviaQuestions: TriviaQuestion[] = [];
    let hasMoreQuestions = true;
    let requestCount = 0;
    const maxRequests = 2; // Reduced to 2 requests (100 questions max) for better performance

    while (hasMoreQuestions && requestCount < maxRequests) {
      const response = await fetch(
        'https://opentdb.com/api.php?amount=50&category=22&type=multiple',
        { 
          next: { revalidate: 300 } // Cache for 5 minutes
        }
      );

      if (!response.ok) {
        console.warn(`Request ${requestCount + 1} failed with status: ${response.status}`);
        break;
      }

      const data: TriviaApiResponse = await response.json();

      if (data.response_code !== 0) {
        if (data.response_code === 1) {
          // No more questions available
          console.log(`No more questions available after ${requestCount} requests`);
          hasMoreQuestions = false;
        } else {
          console.warn(`API returned error code: ${data.response_code} on request ${requestCount + 1}`);
          break;
        }
      } else if (data.results && data.results.length > 0) {
        allTriviaQuestions.push(...data.results);
        console.log(`Fetched ${data.results.length} questions in request ${requestCount + 1}. Total: ${allTriviaQuestions.length}`);
        
        // If we got less than 50 questions, we've likely reached the end
        if (data.results.length < 50) {
          hasMoreQuestions = false;
        }
      } else {
        hasMoreQuestions = false;
      }

      requestCount++;
      
      // Add a small delay between requests to be respectful to the API
      if (hasMoreQuestions) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    if (allTriviaQuestions.length === 0) {
      throw new Error('No trivia questions could be fetched');
    }

    // Update cache
    cachedTrivia = allTriviaQuestions;
    cacheTimestamp = now;

    return NextResponse.json({ 
      success: true, 
      data: allTriviaQuestions,
      cached: false,
      totalQuestions: allTriviaQuestions.length
    });

  } catch (error) {
    console.error('Error fetching trivia questions:', error);
    
    // If we have cached data, return it even if stale
    if (cachedTrivia) {
      return NextResponse.json({ 
        success: true, 
        data: cachedTrivia,
        cached: true,
        stale: true 
      });
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch trivia questions' 
      },
      { status: 500 }
    );
  }
}
