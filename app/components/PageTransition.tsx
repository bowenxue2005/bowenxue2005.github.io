'use client';

import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

/**
 * Gives AnimatePresence a key that actually changes on navigation, so the
 * `exit` animation on each page's <motion.main> runs before the next one
 * mounts. Without the pathname key, App Router reuses the same children slot
 * and the exit variants are never triggered.
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <div key={pathname}>{children}</div>
    </AnimatePresence>
  );
}
