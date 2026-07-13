'use client';

import { motion } from 'framer-motion';

/**
 * HeroScrollIndicator — An elegant vertical scroll tracker indicating additional content below.
 */
export function HeroScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 1 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10 cursor-pointer hidden md:flex"
      onClick={() => {
        const nextSection = document.getElementById('expertise');
        if (nextSection) {
          const navbarHeight = 80;
          const elementPosition = nextSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - navbarHeight;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }}
    >
      <span className="text-[9px] uppercase tracking-[0.3em] text-white/50 font-bold hover:text-white transition-colors duration-300">
        Scroll Down
      </span>
      
      {/* Editorial Vertical Sliding Line */}
      <div className="w-[1.5px] h-12 bg-white/10 relative rounded-full overflow-hidden">
        <motion.div
          animate={{
            y: [-48, 48],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-0 w-full h-1/2 bg-azure rounded-full"
        />
      </div>
    </motion.div>
  );
}
export default HeroScrollIndicator;
