'use client';

import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { GameStat, StatSummary } from '@/types/api.types';

interface TrendChartProps {
  series: GameStat[];
  summary: StatSummary;
  statName: string;
}

export function TrendChart({ series, summary, statName }: TrendChartProps) {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  
  // Format data for chart
  const chartData = series.map((game, index) => ({
    name: format(parseISO(game.gameDate), 'MM/dd'),
    value: game.value,
    opponent: game.opponent,
    homeAway: game.homeAway,
    gameDate: game.gameDate,
    index,
  }));
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded shadow-lg">
          <p className="font-medium">{format(parseISO(data.gameDate), 'MMM d, yyyy')}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {data.homeAway === 'H' ? 'vs' : '@'} {data.opponent}
          </p>
          <p className="mt-2 font-medium">
            {statName}: <span className="text-blue-600 dark:text-blue-400">{data.value}</span>
          </p>
        </div>
      );
    }
    
    return null;
  };
  
  // Format stat name for display
  const formatStatName = (stat: string) => {
    return stat
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {formatStatName(statName)} - Last {series.length} Games
        </h3>
        <div className="mt-2 grid grid-cols-3 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
            <div className="text-sm text-gray-500 dark:text-gray-400">Average</div>
            <div className="text-xl font-medium text-gray-900 dark:text-white">{summary.avg.toFixed(1)}</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
            <div className="text-sm text-gray-500 dark:text-gray-400">Minimum</div>
            <div className="text-xl font-medium text-gray-900 dark:text-white">{summary.min}</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
            <div className="text-sm text-gray-500 dark:text-gray-400">Maximum</div>
            <div className="text-xl font-medium text-gray-900 dark:text-white">{summary.max}</div>
          </div>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
            onMouseMove={(e) => {
              if (e.activeTooltipIndex !== undefined) {
                setHoveredBar(e.activeTooltipIndex);
              }
            }}
            onMouseLeave={() => setHoveredBar(null)}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              domain={[0, 'auto']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <ReferenceLine y={summary.avg} stroke="#888" strokeDasharray="3 3" />
            <Bar 
              dataKey="value" 
              name={formatStatName(statName)}
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              animationDuration={500}
              animationEasing="ease-out"
              isAnimationActive={true}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
        Games shown from oldest (left) to newest (right)
      </div>
    </div>
  );
}

