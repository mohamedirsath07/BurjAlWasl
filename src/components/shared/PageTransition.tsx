'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

/**
 * PageTransition — Premium page enter/exit animation.
 * Uses Framer Motion to slide and fade routes as the pathname changes.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1], // Custom agency cubic bezier (expo out style)
      }}
      className="flex flex-col min-h-screen justify-between"
    >
      {children}
    </motion.div>
  );
}
