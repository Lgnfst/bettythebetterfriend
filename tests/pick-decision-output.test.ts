import { describe, it, expect } from 'vitest';
import { pickResponseSchema } from '../src/lib/validation';
import { z } from 'zod';

describe('Pick Decision Output', () => {
  it('should validate a valid pick response with "Over"', () => {
    const validResponse = {
      league: 'nba',
      game: {
        away: 'Los Angeles Lakers',
        home: 'Boston Celtics',
        line: 220.5,
        odds: '-110',
      },
      pick: 'Over',
      confidence: 0.75,
      reasoning: 'Both teams have high-scoring offenses and have been scoring above their season averages in recent games.',
      signals: {
        recentFormNote: 'Lakers averaging 115 PPG in last 5, Celtics averaging 112 PPG.',
        injuryOrRestNote: null,
        contextNote: null,
      },
      generatedAtUTC: '2023-01-01T12:00:00Z',
      generatedAtLocal: '2023-01-01 06:00:00 America/Chicago',
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
      confidence: 0.75,
      reasoning: 'Both teams have strong defenses and have been scoring below their season averages in recent games.',
      signals: {
        recentFormNote: 'Lakers averaging 105 PPG in last 5, Celtics averaging 102 PPG.',
        injuryOrRestNote: null,
        contextNote: null,
      },
      generatedAtUTC: '2023-01-01T12:00:00Z',
      generatedAtLocal: '2023-01-01 06:00:00 America/Chicago',
      sources: ['https://sportsdata.io', 'https://api.the-odds-api.com'],
    };
    
    const result = pickResponseSchema.safeParse(validResponse);
    
    expect(result.success).toBe(true);
  });
  
  it('should reject a pick response with invalid pick value "u/o"', () => {
    const invalidResponse = {
      league: 'nba',
      game: {
        away: 'Los Angeles Lakers',
        home: 'Boston Celtics',
        line: 220.5,
        odds: '-110',
      },
      pick: 'u/o', // Invalid value
      confidence: 0.75,
      reasoning: 'Both teams have high-scoring offenses and have been scoring above their season averages in recent games.',
      signals: {
        recentFormNote: 'Lakers averaging 115 PPG in last 5, Celtics averaging 112 PPG.',
        injuryOrRestNote: null,
        contextNote: null,
      },
      generatedAtUTC: '2023-01-01T12:00:00Z',
      generatedAtLocal: '2023-01-01 06:00:00 America/Chicago',
      sources: ['https://sportsdata.io', 'https://api.the-odds-api.com'],
    };
    
    const result = pickResponseSchema.safeParse(invalidResponse);
    
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('pick');
    }
  });
  
  it('should reject a pick response with invalid pick value "o"', () => {
    const invalidResponse = {
      league: 'nba',
      game: {
        away: 'Los Angeles Lakers',
        home: 'Boston Celtics',
        line: 220.5,
        odds: '-110',
      },
      pick: 'o', // Invalid value
      confidence: 0.75,
      reasoning: 'Both teams have high-scoring offenses and have been scoring above their season averages in recent games.',
      signals: {
        recentFormNote: 'Lakers averaging 115 PPG in last 5, Celtics averaging 112 PPG.',
        injuryOrRestNote: null,
        contextNote: null,
      },
      generatedAtUTC: '2023-01-01T12:00:00Z',
      generatedAtLocal: '2023-01-01 06:00:00 America/Chicago',
      sources: ['https://sportsdata.io', 'https://api.the-odds-api.com'],
    };
    
    const result = pickResponseSchema.safeParse(invalidResponse);
    
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('pick');
    }
  });
  
  it('should reject a pick response with invalid pick value "u"', () => {
    const invalidResponse = {
      league: 'nba',
      game: {
        away: 'Los Angeles Lakers',
        home: 'Boston Celtics',
        line: 220.5,
        odds: '-110',
      },
      pick: 'u', // Invalid value
      confidence: 0.75,
      reasoning: 'Both teams have strong defenses and have been scoring below their season averages in recent games.',
      signals: {
        recentFormNote: 'Lakers averaging 105 PPG in last 5, Celtics averaging 102 PPG.',
        injuryOrRestNote: null,
        contextNote: null,
      },
      generatedAtUTC: '2023-01-01T12:00:00Z',
      generatedAtLocal: '2023-01-01 06:00:00 America/Chicago',
      sources: ['https://sportsdata.io', 'https://api.the-odds-api.com'],
    };
    
    const result = pickResponseSchema.safeParse(invalidResponse);
    
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('pick');
    }
  });
  
  it('should reject a pick response with confidence outside the 0-1 range', () => {
    const invalidResponse = {
      league: 'nba',
      game: {
        away: 'Los Angeles Lakers',
        home: 'Boston Celtics',
        line: 220.5,
        odds: '-110',
      },
      pick: 'Over',
      confidence: 1.5, // Invalid value
      reasoning: 'Both teams have high-scoring offenses and have been scoring above their season averages in recent games.',
      signals: {
        recentFormNote: 'Lakers averaging 115 PPG in last 5, Celtics averaging 112 PPG.',
        injuryOrRestNote: null,
        contextNote: null,
      },
      generatedAtUTC: '2023-01-01T12:00:00Z',
      generatedAtLocal: '2023-01-01 06:00:00 America/Chicago',
      sources: ['https://sportsdata.io', 'https://api.the-odds-api.com'],
    };
    
    const result = pickResponseSchema.safeParse(invalidResponse);
    
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('confidence');
    }
  });
  
  it('should reject a pick response with missing required fields', () => {
    const invalidResponse = {
      league: 'nba',
      game: {
        away: 'Los Angeles Lakers',
        home: 'Boston Celtics',
        line: 220.5,
        odds: '-110',
      },
      // Missing pick field
      confidence: 0.75,
      reasoning: 'Both teams have high-scoring offenses and have been scoring above their season averages in recent games.',
      signals: {
        recentFormNote: 'Lakers averaging 115 PPG in last 5, Celtics averaging 112 PPG.',
        injuryOrRestNote: null,
        contextNote: null,
      },
      generatedAtUTC: '2023-01-01T12:00:00Z',
      generatedAtLocal: '2023-01-01 06:00:00 America/Chicago',
      sources: ['https://sportsdata.io', 'https://api.the-odds-api.com'],
    };
    
    const result = pickResponseSchema.safeParse(invalidResponse);
    
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].code).toBe('invalid_type');
    }
  });
});

