# Sports Betting Companion

A production-ready sports betting companion for MLB, NBA, and NFL using Next.js 14, Supabase, Tailwind CSS, and shadcn/ui.

## Features

- **Verified Standings**: Team records verified against multiple sources for accuracy
- **Player Trends**: Visual bar charts showing player performance trends over the last 5 or 10 games
- **Game Predictions**: Over/Under predictions with confidence ratings and detailed reasoning
- **Real-time Updates**: Hourly updates of standings and game data via cron jobs

## Tech Stack

- **Frontend**: Next.js 14 (App Router, TypeScript)
- **Backend**: Next.js API Routes (serverless)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **UI**: Tailwind CSS + shadcn/ui
- **Charts**: Recharts
- **Deployment**: Vercel + Supabase

## Data Providers

- **Primary stats/standings/logs**: SportsDataIO (MLB/NBA/NFL)
- **Odds**: The Odds API (totals/markets)
- **Secondary verification**:
  - MLB: MLB Stats API (public)
  - NBA: Basketball-Reference (summary check)
  - NFL: Pro-Football-Reference (summary check)

## API Routes

1. `GET /api/standings/[league]` (`league`: mlb|nba|nfl)
   - Pull standings from SportsDataIO; cross-check secondary sources
   - Return verified team records with sources and notes
   - Write/update standings rows in Supabase

2. `GET /api/team/record`
   - Query: `?league=mlb|nba|nfl&team=LAD|Dodgers|Los%20Angeles%20Dodgers`
   - Return one team snapshot + last 5 games with results

3. `GET /api/player/trend`
   - Query: `?league=mlb|nba|nfl&player=Name&team=abbrOrName&stat=hits|points|rush_yds&games=5|10`
   - Return player stats series and summary statistics

4. `POST /api/pick/total`
   - Body: `{ "league":"mlb|nba|nfl","away":"string","home":"string","line":number,"odds":"string" }`
   - Return "Over" or "Under" prediction with confidence and reasoning

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn
- Supabase account
- SportsDataIO API key
- The Odds API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/sports-betting-companion.git
   cd sports-betting-companion
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with the following variables:
   ```
   # API Keys
   SPORTSDATAIO_KEY=your_sportsdataio_key_here
   THEODDS_API_KEY=your_theodds_api_key_here

   # Next.js
   NEXT_PUBLIC_SITE_URL=http://localhost:3000

   # Supabase
   SUPABASE_URL=your_supabase_url_here
   SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

4. Set up the database:
   - Create a new Supabase project
   - Run the migration script in `migrations/schema.sql`
   - Run the seed script: `npm run seed`

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

### Vercel Deployment

1. Push your code to a GitHub repository
2. Import the repository in Vercel
3. Configure the environment variables in Vercel
4. Deploy the project

### Cron Job Configuration

Add the following to your `vercel.json` file:

```json
{
  "crons": [
    {
      "path": "/api/cron/standings?league=mlb",
      "schedule": "0 8-23 * * *"
    },
    {
      "path": "/api/cron/standings?league=nba",
      "schedule": "0 8-23 * * *"
    },
    {
      "path": "/api/cron/standings?league=nfl",
      "schedule": "0 8-23 * * *"
    },
    {
      "path": "/api/cron/standings?league=mlb",
      "schedule": "0 2 * * *"
    },
    {
      "path": "/api/cron/standings?league=nba",
      "schedule": "0 2 * * *"
    },
    {
      "path": "/api/cron/standings?league=nfl",
      "schedule": "0 2 * * *"
    }
  ]
}
```

## Testing

Run the tests:

```bash
npm run test
```

Run the tests in watch mode:

```bash
npm run test:watch
```

Generate test coverage:

```bash
npm run test:coverage
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

