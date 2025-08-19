import React, { useState } from 'react';
import Head from 'next/head';
import GamePrediction from '../../components/GamePrediction';

export default function GamesPage() {
  const [gameData, setGameData] = useState({
    homeTeam: 'Los Angeles Lakers',
    awayTeam: 'Golden State Warriors',
    date: '2023-10-24',
    time: '10:00 PM ET'
  });
  
  const [totalValue, setTotalValue] = useState(224.5);
  const [overOdds, setOverOdds] = useState(-110);
  const [underOdds, setUnderOdds] = useState(-110);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('/api/pick/total', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          game: gameData,
          total: totalValue,
          odds: {
            over: overOdds,
            under: underOdds
          }
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }
      
      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      console.error('Error getting prediction:', err);
      setError(err.message || 'Failed to get prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Game Predictions | Betty</title>
        <meta name="description" content="Over/Under predictions for upcoming games" />
      </Head>

      <main className="main">
        <h1>Game Predictions</h1>
        
        <div className="prediction-form-container">
          <form onSubmit={handleSubmit} className="prediction-form">
            <div className="form-group">
              <label htmlFor="homeTeam">Home Team:</label>
              <input
                type="text"
                id="homeTeam"
                value={gameData.homeTeam}
                onChange={(e) => setGameData({...gameData, homeTeam: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="awayTeam">Away Team:</label>
              <input
                type="text"
                id="awayTeam"
                value={gameData.awayTeam}
                onChange={(e) => setGameData({...gameData, awayTeam: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="total">Total:</label>
              <input
                type="number"
                id="total"
                step="0.5"
                value={totalValue}
                onChange={(e) => setTotalValue(parseFloat(e.target.value))}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="overOdds">Over Odds:</label>
              <input
                type="number"
                id="overOdds"
                value={overOdds}
                onChange={(e) => setOverOdds(parseInt(e.target.value))}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="underOdds">Under Odds:</label>
              <input
                type="number"
                id="underOdds"
                value={underOdds}
                onChange={(e) => setUnderOdds(parseInt(e.target.value))}
                required
              />
            </div>
            
            <button type="submit" disabled={loading}>
              {loading ? 'Getting Prediction...' : 'Get Prediction'}
            </button>
          </form>
        </div>
        
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
        
        {prediction && !loading && !error && (
          <GamePrediction 
            game={gameData}
            prediction={prediction}
          />
        )}
      </main>
    </div>
  );
}

