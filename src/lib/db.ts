import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

/**
 * Gets a team by abbreviation or name
 * @param league League (mlb, nba, nfl)
 * @param teamIdentifier Team abbreviation or name
 * @returns Team data or null if not found
 */
export async function getTeamByIdentifier(league: string, teamIdentifier: string) {
  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .eq('league', league)
    .or(`abbr.eq.${teamIdentifier},name.ilike.%${teamIdentifier}%`)
    .limit(1);

  if (error) {
    console.error('Error fetching team:', error);
    return null;
  }

  return data?.[0] || null;
}

/**
 * Gets a player by ID
 * @param id Player ID
 * @returns Player data with team information
 */
export async function getPlayerById(id: string) {
  const { data, error } = await supabase
    .from('players')
    .select(`
      *,
      teams:team_id (
        name,
        abbr
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching player:', error);
    throw new Error('Player not found');
  }

  return data;
}

/**
 * Gets a player by name and team
 * @param league League (mlb, nba, nfl)
 * @param playerName Player name
 * @param teamAbbr Team abbreviation
 * @returns Player data or null if not found
 */
export async function getPlayerByNameAndTeam(league: string, playerName: string, teamAbbr: string) {
  // First, get the team ID
  const team = await getTeamByIdentifier(league, teamAbbr);
  
  if (!team) {
    return null;
  }

  const { data, error } = await supabase
    .from('players')
    .select('*')
    .eq('league', league)
    .eq('team_id', team.id)
    .ilike('name', `%${playerName}%`)
    .limit(1);

  if (error) {
    console.error('Error fetching player:', error);
    return null;
  }

  return data?.[0] || null;
}

/**
 * Gets player game logs
 * @param playerId Player ID
 * @param limit Number of games to return
 * @returns Array of game logs
 */
export async function getPlayerGameLogs(playerId: string, limit: number = 10) {
  const { data, error } = await supabase
    .from('player_game_logs')
    .select('*')
    .eq('player_id', playerId)
    .order('game_date', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching player game logs:', error);
    return [];
  }

  return data || [];
}

/**
 * Gets a team's current standing
 * @param teamId Team ID
 * @returns Standing data or null if not found
 */
export async function getTeamStanding(teamId: string) {
  const { data, error } = await supabase
    .from('standings')
    .select('*')
    .eq('team_id', teamId)
    .order('updated_at', { ascending: false })
    .limit(1);

  if (error) {
    console.error('Error fetching team standing:', error);
    return null;
  }

  return data?.[0] || null;
}

/**
 * Gets all standings for a league
 * @param league League (mlb, nba, nfl)
 * @returns Array of standings with team information
 */
export async function getLeagueStandings(league: string) {
  const { data, error } = await supabase
    .from('teams')
    .select(`
      *,
      standings (*)
    `)
    .eq('league', league)
    .order('name');

  if (error) {
    console.error('Error fetching league standings:', error);
    return [];
  }

  return data || [];
}

/**
 * Gets an odds game by ID
 * @param id Game ID
 * @returns Game data with team information
 */
export async function getOddsGameById(id: string) {
  const { data, error } = await supabase
    .from('odds_games')
    .select(`
      *,
      home_team:home_team_id (
        name,
        abbr
      ),
      away_team:away_team_id (
        name,
        abbr
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching odds game:', error);
    throw new Error('Game not found');
  }

  return data;
}

/**
 * Upserts a team standing
 * @param standing Standing data to upsert
 * @returns Upserted standing data
 */
export async function upsertTeamStanding(standing: any) {
  const { data, error } = await supabase
    .from('standings')
    .upsert(standing)
    .select();

  if (error) {
    console.error('Error upserting team standing:', error);
    throw new Error('Failed to upsert team standing');
  }

  return data?.[0];
}

