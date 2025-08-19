export const USE_MOCK = process.env.USE_MOCK_DATA === "true";
export const TIMEZONE = "America/Chicago";
export const nowUTC = () => new Date().toISOString();
export const nowLocal = () => new Date().toLocaleString("en-US", {timeZone: TIMEZONE, hour12: false}).replace(",", "");

