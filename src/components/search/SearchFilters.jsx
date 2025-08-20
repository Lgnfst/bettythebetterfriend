import React from "react";

export default function SearchFilters({ filters, onFilterChange }) {
  return (
    <div className="flex flex-wrap gap-4 my-4">
      <div className="w-full md:w-auto">
        <label className="block text-sm font-medium mb-1">League</label>
        <select 
          value={filters.league} 
          onChange={(e) => onFilterChange({ ...filters, league: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="ALL">All Leagues</option>
          <option value="MLB">MLB</option>
          <option value="NBA">NBA</option>
          <option value="NFL">NFL</option>
        </select>
      </div>
      
      <div className="w-full md:w-auto">
        <label className="block text-sm font-medium mb-1">Type</label>
        <select 
          value={filters.type} 
          onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="ALL">All Types</option>
          <option value="PLAYER">Players</option>
          <option value="TEAM">Teams</option>
          <option value="GAME">Games</option>
        </select>
      </div>
    </div>
  );
}

