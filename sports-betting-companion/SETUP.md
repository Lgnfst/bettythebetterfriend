# Setup Instructions

## Prerequisites

- Node.js 18 or later
- npm or yarn
- Supabase account
- SportsDataIO API key
- The Odds API key

## Local Development

1. Clone the repository
2. Copy `.env.example` to `.env.local` and fill in the required values
3. Install dependencies: `npm install`
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Setup

1. Create a new Supabase project
2. Run the migration script in `migrations/schema.sql` to create the required tables
3. Run the seed script: `npm run seed`

## Vercel Deployment

1. Push your code to a GitHub repository
2. Import the repository in Vercel
3. Configure the environment variables in Vercel
4. Deploy the project

## Cron Job Configuration

1. Add the following to your `vercel.json` file:

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

2. Deploy to Vercel to activate the cron jobs
