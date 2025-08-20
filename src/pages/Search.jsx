import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import SearchFilters from "@/components/search/SearchFilters";
import SearchResults from "@/components/search/SearchResults";

export default function Search() {
  const [q,setQ]=useState("");
  return (
    <div>
      <h1 className="text-3xl font-black mb-4">Search</h1>
      <div className="flex gap-2">
        <Input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search..." className="neo-brutal-border" />
        <Button className="neo-brutal-border neo-brutal-shadow">Go</Button>
      </div>
      <SearchFilters filters={{league:"ALL",type:"ALL"}} onFilterChange={()=>{}} />
      <SearchResults results={[]} isLoading={false} query={q} />
    </div>
  );
}

