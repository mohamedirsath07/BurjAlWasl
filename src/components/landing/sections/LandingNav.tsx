'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { NAV_LINKS } from '../landing.data';
import { LandingButton } from '../LandingButton';
import { ThemeToggle } from '../ThemeToggle';

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={cn(
          'flex w-full max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:px-6',
          scrolled ? 'ln-glass-strong shadow-[var(--ln-shadow)]' : 'ln-glass',
        )}
      >
        <Link href="/" className="flex items-center gap-2" aria-label="Burj Al Wasl home">
          <Image
            src="/Burj_LOGO_2026-removebg-preview.png"
            alt="Burj Al Wasl"
            width={132}
            height={40}
            priority
            className="h-9 w-auto object-contain"
          />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-[var(--ln-text-muted)] transition-colors duration-200 hover:bg-[var(--ln-surface)] hover:text-[var(--ln-heading)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden sm:block">
            <LandingButton href="/consultation" size="md">
              Book Consultation
            </LandingButton>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="ln-glass grid h-10 w-10 place-items-center rounded-full text-[var(--ln-heading)] lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-0 z-40 flex flex-col bg-[var(--ln-bg)]/95 px-6 pb-10 pt-28 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-[var(--ln-border)] py-4 font-heading text-2xl text-[var(--ln-heading)]"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8">
              <LandingButton href="/consultation" size="lg" className="w-full">
                Book Consultation
              </LandingButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
