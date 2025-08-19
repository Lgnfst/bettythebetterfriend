import { NextRequest, NextResponse } from 'next/server';
import { getTeamByIdentifier, getTeamStanding } from '@/lib/db';
import { generateTimestamps } from '@/lib/utils/date-utils';
import { League, TeamRecordResponse } from '@/types/api.types';
import { leagueSchema, teamRecordResponseSchema } from '@/lib/validation';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const league = searchParams.get('league');
    const team = searchParams.get('team');
    
    // Validate parameters
    if (!league || !team) {
      return NextResponse.json(
        { error: 'Missing required parameters: league and team' },
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
    
    // Get team from database
    const dbTeam = await getTeamByIdentifier(validLeague, team);
    
    if (!dbTeam) {
      return NextResponse.json(
        { error: 'Team not found' },
        { status: 404 }
      );
    }
    
    // Get team standing
    const standing = await getTeamStanding(dbTeam.id);
    
    if (!standing) {
      return NextResponse.json(
        { error: 'Team standing not found' },
        { status: 404 }
      );
    }
    
    // Mock last games data (in a real app, this would come from a database or API)
    const lastGames = [
      {
        date: '2023-10-01',
        opponentAbbr: validLeague === 'mlb' ? 'SF' : validLeague === 'nba' ? 'BOS' : 'SF',
        homeAway: 'H' as const,
        result: 'W' as const,
        score: 'W 5-3',
      },
      {
        date: '2023-09-30',
        opponentAbbr: validLeague === 'mlb' ? 'SF' : validLeague === 'nba' ? 'MIA' : 'DAL',
        homeAway: 'A' as const,
        result: 'L' as const,
        score: 'L 2-4',
      },
      {
        date: '2023-09-29',
        opponentAbbr: validLeague === 'mlb' ? 'CHC' : validLeague === 'nba' ? 'CHI' : 'GB',
        homeAway: 'H' as const,
        result: 'W' as const,
        score: 'W 6-2',
      },
      {
        date: '2023-09-28',
        opponentAbbr: validLeague === 'mlb' ? 'CHC' : validLeague === 'nba' ? 'CHI' : 'GB',
        homeAway: 'H' as const,
        result: 'L' as const,
        score: 'L 1-3',
      },
      {
        date: '2023-09-27',
        opponentAbbr: validLeague === 'mlb' ? 'NYY' : validLeague === 'nba' ? 'GSW' : 'TB',
        homeAway: 'A' as const,
        result: 'W' as const,
        score: 'W 4-2',
      },
    ];
    
    // Generate timestamps
    const timestamps = generateTimestamps();
    
    // Construct response
    const response: TeamRecordResponse = {
      league: validLeague,
      team: {
        name: dbTeam.name,
        abbr: dbTeam.abbr,
      },
      record: {
        wins: standing.wins,
        losses: standing.losses,
        tiesOrOT: standing.ties_or_ots,
        asOf: standing.record_as_of,
      },
      streak: standing.streak,
      lastFive: standing.last_five,
      lastGames,
      ...timestamps,
      sources: standing.sources,
      notes: standing.notes,
    };
    
    // Validate response
    const validationResult = teamRecordResponseSchema.safeParse(response);
    if (!validationResult.success) {
      console.error('Validation error:', validationResult.error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in team/record API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

