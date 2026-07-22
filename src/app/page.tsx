import type { Metadata } from 'next';
import { LandingPage } from '@/components/landing';
import { SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION } from '@/lib/constants';

export const metadata: Metadata = {
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    type: 'website',
  },
};

/**
 * Burj Al Wasl — Premium SaaS-style landing page.
 * Dark-mode-first, glassmorphism, animated gradient background,
 * GSAP + Framer Motion scroll reveal. See @/components/landing.
 */
export default function Home() {
  return <LandingPage />;
}
