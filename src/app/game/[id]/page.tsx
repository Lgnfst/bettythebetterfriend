import { notFound } from 'next/navigation';
import { GamePrediction } from '@/components/game/game-prediction';
import { getOddsGameById } from '@/lib/db';
import { PickResponse, League } from '@/types/api.types';

// Validate league parameter
function isValidLeague(league: string): league is League {
  return ['mlb', 'nba', 'nfl'].includes(league);
}

async function getGamePrediction(gameId: string): Promise<PickResponse> {
  try {
    // Get game data from database
    const gameData = await getOddsGameById(gameId);
    
    if (!gameData || !gameData.home_team || !gameData.away_team) {
      throw new Error('Game data not found');
    }
    
    // Make API request to get prediction
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/pick/total`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        league: gameData.league,
        away: gameData.away_team.abbr,
        home: gameData.home_team.abbr,
        line: gameData.market_total,
        odds: gameData.odds_total,
      }),
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch game prediction');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching game prediction:', error);
    throw error;
  }
}

export default async function GamePage({ params }: { params: { id: string } }) {
  // Fetch game prediction
  let predictionData: PickResponse;
  try {
    predictionData = await getGamePrediction(params.id);
  } catch (error) {
    console.error(`Error fetching game prediction:`, error);
    
    // Return error state
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Game Prediction
          </h1>
        </div>
        
        <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-500 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                Error loading game prediction
              </h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                <p>
                  Unable to load game prediction. Please try again later.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Game Prediction: {predictionData.game.away} @ {predictionData.game.home}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {predictionData.league.toUpperCase()} • Total: {predictionData.game.line}
        </p>
      </div>
      
      <GamePrediction prediction={predictionData} />
    </div>
  );
}

