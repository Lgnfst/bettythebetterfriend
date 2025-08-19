import { describe, it, expect } from 'vitest';
import { calculateStatSummary, extractStatValue } from '../src/lib/utils/data-transformation';

describe('Player Trend Aggregator', () => {
  describe('calculateStatSummary', () => {
    it('should calculate summary statistics correctly', () => {
      const values = [10, 15, 5, 20, 12];
      
      const summary = calculateStatSummary(values);
      
      expect(summary.games).toBe(5);
      expect(summary.avg).toBe(12.4);
      expect(summary.min).toBe(5);
      expect(summary.max).toBe(20);
    });
    
    it('should handle empty values array', () => {
      const values: number[] = [];
      
      const summary = calculateStatSummary(values);
      
      expect(summary.games).toBe(0);
      expect(summary.avg).toBe(0);
      expect(summary.min).toBe(0);
      expect(summary.max).toBe(0);
    });
    
    it('should handle single value array', () => {
      const values = [10];
      
      const summary = calculateStatSummary(values);
      
      expect(summary.games).toBe(1);
      expect(summary.avg).toBe(10);
      expect(summary.min).toBe(10);
      expect(summary.max).toBe(10);
    });
  });
  
  describe('extractStatValue', () => {
    it('should extract MLB hits stat correctly', () => {
      const gameLog = {
        stats: {
          hits: 3,
          hr: 1,
          rbi: 2,
        },
      };
      
      const value = extractStatValue(gameLog, 'hits');
      
      expect(value).toBe(3);
    });
    
    it('should extract NBA points stat correctly', () => {
      const gameLog = {
        stats: {
          points: 25,
          rebounds: 10,
          assists: 5,
        },
      };
      
      const value = extractStatValue(gameLog, 'points');
      
      expect(value).toBe(25);
    });
    
    it('should extract NFL passing yards stat correctly', () => {
      const gameLog = {
        stats: {
          pass_yds: 300,
          pass_td: 2,
          rush_yds: 20,
        },
      };
      
      const value = extractStatValue(gameLog, 'pass_yds');
      
      expect(value).toBe(300);
    });
    
    it('should return 0 for missing stats', () => {
      const gameLog = {
        stats: {
          points: 25,
        },
      };
      
      const value = extractStatValue(gameLog, 'rebounds');
      
      expect(value).toBe(0);
    });
    
    it('should throw error for unknown stat name', () => {
      const gameLog = {
        stats: {
          points: 25,
        },
      };
      
      expect(() => extractStatValue(gameLog, 'unknown_stat')).toThrow('Unknown stat name');
    });
    
    it('should handle null or undefined stats object', () => {
      const gameLog = {};
      
      const value = extractStatValue(gameLog, 'points');
      
      expect(value).toBe(0);
    });
  });
});

