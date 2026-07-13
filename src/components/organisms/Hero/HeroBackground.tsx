'use client';

import { motion } from 'framer-motion';

/**
 * HeroBackground — Renders the cinematic background video and fallbacks.
 * Applies a subtle, elegant zoom-out animation on initial mount.
 */
export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#091d33]">
      {/* Cinematic Zoom-out Animation Container */}
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full h-full"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover select-none pointer-events-none"
        >
          <source src="WhatsApp Video 2026-07-04 at 5.43.52 PM.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Luxury Radial & Linear Dark Gradients for Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#091d33]/90 via-[#091d33]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#091d33] via-transparent to-[#091d33]/50" />
      
      {/* Subtle overlay grid lines for high-end editorial look */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
    </div>
  );
}
export default HeroBackground;
