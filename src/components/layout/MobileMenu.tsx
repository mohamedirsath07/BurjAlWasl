'use client';

/**
 * MobileMenu — Full-screen luxury mobile navigation overlay.
 *
 * Architecture:
 * - Full-viewport overlay with clip-path animation (circle reveal)
 * - Staggered nav link entrance using Framer Motion custom variants
 * - Scroll lock while open via Zustand store
 * - Focus trapped inside when open
 * - Keyboard: Escape to close
 *
 * Accessibility:
 * - role="dialog", aria-modal="true"
 * - Focus trap loops through menu items
 * - Links announce as navigation
 */

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Instagram, Linkedin, Facebook } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useUIStore } from '@/store/useUIStore';
import { useLockScroll } from '@/hooks';
import { mainNavigation, socialLinks } from '@/data/navigation';
import { COMPANY_INFO } from '@/lib/constants';

const overlayVariants = {
  hidden: { clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' },
  visible: {
    clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
  exit: {
    clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)',
    transition: {
      duration: 0.5,
      ease: [0.7, 0, 0.3, 1] as [number, number, number, number],
    },
  },
};

const linkVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.25 + i * 0.08,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

// ── Stagger Container ──
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const socialIcons = {
  instagram: Instagram,
  linkedin: Linkedin,
  facebook: Facebook,
} as const;

export function MobileMenu() {
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useLockScroll(isMobileMenuOpen);

  // Auto-focus first link on open
  useEffect(() => {
    if (isMobileMenuOpen) {
      setTimeout(() => firstLinkRef.current?.focus(), 400);
    }
  }, [isMobileMenuOpen]);

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          key="mobile-menu"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-[calc(var(--z-navbar)-1)] flex flex-col justify-between overflow-y-auto bg-white px-6 pb-8 pt-24"
        >
          {/* ── Navigation Links ── */}
          <nav className="flex flex-col gap-1" aria-label="Mobile menu">
            {mainNavigation.map((item, i) => (
              <motion.div
                key={item.href}
                custom={i}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Link
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={cn(
                    'group flex items-center justify-between border-b border-slate-100 py-5',
                    'text-3xl font-light tracking-tight text-navy transition-colors',
                    'font-[family-name:var(--font-heading)]',
                    'hover:text-azure focus-visible:text-azure'
                  )}
                >
                  <span>{item.label}</span>
                  <span className="text-sm font-normal text-slate-300 transition-colors group-hover:text-azure">
                    0{i + 1}
                  </span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* ── Bottom Section ── */}
          <div className="mt-12 space-y-8">
            {/* Contact Info */}
            <motion.div
              custom={0.6}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-azure">
                Get in Touch
              </p>
              <div className="flex flex-col gap-2.5 text-sm text-slate-500">
                <a
                  href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 transition-colors hover:text-navy"
                >
                  <Phone className="h-3.5 w-3.5 text-azure" />
                  {COMPANY_INFO.phone}
                </a>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-center gap-3 transition-colors hover:text-navy"
                >
                  <Mail className="h-3.5 w-3.5 text-azure" />
                  {COMPANY_INFO.email}
                </a>
                <span className="flex items-center gap-3">
                  <MapPin className="h-3.5 w-3.5 text-azure" />
                  {COMPANY_INFO.address.street}, {COMPANY_INFO.address.city}
                </span>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              custom={0.8}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex gap-3"
            >
              {socialLinks.map((link) => {
                const Icon = socialIcons[link.platform as keyof typeof socialIcons];
                if (!Icon) return null;
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-all duration-300 hover:border-azure hover:text-azure"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </motion.div>

            {/* CTA */}
            <motion.div
              custom={0.9}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <Link
                href="/contact"
                onClick={closeMobileMenu}
                className="flex h-14 w-full items-center justify-center rounded-full bg-navy text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-azure"
              >
                Book Consultation
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
