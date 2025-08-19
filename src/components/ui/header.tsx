'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search } from '@/components/ui/search';

export function Header() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };
  
  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold">
              Sports Betting Companion
            </Link>
            <button className="md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          <nav className="mt-4 md:mt-0">
            <ul className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-2 md:space-y-0">
              <li>
                <Link 
                  href="/standings/mlb"
                  className={`hover:text-blue-400 ${isActive('/standings/mlb') ? 'text-blue-400' : ''}`}
                >
                  MLB
                </Link>
              </li>
              <li>
                <Link 
                  href="/standings/nba"
                  className={`hover:text-blue-400 ${isActive('/standings/nba') ? 'text-blue-400' : ''}`}
                >
                  NBA
                </Link>
              </li>
              <li>
                <Link 
                  href="/standings/nfl"
                  className={`hover:text-blue-400 ${isActive('/standings/nfl') ? 'text-blue-400' : ''}`}
                >
                  NFL
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="mt-4 md:mt-0 md:w-64">
            <Search />
          </div>
        </div>
      </div>
    </header>
  );
}

