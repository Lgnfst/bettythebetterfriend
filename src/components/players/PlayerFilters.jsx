import React from "react";

export default function PlayerFilters({ filters, onFilterChange }) {
  return (
    <div className="flex flex-wrap gap-4">
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
        <label className="block text-sm font-medium mb-1">Position</label>
        <select 
          value={filters.position} 
          onChange={(e) => onFilterChange({ ...filters, position: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="ALL">All Positions</option>
          <option value="QB">QB</option>
          <option value="RB">RB</option>
          <option value="WR">WR</option>
          <option value="TE">TE</option>
          <option value="G">G</option>
          <option value="F">F</option>
          <option value="C">C</option>
          <option value="P">P</option>
          <option value="C">C</option>
          <option value="1B">1B</option>
          <option value="2B">2B</option>
          <option value="3B">3B</option>
          <option value="SS">SS</option>
          <option value="OF">OF</option>
        </select>
      </div>
      
      <div className="w-full md:w-auto">
        <label className="block text-sm font-medium mb-1">Sort By</label>
        <select 
          value={filters.sortBy} 
          onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="CONFIDENCE">Confidence</option>
          <option value="NAME">Name</option>
          <option value="TEAM">Team</option>
        </select>
      </div>
    </div>
  );
}

