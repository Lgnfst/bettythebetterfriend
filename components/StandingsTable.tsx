import React from 'react';

interface TeamStanding {
  name: string;
  abbr: string;
  wins: number;
  losses: number;
  streak: string;
  lastFive: number[];
  sources: string[];
  recordAsOf: string;
}

interface StandingsTableProps {
  league: string;
  teams: TeamStanding[];
  asOf: string;
  sources: string[];
}

const StandingsTable: React.FC<StandingsTableProps> = ({ league, teams, asOf, sources }) => {
  const isMockData = sources.some(source => source.includes('mock'));

  return (
    <div className="standings-container">
      <div className="standings-header">
        <h2>{league.toUpperCase()} Standings</h2>
        <div className="data-badge">
          {isMockData ? (
            <span className="mock-badge">Mock</span>
          ) : (
            <span className="verified-badge">Verified</span>
          )}
        </div>
        <div className="as-of">
          <span>As of: {asOf}</span>
        </div>
      </div>
      
      <table className="standings-table">
        <thead>
          <tr>
            <th>Team</th>
            <th>W</th>
            <th>L</th>
            <th>Streak</th>
            <th>Last 5</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.abbr}>
              <td>
                <div className="team-info">
                  <span className="team-abbr">{team.abbr}</span>
                  <span className="team-name">{team.name}</span>
                </div>
              </td>
              <td>{team.wins}</td>
              <td>{team.losses}</td>
              <td>{team.streak}</td>
              <td>
                <div className="last-five">
                  {team.lastFive.map((result, index) => (
                    <span 
                      key={index} 
                      className={\`result \${result === 1 ? 'win' : 'loss'}\`}
                    >
                      {result === 1 ? 'W' : 'L'}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="data-sources">
        <p>Data Sources: {sources.join(', ')}</p>
      </div>
    </div>
  );
};

export default StandingsTable;

