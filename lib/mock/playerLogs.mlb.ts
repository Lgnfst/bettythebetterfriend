export const mockPlayerTrend = {
  playerName: "Mookie Betts",
  teamName: "Los Angeles Dodgers",
  stat: "hits",
  windowGames: 10,
  series: [
    { date: "2023-08-01", opponent: "OAK", value: 1 },
    { date: "2023-08-02", opponent: "OAK", value: 2 },
    { date: "2023-08-04", opponent: "SD", value: 0 },
    { date: "2023-08-05", opponent: "SD", value: 1 },
    { date: "2023-08-06", opponent: "SD", value: 3 },
    { date: "2023-08-07", opponent: "ARI", value: 2 },
    { date: "2023-08-08", opponent: "ARI", value: 1 },
    { date: "2023-08-09", opponent: "ARI", value: 0 },
    { date: "2023-08-11", opponent: "COL", value: 2 },
    { date: "2023-08-12", opponent: "COL", value: 3 }
  ],
  sources: ["mock://mlb/player/logs", "mock://mlb/player/stats"]
};

