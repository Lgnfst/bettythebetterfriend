import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { USE_MOCK } from '../lib/config';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Betty the Better Friend</title>
        <meta name="description" content="Sports betting analysis and recommendations" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">
          Welcome to <span className="highlight">Betty</span>
        </h1>

        <p className="description">
          Your better friend for sports betting analysis
          {USE_MOCK && <span className="mock-badge">Running in Mock Mode</span>}
        </p>

        <div className="grid">
          <Link href="/standings/mlb" className="card">
            <h2>MLB Standings &rarr;</h2>
            <p>View current MLB team standings and records.</p>
          </Link>

          <Link href="/standings/nba" className="card">
            <h2>NBA Standings &rarr;</h2>
            <p>View current NBA team standings and records.</p>
          </Link>

          <Link href="/standings/nfl" className="card">
            <h2>NFL Standings &rarr;</h2>
            <p>View current NFL team standings and records.</p>
          </Link>

          <Link href="/player/mlb/mookie-betts" className="card">
            <h2>Player Analysis &rarr;</h2>
            <p>Analyze player performance trends and statistics.</p>
          </Link>

          <Link href="/games" className="card">
            <h2>Game Predictions &rarr;</h2>
            <p>Get Over/Under predictions for upcoming games.</p>
          </Link>
        </div>
      </main>

      <footer className="footer">
        <a href="https://github.com/Lgnfst/bettythebetterfriend" target="_blank" rel="noopener noreferrer">
          Betty the Better Friend
        </a>
      </footer>
    </div>
  );
}

