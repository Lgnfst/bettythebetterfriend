import { NextApiRequest, NextApiResponse } from 'next';
import { USE_MOCK, nowUTC, nowLocal } from '../../../lib/config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { game, odds, total } = req.body;

    if (!game || !odds || !total) {
      return res.status(400).json({ error: 'Missing required parameters: game, odds, total' });
    }

    if (USE_MOCK) {
      // Simple mock logic to decide Over/Under
      const decision = Math.random() > 0.5 ? 'Over' : 'Under';
      
      // Preserve odds exactly as provided
      const confidence = 0.55 + (Math.random() * 0.03 - 0.015); // 0.535 to 0.565
      
      return res.status(200).json({
        game,
        total,
        odds,
        decision,
        confidence: Number(confidence.toFixed(3)),
        reasoning: `Based on mock analysis, the ${decision} is slightly favored for this total.`,
        sources: ["mock://odds"],
        generatedAtUTC: nowUTC(),
        generatedAtLocal: nowLocal()
      });
    } else {
      // Real API implementation would go here
      return res.status(501).json({ error: 'Real API not implemented yet' });
    }
  } catch (error) {
    console.error('Error generating pick:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

