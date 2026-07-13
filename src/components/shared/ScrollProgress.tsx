'use client';

import { motion } from 'framer-motion';
import { useScrollProgress } from '@/hooks';

/**
 * ScrollProgress — A minimal horizontal indicator bar at the very top of the page.
 * Tracks reading/scrolling progress dynamically.
 */
export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <motion.div
      className="fixed left-0 top-0 z-[var(--z-tooltip)] h-[2.5px] w-full bg-azure origin-left"
      style={{ scaleX: progress }}
      aria-hidden="true"
    />
  );
}
