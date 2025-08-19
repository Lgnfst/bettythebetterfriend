# Sports Betting Companion

A production-ready sports betting companion for MLB, NBA, and NFL using Next.js 14, Supabase, Tailwind CSS, and shadcn/ui.

## Features

- Standings for MLB, NBA, and NFL with verified data from multiple sources
- Player trend analysis with bar charts for the last 5 or 10 games
- Game predictions with Over/Under picks and confidence ratings
- Authentication with Supabase
- Real-time data updates via cron jobs

## Tech Stack

- Next.js 14 (App Router, TypeScript) on Vercel
- Supabase (Postgres + Auth)
- UI: Tailwind + shadcn/ui
- Charts: Recharts

## Data Providers

- Primary stats/standings/logs: SportsDataIO (MLB/NBA/NFL)
- Odds: The Odds API (totals/markets)
- Secondary verification:
  - MLB: MLB Stats API (public)
  - NBA: Basketball-Reference (summary check)
  - NFL: Pro-Football-Reference (summary check)

## Setup

See [SETUP.md](SETUP.md) for detailed setup instructions.

## Development

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

## Deployment

See [SETUP.md](SETUP.md) for deployment instructions on Vercel and Supabase.
