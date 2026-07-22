'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

/**
 * HeroBackground — Cinematic curtain-open reveal with warm light bleed.
 * 
 * The video starts hidden behind two CSS clip-path "curtain" panels.
 * On mount, the curtains part from center outward, revealing the background
 * video with a warm golden light wash that fades as the curtains fully open.
 * 
 * This creates a tactile, material connection to curtains — the core product.
 */
export function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleCanPlay = () => setVideoLoaded(true);
    video.addEventListener('canplaythrough', handleCanPlay);
    
    // Fallback: if video takes too long, reveal anyway
    const timeout = setTimeout(() => setVideoLoaded(true), 2000);
    
    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#091d33]">

      {/* Warm Light Bleed — glows through the "gap" as curtains open */}
      <motion.div
        initial={{ opacity: 0.8 }}
        animate={{ opacity: videoLoaded ? 0 : 0.8 }}
        transition={{ duration: 2, delay: 0.8, ease: 'easeOut' }}
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(197,165,90,0.15) 0%, transparent 60%)',
        }}
      />

      {/* Video Layer — fades in as curtains part */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: videoLoaded ? 1 : 0 }}
        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className="relative w-full h-full"
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover select-none pointer-events-none"
        >
          <source src="WhatsApp Video 2026-07-04 at 5.43.52 PM.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Left Curtain Panel */}
      <motion.div
        initial={{ x: '0%' }}
        animate={{ x: videoLoaded ? '-105%' : '0%' }}
        transition={{ duration: 1.8, ease: [0.7, 0, 0.3, 1], delay: 0.4 }}
        className="absolute inset-y-0 left-0 w-1/2 bg-[#091d33] z-[3]"
      >
        {/* Subtle fabric texture on the curtain panel */}
        <div className="absolute inset-0 opacity-[0.03] bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(255,255,255,0.1)_2px,rgba(255,255,255,0.1)_4px)]" />
      </motion.div>

      {/* Right Curtain Panel */}
      <motion.div
        initial={{ x: '0%' }}
        animate={{ x: videoLoaded ? '105%' : '0%' }}
        transition={{ duration: 1.8, ease: [0.7, 0, 0.3, 1], delay: 0.4 }}
        className="absolute inset-y-0 right-0 w-1/2 bg-[#091d33] z-[3]"
      >
        <div className="absolute inset-0 opacity-[0.03] bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(255,255,255,0.1)_2px,rgba(255,255,255,0.1)_4px)]" />
      </motion.div>

      {/* Center Seam Line — the line where curtains meet, fades out as they part */}
      <motion.div
        initial={{ opacity: 0.3, scaleY: 1 }}
        animate={{ opacity: 0, scaleY: 0.8 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.6 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-[#c5a55a]/30 to-transparent z-[4]"
      />

      {/* Cinematic Gradient Overlays for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#091d33]/90 via-[#091d33]/50 to-transparent z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#091d33] via-transparent to-[#091d33]/40 z-[1]" />
    </div>
  );
}
export default HeroBackground;
