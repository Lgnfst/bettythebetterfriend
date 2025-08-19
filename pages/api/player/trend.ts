import { NextApiRequest, NextApiResponse } from 'next';
import { USE_MOCK, nowUTC, nowLocal } from '../../../lib/config';
import { mockPlayerTrend as mlbPlayerTrend } from '../../../lib/mock/playerLogs.mlb';
import { mockPlayerTrend as nbaPlayerTrend } from '../../../lib/mock/playerLogs.nba';
import { mockPlayerTrend as nflPlayerTrend } from '../../../lib/mock/playerLogs.nfl';
import { summarize } from '../../../lib/stats';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { league, player, stat } = req.query;

  if (!league) {
    return res.status(400).json({ error: 'Missing required parameter: league' });
  }

  try {
    if (USE_MOCK) {
      let mockData;
      
      switch (league) {
        case 'mlb':
          mockData = mlbPlayerTrend;
          break;
        case 'nba':
          mockData = nbaPlayerTrend;
          break;
        case 'nfl':
          mockData = nflPlayerTrend;
          break;
        default:
          return res.status(400).json({ error: 'Invalid league' });
      }

      // If player is specified, we would filter or fetch specific player data
      // For mock mode, we'll just return the mock data we have
      
      const summary = summarize(mockData.series);

      return res.status(200).json({
        ...mockData,
        summary,
        notes: "mock data",
        generatedAtUTC: nowUTC(),
        generatedAtLocal: nowLocal()
      });
    } else {
      // Real API implementation would go here
      return res.status(501).json({ error: 'Real API not implemented yet' });
    }
  } catch (error) {
    console.error('Error fetching player trend:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

