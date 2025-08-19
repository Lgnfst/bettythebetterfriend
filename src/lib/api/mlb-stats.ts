// MLB Stats API (public)
// This is a secondary verification source for MLB data

// Base URL for MLB Stats API
const BASE_URL = 'https://statsapi.mlb.com/api/v1';

// Helper function to make API requests
async function fetchFromAPI<T>(endpoint: string): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`MLB Stats API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Get all teams
export async function getTeams(): Promise<any> {
  return fetchFromAPI<any>('/teams?sportId=1');
}

// Get team by ID
export async function getTeamById(teamId: number): Promise<any> {
  return fetchFromAPI<any>(`/teams/${teamId}`);
}

// Get standings
export async function getStandings(): Promise<any> {
  return fetchFromAPI<any>('/standings?leagueId=103,104');
}

// Get team record
export async function getTeamRecord(teamId: number): Promise<any> {
  return fetchFromAPI<any>(`/teams/${teamId}/stats?stats=season&group=pitching,hitting,fielding`);
}

// Get player by ID
export async function getPlayerById(playerId: number): Promise<any> {
  return fetchFromAPI<any>(`/people/${playerId}`);
}

// Get player stats
export async function getPlayerStats(playerId: number): Promise<any> {
  return fetchFromAPI<any>(`/people/${playerId}/stats?stats=gameLog&group=hitting,pitching,fielding`);
}

// Helper function to convert MLB Stats API data to our format
export function convertTeamRecord(mlbData: any) {
  try {
    const team = mlbData.teams[0];
    const record = team.record;
    
    return {
      teamName: team.name,
      abbr: team.abbreviation,
      record: {
        wins: record.wins,
        losses: record.losses,
        tiesOrOT: null,
      },
      streak: record.streakCode || '',
      lastFive: '', // MLB Stats API doesn't provide this directly
      recordAsOf: new Date().toISOString().split('T')[0],
    };
  } catch (error) {
    console.error('Error converting MLB Stats API data:', error);
    return null;
  }
}

