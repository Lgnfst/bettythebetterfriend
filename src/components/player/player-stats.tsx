'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TrendChart } from '@/components/charts/trend-chart';
import { PlayerTrendResponse, League } from '@/types/api.types';

interface PlayerStatsProps {
  player: {
    id: string;
    name: string;
    league: League;
    team: {
      name: string;
      abbr: string;
    };
  };
  initialTrend?: PlayerTrendResponse;
}

export function PlayerStats({ player, initialTrend }: PlayerStatsProps) {
  const router = useRouter();
  const [trend, setTrend] = useState<PlayerTrendResponse | undefined>(initialTrend);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStat, setSelectedStat] = useState<string>(initialTrend?.stat || getDefaultStat(player.league));
  const [selectedGames, setSelectedGames] = useState<'5' | '10'>(initialTrend?.games === 10 ? '10' : '5');
  
  // Get available stats based on league
  const getAvailableStats = (league: League) => {
    switch (league) {
      case 'mlb':
        return [
          { value: 'hits', label: 'Hits' },
          { value: 'total_bases', label: 'Total Bases' },
          { value: 'hr', label: 'Home Runs' },
          { value: 'rbi', label: 'RBIs' },
          { value: 'runs', label: 'Runs' },
          { value: 'bb', label: 'Walks' },
          { value: 'so', label: 'Strikeouts' },
        ];
      case 'nba':
        return [
          { value: 'points', label: 'Points' },
          { value: 'rebounds', label: 'Rebounds' },
          { value: 'assists', label: 'Assists' },
          { value: 'threes', label: 'Three Pointers' },
        ];
      case 'nfl':
        return [
          { value: 'pass_yds', label: 'Passing Yards' },
          { value: 'rush_yds', label: 'Rushing Yards' },
          { value: 'rec_yds', label: 'Receiving Yards' },
          { value: 'receptions', label: 'Receptions' },
          { value: 'pass_td', label: 'Passing TDs' },
          { value: 'rush_td', label: 'Rushing TDs' },
          { value: 'rec_td', label: 'Receiving TDs' },
        ];
      default:
        return [];
    }
  };
  
  // Get default stat based on league
  function getDefaultStat(league: League): string {
    switch (league) {
      case 'mlb':
        return 'hits';
      case 'nba':
        return 'points';
      case 'nfl':
        return 'pass_yds';
      default:
        return '';
    }
  }
  
  // Fetch player trend data
  const fetchPlayerTrend = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch(
        `/api/player/trend?league=${player.league}&player=${player.name}&team=${player.team.abbr}&stat=${selectedStat}&games=${selectedGames}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch player trend data');
      }
      
      const data = await response.json();
      setTrend(data);
      
      // Update URL with new parameters
      router.push(
        `/player/${player.id}?league=${player.league}&stat=${selectedStat}&games=${selectedGames}`,
        { scroll: false }
      );
    } catch (error) {
      console.error('Error fetching player trend:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle stat change
  const handleStatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStat(e.target.value);
  };
  
  // Handle games change
  const handleGamesChange = (value: '5' | '10') => {
    setSelectedGames(value);
  };
  
  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPlayerTrend();
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{player.name}</h1>
            <div className="text-gray-600 dark:text-gray-400">
              {player.team.name} ({player.league.toUpperCase()})
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div>
              <label htmlFor="stat" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Stat
              </label>
              <select
                id="stat"
                value={selectedStat}
                onChange={handleStatChange}
                className="block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                {getAvailableStats(player.league).map((stat) => (
                  <option key={stat.value} value={stat.value}>
                    {stat.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Games
              </label>
              <div className="flex rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={() => handleGamesChange('5')}
                  className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                    selectedGames === '5'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  Last 5
                </button>
                <button
                  type="button"
                  onClick={() => handleGamesChange('10')}
                  className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                    selectedGames === '10'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  Last 10
                </button>
              </div>
            </div>
            
            <div className="flex items-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Update'}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {trend ? (
        <TrendChart 
          series={trend.series} 
          summary={trend.summary} 
          statName={trend.stat} 
        />
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {isLoading ? 'Loading player stats...' : 'Select a stat and number of games to view player trends.'}
          </p>
        </div>
      )}
      
      {trend && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex justify-between">
            <div>Generated at: {new Date(trend.generatedAtLocal).toLocaleString()}</div>
            <div>
              Sources: 
              {trend.sources.map((source, index) => (
                <a
                  key={index}
                  href={source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Source {index + 1}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

