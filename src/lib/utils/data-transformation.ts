/**
 * Verifies team record against a secondary source
 */
export function verifyTeamRecord(
  primary: { wins: number; losses: number; tiesOrOT?: number | null },
  secondary: { wins: number; losses: number; tiesOrOT?: number | null } | null
) {
  if (!secondary) {
    return {
      verified: false,
      notes: 'Missing data from secondary source',
    };
  }

  const primaryWins = primary.wins;
  const primaryLosses = primary.losses;
  const secondaryWins = secondary.wins;
  const secondaryLosses = secondary.losses;

  if (primaryWins === secondaryWins && primaryLosses === secondaryLosses) {
    return {
      verified: true,
      notes: null,
    };
  }

  return {
    verified: false,
    notes: `Record mismatch: Primary (${primaryWins}-${primaryLosses}) vs Secondary (${secondaryWins}-${secondaryLosses})`,
  };
}

/**
 * Calculates the current streak from a list of results
 * @param results Array of 'W', 'L', or 'T' in chronological order (oldest to newest)
 * @returns Streak string (e.g., 'W3', 'L2')
 */
export function calculateStreak(results: ('W' | 'L' | 'T')[]): string {
  if (results.length === 0) return '';

  // Start from the most recent result
  const mostRecent = results[results.length - 1];
  let count = 1;

  // Count consecutive results of the same type
  for (let i = results.length - 2; i >= 0; i--) {
    if (results[i] === mostRecent) {
      count++;
    } else {
      break;
    }
  }

  return `${mostRecent}${count}`;
}

/**
 * Gets the last five results from a list of results
 * @param results Array of 'W', 'L', or 'T' in chronological order (oldest to newest)
 * @returns String of last five results (e.g., 'WLWLW')
 */
export function calculateLastFive(results: ('W' | 'L' | 'T')[]): string {
  if (results.length === 0) return '';

  // Get the last 5 (or fewer) results
  const lastFive = results.slice(-5);
  return lastFive.join('');
}

/**
 * Extracts a specific stat value from a game log
 * @param gameLog Game log object with stats property
 * @param statName Name of the stat to extract
 * @returns Numeric value of the stat
 */
export function extractStatValue(gameLog: any, statName: string): number {
  if (!gameLog.stats) return 0;

  // MLB stats
  if (['hits', 'total_bases', 'hr', 'rbi', 'runs', 'bb', 'so'].includes(statName)) {
    return gameLog.stats[statName] || 0;
  }

  // NBA stats
  if (['points', 'rebounds', 'assists', 'threes'].includes(statName)) {
    return gameLog.stats[statName] || 0;
  }

  // NFL stats
  if (['pass_yds', 'rush_yds', 'rec_yds', 'receptions', 'pass_td', 'rush_td', 'rec_td'].includes(statName)) {
    return gameLog.stats[statName] || 0;
  }

  throw new Error(`Unknown stat name: ${statName}`);
}

/**
 * Calculates summary statistics for an array of values
 * @param values Array of numeric values
 * @returns Object with games, avg, min, and max
 */
export function calculateStatSummary(values: number[]): { games: number; avg: number; min: number; max: number } {
  if (values.length === 0) {
    return {
      games: 0,
      avg: 0,
      min: 0,
      max: 0,
    };
  }

  const sum = values.reduce((acc, val) => acc + val, 0);
  const avg = sum / values.length;
  const min = Math.min(...values);
  const max = Math.max(...values);

  return {
    games: values.length,
    avg,
    min,
    max,
  };
}

