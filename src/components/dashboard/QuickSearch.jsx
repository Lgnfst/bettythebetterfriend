import React from "react";
import { Input } from "@/components/ui/Input";
import { Search } from "lucide-react";

export default function QuickSearch() {
  return (
    <div className="relative">
      <Input 
        placeholder="Quick search..." 
        className="w-full pl-10 neo-brutal-border neo-brutal-shadow" 
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
    </div>
  );
}

