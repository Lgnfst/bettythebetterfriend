import { League, TheOddsAPIGame } from '@/types/api.types';

// Base URL for The Odds API
const BASE_URL = 'https://api.the-odds-api.com/v4';

// API key from environment variable
const API_KEY = process.env.THEODDS_API_KEY;

if (!API_KEY) {
  throw new Error('Missing The Odds API key');
}

// Sport keys mapping
const SPORT_KEYS = {
  mlb: 'baseball_mlb',
  nba: 'basketball_nba',
  nfl: 'americanfootball_nfl',
};

// Helper function to make API requests
async function fetchFromAPI<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const queryParams = new URLSearchParams({
    apiKey: API_KEY,
    ...params,
  });
  
  const url = `${BASE_URL}${endpoint}?${queryParams.toString()}`;
  
  const response = await fetch(url, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`The Odds API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Get odds for a specific league
export async function getOdds(league: League): Promise<TheOddsAPIGame[]> {
  const sportKey = SPORT_KEYS[league];
  
  return fetchFromAPI<TheOddsAPIGame[]>('/sports/' + sportKey + '/odds', {
    regions: 'us',
    markets: 'totals',
    oddsFormat: 'american',
  });
}

// Get odds for a specific game
export async function getGameOdds(league: League, gameId: string): Promise<TheOddsAPIGame> {
  const sportKey = SPORT_KEYS[league];
  
  return fetchFromAPI<TheOddsAPIGame>(`/sports/${sportKey}/events/${gameId}/odds`, {
    regions: 'us',
    markets: 'totals',
    oddsFormat: 'american',
  });
}

// Helper function to extract total line and odds
export function extractTotalLineAndOdds(game: TheOddsAPIGame) {
  // Find a bookmaker that offers totals
  const bookmaker = game.bookmakers.find(b => 
    b.markets.some(m => m.key === 'totals')
  );
  
  if (!bookmaker) {
    return null;
  }
  
  // Find the totals market
  const totalsMarket = bookmaker.markets.find(m => m.key === 'totals');
  
  if (!totalsMarket) {
    return null;
  }
  
  // Find the over outcome
  const overOutcome = totalsMarket.outcomes.find(o => o.name === 'Over');
  
  if (!overOutcome || overOutcome.point === undefined) {
    return null;
  }
  
  // Get the total line and odds
  return {
    line: overOutcome.point,
    odds: overOutcome.price.toString(),
    bookmaker: bookmaker.title,
  };
}

