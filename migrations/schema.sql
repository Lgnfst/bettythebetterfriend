-- Create teams table
CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  league TEXT NOT NULL,
  name TEXT NOT NULL,
  abbr TEXT NOT NULL,
  provider_ids JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create standings table
CREATE TABLE IF NOT EXISTS standings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES teams(id),
  wins INTEGER NOT NULL,
  losses INTEGER NOT NULL,
  ties_or_ots INTEGER,
  record_as_of DATE NOT NULL,
  streak TEXT NOT NULL,
  last_five TEXT NOT NULL,
  sources TEXT[] NOT NULL,
  notes TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create players table
CREATE TABLE IF NOT EXISTS players (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  league TEXT NOT NULL,
  team_id UUID NOT NULL REFERENCES teams(id),
  name TEXT NOT NULL,
  provider_ids JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create player_game_logs table
CREATE TABLE IF NOT EXISTS player_game_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_id UUID NOT NULL REFERENCES players(id),
  game_date DATE NOT NULL,
  opponent_abbr TEXT NOT NULL,
  home_away CHAR(1) NOT NULL,
  stats JSONB NOT NULL,
  sources TEXT[] NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create odds_games table
CREATE TABLE IF NOT EXISTS odds_games (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  league TEXT NOT NULL,
  away_team_id UUID NOT NULL REFERENCES teams(id),
  home_team_id UUID NOT NULL REFERENCES teams(id),
  game_datetime TIMESTAMPTZ NOT NULL,
  market_total NUMERIC NOT NULL,
  odds_total TEXT NOT NULL,
  sources TEXT[] NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_teams_league ON teams(league);
CREATE INDEX IF NOT EXISTS idx_teams_abbr ON teams(abbr);
CREATE INDEX IF NOT EXISTS idx_standings_team_id ON standings(team_id);
CREATE INDEX IF NOT EXISTS idx_players_team_id ON players(team_id);
CREATE INDEX IF NOT EXISTS idx_players_league ON players(league);
CREATE INDEX IF NOT EXISTS idx_player_game_logs_player_id ON player_game_logs(player_id);
CREATE INDEX IF NOT EXISTS idx_player_game_logs_game_date ON player_game_logs(game_date);
CREATE INDEX IF NOT EXISTS idx_odds_games_league ON odds_games(league);
CREATE INDEX IF NOT EXISTS idx_odds_games_game_datetime ON odds_games(game_datetime);

