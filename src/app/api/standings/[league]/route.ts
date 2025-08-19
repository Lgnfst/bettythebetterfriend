import { NextRequest, NextResponse } from 'next/server';
import { getStandings } from '@/lib/api/sports-data-io';
import { getSecondaryStandings } from '@/lib/api/secondary-sources';
import { verifyTeamRecord, calculateStreak, calculateLastFive } from '@/lib/utils/data-transformation';
import { generateTimestamps, getCurrentDate } from '@/lib/utils/date-utils';
import { upsertTeamStanding, getTeamByIdentifier } from '@/lib/db';
import { League, StandingsResponse } from '@/types/api.types';
import { leagueSchema, standingsResponseSchema } from '@/lib/validation';

export async function GET(
  request: NextRequest,
  { params }: { params: { league: string } }
) {
  try {
    // Validate league parameter
    const parseResult = leagueSchema.safeParse(params.league);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid league parameter' },
        { status: 400 }
      );
    }
    
    const league = parseResult.data as League;
    
    // Fetch standings from primary source (SportsDataIO)
    const primaryStandings = await getStandings(league);
    
    // Fetch standings from secondary source
    const secondaryStandings = await getSecondaryStandings(league);
    
    // Process and verify standings
    const processedTeams = await processStandings(league, primaryStandings, secondaryStandings);
    
    // Generate timestamps
    const timestamps = generateTimestamps();
    
    // Construct response
    const response: StandingsResponse = {
      league,
      asOf: getCurrentDate(),
      teams: processedTeams,
      ...timestamps,
      sources: [
        'https://sportsdata.io',
        league === 'mlb' ? 'https://statsapi.mlb.com' :
        league === 'nba' ? 'https://www.basketball-reference.com' :
        'https://www.pro-football-reference.com'
      ],
    };
    
    // Validate response
    const validationResult = standingsResponseSchema.safeParse(response);
    if (!validationResult.success) {
      console.error('Validation error:', validationResult.error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(response);
  } catch (error) {
    console.error(`Error in standings/${params.league} API:`, error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Processes and verifies standings data
 * @param league League (mlb, nba, nfl)
 * @param primaryStandings Standings from primary source
 * @param secondaryStandings Standings from secondary source
 * @returns Processed team standings
 */
async function processStandings(league: League, primaryStandings: any, secondaryStandings: any) {
  const processedTeams = [];
  
  // Process MLB standings
  if (league === 'mlb') {
    for (const division of primaryStandings) {
      for (const teamRecord of division.teamRecords) {
        const teamName = teamRecord.team.name;
        const teamAbbr = teamRecord.team.abbreviation;
        
        // Find team in secondary source
        let secondaryRecord = null;
        for (const secDivision of secondaryStandings) {
          const secTeamRecord = secDivision.teamRecords.find(
            (tr: any) => tr.team.name === teamName
          );
          if (secTeamRecord) {
            secondaryRecord = {
              wins: secTeamRecord.wins,
              losses: secTeamRecord.losses,
            };
            break;
          }
        }
        
        // Verify record
        const verification = verifyTeamRecord(
          { wins: teamRecord.wins, losses: teamRecord.losses },
          secondaryRecord
        );
        
        // Calculate streak and last five
        const streak = calculateStreak(teamRecord.streakCode?.split('').map((c: string) => c === 'W' ? 'W' : 'L') || []);
        const lastFive = calculateLastFive(teamRecord.records?.splitRecords?.map((r: any) => r.wins > r.losses ? 'W' : 'L') || []);
        
        // Get team from database
        const dbTeam = await getTeamByIdentifier(league, teamAbbr);
        
        // Store in database if team exists
        if (dbTeam) {
          await upsertTeamStanding({
            team_id: dbTeam.id,
            wins: teamRecord.wins,
            losses: teamRecord.losses,
            ties_or_ots: null,
            record_as_of: getCurrentDate(),
            streak,
            last_five: lastFive,
            sources: [
              'https://sportsdata.io',
              'https://statsapi.mlb.com'
            ],
            notes: verification.notes,
            updated_at: new Date().toISOString(),
          });
        }
        
        processedTeams.push({
          teamName,
          abbr: teamAbbr,
          record: {
            wins: teamRecord.wins,
            losses: teamRecord.losses,
            tiesOrOT: null,
          },
          streak,
          lastFive,
          recordAsOf: getCurrentDate(),
          sources: [
            'https://sportsdata.io',
            'https://statsapi.mlb.com'
          ],
          notes: verification.notes,
        });
      }
    }
  }
  
  // Process NBA standings
  else if (league === 'nba') {
    for (const teamRecord of primaryStandings) {
      const teamName = teamRecord.Name;
      const teamAbbr = teamRecord.Key;
      
      // Find team in secondary source
      const secondaryRecord = secondaryStandings.find(
        (tr: any) => tr.team.includes(teamName.split(' ').pop())
      );
      
      // Verify record
      const verification = verifyTeamRecord(
        { wins: teamRecord.Wins, losses: teamRecord.Losses },
        secondaryRecord ? { wins: secondaryRecord.wins, losses: secondaryRecord.losses } : null
      );
      
      // Calculate streak and last five (mock data for now)
      const streak = teamRecord.Wins > teamRecord.Losses ? `W${Math.floor(Math.random() * 5) + 1}` : `L${Math.floor(Math.random() * 3) + 1}`;
      const lastFive = ['W', 'L', 'W', 'L', 'W'].join('');
      
      // Get team from database
      const dbTeam = await getTeamByIdentifier(league, teamAbbr);
      
      // Store in database if team exists
      if (dbTeam) {
        await upsertTeamStanding({
          team_id: dbTeam.id,
          wins: teamRecord.Wins,
          losses: teamRecord.Losses,
          ties_or_ots: null,
          record_as_of: getCurrentDate(),
          streak,
          last_five: lastFive,
          sources: [
            'https://sportsdata.io',
            'https://www.basketball-reference.com'
          ],
          notes: verification.notes,
          updated_at: new Date().toISOString(),
        });
      }
      
      processedTeams.push({
        teamName,
        abbr: teamAbbr,
        record: {
          wins: teamRecord.Wins,
          losses: teamRecord.Losses,
          tiesOrOT: null,
        },
        streak,
        lastFive,
        recordAsOf: getCurrentDate(),
        sources: [
          'https://sportsdata.io',
          'https://www.basketball-reference.com'
        ],
        notes: verification.notes,
      });
    }
  }
  
  // Process NFL standings
  else if (league === 'nfl') {
    for (const teamRecord of primaryStandings) {
      const teamName = teamRecord.Name;
      const teamAbbr = teamRecord.Key;
      
      // Find team in secondary source
      const secondaryRecord = secondaryStandings.find(
        (tr: any) => tr.team.includes(teamName.split(' ').pop())
      );
      
      // Verify record
      const verification = verifyTeamRecord(
        { 
          wins: teamRecord.Wins, 
          losses: teamRecord.Losses,
          tiesOrOT: teamRecord.Ties || 0
        },
        secondaryRecord ? { 
          wins: secondaryRecord.wins, 
          losses: secondaryRecord.losses,
          tiesOrOT: secondaryRecord.ties || 0
        } : null
      );
      
      // Calculate streak and last five (mock data for now)
      const streak = teamRecord.Wins > teamRecord.Losses ? `W${Math.floor(Math.random() * 3) + 1}` : `L${Math.floor(Math.random() * 2) + 1}`;
      const lastFive = ['W', 'L', 'W', 'L', 'W'].join('');
      
      // Get team from database
      const dbTeam = await getTeamByIdentifier(league, teamAbbr);
      
      // Store in database if team exists
      if (dbTeam) {
        await upsertTeamStanding({
          team_id: dbTeam.id,
          wins: teamRecord.Wins,
          losses: teamRecord.Losses,
          ties_or_ots: teamRecord.Ties || 0,
          record_as_of: getCurrentDate(),
          streak,
          last_five: lastFive,
          sources: [
            'https://sportsdata.io',
            'https://www.pro-football-reference.com'
          ],
          notes: verification.notes,
          updated_at: new Date().toISOString(),
        });
      }
      
      processedTeams.push({
        teamName,
        abbr: teamAbbr,
        record: {
          wins: teamRecord.Wins,
          losses: teamRecord.Losses,
          tiesOrOT: teamRecord.Ties || 0,
        },
        streak,
        lastFive,
        recordAsOf: getCurrentDate(),
        sources: [
          'https://sportsdata.io',
          'https://www.pro-football-reference.com'
        ],
        notes: verification.notes,
      });
    }
  }
  
  return processedTeams;
}

