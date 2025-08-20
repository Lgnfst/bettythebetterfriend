import React from "react";

export default function TeamCard({ team }) {
  return (
    <div className="p-4 neo-brutal-border neo-brutal-shadow bg-white">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">{team.name}</h3>
        <span className="text-sm bg-gray-100 px-2 py-1 rounded">{team.league}</span>
      </div>
      <div className="mt-2 text-gray-600">{team.city}</div>
      <div className="mt-2 font-semibold">Record: {team.record}</div>
    </div>
  );
}

