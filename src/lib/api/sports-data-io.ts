import { League } from '@/types/api.types';

const API_KEY = process.env.SPORTSDATAIO_KEY;
const USE_MOCK_DATA = process.env.USE_MOCK_DATA === 'true';

// Base URLs for different leagues
const BASE_URLS = {
  mlb: 'https://api.sportsdata.io/v3/mlb',
  nba: 'https://api.sportsdata.io/v3/nba',
  nfl: 'https://api.sportsdata.io/v3/nfl',
};

/**
 * Fetches data from SportsDataIO API
 * @param league League (mlb, nba, nfl)
 * @param endpoint API endpoint
 * @param params Query parameters
 * @returns API response data
 */
async function fetchFromSportsDataIO(league: League, endpoint: string, params: Record<string, string> = {}) {
  if (USE_MOCK_DATA) {
    return getMockData(league, endpoint);
  }

  if (!API_KEY) {
    throw new Error('SportsDataIO API key is not configured');
  }

  const baseUrl = BASE_URLS[league];
  const url = new URL(`${baseUrl}/${endpoint}`);
  
  // Add API key
  url.searchParams.append('key', API_KEY);
  
  // Add other parameters
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  try {
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`SportsDataIO API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching from SportsDataIO:', error);
    throw error;
  }
}

/**
 * Gets standings for a league
 * @param league League (mlb, nba, nfl)
 * @returns Standings data
 */
export async function getStandings(league: League) {
  const endpoints = {
    mlb: 'scores/json/Standings/2023',
    nba: 'scores/json/Standings/2023',
    nfl: 'scores/json/Standings/2023',
  };

  return fetchFromSportsDataIO(league, endpoints[league]);
}

/**
 * Gets team details
 * @param league League (mlb, nba, nfl)
 * @param teamId Team ID in SportsDataIO
 * @returns Team details
 */
export async function getTeamDetails(league: League, teamId: string) {
  const endpoints = {
    mlb: `scores/json/Team/${teamId}`,
    nba: `scores/json/Team/${teamId}`,
    nfl: `scores/json/Team/${teamId}`,
  };

  return fetchFromSportsDataIO(league, endpoints[league]);
}

/**
 * Gets player details
 * @param league League (mlb, nba, nfl)
 * @param playerId Player ID in SportsDataIO
 * @returns Player details
 */
export async function getPlayerDetails(league: League, playerId: string) {
  const endpoints = {
    mlb: `scores/json/Player/${playerId}`,
    nba: `scores/json/Player/${playerId}`,
    nfl: `scores/json/Player/${playerId}`,
  };

  return fetchFromSportsDataIO(league, endpoints[league]);
}

/**
 * Gets player game logs
 * @param league League (mlb, nba, nfl)
 * @param playerId Player ID in SportsDataIO
 * @param season Season year
 * @returns Player game logs
 */
export async function getPlayerGameLogs(league: League, playerId: string, season: string = '2023') {
  const endpoints = {
    mlb: `stats/json/PlayerGameStatsBySeason/${season}/${playerId}`,
    nba: `stats/json/PlayerGameStatsBySeason/${season}/${playerId}`,
    nfl: `stats/json/PlayerGameStatsBySeason/${season}/${playerId}`,
  };

  return fetchFromSportsDataIO(league, endpoints[league]);
}

/**
 * Gets mock data for testing
 * @param league League (mlb, nba, nfl)
 * @param endpoint API endpoint
 * @returns Mock data
 */
function getMockData(league: League, endpoint: string) {
  // Mock standings data
  if (endpoint.includes('Standings')) {
    if (league === 'mlb') {
      return [
        { TeamID: 1, Name: 'Los Angeles Dodgers', Key: 'LAD', Wins: 100, Losses: 62, Percentage: 0.617 },
        { TeamID: 2, Name: 'New York Yankees', Key: 'NYY', Wins: 95, Losses: 67, Percentage: 0.586 },
        { TeamID: 3, Name: 'Boston Red Sox', Key: 'BOS', Wins: 78, Losses: 84, Percentage: 0.481 },
        { TeamID: 4, Name: 'Chicago Cubs', Key: 'CHC', Wins: 83, Losses: 79, Percentage: 0.512 },
        { TeamID: 5, Name: 'San Francisco Giants', Key: 'SF', Wins: 79, Losses: 83, Percentage: 0.488 },
      ];
    } else if (league === 'nba') {
      return [
        { TeamID: 101, Name: 'Los Angeles Lakers', Key: 'LAL', Wins: 52, Losses: 30, Percentage: 0.634 },
        { TeamID: 102, Name: 'Boston Celtics', Key: 'BOS', Wins: 57, Losses: 25, Percentage: 0.695 },
        { TeamID: 103, Name: 'Golden State Warriors', Key: 'GSW', Wins: 44, Losses: 38, Percentage: 0.537 },
        { TeamID: 104, Name: 'Chicago Bulls', Key: 'CHI', Wins: 40, Losses: 42, Percentage: 0.488 },
        { TeamID: 105, Name: 'Miami Heat', Key: 'MIA', Wins: 44, Losses: 38, Percentage: 0.537 },
      ];
    } else if (league === 'nfl') {
      return [
        { TeamID: 201, Name: 'Kansas City Chiefs', Key: 'KC', Wins: 14, Losses: 3, Ties: 0, Percentage: 0.824 },
        { TeamID: 202, Name: 'San Francisco 49ers', Key: 'SF', Wins: 12, Losses: 5, Ties: 0, Percentage: 0.706 },
        { TeamID: 203, Name: 'Dallas Cowboys', Key: 'DAL', Wins: 12, Losses: 5, Ties: 0, Percentage: 0.706 },
        { TeamID: 204, Name: 'Green Bay Packers', Key: 'GB', Wins: 9, Losses: 8, Ties: 0, Percentage: 0.529 },
        { TeamID: 205, Name: 'Tampa Bay Buccaneers', Key: 'TB', Wins: 9, Losses: 8, Ties: 0, Percentage: 0.529 },
      ];
    }
  }

  // Mock player game logs
  if (endpoint.includes('PlayerGameStatsBySeason')) {
    if (league === 'mlb') {
      return [
        { GameDate: '2023-09-30', Hits: 2, HomeRuns: 1, RunsBattedIn: 3, Runs: 2, Walks: 1, Strikeouts: 0 },
        { GameDate: '2023-09-29', Hits: 1, HomeRuns: 0, RunsBattedIn: 0, Runs: 1, Walks: 2, Strikeouts: 1 },
        { GameDate: '2023-09-28', Hits: 3, HomeRuns: 1, RunsBattedIn: 2, Runs: 1, Walks: 0, Strikeouts: 2 },
        { GameDate: '2023-09-27', Hits: 0, HomeRuns: 0, RunsBattedIn: 0, Runs: 0, Walks: 1, Strikeouts: 3 },
        { GameDate: '2023-09-26', Hits: 2, HomeRuns: 0, RunsBattedIn: 1, Runs: 1, Walks: 0, Strikeouts: 1 },
      ];
    } else if (league === 'nba') {
      return [
        { GameDate: '2023-04-10', Points: 28, Rebounds: 7, Assists: 9, ThreePointersMade: 3 },
        { GameDate: '2023-04-08', Points: 32, Rebounds: 10, Assists: 5, ThreePointersMade: 4 },
        { GameDate: '2023-04-06', Points: 25, Rebounds: 8, Assists: 11, ThreePointersMade: 2 },
        { GameDate: '2023-04-04', Points: 18, Rebounds: 6, Assists: 7, ThreePointersMade: 1 },
        { GameDate: '2023-04-02', Points: 30, Rebounds: 9, Assists: 8, ThreePointersMade: 5 },
      ];
    } else if (league === 'nfl') {
      return [
        { GameDate: '2023-01-08', PassingYards: 328, PassingTouchdowns: 3, RushingYards: 15, RushingTouchdowns: 0 },
        { GameDate: '2023-01-01', PassingYards: 285, PassingTouchdowns: 2, RushingYards: 28, RushingTouchdowns: 1 },
        { GameDate: '2022-12-25', PassingYards: 340, PassingTouchdowns: 4, RushingYards: 10, RushingTouchdowns: 0 },
        { GameDate: '2022-12-18', PassingYards: 262, PassingTouchdowns: 1, RushingYards: 32, RushingTouchdowns: 0 },
        { GameDate: '2022-12-11', PassingYards: 298, PassingTouchdowns: 2, RushingYards: 20, RushingTouchdowns: 1 },
      ];
    }
  }

  // Default empty response
  return [];
}

