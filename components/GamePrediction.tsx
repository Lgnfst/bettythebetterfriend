import React from 'react';

interface GamePredictionProps {
  game: {
    homeTeam: string;
    awayTeam: string;
    date: string;
    time: string;
  };
  prediction: {
    total: number;
    odds: {
      over: number;
      under: number;
    };
    decision: string;
    confidence: number;
    reasoning: string;
    sources: string[];
  };
}

const GamePrediction: React.FC<GamePredictionProps> = ({ game, prediction }) => {
  const confidencePercent = (prediction.confidence * 100).toFixed(1);
  const isMockData = prediction.sources.some(source => source.includes('mock'));

  return (
    <div className="game-prediction-container">
      <div className="game-info">
        <h2>{game.awayTeam} @ {game.homeTeam}</h2>
        <p className="game-time">{game.date} {game.time}</p>
      </div>
      
      <div className="prediction-card">
        <div className="prediction-header">
          <h3>Total: {prediction.total}</h3>
          {isMockData && <span className="mock-badge">Mock</span>}
        </div>
        
        <div className="prediction-decision">
          <div className={\`decision \${prediction.decision.toLowerCase()}\`}>
            <span className="decision-label">{prediction.decision}</span>
            <span className="confidence">{confidencePercent}% confidence</span>
          </div>
        </div>
        
        <div className="odds-display">
          <div className="odds-item">
            <span className="odds-label">Over:</span>
            <span className="odds-value">{prediction.odds.over}</span>
          </div>
          <div className="odds-item">
            <span className="odds-label">Under:</span>
            <span className="odds-value">{prediction.odds.under}</span>
          </div>
        </div>
        
        <div className="reasoning">
          <h4>Reasoning:</h4>
          <p>{prediction.reasoning}</p>
        </div>
        
        <div className="data-sources">
          <p>Data Sources: {prediction.sources.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};

export default GamePrediction;

