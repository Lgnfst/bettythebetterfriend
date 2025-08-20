# React App

A React application with a neo-brutal design system.

## Tech Stack

- React (JavaScript) with Create React App
- TailwindCSS + PostCSS + Autoprefixer
- React Router v6
- lucide-react icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm start
# or
yarn start
```

## Project Structure

```
src/
  pages/
    Layout.jsx
    Dashboard.jsx
    Teams.jsx
    Players.jsx
    Search.jsx
  components/
    dashboard/
      StatsCard.jsx
      QuickSearch.jsx
      LeagueSelector.jsx
      TopPlays.jsx
    teams/
      TeamCard.jsx
      TeamFilters.jsx
    players/
      PlayerCard.jsx
      PlayerFilters.jsx
    search/
      SearchFilters.jsx
      SearchResults.jsx
    ui/
      Button.jsx
      Input.jsx
      button.js (bridge)
      input.js (bridge)
  integrations/
    Core.js
  utils/
    index.js
  entities/
    README.md
```

## Features

- Neo-brutal design system
- Responsive layout
- Path aliases (@/ for src/)
- Component organization by feature
- Bridge files for backward compatibility

