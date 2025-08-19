export const mockPlayerTrend = {
  playerName: "Patrick Mahomes",
  teamName: "Kansas City Chiefs",
  stat: "passing_yards",
  windowGames: 10,
  series: [
    { date: "2022-11-06", opponent: "TEN", value: 446 },
    { date: "2022-11-13", opponent: "JAX", value: 331 },
    { date: "2022-11-20", opponent: "LAC", value: 329 },
    { date: "2022-11-27", opponent: "LAR", value: 320 },
    { date: "2022-12-04", opponent: "CIN", value: 223 },
    { date: "2022-12-11", opponent: "DEN", value: 352 },
    { date: "2022-12-18", opponent: "HOU", value: 336 },
    { date: "2022-12-24", opponent: "SEA", value: 224 },
    { date: "2023-01-01", opponent: "DEN", value: 328 },
    { date: "2023-01-07", opponent: "LV", value: 202 }
  ],
  sources: ["mock://nfl/player/logs", "mock://nfl/player/stats"]
};

