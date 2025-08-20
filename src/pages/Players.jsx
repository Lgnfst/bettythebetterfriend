import React from "react";
import PlayerFilters from "@/components/players/PlayerFilters";
import PlayerCard from "@/components/players/PlayerCard";

export default function Players() {
  const mock = [{ name:"Sample Player", team:"Example", league:"NBA", position:"G",
    top_prop_opportunity:{ bet_type:"Points", line:20, confidence:0.8, reasoning:"sample"} }];
  return (
    <div>
      <h1 className="text-3xl font-black mb-4">Players</h1>
      <PlayerFilters filters={{league:"ALL",position:"ALL",sortBy:"CONFIDENCE"}} onFilterChange={()=>{}} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {mock.map((p,i)=> <PlayerCard key={i} player={p} />)}
      </div>
    </div>
  );
}

