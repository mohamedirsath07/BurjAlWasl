'use client';

import { Moon, Sun } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { useLandingTheme } from './LandingThemeProvider';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useLandingTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={cn(
        'ln-glass relative grid h-10 w-10 place-items-center rounded-full text-[var(--ln-heading)] transition-colors duration-300 hover:text-[var(--ln-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ln-accent)]',
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="grid place-items-center"
        >
          {isDark ? <Sun size={18} strokeWidth={1.75} /> : <Moon size={18} strokeWidth={1.75} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
