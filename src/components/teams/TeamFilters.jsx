import React from "react";

export default function TeamFilters({ filters, onFilterChange }) {
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
        <label className="block text-sm font-medium mb-1">Sort By</label>
        <select 
          value={filters.sortBy} 
          onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="FORM">Recent Form</option>
          <option value="RECORD">Record</option>
          <option value="NAME">Team Name</option>
        </select>
      </div>
    </div>
  );
}

