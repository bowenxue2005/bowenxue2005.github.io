'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/cv', label: 'CV' },
];


export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-white/80 shadow-sm">
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="text-xl font-bold text-purple-700">
          Bowen Xue
        </div>

        <button
          className="md:hidden text-purple-700 text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          ☰
        </button>

        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`hover:text-purple-600 transition-colors duration-200 ${
                pathname === href ? 'text-purple-600 font-semibold' : ''
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {menuOpen && (
  <div className="md:hidden bg-white/90 shadow-sm">
    <div className="max-w-5xl mx-auto px-6 py-2 flex flex-col gap-2 text-gray-700 font-medium">
      {navItems.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          onClick={() => setMenuOpen(false)}
          className={`block w-full rounded hover:bg-purple-50 transition-colors duration-200 py-2 px-2 ${
            pathname === href ? 'text-purple-600 font-semibold' : ''
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  </div>
)}
    </header>
  );
}
