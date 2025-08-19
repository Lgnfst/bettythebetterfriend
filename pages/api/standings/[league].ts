import { NextApiRequest, NextApiResponse } from 'next';
import { USE_MOCK, nowUTC, nowLocal } from '../../../lib/config';
import { mockStandings as mlbStandings } from '../../../lib/mock/standings.mlb';
import { mockStandings as nbaStandings } from '../../../lib/mock/standings.nba';
import { mockStandings as nflStandings } from '../../../lib/mock/standings.nfl';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { league } = req.query;
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (USE_MOCK) {
      let mockData;
      
      switch (league) {
        case 'mlb':
          mockData = mlbStandings;
          break;
        case 'nba':
          mockData = nbaStandings;
          break;
        case 'nfl':
          mockData = nflStandings;
          break;
        default:
          return res.status(400).json({ error: 'Invalid league' });
      }

      const today = new Date().toISOString().split('T')[0];
      
      return res.status(200).json({
        league,
        asOf: today,
        teams: mockData,
        generatedAtUTC: nowUTC(),
        generatedAtLocal: nowLocal()
      });
    } else {
      // Real API implementation would go here
      // For now, return a not implemented error
      return res.status(501).json({ error: 'Real API not implemented yet' });
    }
  } catch (error) {
    console.error('Error fetching standings:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

