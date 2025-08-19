import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PlayerTrendProps {
  data: {
    playerName: string;
    teamName: string;
    stat: string;
    series: Array<{
      date: string;
      opponent: string;
      value: number;
    }>;
    summary: {
      games: number;
      avg: number;
      min: number;
      max: number;
    };
    sources: string[];
    notes?: string;
  };
}

const PlayerTrendChart: React.FC<PlayerTrendProps> = ({ data }) => {
  if (!data || !data.series || data.series.length === 0) {
    return <div>No data available</div>;
  }

  const chartData = data.series.map(item => ({
    date: item.date,
    opponent: item.opponent,
    value: item.value,
    label: \`\${item.date.split('-').slice(1).join('/')} vs \${item.opponent}\`
  }));

  return (
    <div className="player-trend-container">
      <div className="player-info">
        <h2>{data.playerName}</h2>
        <h3>{data.teamName} - {data.stat}</h3>
        {data.notes && <p className="notes">{data.notes}</p>}
      </div>
      
      <div className="chart-container" style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="stats-summary">
        <div className="stat-item">
          <span className="stat-label">Games:</span>
          <span className="stat-value">{data.summary.games}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Average:</span>
          <span className="stat-value">{data.summary.avg}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Min:</span>
          <span className="stat-value">{data.summary.min}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Max:</span>
          <span className="stat-value">{data.summary.max}</span>
        </div>
      </div>
      
      <div className="data-sources">
        <p>Data Sources: {data.sources.join(', ')}</p>
      </div>
    </div>
  );
};

export default PlayerTrendChart;

