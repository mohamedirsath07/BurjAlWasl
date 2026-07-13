'use client';

/**
 * FloatingActions — Persistent floating buttons for key CTAs.
 *
 * Includes:
 * - WhatsApp button (UAE market critical)
 * - Phone call button
 * - Book consultation button
 * - Back to top button (appears after scrolling)
 * - Scroll progress indicator (ring around back-to-top)
 *
 * Performance: Single client component for all floating UI.
 * Accessibility: All buttons have aria-labels, keyboard accessible.
 */

import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUp,
  MessageCircle,
  Phone,
  CalendarDays,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { useScroll, useScrollProgress } from '@/hooks';
import { COMPANY_INFO } from '@/lib/constants';

export function FloatingActions() {
  const { isScrolled } = useScroll(400);
  const progress = useScrollProgress();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[var(--z-toast)] flex flex-col items-center gap-3">
      {/* ── Back to Top with Progress Ring ── */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* SVG Progress Ring */}
            <svg
              className="absolute -inset-1 h-[calc(100%+8px)] w-[calc(100%+8px)] -rotate-90"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <circle
                cx="24"
                cy="24"
                r="21"
                fill="none"
                stroke="rgba(15,42,74,0.08)"
                strokeWidth="1.5"
              />
              <circle
                cx="24"
                cy="24"
                r="21"
                fill="none"
                stroke="var(--color-azure)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 21}
                strokeDashoffset={2 * Math.PI * 21 * (1 - progress)}
                className="transition-[stroke-dashoffset] duration-100"
              />
            </svg>

            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className={cn(
                'relative flex h-10 w-10 items-center justify-center rounded-full',
                'bg-white text-navy shadow-lg',
                'transition-all duration-300 hover:bg-navy hover:text-white hover:shadow-xl',
                'focus-visible:outline-2 focus-visible:outline-azure focus-visible:outline-offset-2'
              )}
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Book Consultation ── */}
      <motion.a
        href="/contact"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Book a consultation"
        className={cn(
          'flex h-11 w-11 items-center justify-center rounded-full',
          'bg-navy text-white shadow-lg',
          'transition-all duration-300 hover:bg-navy-light hover:shadow-xl hover:scale-110',
          'focus-visible:outline-2 focus-visible:outline-azure focus-visible:outline-offset-2'
        )}
      >
        <CalendarDays className="h-4 w-4" />
      </motion.a>

      {/* ── Phone Call ── */}
      <motion.a
        href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Call us"
        className={cn(
          'flex h-11 w-11 items-center justify-center rounded-full',
          'bg-white text-navy shadow-lg border border-slate-100',
          'transition-all duration-300 hover:border-azure hover:text-azure hover:shadow-xl hover:scale-110',
          'focus-visible:outline-2 focus-visible:outline-azure focus-visible:outline-offset-2'
        )}
      >
        <Phone className="h-4 w-4" />
      </motion.a>

      {/* ── WhatsApp ── */}
      <motion.a
        href={`https://wa.me/${COMPANY_INFO.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Chat on WhatsApp"
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-full',
          'bg-[#25D366] text-white shadow-lg',
          'transition-all duration-300 hover:shadow-xl hover:scale-110',
          'focus-visible:outline-2 focus-visible:outline-[#25D366] focus-visible:outline-offset-2'
        )}
      >
        <MessageCircle className="h-5 w-5" />
      </motion.a>
    </div>
  );
}
