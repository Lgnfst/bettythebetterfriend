import { notFound } from 'next/navigation';
import { StandingsTable } from '@/components/standings/standings-table';
import { League, StandingsResponse } from '@/types/api.types';

// Validate league parameter
function isValidLeague(league: string): league is League {
  return ['mlb', 'nba', 'nfl'].includes(league);
}

// Get league display name
function getLeagueDisplayName(league: League): string {
  const leagueNames = {
    mlb: 'Major League Baseball',
    nba: 'National Basketball Association',
    nfl: 'National Football League',
  };
  
  return leagueNames[league];
}

async function getStandings(league: League): Promise<StandingsResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/standings/${league}`, {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch ${league.toUpperCase()} standings`);
  }
  
  return response.json();
}

export default async function StandingsPage({ params }: { params: { league: string } }) {
  // Validate league parameter
  if (!isValidLeague(params.league)) {
    notFound();
  }
  
  const league = params.league as League;
  
  // Fetch standings data
  let standingsData: StandingsResponse;
  try {
    standingsData = await getStandings(league);
  } catch (error) {
    console.error(`Error fetching ${league} standings:`, error);
    
    // Return error state
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {getLeagueDisplayName(league)} Standings
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
                Error loading standings
              </h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                <p>
                  Unable to load {league.toUpperCase()} standings. Please try again later.
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
          {getLeagueDisplayName(league)} Standings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          As of {standingsData.asOf}
        </p>
      </div>
      
      <StandingsTable standings={standingsData.teams} league={league} />
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex justify-between">
          <div>Generated at: {new Date(standingsData.generatedAtLocal).toLocaleString()}</div>
          <div>
            Sources: 
            {standingsData.sources.map((source, index) => (
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
    </div>
  );
}

