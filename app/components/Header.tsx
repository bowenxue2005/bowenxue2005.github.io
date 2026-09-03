'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/cv', label: 'CV' },
];


export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Only lift the header off the page once there is content behind it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on Escape or on a click outside the header.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur bg-white/80 transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-none'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-purple-700 rounded transition-colors duration-200 hover:text-purple-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-500"
        >
          Bowen Xue
        </Link>

        <button
          type="button"
          className="md:hidden -mr-3 flex h-11 w-11 items-center justify-center rounded-lg text-xl text-purple-700 transition-colors duration-200 hover:bg-purple-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          <FiMenu aria-hidden="true" />
        </button>

        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`rounded hover:text-purple-600 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-500 ${
                pathname === href ? 'text-purple-600 font-semibold' : ''
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="md:hidden overflow-hidden bg-white/90"
          >
            <div className="max-w-5xl mx-auto px-6 py-2 flex flex-col gap-1 text-gray-700 font-medium">
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`block w-full rounded hover:bg-purple-50 transition-colors duration-200 py-3 px-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 ${
                    pathname === href ? 'text-purple-600 font-semibold' : ''
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
