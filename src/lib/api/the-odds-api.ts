import { League } from '@/types/api.types';

const API_KEY = process.env.THEODDS_API_KEY;
const USE_MOCK_DATA = process.env.USE_MOCK_DATA === 'true';

const BASE_URL = 'https://api.the-odds-api.com/v4';

/**
 * Fetches data from The Odds API
 * @param endpoint API endpoint
 * @param params Query parameters
 * @returns API response data
 */
async function fetchFromTheOddsAPI(endpoint: string, params: Record<string, string> = {}) {
  if (USE_MOCK_DATA) {
    return getMockData(endpoint);
  }

  if (!API_KEY) {
    throw new Error('The Odds API key is not configured');
  }

  const url = new URL(`${BASE_URL}/${endpoint}`);
  
  // Add API key
  url.searchParams.append('apiKey', API_KEY);
  
  // Add other parameters
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  try {
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`The Odds API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching from The Odds API:', error);
    throw error;
  }
}

/**
 * Gets odds for a sport
 * @param league League (mlb, nba, nfl)
 * @returns Odds data
 */
export async function getOdds(league: League) {
  const sportKeys = {
    mlb: 'baseball_mlb',
    nba: 'basketball_nba',
    nfl: 'americanfootball_nfl',
  };

  const params = {
    sport: sportKeys[league],
    regions: 'us',
    markets: 'totals',
    oddsFormat: 'american',
  };

  return fetchFromTheOddsAPI('sports', params);
}

/**
 * Gets mock data for testing
 * @param endpoint API endpoint
 * @returns Mock data
 */
function getMockData(endpoint: string) {
  if (endpoint === 'sports') {
    return [
      {
        id: 'baseball_mlb_dodgers_yankees',
        sport_key: 'baseball_mlb',
        home_team: 'New York Yankees',
        away_team: 'Los Angeles Dodgers',
        commence_time: '2023-10-15T20:00:00Z',
        bookmakers: [
          {
            key: 'draftkings',
            markets: [
              {
                key: 'totals',
                outcomes: [
                  { name: 'Over', price: -110, point: 8.5 },
                  { name: 'Under', price: -110, point: 8.5 },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'basketball_nba_lakers_celtics',
        sport_key: 'basketball_nba',
        home_team: 'Boston Celtics',
        away_team: 'Los Angeles Lakers',
        commence_time: '2023-10-16T23:30:00Z',
        bookmakers: [
          {
            key: 'draftkings',
            markets: [
              {
                key: 'totals',
                outcomes: [
                  { name: 'Over', price: -110, point: 220.5 },
                  { name: 'Under', price: -110, point: 220.5 },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'americanfootball_nfl_chiefs_49ers',
        sport_key: 'americanfootball_nfl',
        home_team: 'San Francisco 49ers',
        away_team: 'Kansas City Chiefs',
        commence_time: '2023-10-15T20:25:00Z',
        bookmakers: [
          {
            key: 'draftkings',
            markets: [
              {
                key: 'totals',
                outcomes: [
                  { name: 'Over', price: -110, point: 48.5 },
                  { name: 'Under', price: -110, point: 48.5 },
                ],
              },
            ],
          },
        ],
      },
    ];
  }

  // Default empty response
  return [];
}

