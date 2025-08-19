import { League, SportsDataIOTeam, SportsDataIOStanding, SportsDataIOPlayer, SportsDataIOGameLog } from '@/types/api.types';

// Base URLs for SportsDataIO APIs
const BASE_URLS = {
  mlb: 'https://api.sportsdata.io/v3/mlb',
  nba: 'https://api.sportsdata.io/v3/nba',
  nfl: 'https://api.sportsdata.io/v3/nfl',
};

// API key from environment variable
const API_KEY = process.env.SPORTSDATAIO_KEY;

if (!API_KEY) {
  throw new Error('Missing SportsDataIO API key');
}

// Helper function to make API requests
async function fetchFromAPI<T>(league: League, endpoint: string): Promise<T> {
  const url = `${BASE_URLS[league]}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Ocp-Apim-Subscription-Key': API_KEY,
    },
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`SportsDataIO API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Teams
export async function getTeams(league: League): Promise<SportsDataIOTeam[]> {
  const endpoints = {
    mlb: '/scores/json/teams',
    nba: '/scores/json/teams',
    nfl: '/scores/json/teams',
  };

  return fetchFromAPI<SportsDataIOTeam[]>(league, endpoints[league]);
}

// Standings
export async function getStandings(league: League): Promise<SportsDataIOStanding[]> {
  const endpoints = {
    mlb: '/scores/json/Standings/current',
    nba: '/scores/json/Standings/current',
    nfl: '/scores/json/Standings/current',
  };

  return fetchFromAPI<SportsDataIOStanding[]>(league, endpoints[league]);
}

// Players
export async function getPlayers(league: League): Promise<SportsDataIOPlayer[]> {
  const endpoints = {
    mlb: '/scores/json/Players',
    nba: '/scores/json/Players',
    nfl: '/scores/json/Players',
  };

  return fetchFromAPI<SportsDataIOPlayer[]>(league, endpoints[league]);
}

export async function getPlayersByTeam(league: League, teamId: number): Promise<SportsDataIOPlayer[]> {
  const endpoints = {
    mlb: `/scores/json/Players/${teamId}`,
    nba: `/scores/json/Players/${teamId}`,
    nfl: `/scores/json/Players/${teamId}`,
  };

  return fetchFromAPI<SportsDataIOPlayer[]>(league, endpoints[league]);
}

// Player Game Logs
export async function getPlayerGameLogs(league: League, playerId: number): Promise<SportsDataIOGameLog[]> {
  const endpoints = {
    mlb: `/stats/json/PlayerGameStatsBySeason/current/${playerId}`,
    nba: `/stats/json/PlayerGameStatsBySeason/current/${playerId}`,
    nfl: `/stats/json/PlayerGameStatsBySeason/current/${playerId}`,
  };

  return fetchFromAPI<SportsDataIOGameLog[]>(league, endpoints[league]);
}

// Schedule
export async function getSchedule(league: League): Promise<any[]> {
  const endpoints = {
    mlb: '/scores/json/Games/current',
    nba: '/scores/json/Games/current',
    nfl: '/scores/json/Schedules/current',
  };

  return fetchFromAPI<any[]>(league, endpoints[league]);
}

// Helper functions for specific stats
export function extractMlbStats(gameLog: any) {
  return {
    hits: gameLog.Hits || 0,
    total_bases: (gameLog.Singles || 0) + (gameLog.Doubles || 0) * 2 + (gameLog.Triples || 0) * 3 + (gameLog.HomeRuns || 0) * 4,
    hr: gameLog.HomeRuns || 0,
    rbi: gameLog.RunsBattedIn || 0,
    runs: gameLog.Runs || 0,
    bb: gameLog.Walks || 0,
    so: gameLog.Strikeouts || 0,
  };
}

export function extractNbaStats(gameLog: any) {
  return {
    points: gameLog.Points || 0,
    rebounds: (gameLog.OffensiveRebounds || 0) + (gameLog.DefensiveRebounds || 0),
    assists: gameLog.Assists || 0,
    threes: gameLog.ThreePointersMade || 0,
  };
}

export function extractNflStats(gameLog: any) {
  return {
    pass_yds: gameLog.PassingYards || 0,
    rush_yds: gameLog.RushingYards || 0,
    rec_yds: gameLog.ReceivingYards || 0,
    receptions: gameLog.Receptions || 0,
    pass_td: gameLog.PassingTouchdowns || 0,
    rush_td: gameLog.RushingTouchdowns || 0,
    rec_td: gameLog.ReceivingTouchdowns || 0,
  };
}

