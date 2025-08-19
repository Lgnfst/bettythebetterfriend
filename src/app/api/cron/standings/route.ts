import { NextRequest, NextResponse } from 'next/server';
import { leagueSchema } from '@/lib/validation';
import { League } from '@/types/api.types';

export async function GET(request: NextRequest) {
  try {
    // Get league from query parameter
    const searchParams = request.nextUrl.searchParams;
    const league = searchParams.get('league');
    
    // Validate league parameter
    if (!league) {
      return NextResponse.json(
        { error: 'Missing required parameter: league' },
        { status: 400 }
      );
    }
    
    const parseResult = leagueSchema.safeParse(league);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid league parameter' },
        { status: 400 }
      );
    }
    
    const validLeague = parseResult.data as League;
    
    // Call the standings API to update the database
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/standings/${validLeague}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch standings: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      message: `Updated ${validLeague.toUpperCase()} standings`,
      updatedAt: new Date().toISOString(),
      teamsUpdated: data.teams.length,
    });
  } catch (error) {
    console.error('Error in cron/standings API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

