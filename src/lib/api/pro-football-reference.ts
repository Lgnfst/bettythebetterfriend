// Pro-Football-Reference scraper for NFL data verification
// This is a secondary verification source for NFL data

import * as cheerio from 'cheerio';

// Base URL for Pro-Football-Reference
const BASE_URL = 'https://www.pro-football-reference.com';

// Team abbreviation mapping (Pro-Football-Reference uses different abbreviations)
const TEAM_ABBR_MAP: Record<string, string> = {
  'ARI': 'crd', 'ATL': 'atl', 'BAL': 'rav', 'BUF': 'buf', 'CAR': 'car',
  'CHI': 'chi', 'CIN': 'cin', 'CLE': 'cle', 'DAL': 'dal', 'DEN': 'den',
  'DET': 'det', 'GB': 'gnb', 'HOU': 'htx', 'IND': 'clt', 'JAX': 'jax',
  'KC': 'kan', 'LV': 'rai', 'LAC': 'sdg', 'LAR': 'ram', 'MIA': 'mia',
  'MIN': 'min', 'NE': 'nwe', 'NO': 'nor', 'NYG': 'nyg', 'NYJ': 'nyj',
  'PHI': 'phi', 'PIT': 'pit', 'SF': 'sfo', 'SEA': 'sea', 'TB': 'tam',
  'TEN': 'oti', 'WAS': 'was'
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
    throw new Error(`Pro-Football-Reference error: ${response.status} ${response.statusText}`);
  }

  return response.text();
}

// Get standings
export async function getStandings(): Promise<any[]> {
  const html = await fetchHTML(`${BASE_URL}/years/current/`);
  const $ = cheerio.load(html);
  
  const standings: any[] = [];
  
  // AFC
  $('#AFC tbody tr').each((i, elem) => {
    const teamName = $(elem).find('th a').text();
    if (!teamName) return;
    
    const wins = parseInt($(elem).find('td[data-stat="wins"]').text(), 10);
    const losses = parseInt($(elem).find('td[data-stat="losses"]').text(), 10);
    const ties = parseInt($(elem).find('td[data-stat="ties"]').text(), 10) || 0;
    
    standings.push({
      teamName,
      conference: 'AFC',
      wins,
      losses,
      ties,
    });
  });
  
  // NFC
  $('#NFC tbody tr').each((i, elem) => {
    const teamName = $(elem).find('th a').text();
    if (!teamName) return;
    
    const wins = parseInt($(elem).find('td[data-stat="wins"]').text(), 10);
    const losses = parseInt($(elem).find('td[data-stat="losses"]').text(), 10);
    const ties = parseInt($(elem).find('td[data-stat="ties"]').text(), 10) || 0;
    
    standings.push({
      teamName,
      conference: 'NFC',
      wins,
      losses,
      ties,
    });
  });
  
  return standings;
}

// Get team record
export async function getTeamRecord(teamAbbr: string): Promise<any> {
  const pfrAbbr = TEAM_ABBR_MAP[teamAbbr] || teamAbbr;
  const html = await fetchHTML(`${BASE_URL}/teams/${pfrAbbr}/current.html`);
  const $ = cheerio.load(html);
  
  // Get record
  const recordText = $('div.page_content h1').text();
  const recordMatch = recordText.match(/(\d+)-(\d+)(?:-(\d+))?/);
  
  if (!recordMatch) {
    throw new Error(`Could not find record for team ${teamAbbr}`);
  }
  
  const wins = parseInt(recordMatch[1], 10);
  const losses = parseInt(recordMatch[2], 10);
  const ties = recordMatch[3] ? parseInt(recordMatch[3], 10) : 0;
  
  // Get last 5 games
  const recentGames: any[] = [];
  $('#games tbody tr').slice(0, 5).each((i, elem) => {
    const date = $(elem).find('th[data-stat="week_num"]').text();
    const opponent = $(elem).find('td[data-stat="opp"]').text();
    const resultCell = $(elem).find('td[data-stat="game_result"]');
    const result = resultCell.text().startsWith('W') ? 'W' : (resultCell.text().startsWith('L') ? 'L' : 'T');
    const score = $(elem).find('td[data-stat="pts"]').text() + '-' + $(elem).find('td[data-stat="pts_opp"]').text();
    const homeAway = $(elem).find('td[data-stat="game_location"]').text() === '@' ? 'A' : 'H';
    
    recentGames.push({
      date,
      opponent,
      result,
      score: `${result} ${score}`,
      homeAway,
    });
  });
  
  // Calculate streak
  let streak = '';
  let streakType = recentGames[0]?.result;
  let streakCount = 0;
  
  for (const game of recentGames) {
    if (game.result === streakType) {
      streakCount++;
    } else {
      break;
    }
  }
  
  if (streakCount > 0) {
    streak = `${streakType}${streakCount}`;
  }
  
  // Calculate last five
  const lastFive = recentGames.slice(0, 5).map(g => g.result).join('');
  
  return {
    teamName: $('h1[itemprop="name"]').text().replace(/\s+\d+-\d+(?:-\d+)?/, '').trim(),
    abbr: teamAbbr,
    record: {
      wins,
      losses,
      tiesOrOT: ties,
    },
    streak,
    lastFive,
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

