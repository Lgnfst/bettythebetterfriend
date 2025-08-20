import React from "react";
import TeamFilters from "@/components/teams/TeamFilters";
import TeamCard from "@/components/teams/TeamCard";

export default function Teams() {
  const mock = [{ name:"Example Team", city:"City", league:"MLB", record:"0-0" }];
  return (
    <div>
      <h1 className="text-3xl font-black mb-4">Teams</h1>
      <TeamFilters filters={{league:"ALL",sortBy:"FORM"}} onFilterChange={()=>{}} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {mock.map((t,i)=> <TeamCard key={i} team={t} />)}
      </div>
    </div>
  );
}

