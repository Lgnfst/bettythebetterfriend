'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TeamStanding } from '@/types/api.types';

interface StandingsTableProps {
  standings: TeamStanding[];
  league: 'mlb' | 'nba' | 'nfl';
}

export function StandingsTable({ standings, league }: StandingsTableProps) {
  const [sortField, setSortField] = useState<keyof TeamStanding>('teamName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const handleSort = (field: keyof TeamStanding) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const sortedStandings = [...standings].sort((a, b) => {
    let aValue: any;
    let bValue: any;
    
    if (sortField === 'record') {
      // Sort by winning percentage
      const aWinPct = a.record.wins / (a.record.wins + a.record.losses + (a.record.tiesOrOT || 0));
      const bWinPct = b.record.wins / (b.record.wins + b.record.losses + (b.record.tiesOrOT || 0));
      
      aValue = aWinPct;
      bValue = bWinPct;
    } else {
      aValue = a[sortField];
      bValue = b[sortField];
    }
    
    if (aValue < bValue) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('teamName')}
            >
              <div className="flex items-center">
                Team
                {sortField === 'teamName' && (
                  <span className="ml-1">
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </div>
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('record')}
            >
              <div className="flex items-center">
                Record
                {sortField === 'record' && (
                  <span className="ml-1">
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </div>
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('streak')}
            >
              <div className="flex items-center">
                Streak
                {sortField === 'streak' && (
                  <span className="ml-1">
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </div>
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('lastFive')}
            >
              <div className="flex items-center">
                Last 5
                {sortField === 'lastFive' && (
                  <span className="ml-1">
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Sources
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {sortedStandings.map((team) => (
            <tr key={team.abbr} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap">
                <Link 
                  href={`/team/record?league=${league}&team=${team.abbr}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <div className="font-medium">{team.teamName}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{team.abbr}</div>
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium">
                  {team.record.wins}-{team.record.losses}
                  {team.record.tiesOrOT !== null && `-${team.record.tiesOrOT}`}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  As of {team.recordAsOf}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  team.streak.startsWith('W') ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 
                  team.streak.startsWith('L') ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100' : 
                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {team.streak}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-1">
                  {team.lastFive.split('').map((result, index) => (
                    <span 
                      key={index}
                      className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium ${
                        result === 'W' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 
                        result === 'L' ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100' : 
                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {result}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-2">
                  {team.sources.map((source, index) => (
                    <a
                      key={index}
                      href={source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      Source {index + 1}
                    </a>
                  ))}
                </div>
                {team.notes && (
                  <div className="mt-1 text-xs text-yellow-600 dark:text-yellow-400">
                    Note: {team.notes}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

