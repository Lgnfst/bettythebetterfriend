import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Search, Home, TrendingUp, Users, Trophy } from "lucide-react";

export default function Layout({ children }) {
  const location = useLocation();
  const nav = [
    { name: "Dashboard", url: createPageUrl("Dashboard"), icon: Home },
    { name: "Search",    url: createPageUrl("Search"),    icon: Search },
    { name: "Players",   url: createPageUrl("Players"),   icon: Users },
    { name: "Teams",     url: createPageUrl("Teams"),     icon: Trophy },
  ];
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-black text-white p-4 neo-brutal-border border-t-0 border-l-0 border-r-0">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2">
          {nav.map(({name,url,icon:Icon}) => {
            const active = location.pathname === url;
            return (
              <Link key={name} to={url}
                className={`px-4 py-2 neo-brutal-border font-black text-sm
                  ${active ? "bg-hot-pink text-white neo-brutal-shadow-pink"
                           : "bg-white text-black neo-brutal-shadow"}`}>
                <span className="inline-flex items-center gap-2"><Icon className="w-4 h-4"/>{name}</span>
              </Link>
            );
          })}
        </div>
      </header>
      <main className="p-6 max-w-7xl mx-auto">{children}</main>
    </div>
  );
}

