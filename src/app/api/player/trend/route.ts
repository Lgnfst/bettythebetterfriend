import { NextRequest, NextResponse } from 'next/server';
import { getPlayerByNameAndTeam, getPlayerGameLogs } from '@/lib/db';
import { extractStatValue, calculateStatSummary } from '@/lib/utils/data-transformation';
import { generateTimestamps } from '@/lib/utils/date-utils';
import { League, PlayerTrendResponse } from '@/types/api.types';
import { leagueSchema, playerTrendResponseSchema } from '@/lib/validation';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const league = searchParams.get('league');
    const player = searchParams.get('player');
    const team = searchParams.get('team');
    const stat = searchParams.get('stat');
    const games = searchParams.get('games');
    
    // Validate required parameters
    if (!league || !player || !team || !stat) {
      return NextResponse.json(
        { error: 'Missing required parameters: league, player, team, and stat' },
        { status: 400 }
      );
    }
    
    // Validate league
    const parseResult = leagueSchema.safeParse(league);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid league parameter' },
        { status: 400 }
      );
    }
    
    const validLeague = parseResult.data as League;
    
    // Validate stat based on league
    if (!isValidStat(validLeague, stat)) {
      return NextResponse.json(
        { error: 'Invalid stat parameter for the specified league' },
        { status: 400 }
      );
    }
    
    // Validate games parameter
    const gamesCount = games === '10' ? 10 : 5;
    
    // Get player from database
    const dbPlayer = await getPlayerByNameAndTeam(validLeague, player, team);
    
    if (!dbPlayer) {
      return NextResponse.json(
        { error: 'Player not found' },
        { status: 404 }
      );
    }
    
    // Get player game logs
    const gameLogs = await getPlayerGameLogs(dbPlayer.id, gamesCount);
    
    // Process game logs
    const series = gameLogs.map(log => ({
      gameDate: log.game_date,
      opponent: log.opponent_abbr,
      homeAway: log.home_away as 'H' | 'A',
      value: extractStatValue(log, stat),
    }));
    
    // Sort series from oldest to newest
    series.sort((a, b) => new Date(a.gameDate).getTime() - new Date(b.gameDate).getTime());
    
    // Calculate summary statistics
    const values = series.map(game => game.value);
    const summary = calculateStatSummary(values);
    
    // Generate timestamps
    const timestamps = generateTimestamps();
    
    // Construct response
    const response: PlayerTrendResponse = {
      league: validLeague,
      player: {
        name: dbPlayer.name,
        team,
      },
      stat,
      games: gamesCount,
      series,
      summary,
      ...timestamps,
      sources: ['https://sportsdata.io'],
    };
    
    // Validate response
    const validationResult = playerTrendResponseSchema.safeParse(response);
    if (!validationResult.success) {
      console.error('Validation error:', validationResult.error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in player/trend API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Validates if a stat is valid for a league
 * @param league League (mlb, nba, nfl)
 * @param stat Stat name
 * @returns Whether the stat is valid
 */
function isValidStat(league: League, stat: string): boolean {
  const validStats = {
    mlb: ['hits', 'total_bases', 'hr', 'rbi', 'runs', 'bb', 'so'],
    nba: ['points', 'rebounds', 'assists', 'threes'],
    nfl: ['pass_yds', 'rush_yds', 'rec_yds', 'receptions', 'pass_td', 'rush_td', 'rec_td'],
  };
  
  return validStats[league].includes(stat);
}

