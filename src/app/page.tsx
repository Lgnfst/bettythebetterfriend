import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Sports Betting Companion
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Your ultimate companion for MLB, NBA, and NFL betting insights with verified data from multiple sources.
        </p>
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link 
          href="/standings/mlb"
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">MLB</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            View the latest MLB standings, team records, and player stats.
          </p>
          <div className="text-blue-600 dark:text-blue-400 font-medium">
            View MLB Standings →
          </div>
        </Link>
        
        <Link 
          href="/standings/nba"
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">NBA</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            View the latest NBA standings, team records, and player stats.
          </p>
          <div className="text-blue-600 dark:text-blue-400 font-medium">
            View NBA Standings →
          </div>
        </Link>
        
        <Link 
          href="/standings/nfl"
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">NFL</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            View the latest NFL standings, team records, and player stats.
          </p>
          <div className="text-blue-600 dark:text-blue-400 font-medium">
            View NFL Standings →
          </div>
        </Link>
      </section>
      
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex">
            <div className="flex-shrink-0 h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-md flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Verified Standings</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Team records verified against multiple sources for accuracy.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 h-12 w-12 bg-green-100 dark:bg-green-900 rounded-md flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Player Trends</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Visual bar charts showing player performance trends over the last 5 or 10 games.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 h-12 w-12 bg-purple-100 dark:bg-purple-900 rounded-md flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Game Predictions</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Over/Under predictions with confidence ratings and detailed reasoning.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 h-12 w-12 bg-red-100 dark:bg-red-900 rounded-md flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 dark:text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Real-time Updates</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Hourly updates of standings and game data to keep you informed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

