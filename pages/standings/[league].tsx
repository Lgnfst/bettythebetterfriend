import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import StandingsTable from '../../components/StandingsTable';

export default function StandingsPage() {
  const router = useRouter();
  const { league } = router.query;
  const [standingsData, setStandingsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!league) return;

    const fetchStandings = async () => {
      try {
        setLoading(true);
        const response = await fetch(\`/api/standings/\${league}\`);
        
        if (!response.ok) {
          throw new Error(\`Failed to fetch \${league} standings\`);
        }
        
        const data = await response.json();
        setStandingsData(data);
        setError('');
      } catch (err) {
        console.error('Error fetching standings:', err);
        setError(err.message || 'Failed to load standings');
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, [league]);

  const leagueName = league ? String(league).toUpperCase() : '';

  return (
    <div className="container">
      <Head>
        <title>{leagueName} Standings | Betty</title>
        <meta name="description" content={`Current ${leagueName} standings and team records`} />
      </Head>

      <main className="main">
        <h1>{leagueName} Standings</h1>
        
        {loading && <p>Loading standings...</p>}
        
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => router.reload()}>Try Again</button>
          </div>
        )}
        
        {standingsData && !loading && !error && (
          <StandingsTable 
            league={String(league)} 
            teams={standingsData.teams} 
            asOf={standingsData.asOf}
            sources={standingsData.teams[0]?.sources || []}
          />
        )}
      </main>
    </div>
  );
}

