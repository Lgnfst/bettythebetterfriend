import { format, formatInTimeZone } from 'date-fns-tz';

/**
 * Generates timestamps for API responses
 * @returns Object with UTC and local timestamps
 */
export function generateTimestamps() {
  const now = new Date();
  const utcTimestamp = now.toISOString();
  const localTimestamp = formatInTimeZone(now, 'America/Chicago', 'yyyy-MM-dd HH:mm:ss zzz');

  return {
    generatedAtUTC: utcTimestamp,
    generatedAtLocal: localTimestamp,
  };
}

/**
 * Formats a date to YYYY-MM-DD
 * @param date Date to format
 * @returns Formatted date string
 */
export function formatDate(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

/**
 * Gets the current date in YYYY-MM-DD format
 * @returns Current date string
 */
export function getCurrentDate(): string {
  return formatDate(new Date());
}

