import React from 'react';
import { HeroBackground } from './HeroBackground';
import { HeroContent } from './HeroContent';
import { HeroCTA } from './HeroCTA';
import { HeroStats } from './HeroStats';
import { HeroScrollIndicator } from './HeroScrollIndicator';

/**
 * Hero — The master Awwwards-winning Hero section for Burj Al Wasl.
 * Architecture:
 * - Structural Server Component for optimal performance and SEO.
 * - Imports specialized animated Client Components for interactive states.
 * - full-viewport h-screen layout with editorial spacing.
 */
export function Hero() {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen w-full flex items-center justify-start overflow-hidden bg-[#091d33] pt-32 pb-12"
      aria-label="Welcome Showcase"
    >
      {/* ── Cinematic Background video & overlays ── */}
      <HeroBackground />

      {/* ── Main Layout Container ── */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative z-10 flex flex-col justify-center">
        <div className="max-w-3xl flex flex-col justify-center">
          {/* Main editorial text block */}
          <HeroContent />

          {/* Consultation & Projects Actions */}
          <HeroCTA />

          {/* Live counting up company statistics */}
          <HeroStats />
        </div>
      </div>

      {/* ── Scroll marker ── */}
      <HeroScrollIndicator />
    </section>
  );
}
export default Hero;
