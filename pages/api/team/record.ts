import { NextApiRequest, NextApiResponse } from 'next';
import { USE_MOCK, nowUTC, nowLocal } from '../../../lib/config';
import { mockStandings as mlbStandings } from '../../../lib/mock/standings.mlb';
import { mockStandings as nbaStandings } from '../../../lib/mock/standings.nba';
import { mockStandings as nflStandings } from '../../../lib/mock/standings.nfl';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { league, team } = req.query;

  if (!league || !team) {
    return res.status(400).json({ error: 'Missing required parameters: league and team' });
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

      // Find team by abbr or name
      const teamData = mockData.find(t => 
        t.abbr.toLowerCase() === String(team).toLowerCase() || 
        t.name.toLowerCase().includes(String(team).toLowerCase())
      );

      if (!teamData) {
        return res.status(404).json({ error: 'Team not found' });
      }

      // Generate mock recent games
      const opponents = mockData.filter(t => t.abbr !== teamData.abbr).map(t => t.abbr);
      const recent5 = Array(5).fill(null).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (i * 2)); // Every other day
        const opponentAbbr = opponents[Math.floor(Math.random() * opponents.length)];
        const homeAway = Math.random() > 0.5 ? 'home' : 'away';
        const win = teamData.lastFive[i] === 1;
        const ownScore = win ? Math.floor(Math.random() * 10) + 3 : Math.floor(Math.random() * 3);
        const oppScore = win ? Math.floor(Math.random() * 3) : Math.floor(Math.random() * 10) + 3;
        const score = \`\${ownScore}-\${oppScore}\`;
        
        return {
          date: date.toISOString().split('T')[0],
          opponentAbbr,
          homeAway,
          result: win ? 'W' : 'L',
          score
        };
      });

      return res.status(200).json({
        ...teamData,
        recent5,
        generatedAtUTC: nowUTC(),
        generatedAtLocal: nowLocal(),
        sources: [...teamData.sources, 'mock://team/record']
      });
    } else {
      // Real API implementation would go here
      return res.status(501).json({ error: 'Real API not implemented yet' });
    }
  } catch (error) {
    console.error('Error fetching team record:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

