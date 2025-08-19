// Basketball-Reference scraper for NBA data verification
// This is a secondary verification source for NBA data

import * as cheerio from 'cheerio';

// Base URL for Basketball-Reference
const BASE_URL = 'https://www.basketball-reference.com';

// Team abbreviation mapping (Basketball-Reference uses different abbreviations)
const TEAM_ABBR_MAP: Record<string, string> = {
  'ATL': 'ATL', 'BOS': 'BOS', 'BKN': 'BRK', 'CHA': 'CHO', 'CHI': 'CHI',
  'CLE': 'CLE', 'DAL': 'DAL', 'DEN': 'DEN', 'DET': 'DET', 'GSW': 'GSW',
  'HOU': 'HOU', 'IND': 'IND', 'LAC': 'LAC', 'LAL': 'LAL', 'MEM': 'MEM',
  'MIA': 'MIA', 'MIL': 'MIL', 'MIN': 'MIN', 'NOP': 'NOP', 'NYK': 'NYK',
  'OKC': 'OKC', 'ORL': 'ORL', 'PHI': 'PHI', 'PHX': 'PHO', 'POR': 'POR',
  'SAC': 'SAC', 'SAS': 'SAS', 'TOR': 'TOR', 'UTA': 'UTA', 'WAS': 'WAS'
};

// Helper function to make requests
async function fetchHTML(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    },
    next: { revalidate: 86400 }, // Cache for 24 hours
  });

  if (!response.ok) {
    throw new Error(`Basketball-Reference error: ${response.status} ${response.statusText}`);
  }

  return response.text();
}

// Get standings
export async function getStandings(): Promise<any[]> {
  const html = await fetchHTML(`${BASE_URL}/leagues/NBA_current.html`);
  const $ = cheerio.load(html);
  
  const standings: any[] = [];
  
  // Eastern Conference
  $('#confs_standings_E tbody tr').each((i, elem) => {
    const teamAbbr = $(elem).find('th a').attr('href')?.split('/')[2];
    if (!teamAbbr) return;
    
    const wins = parseInt($(elem).find('td[data-stat="wins"]').text(), 10);
    const losses = parseInt($(elem).find('td[data-stat="losses"]').text(), 10);
    const winLossPercentage = parseFloat($(elem).find('td[data-stat="win_loss_pct"]').text());
    
    standings.push({
      teamAbbr,
      conference: 'Eastern',
      wins,
      losses,
      winLossPercentage,
    });
  });
  
  // Western Conference
  $('#confs_standings_W tbody tr').each((i, elem) => {
    const teamAbbr = $(elem).find('th a').attr('href')?.split('/')[2];
    if (!teamAbbr) return;
    
    const wins = parseInt($(elem).find('td[data-stat="wins"]').text(), 10);
    const losses = parseInt($(elem).find('td[data-stat="losses"]').text(), 10);
    const winLossPercentage = parseFloat($(elem).find('td[data-stat="win_loss_pct"]').text());
    
    standings.push({
      teamAbbr,
      conference: 'Western',
      wins,
      losses,
      winLossPercentage,
    });
  });
  
  return standings;
}

// Get team record
export async function getTeamRecord(teamAbbr: string): Promise<any> {
  const brAbbr = TEAM_ABBR_MAP[teamAbbr] || teamAbbr;
  const html = await fetchHTML(`${BASE_URL}/teams/${brAbbr}/current.html`);
  const $ = cheerio.load(html);
  
  const record = $('#meta div').text().match(/(\d+)-(\d+)/);
  
  if (!record) {
    throw new Error(`Could not find record for team ${teamAbbr}`);
  }
  
  const wins = parseInt(record[1], 10);
  const losses = parseInt(record[2], 10);
  
  // Get last 10 games
  const recentGames: any[] = [];
  $('#games tbody tr').slice(0, 10).each((i, elem) => {
    const date = $(elem).find('th[data-stat="date_game"] a').text();
    const opponent = $(elem).find('td[data-stat="opp_name"] a').text();
    const result = $(elem).find('td[data-stat="game_result"]').text();
    const score = $(elem).find('td[data-stat="pts"]').text() + '-' + $(elem).find('td[data-stat="opp_pts"]').text();
    const homeAway = $(elem).find('td[data-stat="game_location"]').text() === '@' ? 'A' : 'H';
    
    recentGames.push({
      date,
      opponent,
      result: result.startsWith('W') ? 'W' : 'L',
      score: (result.startsWith('W') ? 'W ' : 'L ') + score,
      homeAway,
    });
  });
  
  return {
    teamName: $('h1[itemprop="name"] span:last-child').text(),
    abbr: brAbbr,
    record: {
      wins,
      losses,
      tiesOrOT: null,
    },
    recentGames,
  };
}

// Get player stats
export async function getPlayerStats(playerName: string): Promise<any> {
  // This is a simplified implementation
  // In a real application, you would need to search for the player first
  
  // For demonstration purposes, we'll return null
  return null;
}

