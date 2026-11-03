'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  return (
    <nav className="site-nav" aria-label="Main">
      <Link href="/" aria-current={pathname === '/' ? 'page' : undefined}>Home</Link>
      <Link href="/cv" aria-current={pathname === '/cv' ? 'page' : undefined}>CV</Link>
    </nav>
  );
}
