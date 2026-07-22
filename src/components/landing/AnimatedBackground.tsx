'use client';

// =============================================================================
// AnimatedBackground — GSAP-driven animated gradient "aurora"
// =============================================================================
// Fixed, decorative layer sitting behind all landing content. Soft blurred
// gradient blobs drift + scale on an infinite loop. Respects reduced motion.
// =============================================================================

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function AnimatedBackground() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context((self) => {
      const blobs = self.selector?.('.ln-aurora__blob') ?? [];
      const configs = [
        { x: 120, y: 80, s: 1.2, d: 16 },
        { x: -140, y: 120, s: 1.25, d: 20 },
        { x: 90, y: -110, s: 1.15, d: 18 },
      ];
      blobs.forEach((blob: Element, i: number) => {
        const c = configs[i % configs.length]!;
        gsap.to(blob, {
          x: c.x,
          y: c.y,
          scale: c.s,
          duration: c.d,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Base wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 60% at 50% -10%, var(--ln-bg-2), var(--ln-bg) 60%)',
        }}
      />

      {/* Drifting gradient blobs */}
      <div
        className="ln-aurora__blob absolute h-[42rem] w-[42rem] rounded-full blur-[100px]"
        style={{
          top: '-14rem',
          left: '-8rem',
          background: 'radial-gradient(circle, var(--ln-glow-1), transparent 70%)',
        }}
      />
      <div
        className="ln-aurora__blob absolute h-[38rem] w-[38rem] rounded-full blur-[110px]"
        style={{
          top: '20%',
          right: '-12rem',
          background: 'radial-gradient(circle, var(--ln-glow-3), transparent 70%)',
        }}
      />
      <div
        className="ln-aurora__blob absolute h-[34rem] w-[34rem] rounded-full blur-[110px]"
        style={{
          bottom: '-10rem',
          left: '25%',
          background: 'radial-gradient(circle, var(--ln-glow-2), transparent 70%)',
        }}
      />

      {/* Subtle grid overlay near the top */}
      <div className="ln-grid-overlay" />
    </div>
  );
}
