'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from '@/components/atoms/MagneticButton';
import { usePathname, useRouter } from 'next/navigation';

export function MobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA only after scrolling past the hero section (approx 500px)
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't show the sticky CTA on the landing home page (it has its own CTAs and
  // dark theme) or on the consultation / contact pages.
  if (pathname === '/' || pathname === '/consultation' || pathname === '/contact') {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 w-full z-50 md:hidden pb-6 pt-4 px-6 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none"
        >
          <div className="w-full flex justify-center pointer-events-auto shadow-2xl rounded-full">
            <MagneticButton 
              type="button"
              onClick={() => router.push('/consultation')}
              variant="primary"
              className="w-full justify-center py-4 text-xs font-bold tracking-widest"
            >
              Book Consultation
            </MagneticButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
