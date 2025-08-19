import { League } from '@/types/api.types';
import * as cheerio from 'cheerio';

const USE_MOCK_DATA = process.env.USE_MOCK_DATA === 'true';

/**
 * Fetches MLB standings from MLB Stats API
 * @returns MLB standings data
 */
export async function fetchMLBStandings() {
  if (USE_MOCK_DATA) {
    return getMockMLBStandings();
  }

  try {
    const response = await fetch('https://statsapi.mlb.com/api/v1/standings?leagueId=103,104&season=2023');
    
    if (!response.ok) {
      throw new Error(`MLB Stats API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.records;
  } catch (error) {
    console.error('Error fetching MLB standings:', error);
    throw error;
  }
}

/**
 * Fetches NBA standings from Basketball-Reference
 * @returns NBA standings data
 */
export async function fetchNBAStandings() {
  if (USE_MOCK_DATA) {
    return getMockNBAStandings();
  }

  try {
    const response = await fetch('https://www.basketball-reference.com/leagues/NBA_2023_standings.html');
    
    if (!response.ok) {
      throw new Error(`Basketball-Reference error: ${response.status} ${response.statusText}`);
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const standings: any[] = [];
    
    // Parse Eastern Conference
    $('#confs_standings_E tbody tr').each((i, elem) => {
      const team = $(elem).find('th a').text();
      const wins = parseInt($(elem).find('td[data-stat="wins"]').text(), 10);
      const losses = parseInt($(elem).find('td[data-stat="losses"]').text(), 10);
      
      if (team && !isNaN(wins) && !isNaN(losses)) {
        standings.push({ team, wins, losses, conference: 'Eastern' });
      }
    });
    
    // Parse Western Conference
    $('#confs_standings_W tbody tr').each((i, elem) => {
      const team = $(elem).find('th a').text();
      const wins = parseInt($(elem).find('td[data-stat="wins"]').text(), 10);
      const losses = parseInt($(elem).find('td[data-stat="losses"]').text(), 10);
      
      if (team && !isNaN(wins) && !isNaN(losses)) {
        standings.push({ team, wins, losses, conference: 'Western' });
      }
    });
    
    return standings;
  } catch (error) {
    console.error('Error fetching NBA standings:', error);
    throw error;
  }
}

/**
 * Fetches NFL standings from Pro-Football-Reference
 * @returns NFL standings data
 */
export async function fetchNFLStandings() {
  if (USE_MOCK_DATA) {
    return getMockNFLStandings();
  }

  try {
    const response = await fetch('https://www.pro-football-reference.com/years/2023/');
    
    if (!response.ok) {
      throw new Error(`Pro-Football-Reference error: ${response.status} ${response.statusText}`);
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const standings: any[] = [];
    
    // Parse AFC
    $('#AFC tbody tr').each((i, elem) => {
      const team = $(elem).find('th a').text();
      const record = $(elem).find('td[data-stat="record"]').text();
      
      if (team && record) {
        const [wins, losses, ties] = record.split('-').map(Number);
        standings.push({ team, wins, losses, ties, conference: 'AFC' });
      }
    });
    
    // Parse NFC
    $('#NFC tbody tr').each((i, elem) => {
      const team = $(elem).find('th a').text();
      const record = $(elem).find('td[data-stat="record"]').text();
      
      if (team && record) {
        const [wins, losses, ties] = record.split('-').map(Number);
        standings.push({ team, wins, losses, ties, conference: 'NFC' });
      }
    });
    
    return standings;
  } catch (error) {
    console.error('Error fetching NFL standings:', error);
    throw error;
  }
}

/**
 * Gets standings from secondary source based on league
 * @param league League (mlb, nba, nfl)
 * @returns Standings data
 */
export async function getSecondaryStandings(league: League) {
  switch (league) {
    case 'mlb':
      return fetchMLBStandings();
    case 'nba':
      return fetchNBAStandings();
    case 'nfl':
      return fetchNFLStandings();
    default:
      throw new Error(`Unsupported league: ${league}`);
  }
}

/**
 * Gets mock MLB standings
 * @returns Mock MLB standings
 */
function getMockMLBStandings() {
  return [
    {
      division: { id: 200, name: 'American League East' },
      teamRecords: [
        { team: { name: 'New York Yankees' }, wins: 95, losses: 67 },
        { team: { name: 'Boston Red Sox' }, wins: 78, losses: 84 },
      ],
    },
    {
      division: { id: 201, name: 'National League West' },
      teamRecords: [
        { team: { name: 'Los Angeles Dodgers' }, wins: 100, losses: 62 },
        { team: { name: 'San Francisco Giants' }, wins: 79, losses: 83 },
      ],
    },
    {
      division: { id: 202, name: 'National League Central' },
      teamRecords: [
        { team: { name: 'Chicago Cubs' }, wins: 83, losses: 79 },
      ],
    },
  ];
}

/**
 * Gets mock NBA standings
 * @returns Mock NBA standings
 */
function getMockNBAStandings() {
  return [
    { team: 'Boston Celtics', wins: 57, losses: 25, conference: 'Eastern' },
    { team: 'Miami Heat', wins: 44, losses: 38, conference: 'Eastern' },
    { team: 'Chicago Bulls', wins: 40, losses: 42, conference: 'Eastern' },
    { team: 'Los Angeles Lakers', wins: 52, losses: 30, conference: 'Western' },
    { team: 'Golden State Warriors', wins: 44, losses: 38, conference: 'Western' },
  ];
}

/**
 * Gets mock NFL standings
 * @returns Mock NFL standings
 */
function getMockNFLStandings() {
  return [
    { team: 'Kansas City Chiefs', wins: 14, losses: 3, ties: 0, conference: 'AFC' },
    { team: 'Tampa Bay Buccaneers', wins: 9, losses: 8, ties: 0, conference: 'NFC' },
    { team: 'Dallas Cowboys', wins: 12, losses: 5, ties: 0, conference: 'NFC' },
    { team: 'San Francisco 49ers', wins: 12, losses: 5, ties: 0, conference: 'NFC' },
    { team: 'Green Bay Packers', wins: 9, losses: 8, ties: 0, conference: 'NFC' },
  ];
}

