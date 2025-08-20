import { describe, it, expect } from 'vitest';
import { pickResponseSchema } from '../src/lib/validation';

describe('Pick Decision Output', () => {
  it('should validate a valid pick response with "Over"', () => {
    const validResponse = {
      league: 'mlb',
      game: {
        away: 'Los Angeles Dodgers',
        home: 'New York Yankees',
        line: 8.5,
        odds: '-110',
      },
      pick: 'Over',
      confidence: 0.75,
      reasoning: 'Both teams have been scoring above their season averages in recent games.',
      signals: {
        recentFormNote: 'Dodgers averaging 5.2 runs and Yankees averaging 4.8 runs in their last 5 games.',
        injuryOrRestNote: null,
        contextNote: 'Weather conditions are favorable for scoring.',
      },
      generatedAtUTC: '2023-10-15T12:00:00Z',
      generatedAtLocal: '2023-10-15 07:00:00 CDT',
      sources: ['https://sportsdata.io', 'https://api.the-odds-api.com'],
    };

    const result = pickResponseSchema.safeParse(validResponse);
    expect(result.success).toBe(true);
  });

  it('should validate a valid pick response with "Under"', () => {
    const validResponse = {
      league: 'nba',
      game: {
        away: 'Los Angeles Lakers',
        home: 'Boston Celtics',
        line: 220.5,
        odds: '-110',
      },
      pick: 'Under',
      confidence: 0.65,
      reasoning: 'Both teams have strong defensive units that have been performing well lately.',
      signals: {
        recentFormNote: 'Lakers averaging 112 points and Celtics averaging 108 points in their last 5 games.',
        injuryOrRestNote: 'Lakers star player is questionable for this game.',
        contextNote: null,
      },
      generatedAtUTC: '2023-10-15T12:00:00Z',
      generatedAtLocal: '2023-10-15 07:00:00 CDT',
      sources: ['https://sportsdata.io', 'https://api.the-odds-api.com'],
    };

    const result = pickResponseSchema.safeParse(validResponse);
    expect(result.success).toBe(true);
  });

  it('should reject a pick response with invalid pick value "u/o"', () => {
    const invalidResponse = {
      league: 'mlb',
      game: {
        away: 'Los Angeles Dodgers',
        home: 'New York Yankees',
        line: 8.5,
        odds: '-110',
      },
      pick: 'u/o', // Invalid value
      confidence: 0.75,
      reasoning: 'Both teams have been scoring above their season averages in recent games.',
      signals: {
        recentFormNote: 'Dodgers averaging 5.2 runs and Yankees averaging 4.8 runs in their last 5 games.',
        injuryOrRestNote: null,
        contextNote: 'Weather conditions are favorable for scoring.',
      },
      generatedAtUTC: '2023-10-15T12:00:00Z',
      generatedAtLocal: '2023-10-15 07:00:00 CDT',
      sources: ['https://sportsdata.io', 'https://api.the-odds-api.com'],
    };

    const result = pickResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should reject a pick response with invalid confidence value', () => {
    const invalidResponse = {
      league: 'mlb',
      game: {
        away: 'Los Angeles Dodgers',
        home: 'New York Yankees',
        line: 8.5,
        odds: '-110',
      },
      pick: 'Over',
      confidence: 1.5, // Invalid value (should be between 0 and 1)
      reasoning: 'Both teams have been scoring above their season averages in recent games.',
      signals: {
        recentFormNote: 'Dodgers averaging 5.2 runs and Yankees averaging 4.8 runs in their last 5 games.',
        injuryOrRestNote: null,
        contextNote: 'Weather conditions are favorable for scoring.',
      },
      generatedAtUTC: '2023-10-15T12:00:00Z',
      generatedAtLocal: '2023-10-15 07:00:00 CDT',
      sources: ['https://sportsdata.io', 'https://api.the-odds-api.com'],
    };

    const result = pickResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });
});

