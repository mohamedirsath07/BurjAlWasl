'use client';

import { motion } from 'framer-motion';

/**
 * HeroScrollIndicator — A minimal, elegant mouse-shaped indicator
 * with a breathing dot that pulses gently, inviting scroll.
 * 
 * Intentionally quiet. No text label. The shape communicates instantly.
 */
export function HeroScrollIndicator() {
  const scrollDown = () => {
    const next = document.getElementById('process') || document.getElementById('expertise');
    if (next) {
      const offset = next.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.8, duration: 1.2 }}
      className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-4 cursor-pointer group"
      onClick={scrollDown}
      role="button"
      aria-label="Scroll to next section"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') scrollDown(); }}
    >
      {/* Mouse shape */}
      <div className="w-6 h-10 rounded-full border-[1.5px] border-white/25 relative flex justify-center group-hover:border-white/50 transition-colors duration-500">
        {/* Breathing scroll dot */}
        <motion.div
          animate={{ y: [2, 12, 2] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: [0.45, 0, 0.55, 1],
          }}
          className="w-[3px] h-[3px] rounded-full bg-[#c5a55a] mt-2"
        />
      </div>
    </motion.div>
  );
}
export default HeroScrollIndicator;
