import React from "react";

export default function TopPlays({ plays = [] }) {
  if (plays.length === 0) {
    return (
      <div className="p-4 neo-brutal-border neo-brutal-shadow bg-white">
        <h3 className="font-bold">Top Plays</h3>
        <p className="text-gray-500 mt-2">No plays available</p>
      </div>
    );
  }

  return (
    <div className="p-4 neo-brutal-border neo-brutal-shadow bg-white">
      <h3 className="font-bold">Top Plays</h3>
      <ul className="mt-2 space-y-2">
        {plays.map((play, index) => (
          <li key={index} className="p-2 border-b">
            {play.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

