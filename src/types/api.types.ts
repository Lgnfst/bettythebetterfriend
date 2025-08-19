// League types
export type League = 'mlb' | 'nba' | 'nfl';

// Standings API types
export interface TeamStanding {
  teamName: string;
  abbr: string;
  record: {
    wins: number;
    losses: number;
    tiesOrOT: number | null;
  };
  streak: string;
  lastFive: string;
  recordAsOf: string;
  sources: string[];
  notes: string | null;
}

export interface StandingsResponse {
  league: League;
  asOf: string;
  teams: TeamStanding[];
  generatedAtUTC: string;
  generatedAtLocal: string;
  sources: string[];
}

// Team Record API types
export interface GameResult {
  date: string;
  opponentAbbr: string;
  homeAway: 'H' | 'A';
  result: 'W' | 'L' | 'T';
  score: string;
}

export interface TeamRecordResponse {
  league: League;
  team: {
    name: string;
    abbr: string;
  };
  record: {
    wins: number;
    losses: number;
    tiesOrOT: number | null;
    asOf: string;
  };
  streak: string;
  lastFive: string;
  lastGames: GameResult[];
  generatedAtUTC: string;
  generatedAtLocal: string;
  sources: string[];
  notes: string | null;
}

// Player Trend API types
export interface GameStat {
  gameDate: string;
  opponent: string;
  homeAway: 'H' | 'A';
  value: number;
}

export interface StatSummary {
  games: number;
  avg: number;
  min: number;
  max: number;
}

export interface PlayerTrendResponse {
  league: League;
  player: {
    name: string;
    team: string;
  };
  stat: string;
  games: number;
  series: GameStat[];
  summary: StatSummary;
  generatedAtUTC: string;
  generatedAtLocal: string;
  sources: string[];
}

// Pick API types
export interface PickRequest {
  league: League;
  away: string;
  home: string;
  line: number;
  odds: string;
}

export interface PickResponse {
  league: League;
  game: {
    away: string;
    home: string;
    line: number;
    odds: string;
  };
  pick: 'Over' | 'Under';
  confidence: number;
  reasoning: string;
  signals: {
    recentFormNote: string | null;
    injuryOrRestNote: string | null;
    contextNote: string | null;
  };
  generatedAtUTC: string;
  generatedAtLocal: string;
  sources: string[];
}

