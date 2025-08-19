import { notFound } from 'next/navigation';
import { PlayerStats } from '@/components/player/player-stats';
import { getPlayerById } from '@/lib/db';
import { League, PlayerTrendResponse } from '@/types/api.types';

// Validate league parameter
function isValidLeague(league: string): league is League {
  return ['mlb', 'nba', 'nfl'].includes(league);
}

async function getPlayerTrend(
  league: League,
  playerName: string,
  teamAbbr: string,
  stat: string,
  games: string
): Promise<PlayerTrendResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const response = await fetch(
    `${baseUrl}/api/player/trend?league=${league}&player=${playerName}&team=${teamAbbr}&stat=${stat}&games=${games}`,
    {
      next: { revalidate: 3600 }, // Revalidate every hour
    }
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch player trend data`);
  }
  
  return response.json();
}

export default async function PlayerPage({ 
  params, 
  searchParams 
}: { 
  params: { id: string },
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Get query parameters
  const league = searchParams.league as string;
  const stat = searchParams.stat as string;
  const games = searchParams.games as string;
  
  // Validate league parameter
  if (!league || !isValidLeague(league)) {
    notFound();
  }
  
  // Fetch player data
  let playerData;
  try {
    playerData = await getPlayerById(params.id);
  } catch (error) {
    console.error(`Error fetching player:`, error);
    notFound();
  }
  
  // Determine default stat based on league
  const defaultStat = (() => {
    switch (league) {
      case 'mlb':
        return 'hits';
      case 'nba':
        return 'points';
      case 'nfl':
        return 'pass_yds';
      default:
        return '';
    }
  })();
  
  // Use provided stat or default
  const statToUse = stat || defaultStat;
  
  // Use provided games or default to 5
  const gamesToUse = games === '10' ? '10' : '5';
  
  // Fetch player trend data if we have all required parameters
  let trendData: PlayerTrendResponse | undefined;
  
  if (playerData && playerData.teams) {
    try {
      trendData = await getPlayerTrend(
        league as League,
        playerData.name,
        playerData.teams.abbr,
        statToUse,
        gamesToUse
      );
    } catch (error) {
      console.error(`Error fetching player trend:`, error);
      // Continue without trend data
    }
  }
  
  return (
    <div>
      <PlayerStats 
        player={{
          id: playerData.id,
          name: playerData.name,
          league: league as League,
          team: {
            name: playerData.teams?.name || '',
            abbr: playerData.teams?.abbr || '',
          },
        }}
        initialTrend={trendData}
      />
    </div>
  );
}

