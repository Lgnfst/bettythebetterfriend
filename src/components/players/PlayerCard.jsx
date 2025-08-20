import React from "react";

export default function PlayerCard({ player }) {
  const { top_prop_opportunity } = player;
  
  return (
    <div className="p-4 neo-brutal-border neo-brutal-shadow bg-white">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">{player.name}</h3>
        <span className="text-sm bg-gray-100 px-2 py-1 rounded">{player.league}</span>
      </div>
      <div className="mt-2 text-gray-600">{player.team} • {player.position}</div>
      
      {top_prop_opportunity && (
        <div className="mt-4 p-3 bg-gray-50 rounded">
          <div className="text-sm font-semibold">{top_prop_opportunity.bet_type} {top_prop_opportunity.line}</div>
          <div className="mt-1 text-xs">
            Confidence: {Math.round(top_prop_opportunity.confidence * 100)}%
          </div>
          <div className="mt-1 text-xs text-gray-500">{top_prop_opportunity.reasoning}</div>
        </div>
      )}
    </div>
  );
}

