import React from "react";
import { Flame, Target } from "lucide-react";
import { Button } from "@/components/ui/Button";
import StatsCard from "@/components/dashboard/StatsCard";
import QuickSearch from "@/components/dashboard/QuickSearch";
import LeagueSelector from "@/components/dashboard/LeagueSelector";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black">Dashboard</h1>
      <QuickSearch />
      <div className="grid grid-cols-2 gap-4">
        <StatsCard title="LIVE PLAYS" value={0} icon={Target} color="neon-green" />
        <StatsCard title="HIGH CONFIDENCE" value={0} icon={Flame} color="hot-pink" />
      </div>
      <LeagueSelector selectedLeague="ALL" onLeagueChange={()=>{}} activeLeagues={["MLB","NBA","NFL"]}/>
      <Button className="neo-brutal-border neo-brutal-shadow">Action</Button>
    </div>
  );
}

