import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/ui/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sports Betting Companion',
  description: 'A sports betting companion for MLB, NBA, and NFL',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 dark:bg-gray-900 min-h-screen`}>
        <Header />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-gray-900 text-white py-6">
          <div className="container mx-auto px-4">
            <div className="text-center text-sm text-gray-400">
              <p>Sports Betting Companion &copy; {new Date().getFullYear()}</p>
              <p className="mt-1">
                Data provided by SportsDataIO, The Odds API, and other sources.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

