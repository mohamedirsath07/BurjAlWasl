// =============================================================================
// Burj Al Wasl — Custom Easing Functions
// =============================================================================

/** GSAP easing presets */
export const GSAP_EASE = {
  /** Smooth deceleration — default for most reveals */
  smooth: 'power3.out',
  /** Sharp snap — for UI interactions */
  snap: 'power4.out',
  /** Elastic — for playful micro-interactions */
  bounce: 'elastic.out(1, 0.5)',
  /** Dramatic reveal — for hero/section intros */
  reveal: 'expo.out',
  /** Smooth in/out — for looping animations */
  inOut: 'power2.inOut',
} as const;

/** CSS cubic-bezier values (matching GSAP equivalents) */
export const CSS_EASE = {
  smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
  snap: 'cubic-bezier(0.7, 0, 0.3, 1)',
  bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  default: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

/** Duration presets (in seconds for GSAP) */
export const DURATION = {
  /** Micro-interaction (hover, toggle) */
  fast: 0.3,
  /** Standard animation */
  normal: 0.6,
  /** Slow reveal (sections, hero) */
  slow: 1.0,
  /** Dramatic entrance */
  reveal: 1.2,
  /** Page transition */
  pageTransition: 0.8,
} as const;
