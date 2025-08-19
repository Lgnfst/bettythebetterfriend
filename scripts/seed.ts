import { createClient } from '@supabase/supabase-js';
import { Database } from '../src/types/database.types';

// Supabase client
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Sample data
const mlbTeams = [
  { league: 'mlb', name: 'Los Angeles Dodgers', abbr: 'LAD', provider_ids: { sportsDataIO: 1 } },
  { league: 'mlb', name: 'New York Yankees', abbr: 'NYY', provider_ids: { sportsDataIO: 2 } },
  { league: 'mlb', name: 'Boston Red Sox', abbr: 'BOS', provider_ids: { sportsDataIO: 3 } },
  { league: 'mlb', name: 'Chicago Cubs', abbr: 'CHC', provider_ids: { sportsDataIO: 4 } },
  { league: 'mlb', name: 'San Francisco Giants', abbr: 'SF', provider_ids: { sportsDataIO: 5 } },
];

const nbaTeams = [
  { league: 'nba', name: 'Los Angeles Lakers', abbr: 'LAL', provider_ids: { sportsDataIO: 101 } },
  { league: 'nba', name: 'Boston Celtics', abbr: 'BOS', provider_ids: { sportsDataIO: 102 } },
  { league: 'nba', name: 'Golden State Warriors', abbr: 'GSW', provider_ids: { sportsDataIO: 103 } },
  { league: 'nba', name: 'Chicago Bulls', abbr: 'CHI', provider_ids: { sportsDataIO: 104 } },
  { league: 'nba', name: 'Miami Heat', abbr: 'MIA', provider_ids: { sportsDataIO: 105 } },
];

const nflTeams = [
  { league: 'nfl', name: 'Kansas City Chiefs', abbr: 'KC', provider_ids: { sportsDataIO: 201 } },
  { league: 'nfl', name: 'San Francisco 49ers', abbr: 'SF', provider_ids: { sportsDataIO: 202 } },
  { league: 'nfl', name: 'Dallas Cowboys', abbr: 'DAL', provider_ids: { sportsDataIO: 203 } },
  { league: 'nfl', name: 'Green Bay Packers', abbr: 'GB', provider_ids: { sportsDataIO: 204 } },
  { league: 'nfl', name: 'Tampa Bay Buccaneers', abbr: 'TB', provider_ids: { sportsDataIO: 205 } },
];

// Seed function
async function seed() {
  console.log('Seeding database...');
  
  // Insert MLB teams
  console.log('Inserting MLB teams...');
  const { data: mlbData, error: mlbError } = await supabase
    .from('teams')
    .insert(mlbTeams)
    .select();
  
  if (mlbError) {
    console.error('Error inserting MLB teams:', mlbError);
  } else {
    console.log(`Inserted ${mlbData.length} MLB teams`);
    
    // Create sample standings for MLB teams
    console.log('Creating MLB standings...');
    const today = new Date().toISOString().split('T')[0];
    
    const mlbStandings = mlbData.map((team, index) => ({
      team_id: team.id,
      wins: 80 + index,
      losses: 82 - index,
      ties_or_ots: null,
      record_as_of: today,
      streak: index % 2 === 0 ? `W${index + 1}` : `L${index + 1}`,
      last_five: 'WLWLW',
      sources: ['https://sportsdata.io', 'https://statsapi.mlb.com'],
      notes: null,
    }));
    
    const { data: mlbStandingsData, error: mlbStandingsError } = await supabase
      .from('standings')
      .insert(mlbStandings)
      .select();
    
    if (mlbStandingsError) {
      console.error('Error inserting MLB standings:', mlbStandingsError);
    } else {
      console.log(`Inserted ${mlbStandingsData.length} MLB standings`);
    }
  }
  
  // Insert NBA teams
  console.log('Inserting NBA teams...');
  const { data: nbaData, error: nbaError } = await supabase
    .from('teams')
    .insert(nbaTeams)
    .select();
  
  if (nbaError) {
    console.error('Error inserting NBA teams:', nbaError);
  } else {
    console.log(`Inserted ${nbaData.length} NBA teams`);
    
    // Create sample standings for NBA teams
    console.log('Creating NBA standings...');
    const today = new Date().toISOString().split('T')[0];
    
    const nbaStandings = nbaData.map((team, index) => ({
      team_id: team.id,
      wins: 40 + index,
      losses: 42 - index,
      ties_or_ots: null,
      record_as_of: today,
      streak: index % 2 === 0 ? `W${index + 1}` : `L${index + 1}`,
      last_five: 'WLWLW',
      sources: ['https://sportsdata.io', 'https://www.basketball-reference.com'],
      notes: null,
    }));
    
    const { data: nbaStandingsData, error: nbaStandingsError } = await supabase
      .from('standings')
      .insert(nbaStandings)
      .select();
    
    if (nbaStandingsError) {
      console.error('Error inserting NBA standings:', nbaStandingsError);
    } else {
      console.log(`Inserted ${nbaStandingsData.length} NBA standings`);
    }
  }
  
  // Insert NFL teams
  console.log('Inserting NFL teams...');
  const { data: nflData, error: nflError } = await supabase
    .from('teams')
    .insert(nflTeams)
    .select();
  
  if (nflError) {
    console.error('Error inserting NFL teams:', nflError);
  } else {
    console.log(`Inserted ${nflData.length} NFL teams`);
    
    // Create sample standings for NFL teams
    console.log('Creating NFL standings...');
    const today = new Date().toISOString().split('T')[0];
    
    const nflStandings = nflData.map((team, index) => ({
      team_id: team.id,
      wins: 10 + index,
      losses: 7 - index,
      ties_or_ots: 0,
      record_as_of: today,
      streak: index % 2 === 0 ? `W${index + 1}` : `L${index + 1}`,
      last_five: 'WLWLW',
      sources: ['https://sportsdata.io', 'https://www.pro-football-reference.com'],
      notes: null,
    }));
    
    const { data: nflStandingsData, error: nflStandingsError } = await supabase
      .from('standings')
      .insert(nflStandings)
      .select();
    
    if (nflStandingsError) {
      console.error('Error inserting NFL standings:', nflStandingsError);
    } else {
      console.log(`Inserted ${nflStandingsData.length} NFL standings`);
    }
  }
  
  // Create sample players
  console.log('Creating sample players...');
  
  if (mlbData && mlbData.length > 0) {
    const mlbPlayers = [
      {
        league: 'mlb',
        team_id: mlbData[0].id,
        name: 'Shohei Ohtani',
        provider_ids: { sportsDataIO: 1001 },
      },
      {
        league: 'mlb',
        team_id: mlbData[1].id,
        name: 'Aaron Judge',
        provider_ids: { sportsDataIO: 1002 },
      },
    ];
    
    const { data: mlbPlayersData, error: mlbPlayersError } = await supabase
      .from('players')
      .insert(mlbPlayers)
      .select();
    
    if (mlbPlayersError) {
      console.error('Error inserting MLB players:', mlbPlayersError);
    } else {
      console.log(`Inserted ${mlbPlayersData.length} MLB players`);
      
      // Create sample game logs for MLB players
      console.log('Creating MLB player game logs...');
      
      const today = new Date();
      const mlbGameLogs = [];
      
      for (const player of mlbPlayersData) {
        for (let i = 0; i < 10; i++) {
          const gameDate = new Date(today);
          gameDate.setDate(today.getDate() - i);
          
          mlbGameLogs.push({
            player_id: player.id,
            game_date: gameDate.toISOString().split('T')[0],
            opponent_abbr: i % 2 === 0 ? 'SF' : 'CHC',
            home_away: i % 2 === 0 ? 'H' : 'A',
            stats: {
              hits: Math.floor(Math.random() * 4),
              hr: Math.floor(Math.random() * 2),
              rbi: Math.floor(Math.random() * 5),
              runs: Math.floor(Math.random() * 3),
              bb: Math.floor(Math.random() * 3),
              so: Math.floor(Math.random() * 4),
            },
            sources: ['https://sportsdata.io'],
          });
        }
      }
      
      const { data: mlbGameLogsData, error: mlbGameLogsError } = await supabase
        .from('player_game_logs')
        .insert(mlbGameLogs)
        .select();
      
      if (mlbGameLogsError) {
        console.error('Error inserting MLB game logs:', mlbGameLogsError);
      } else {
        console.log(`Inserted ${mlbGameLogsData.length} MLB game logs`);
      }
    }
  }
  
  if (nbaData && nbaData.length > 0) {
    const nbaPlayers = [
      {
        league: 'nba',
        team_id: nbaData[0].id,
        name: 'LeBron James',
        provider_ids: { sportsDataIO: 2001 },
      },
      {
        league: 'nba',
        team_id: nbaData[2].id,
        name: 'Stephen Curry',
        provider_ids: { sportsDataIO: 2002 },
      },
    ];
    
    const { data: nbaPlayersData, error: nbaPlayersError } = await supabase
      .from('players')
      .insert(nbaPlayers)
      .select();
    
    if (nbaPlayersError) {
      console.error('Error inserting NBA players:', nbaPlayersError);
    } else {
      console.log(`Inserted ${nbaPlayersData.length} NBA players`);
      
      // Create sample game logs for NBA players
      console.log('Creating NBA player game logs...');
      
      const today = new Date();
      const nbaGameLogs = [];
      
      for (const player of nbaPlayersData) {
        for (let i = 0; i < 10; i++) {
          const gameDate = new Date(today);
          gameDate.setDate(today.getDate() - i);
          
          nbaGameLogs.push({
            player_id: player.id,
            game_date: gameDate.toISOString().split('T')[0],
            opponent_abbr: i % 2 === 0 ? 'MIA' : 'CHI',
            home_away: i % 2 === 0 ? 'H' : 'A',
            stats: {
              points: 15 + Math.floor(Math.random() * 20),
              rebounds: 5 + Math.floor(Math.random() * 10),
              assists: 3 + Math.floor(Math.random() * 8),
              threes: Math.floor(Math.random() * 6),
            },
            sources: ['https://sportsdata.io'],
          });
        }
      }
      
      const { data: nbaGameLogsData, error: nbaGameLogsError } = await supabase
        .from('player_game_logs')
        .insert(nbaGameLogs)
        .select();
      
      if (nbaGameLogsError) {
        console.error('Error inserting NBA game logs:', nbaGameLogsError);
      } else {
        console.log(`Inserted ${nbaGameLogsData.length} NBA game logs`);
      }
    }
  }
  
  if (nflData && nflData.length > 0) {
    const nflPlayers = [
      {
        league: 'nfl',
        team_id: nflData[0].id,
        name: 'Patrick Mahomes',
        provider_ids: { sportsDataIO: 3001 },
      },
      {
        league: 'nfl',
        team_id: nflData[0].id,
        name: 'Travis Kelce',
        provider_ids: { sportsDataIO: 3002 },
      },
    ];
    
    const { data: nflPlayersData, error: nflPlayersError } = await supabase
      .from('players')
      .insert(nflPlayers)
      .select();
    
    if (nflPlayersError) {
      console.error('Error inserting NFL players:', nflPlayersError);
    } else {
      console.log(`Inserted ${nflPlayersData.length} NFL players`);
      
      // Create sample game logs for NFL players
      console.log('Creating NFL player game logs...');
      
      const today = new Date();
      const nflGameLogs = [];
      
      for (const player of nflPlayersData) {
        for (let i = 0; i < 5; i++) {
          const gameDate = new Date(today);
          gameDate.setDate(today.getDate() - i * 7); // NFL games are weekly
          
          if (player.name.includes('Mahomes')) {
            nflGameLogs.push({
              player_id: player.id,
              game_date: gameDate.toISOString().split('T')[0],
              opponent_abbr: i % 2 === 0 ? 'SF' : 'DAL',
              home_away: i % 2 === 0 ? 'H' : 'A',
              stats: {
                pass_yds: 250 + Math.floor(Math.random() * 150),
                pass_td: 1 + Math.floor(Math.random() * 3),
                rush_yds: Math.floor(Math.random() * 40),
                rush_td: Math.floor(Math.random() * 2),
              },
              sources: ['https://sportsdata.io'],
            });
          } else {
            nflGameLogs.push({
              player_id: player.id,
              game_date: gameDate.toISOString().split('T')[0],
              opponent_abbr: i % 2 === 0 ? 'SF' : 'DAL',
              home_away: i % 2 === 0 ? 'H' : 'A',
              stats: {
                receptions: 4 + Math.floor(Math.random() * 6),
                rec_yds: 50 + Math.floor(Math.random() * 70),
                rec_td: Math.floor(Math.random() * 2),
              },
              sources: ['https://sportsdata.io'],
            });
          }
        }
      }
      
      const { data: nflGameLogsData, error: nflGameLogsError } = await supabase
        .from('player_game_logs')
        .insert(nflGameLogs)
        .select();
      
      if (nflGameLogsError) {
        console.error('Error inserting NFL game logs:', nflGameLogsError);
      } else {
        console.log(`Inserted ${nflGameLogsData.length} NFL game logs`);
      }
    }
  }
  
  // Create sample odds games
  console.log('Creating sample odds games...');
  
  if (mlbData && mlbData.length >= 2) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const mlbOddsGames = [
      {
        league: 'mlb',
        away_team_id: mlbData[0].id,
        home_team_id: mlbData[1].id,
        game_datetime: tomorrow.toISOString(),
        market_total: 8.5,
        odds_total: '-110',
        sources: ['https://api.the-odds-api.com'],
      },
      {
        league: 'mlb',
        away_team_id: mlbData[2].id,
        home_team_id: mlbData[3].id,
        game_datetime: tomorrow.toISOString(),
        market_total: 9.0,
        odds_total: '-105',
        sources: ['https://api.the-odds-api.com'],
      },
    ];
    
    const { data: mlbOddsGamesData, error: mlbOddsGamesError } = await supabase
      .from('odds_games')
      .insert(mlbOddsGames)
      .select();
    
    if (mlbOddsGamesError) {
      console.error('Error inserting MLB odds games:', mlbOddsGamesError);
    } else {
      console.log(`Inserted ${mlbOddsGamesData.length} MLB odds games`);
    }
  }
  
  if (nbaData && nbaData.length >= 2) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const nbaOddsGames = [
      {
        league: 'nba',
        away_team_id: nbaData[0].id,
        home_team_id: nbaData[1].id,
        game_datetime: tomorrow.toISOString(),
        market_total: 220.5,
        odds_total: '-110',
        sources: ['https://api.the-odds-api.com'],
      },
      {
        league: 'nba',
        away_team_id: nbaData[2].id,
        home_team_id: nbaData[3].id,
        game_datetime: tomorrow.toISOString(),
        market_total: 215.0,
        odds_total: '-105',
        sources: ['https://api.the-odds-api.com'],
      },
    ];
    
    const { data: nbaOddsGamesData, error: nbaOddsGamesError } = await supabase
      .from('odds_games')
      .insert(nbaOddsGames)
      .select();
    
    if (nbaOddsGamesError) {
      console.error('Error inserting NBA odds games:', nbaOddsGamesError);
    } else {
      console.log(`Inserted ${nbaOddsGamesData.length} NBA odds games`);
    }
  }
  
  if (nflData && nflData.length >= 2) {
    const nextSunday = new Date();
    nextSunday.setDate(nextSunday.getDate() + (7 - nextSunday.getDay()));
    
    const nflOddsGames = [
      {
        league: 'nfl',
        away_team_id: nflData[0].id,
        home_team_id: nflData[1].id,
        game_datetime: nextSunday.toISOString(),
        market_total: 48.5,
        odds_total: '-110',
        sources: ['https://api.the-odds-api.com'],
      },
      {
        league: 'nfl',
        away_team_id: nflData[2].id,
        home_team_id: nflData[3].id,
        game_datetime: nextSunday.toISOString(),
        market_total: 45.0,
        odds_total: '-105',
        sources: ['https://api.the-odds-api.com'],
      },
    ];
    
    const { data: nflOddsGamesData, error: nflOddsGamesError } = await supabase
      .from('odds_games')
      .insert(nflOddsGames)
      .select();
    
    if (nflOddsGamesError) {
      console.error('Error inserting NFL odds games:', nflOddsGamesError);
    } else {
      console.log(`Inserted ${nflOddsGamesData.length} NFL odds games`);
    }
  }
  
  console.log('Seeding complete!');
}

// Run the seed function
seed()
  .catch(error => {
    console.error('Error seeding database:', error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });

