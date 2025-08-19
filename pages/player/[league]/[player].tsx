import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import PlayerTrendChart from '../../../components/PlayerTrendChart';

export default function PlayerPage() {
  const router = useRouter();
  const { league, player } = router.query;
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!league || !player) return;

    const fetchPlayerData = async () => {
      try {
        setLoading(true);
        const response = await fetch(\`/api/player/trend?league=\${league}&player=\${player}\`);
        
        if (!response.ok) {
          throw new Error(\`Failed to fetch player data\`);
        }
        
        const data = await response.json();
        setPlayerData(data);
        setError('');
      } catch (err) {
        console.error('Error fetching player data:', err);
        setError(err.message || 'Failed to load player data');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerData();
  }, [league, player]);

  const playerName = playerData?.playerName || 'Player';
  const leagueName = league ? String(league).toUpperCase() : '';

  return (
    <div className="container">
      <Head>
        <title>{playerName} | {leagueName} | Betty</title>
        <meta name="description" content={`${playerName} performance trends and analysis`} />
      </Head>

      <main className="main">
        <h1>Player Analysis</h1>
        
        {loading && <p>Loading player data...</p>}
        
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => router.reload()}>Try Again</button>
          </div>
        )}
        
        {playerData && !loading && !error && (
          <PlayerTrendChart data={playerData} />
        )}
      </main>
    </div>
  );
}

