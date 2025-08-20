import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedDatabase() {
  console.log('Starting database seed...');

  // Seed MLB teams
  const mlbTeams = [
    { league: 'mlb', name: 'Los Angeles Dodgers', abbr: 'LAD', provider_ids: { sportsdata: 1, mlbstats: 119 } },
    { league: 'mlb', name: 'New York Yankees', abbr: 'NYY', provider_ids: { sportsdata: 2, mlbstats: 147 } },
    { league: 'mlb', name: 'Boston Red Sox', abbr: 'BOS', provider_ids: { sportsdata: 3, mlbstats: 111 } },
    { league: 'mlb', name: 'Chicago Cubs', abbr: 'CHC', provider_ids: { sportsdata: 4, mlbstats: 112 } },
    { league: 'mlb', name: 'San Francisco Giants', abbr: 'SF', provider_ids: { sportsdata: 5, mlbstats: 137 } },
  ];

  // Seed NBA teams
  const nbaTeams = [
    { league: 'nba', name: 'Los Angeles Lakers', abbr: 'LAL', provider_ids: { sportsdata: 101 } },
    { league: 'nba', name: 'Boston Celtics', abbr: 'BOS', provider_ids: { sportsdata: 102 } },
    { league: 'nba', name: 'Golden State Warriors', abbr: 'GSW', provider_ids: { sportsdata: 103 } },
    { league: 'nba', name: 'Chicago Bulls', abbr: 'CHI', provider_ids: { sportsdata: 104 } },
    { league: 'nba', name: 'Miami Heat', abbr: 'MIA', provider_ids: { sportsdata: 105 } },
  ];

  // Seed NFL teams
  const nflTeams = [
    { league: 'nfl', name: 'Kansas City Chiefs', abbr: 'KC', provider_ids: { sportsdata: 201 } },
    { league: 'nfl', name: 'San Francisco 49ers', abbr: 'SF', provider_ids: { sportsdata: 202 } },
    { league: 'nfl', name: 'Dallas Cowboys', abbr: 'DAL', provider_ids: { sportsdata: 203 } },
    { league: 'nfl', name: 'Green Bay Packers', abbr: 'GB', provider_ids: { sportsdata: 204 } },
    { league: 'nfl', name: 'Tampa Bay Buccaneers', abbr: 'TB', provider_ids: { sportsdata: 205 } },
  ];

  // Insert teams
  console.log('Inserting teams...');
  const { data: mlbTeamsData, error: mlbTeamsError } = await supabase.from('teams').insert(mlbTeams).select();
  if (mlbTeamsError) {
    console.error('Error inserting MLB teams:', mlbTeamsError);
  } else {
    console.log(`Inserted ${mlbTeamsData.length} MLB teams`);
  }

  const { data: nbaTeamsData, error: nbaTeamsError } = await supabase.from('teams').insert(nbaTeams).select();
  if (nbaTeamsError) {
    console.error('Error inserting NBA teams:', nbaTeamsError);
  } else {
    console.log(`Inserted ${nbaTeamsData.length} NBA teams`);
  }

  const { data: nflTeamsData, error: nflTeamsError } = await supabase.from('teams').insert(nflTeams).select();
  if (nflTeamsError) {
    console.error('Error inserting NFL teams:', nflTeamsError);
  } else {
    console.log(`Inserted ${nflTeamsData.length} NFL teams`);
  }

  // Get all teams for player seeding
  const { data: allTeams, error: allTeamsError } = await supabase.from('teams').select('id, league, abbr');
  if (allTeamsError) {
    console.error('Error fetching teams:', allTeamsError);
    return;
  }

  // Seed players
  console.log('Inserting players...');
  const players = [];

  // MLB players
  const mlbTeamIds = allTeams.filter(team => team.league === 'mlb').map(team => ({ id: team.id, abbr: team.abbr }));
  mlbTeamIds.forEach(team => {
    if (team.abbr === 'LAD') {
      players.push({
        league: 'mlb',
        team_id: team.id,
        name: 'Mookie Betts',
        provider_ids: { sportsdata: 10001 },
      });
      players.push({
        league: 'mlb',
        team_id: team.id,
        name: 'Freddie Freeman',
        provider_ids: { sportsdata: 10002 },
      });
    } else if (team.abbr === 'NYY') {
      players.push({
        league: 'mlb',
        team_id: team.id,
        name: 'Aaron Judge',
        provider_ids: { sportsdata: 10003 },
      });
    }
  });

  // NBA players
  const nbaTeamIds = allTeams.filter(team => team.league === 'nba').map(team => ({ id: team.id, abbr: team.abbr }));
  nbaTeamIds.forEach(team => {
    if (team.abbr === 'LAL') {
      players.push({
        league: 'nba',
        team_id: team.id,
        name: 'LeBron James',
        provider_ids: { sportsdata: 20001 },
      });
    } else if (team.abbr === 'GSW') {
      players.push({
        league: 'nba',
        team_id: team.id,
        name: 'Stephen Curry',
        provider_ids: { sportsdata: 20002 },
      });
    }
  });

  // NFL players
  const nflTeamIds = allTeams.filter(team => team.league === 'nfl').map(team => ({ id: team.id, abbr: team.abbr }));
  nflTeamIds.forEach(team => {
    if (team.abbr === 'KC') {
      players.push({
        league: 'nfl',
        team_id: team.id,
        name: 'Patrick Mahomes',
        provider_ids: { sportsdata: 30001 },
      });
    } else if (team.abbr === 'SF') {
      players.push({
        league: 'nfl',
        team_id: team.id,
        name: 'Christian McCaffrey',
        provider_ids: { sportsdata: 30002 },
      });
    }
  });

  const { data: playersData, error: playersError } = await supabase.from('players').insert(players).select();
  if (playersError) {
    console.error('Error inserting players:', playersError);
  } else {
    console.log(`Inserted ${playersData.length} players`);
  }

  // Seed standings
  console.log('Inserting standings...');
  const standings = [];

  // MLB standings
  mlbTeamIds.forEach(team => {
    const wins = Math.floor(Math.random() * 50) + 50;
    const losses = 162 - wins;
    standings.push({
      team_id: team.id,
      wins,
      losses,
      ties_or_ots: null,
      record_as_of: new Date().toISOString().split('T')[0],
      streak: Math.random() > 0.5 ? `W${Math.floor(Math.random() * 5) + 1}` : `L${Math.floor(Math.random() * 3) + 1}`,
      last_five: ['W', 'L', 'W', 'L', 'W'].sort(() => Math.random() - 0.5).join(''),
      sources: ['https://sportsdata.io', 'https://statsapi.mlb.com'],
      notes: null,
    });
  });

  // NBA standings
  nbaTeamIds.forEach(team => {
    const wins = Math.floor(Math.random() * 30) + 20;
    const losses = 82 - wins;
    standings.push({
      team_id: team.id,
      wins,
      losses,
      ties_or_ots: null,
      record_as_of: new Date().toISOString().split('T')[0],
      streak: Math.random() > 0.5 ? `W${Math.floor(Math.random() * 5) + 1}` : `L${Math.floor(Math.random() * 3) + 1}`,
      last_five: ['W', 'L', 'W', 'L', 'W'].sort(() => Math.random() - 0.5).join(''),
      sources: ['https://sportsdata.io', 'https://www.basketball-reference.com'],
      notes: null,
    });
  });

  // NFL standings
  nflTeamIds.forEach(team => {
    const wins = Math.floor(Math.random() * 10) + 2;
    const losses = 17 - wins;
    standings.push({
      team_id: team.id,
      wins,
      losses,
      ties_or_ots: 0,
      record_as_of: new Date().toISOString().split('T')[0],
      streak: Math.random() > 0.5 ? `W${Math.floor(Math.random() * 3) + 1}` : `L${Math.floor(Math.random() * 2) + 1}`,
      last_five: ['W', 'L', 'W', 'L', 'W'].sort(() => Math.random() - 0.5).join(''),
      sources: ['https://sportsdata.io', 'https://www.pro-football-reference.com'],
      notes: null,
    });
  });

  const { data: standingsData, error: standingsError } = await supabase.from('standings').insert(standings).select();
  if (standingsError) {
    console.error('Error inserting standings:', standingsError);
  } else {
    console.log(`Inserted ${standingsData.length} standings`);
  }

  // Get all players for game logs seeding
  const { data: allPlayers, error: allPlayersError } = await supabase.from('players').select('id, league, name');
  if (allPlayersError) {
    console.error('Error fetching players:', allPlayersError);
    return;
  }

  // Seed player game logs
  console.log('Inserting player game logs...');
  const gameLogs = [];

  // Generate dates for the last 10 days
  const dates = [];
  for (let i = 0; i < 10; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }

  // MLB game logs
  allPlayers.filter(player => player.league === 'mlb').forEach(player => {
    dates.forEach(date => {
      gameLogs.push({
        player_id: player.id,
        game_date: date,
        opponent_abbr: ['SF', 'NYY', 'BOS', 'CHC'][Math.floor(Math.random() * 4)],
        home_away: Math.random() > 0.5 ? 'H' : 'A',
        stats: {
          hits: Math.floor(Math.random() * 5),
          total_bases: Math.floor(Math.random() * 8),
          hr: Math.floor(Math.random() * 2),
          rbi: Math.floor(Math.random() * 4),
          runs: Math.floor(Math.random() * 3),
          bb: Math.floor(Math.random() * 3),
          so: Math.floor(Math.random() * 4),
        },
        sources: ['https://sportsdata.io'],
      });
    });
  });

  // NBA game logs
  allPlayers.filter(player => player.league === 'nba').forEach(player => {
    dates.forEach(date => {
      gameLogs.push({
        player_id: player.id,
        game_date: date,
        opponent_abbr: ['LAL', 'BOS', 'GSW', 'CHI', 'MIA'][Math.floor(Math.random() * 5)],
        home_away: Math.random() > 0.5 ? 'H' : 'A',
        stats: {
          points: Math.floor(Math.random() * 30) + 10,
          rebounds: Math.floor(Math.random() * 15),
          assists: Math.floor(Math.random() * 10),
          threes: Math.floor(Math.random() * 6),
        },
        sources: ['https://sportsdata.io'],
      });
    });
  });

  // NFL game logs
  allPlayers.filter(player => player.league === 'nfl').forEach(player => {
    for (let i = 0; i < 5; i++) {
      const gameDate = new Date();
      gameDate.setDate(gameDate.getDate() - (i * 7)); // Weekly games
      gameLogs.push({
        player_id: player.id,
        game_date: gameDate.toISOString().split('T')[0],
        opponent_abbr: ['KC', 'SF', 'DAL', 'GB', 'TB'][Math.floor(Math.random() * 5)],
        home_away: Math.random() > 0.5 ? 'H' : 'A',
        stats: {
          pass_yds: Math.floor(Math.random() * 300) + 100,
          rush_yds: Math.floor(Math.random() * 100),
          rec_yds: Math.floor(Math.random() * 100),
          receptions: Math.floor(Math.random() * 8),
          pass_td: Math.floor(Math.random() * 4),
          rush_td: Math.floor(Math.random() * 2),
          rec_td: Math.floor(Math.random() * 2),
        },
        sources: ['https://sportsdata.io'],
      });
    }
  });

  // Insert game logs in batches to avoid exceeding request size limits
  const batchSize = 100;
  for (let i = 0; i < gameLogs.length; i += batchSize) {
    const batch = gameLogs.slice(i, i + batchSize);
    const { data: gameLogsData, error: gameLogsError } = await supabase.from('player_game_logs').insert(batch);
    if (gameLogsError) {
      console.error(`Error inserting game logs batch ${i / batchSize + 1}:`, gameLogsError);
    } else {
      console.log(`Inserted game logs batch ${i / batchSize + 1}`);
    }
  }

  // Seed odds games
  console.log('Inserting odds games...');
  const oddsGames = [];

  // MLB odds games
  const mlbHomeTeams = mlbTeamIds.slice(0, 2);
  const mlbAwayTeams = mlbTeamIds.slice(2, 4);
  mlbHomeTeams.forEach((homeTeam, index) => {
    const awayTeam = mlbAwayTeams[index];
    const gameDate = new Date();
    gameDate.setDate(gameDate.getDate() + 1);
    gameDate.setHours(19, 0, 0, 0);
    oddsGames.push({
      league: 'mlb',
      home_team_id: homeTeam.id,
      away_team_id: awayTeam.id,
      game_datetime: gameDate.toISOString(),
      market_total: 8.5,
      odds_total: '-110',
      sources: ['https://api.the-odds-api.com'],
    });
  });

  // NBA odds games
  const nbaHomeTeams = nbaTeamIds.slice(0, 2);
  const nbaAwayTeams = nbaTeamIds.slice(2, 4);
  nbaHomeTeams.forEach((homeTeam, index) => {
    const awayTeam = nbaAwayTeams[index];
    const gameDate = new Date();
    gameDate.setDate(gameDate.getDate() + 1);
    gameDate.setHours(20, 0, 0, 0);
    oddsGames.push({
      league: 'nba',
      home_team_id: homeTeam.id,
      away_team_id: awayTeam.id,
      game_datetime: gameDate.toISOString(),
      market_total: 220.5,
      odds_total: '-110',
      sources: ['https://api.the-odds-api.com'],
    });
  });

  // NFL odds games
  const nflHomeTeams = nflTeamIds.slice(0, 2);
  const nflAwayTeams = nflTeamIds.slice(2, 4);
  nflHomeTeams.forEach((homeTeam, index) => {
    const awayTeam = nflAwayTeams[index];
    const gameDate = new Date();
    gameDate.setDate(gameDate.getDate() + (7 - gameDate.getDay())); // Next Sunday
    gameDate.setHours(13, 0, 0, 0);
    oddsGames.push({
      league: 'nfl',
      home_team_id: homeTeam.id,
      away_team_id: awayTeam.id,
      game_datetime: gameDate.toISOString(),
      market_total: 48.5,
      odds_total: '-110',
      sources: ['https://api.the-odds-api.com'],
    });
  });

  const { data: oddsGamesData, error: oddsGamesError } = await supabase.from('odds_games').insert(oddsGames).select();
  if (oddsGamesError) {
    console.error('Error inserting odds games:', oddsGamesError);
  } else {
    console.log(`Inserted ${oddsGamesData.length} odds games`);
  }

  console.log('Database seed completed!');
}

seedDatabase()
  .catch(error => {
    console.error('Error seeding database:', error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });

