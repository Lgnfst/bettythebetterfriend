import { describe, it, expect } from 'vitest';
import { verifyTeamRecord, calculateStreak, calculateLastFive } from '../src/lib/utils/data-transformation';

describe('Standings Parser', () => {
  describe('verifyTeamRecord', () => {
    it('should verify matching records', () => {
      const primary = { wins: 10, losses: 5 };
      const secondary = { wins: 10, losses: 5 };
      
      const result = verifyTeamRecord(primary, secondary);
      
      expect(result.verified).toBe(true);
      expect(result.notes).toBeNull();
    });
    
    it('should detect mismatched records', () => {
      const primary = { wins: 10, losses: 5 };
      const secondary = { wins: 9, losses: 6 };
      
      const result = verifyTeamRecord(primary, secondary);
      
      expect(result.verified).toBe(false);
      expect(result.notes).toContain('Record mismatch');
    });
    
    it('should handle missing data', () => {
      const primary = { wins: 10, losses: 5 };
      const secondary = null;
      
      const result = verifyTeamRecord(primary, secondary);
      
      expect(result.verified).toBe(false);
      expect(result.notes).toContain('Missing data');
    });
  });
  
  describe('calculateStreak', () => {
    it('should calculate winning streak', () => {
      const results = ['W', 'W', 'W', 'L', 'W'];
      
      const streak = calculateStreak(results);
      
      expect(streak).toBe('W3');
    });
    
    it('should calculate losing streak', () => {
      const results = ['L', 'L', 'W', 'W', 'W'];
      
      const streak = calculateStreak(results);
      
      expect(streak).toBe('L2');
    });
    
    it('should handle empty results', () => {
      const results: ('W' | 'L' | 'T')[] = [];
      
      const streak = calculateStreak(results);
      
      expect(streak).toBe('');
    });
  });
  
  describe('calculateLastFive', () => {
    it('should return the last five results', () => {
      const results = ['W', 'L', 'W', 'L', 'W', 'L', 'W'];
      
      const lastFive = calculateLastFive(results);
      
      expect(lastFive).toBe('WLWLW');
    });
    
    it('should handle fewer than five results', () => {
      const results = ['W', 'L', 'W'];
      
      const lastFive = calculateLastFive(results);
      
      expect(lastFive).toBe('WLW');
    });
    
    it('should handle empty results', () => {
      const results: ('W' | 'L' | 'T')[] = [];
      
      const lastFive = calculateLastFive(results);
      
      expect(lastFive).toBe('');
    });
  });
});

