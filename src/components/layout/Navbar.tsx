'use client';

/**
 * Navbar — Premium transparent-to-glass sticky navigation.
 *
 * Architecture:
 * - Transparent on hero, blur glass after scrolling past threshold
 * - Smooth height and background transition on scroll
 * - Desktop: horizontal links with animated underline + CTA
 * - Mobile: hamburger trigger for MobileMenu
 * - Accessible: keyboard nav, aria labels, semantic <nav>
 *
 * Performance:
 * - Client Component (scroll events, hover state)
 * - Passive scroll listener
 * - Will-change on transitioning properties
 */

import { useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Globe, Menu, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useScroll, useMediaQuery } from '@/hooks';
import { useUIStore } from '@/store/useUIStore';
import { mainNavigation } from '@/data/navigation';
import { SITE_NAME } from '@/lib/constants';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
  const { isScrolled } = useScroll(50);
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();

  // Close mobile menu on resize to desktop
  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) closeMobileMenu();
  }, [isMobile, isMobileMenuOpen, closeMobileMenu]);

  // Close menu on escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) closeMobileMenu();
    },
    [isMobileMenuOpen, closeMobileMenu]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-[var(--z-navbar)] transition-all duration-500',
          isScrolled
            ? 'bg-white/90 backdrop-blur-2xl shadow-[0_1px_0_rgba(15,42,74,0.06)] h-16'
            : 'bg-transparent h-20'
        )}
      >
        <nav
          className="mx-auto flex h-full max-w-[80rem] items-center justify-between px-6 lg:px-12"
          aria-label="Main navigation"
        >
          {/* ── Logo ── */}
          <Link
            href="/"
            className="group relative z-10 flex items-center gap-3"
            aria-label={`${SITE_NAME} — Return to homepage`}
            onClick={closeMobileMenu}
          >
            <div className="flex flex-col">
              <span
                className={cn(
                  'font-[family-name:var(--font-heading)] text-lg font-semibold tracking-tight transition-colors duration-300',
                  isScrolled ? 'text-navy' : 'text-navy'
                )}
              >
                Burj Al Wasl
              </span>
              <span
                className={cn(
                  'text-[9px] font-bold uppercase tracking-[0.3em] transition-colors duration-300',
                  isScrolled ? 'text-azure' : 'text-azure'
                )}
              >
                Premium Interiors
              </span>
            </div>
          </Link>

          {/* ── Desktop Navigation ── */}
          <div className="hidden items-center gap-1 lg:flex">
            {mainNavigation.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
          </div>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-2">
            {/* Search Placeholder */}
            <button
              className={cn(
                'hidden h-9 w-9 items-center justify-center rounded-full transition-all duration-300 lg:flex',
                'text-slate-500 hover:bg-navy/5 hover:text-navy'
              )}
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Language Switch Placeholder */}
            <button
              className={cn(
                'hidden h-9 items-center gap-1.5 rounded-full px-3 text-xs font-semibold uppercase tracking-widest transition-all duration-300 lg:flex',
                'text-slate-500 hover:bg-navy/5 hover:text-navy'
              )}
              aria-label="Switch language"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>EN</span>
            </button>

            {/* CTA Button */}
            <Link
              href="/contact"
              className={cn(
                'hidden h-10 items-center rounded-full px-6 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-500 lg:flex',
                'bg-navy text-white hover:bg-azure',
                'focus-visible:outline-2 focus-visible:outline-azure focus-visible:outline-offset-2'
              )}
            >
              Book Consultation
            </Link>

            {/* ── Mobile Hamburger ── */}
            <button
              className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <div className="relative h-4 w-5">
                <span
                  className={cn(
                    'absolute left-0 block h-[1.5px] w-full rounded-full bg-navy transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                    isMobileMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 top-1/2 block h-[1.5px] w-full -translate-y-1/2 rounded-full bg-navy transition-all duration-300',
                    isMobileMenuOpen ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100'
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 block h-[1.5px] w-full rounded-full bg-navy transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                    isMobileMenuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
                  )}
                />
              </div>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile Menu (portal) ── */}
      <MobileMenu />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NavLink — Desktop nav link with animated underline
// ─────────────────────────────────────────────────────────────────────────────
function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group relative px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600 transition-colors duration-300 hover:text-navy"
    >
      {label}
      <span className="absolute bottom-0.5 left-4 right-4 h-[1.5px] origin-left scale-x-0 bg-azure transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
    </Link>
  );
}
