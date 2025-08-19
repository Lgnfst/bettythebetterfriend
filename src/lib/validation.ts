import { z } from 'zod';

// League validation
export const leagueSchema = z.enum(['mlb', 'nba', 'nfl']);

// Standings API validation
export const teamStandingSchema = z.object({
  teamName: z.string(),
  abbr: z.string(),
  record: z.object({
    wins: z.number().int().nonnegative(),
    losses: z.number().int().nonnegative(),
    tiesOrOT: z.number().int().nonnegative().nullable(),
  }),
  streak: z.string(),
  lastFive: z.string(),
  recordAsOf: z.string(),
  sources: z.array(z.string().url()),
  notes: z.string().nullable(),
});

export const standingsResponseSchema = z.object({
  league: leagueSchema,
  asOf: z.string(),
  teams: z.array(teamStandingSchema),
  generatedAtUTC: z.string(),
  generatedAtLocal: z.string(),
  sources: z.array(z.string().url()),
});

// Team Record API validation
export const gameResultSchema = z.object({
  date: z.string(),
  opponentAbbr: z.string(),
  homeAway: z.enum(['H', 'A']),
  result: z.enum(['W', 'L', 'T']),
  score: z.string(),
});

export const teamRecordResponseSchema = z.object({
  league: leagueSchema,
  team: z.object({
    name: z.string(),
    abbr: z.string(),
  }),
  record: z.object({
    wins: z.number().int().nonnegative(),
    losses: z.number().int().nonnegative(),
    tiesOrOT: z.number().int().nonnegative().nullable(),
    asOf: z.string(),
  }),
  streak: z.string(),
  lastFive: z.string(),
  lastGames: z.array(gameResultSchema),
  generatedAtUTC: z.string(),
  generatedAtLocal: z.string(),
  sources: z.array(z.string().url()),
  notes: z.string().nullable(),
});

// Player Trend API validation
export const gameStatSchema = z.object({
  gameDate: z.string(),
  opponent: z.string(),
  homeAway: z.enum(['H', 'A']),
  value: z.number(),
});

export const statSummarySchema = z.object({
  games: z.number().int().nonnegative(),
  avg: z.number(),
  min: z.number(),
  max: z.number(),
});

export const playerTrendResponseSchema = z.object({
  league: leagueSchema,
  player: z.object({
    name: z.string(),
    team: z.string(),
  }),
  stat: z.string(),
  games: z.number().int().positive(),
  series: z.array(gameStatSchema),
  summary: statSummarySchema,
  generatedAtUTC: z.string(),
  generatedAtLocal: z.string(),
  sources: z.array(z.string().url()),
});

// Pick API validation
export const pickRequestSchema = z.object({
  league: leagueSchema,
  away: z.string(),
  home: z.string(),
  line: z.number(),
  odds: z.string(),
});

export const pickResponseSchema = z.object({
  league: leagueSchema,
  game: z.object({
    away: z.string(),
    home: z.string(),
    line: z.number(),
    odds: z.string(),
  }),
  pick: z.enum(['Over', 'Under']), // Explicitly only allow "Over" or "Under"
  confidence: z.number().min(0).max(1),
  reasoning: z.string(),
  signals: z.object({
    recentFormNote: z.string().nullable(),
    injuryOrRestNote: z.string().nullable(),
    contextNote: z.string().nullable(),
  }),
  generatedAtUTC: z.string(),
  generatedAtLocal: z.string(),
  sources: z.array(z.string().url()),
});

