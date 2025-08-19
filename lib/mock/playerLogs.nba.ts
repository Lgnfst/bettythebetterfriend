export const mockPlayerTrend = {
  playerName: "LeBron James",
  teamName: "Los Angeles Lakers",
  stat: "points",
  windowGames: 10,
  series: [
    { date: "2023-03-15", opponent: "DAL", value: 28 },
    { date: "2023-03-17", opponent: "ORL", value: 19 },
    { date: "2023-03-19", opponent: "PHX", value: 31 },
    { date: "2023-03-22", opponent: "OKC", value: 25 },
    { date: "2023-03-24", opponent: "CHI", value: 33 },
    { date: "2023-03-26", opponent: "MIN", value: 22 },
    { date: "2023-03-29", opponent: "BOS", value: 36 },
    { date: "2023-03-31", opponent: "BKN", value: 27 },
    { date: "2023-04-02", opponent: "HOU", value: 30 },
    { date: "2023-04-04", opponent: "UTA", value: 25 }
  ],
  sources: ["mock://nba/player/logs", "mock://nba/player/stats"]
};

