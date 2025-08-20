import React from "react";

export default function LeagueSelector({ selectedLeague, onLeagueChange, activeLeagues }) {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium mb-2">Select League</label>
      <select 
        value={selectedLeague} 
        onChange={(e) => onLeagueChange(e.target.value)}
        className="w-full p-2 neo-brutal-border neo-brutal-shadow"
      >
        <option value="ALL">All Leagues</option>
        {activeLeagues.map(league => (
          <option key={league} value={league}>{league}</option>
        ))}
      </select>
    </div>
  );
}

