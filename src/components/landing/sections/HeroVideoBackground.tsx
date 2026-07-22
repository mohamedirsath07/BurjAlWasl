'use client';

// =============================================================================
// HeroVideoBackground — cinematic full-bleed video backdrop for the hero
// =============================================================================
// Autoplaying, muted, looping brand video with a poster image for instant
// paint (good LCP), a slow zoom, brand-tinted overlays for legibility, and a
// bottom fade that blends seamlessly into the dark landing page below.
// =============================================================================

// The public asset name contains spaces, so it must be URL-encoded.
const VIDEO_SRC = '/WhatsApp%20Video%202026-07-04%20at%205.43.52%20PM.mp4';
const POSTER_SRC = '/home-hall-interiro.jpeg';

export function HeroVideoBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={POSTER_SRC}
        className="ln-slow-zoom absolute inset-0 h-full w-full object-cover"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Brand color grade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(5,7,14,0.55) 0%, rgba(5,7,14,0.35) 40%, rgba(5,7,14,0.75) 100%)',
        }}
      />
      {/* Azure/navy tint to match the brand palette */}
      <div
        className="absolute inset-0 mix-blend-multiply"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 30%, rgba(30,129,176,0.28), transparent 70%)',
        }}
      />
      {/* Vignette + seamless fade into the page background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 45%, rgba(5,7,14,0.6) 100%)',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-48"
        style={{ background: 'linear-gradient(to top, var(--ln-bg), transparent)' }}
      />
    </div>
  );
}
