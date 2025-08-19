'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

type SearchResult = {
  id: string;
  name: string;
  type: 'team' | 'player';
  league: 'mlb' | 'nba' | 'nfl';
  abbr?: string;
};

export function Search() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length >= 2) {
        searchItems();
      } else {
        setResults([]);
      }
    }, 300);
    
    return () => clearTimeout(delayDebounceFn);
  }, [query]);
  
  const searchItems = async () => {
    setIsLoading(true);
    setIsOpen(true);
    
    try {
      // In a real application, you would fetch from your API
      // For demonstration purposes, we'll use mock data
      
      // Mock data
      const mockResults: SearchResult[] = [
        { id: '1', name: 'Los Angeles Dodgers', type: 'team', league: 'mlb', abbr: 'LAD' },
        { id: '2', name: 'New York Yankees', type: 'team', league: 'mlb', abbr: 'NYY' },
        { id: '3', name: 'Los Angeles Lakers', type: 'team', league: 'nba', abbr: 'LAL' },
        { id: '4', name: 'Boston Celtics', type: 'team', league: 'nba', abbr: 'BOS' },
        { id: '5', name: 'Kansas City Chiefs', type: 'team', league: 'nfl', abbr: 'KC' },
        { id: '6', name: 'San Francisco 49ers', type: 'team', league: 'nfl', abbr: 'SF' },
        { id: '7', name: 'Shohei Ohtani', type: 'player', league: 'mlb' },
        { id: '8', name: 'Aaron Judge', type: 'player', league: 'mlb' },
        { id: '9', name: 'LeBron James', type: 'player', league: 'nba' },
        { id: '10', name: 'Stephen Curry', type: 'player', league: 'nba' },
        { id: '11', name: 'Patrick Mahomes', type: 'player', league: 'nfl' },
        { id: '12', name: 'Travis Kelce', type: 'player', league: 'nfl' },
      ];
      
      // Filter results based on query
      const filteredResults = mockResults.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      
      setResults(filteredResults);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleResultClick = (result: SearchResult) => {
    setIsOpen(false);
    setQuery('');
    
    if (result.type === 'team') {
      router.push(`/team/record?league=${result.league}&team=${result.abbr || result.name}`);
    } else {
      router.push(`/player/${result.id}?league=${result.league}`);
    }
  };
  
  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search teams or players..."
          className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (query.length >= 2) {
              setIsOpen(true);
            }
          }}
        />
        {isLoading && (
          <div className="absolute right-3 top-2.5">
            <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
      </div>
      
      {isOpen && results.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-gray-800 rounded-md shadow-lg max-h-60 overflow-y-auto">
          <ul className="py-1">
            {results.map((result) => (
              <li 
                key={result.id}
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center"
                onClick={() => handleResultClick(result)}
              >
                <div className="flex-1">
                  <div className="font-medium text-white">{result.name}</div>
                  <div className="text-sm text-gray-400">
                    {result.type === 'team' ? 'Team' : 'Player'} • {result.league.toUpperCase()}
                  </div>
                </div>
                <div className="text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {isOpen && query.length >= 2 && results.length === 0 && !isLoading && (
        <div className="absolute z-10 mt-1 w-full bg-gray-800 rounded-md shadow-lg">
          <div className="px-4 py-3 text-sm text-gray-400">
            No results found for "{query}"
          </div>
        </div>
      )}
    </div>
  );
}

