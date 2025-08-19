#!/bin/bash
mkdir -p sports-betting-companion
cd sports-betting-companion

# Create a package.json file
cat > package.json << 'EOF'
{
  "name": "sports-betting-companion",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@radix-ui/react-slot": "^1.0.2",
    "@supabase/auth-helpers-nextjs": "^0.8.7",
    "@supabase/supabase-js": "^2.39.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "date-fns": "^2.30.0",
    "lucide-react": "^0.294.0",
    "next": "14.0.3",
    "react": "^18",
    "react-dom": "^18",
    "recharts": "^2.10.3",
    "tailwind-merge": "^2.1.0",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "14.0.3",
    "postcss": "^8",
    "tailwindcss": "^3.3.0",
    "typescript": "^5"
  }
}
EOF

# Create tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

# Create next.config.js
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
EOF

# Create tailwind.config.js
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
EOF

# Create postcss.config.js
cat > postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# Create .env.example
cat > .env.example << 'EOF'
# API Keys
SPORTSDATAIO_KEY=your_sportsdataio_key_here
THEODDS_API_KEY=your_theodds_api_key_here

# Next.js
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
EOF

# Create basic directory structure
mkdir -p src/app/api/standings/\[league\]
mkdir -p src/app/api/team/record
mkdir -p src/app/api/player/trend
mkdir -p src/app/api/pick/total
mkdir -p src/app/api/cron/standings
mkdir -p src/app/standings/\[league\]
mkdir -p src/app/player/\[id\]
mkdir -p src/app/game/\[id\]
mkdir -p src/app/auth/login
mkdir -p src/app/auth/signup
mkdir -p src/app/profile
mkdir -p src/components/ui
mkdir -p src/components/charts
mkdir -p src/components/standings
mkdir -p src/components/player
mkdir -p src/components/game
mkdir -p src/components/auth
mkdir -p src/lib/api
mkdir -p src/lib/utils
mkdir -p src/types
mkdir -p src/context
mkdir -p migrations
mkdir -p scripts
mkdir -p tests

# Create a basic README.md
cat > README.md << 'EOF'
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
EOF

# Create a basic SETUP.md
cat > SETUP.md << 'EOF'
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
EOF

echo "Project structure created successfully!"

