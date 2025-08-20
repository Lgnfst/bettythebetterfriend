import React from "react";

export default function StatsCard({ title, value, icon: Icon, color }) {
  return (
    <div className={`p-4 neo-brutal-border neo-brutal-shadow-${color} bg-white`}>
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-sm">{title}</h3>
        {Icon && <Icon className="w-5 h-5" />}
      </div>
      <div className="text-3xl font-black mt-2">{value}</div>
    </div>
  );
}

