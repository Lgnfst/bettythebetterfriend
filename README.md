# Betty the Better Friend

A sports betting analysis and recommendation app.

## Features

- League standings for MLB, NBA, and NFL
- Team record and recent performance analysis
- Player performance trends with statistical analysis
- Game predictions with Over/Under recommendations

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Copy the environment variables:
   ```
   cp .env.example .env.local
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Mock Mode

Betty the Better Friend supports a "Mock Mode" that allows you to run the application without requiring API keys. This is useful for development, testing, and demonstration purposes.

### Using Mock Mode

1. In your `.env.local` file, set:
   ```
   USE_MOCK_DATA=true
   ```

2. With this setting, the application will use pre-defined mock data instead of making real API calls.

3. When you're ready to use real data, obtain the necessary API keys and update your `.env.local` file:
   ```
   USE_MOCK_DATA=false
   SPORTSDATAIO_KEY=your_key_here
   THEODDS_API_KEY=your_key_here
   ```

### Mock Data Indicators

When running in Mock Mode, the UI will display indicators to show that you're viewing mock data:

- Standings pages will show a "Mock" badge instead of "Verified"
- Player trend charts will include a "mock data" note
- Game predictions will indicate they are based on mock data

This ensures transparency about the source of the data being displayed.

## API Providers

The application is designed to work with the following data providers:

- SportsData.io - For team and player statistics
- TheOdds API - For betting odds and lines

API keys for these services are required for production use.

## Environment Variables

- `USE_MOCK_DATA` - Set to "true" to enable Mock Mode
- `SPORTSDATAIO_KEY` - Your SportsData.io API key
- `THEODDS_API_KEY` - Your TheOdds API key
- `NEXT_PUBLIC_SITE_URL` - The public URL of your site
- `SUPABASE_URL` - Your Supabase URL (for user data)
- `SUPABASE_ANON_KEY` - Your Supabase anonymous key

