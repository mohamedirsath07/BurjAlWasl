'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const shouldReduceMotion = useReducedMotion();

  const y = useTransform(scrollYProgress, [0, 1], ['0%', shouldReduceMotion ? '0%' : '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, shouldReduceMotion ? 1 : 1.1]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen min-h-[800px] w-full flex flex-col justify-end overflow-hidden bg-[#050505]"
    >
      {/* Background Video / WebGL Placeholder */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 w-full h-full opacity-40"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10" />
        {/* Placeholder for future WebGL or video */}
        <div className="w-full h-full bg-[#111] animate-pulse"></div>
      </motion.div>

      {/* Hero Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-20 w-full max-w-[1600px] mx-auto px-6 md:px-12 pb-24 md:pb-32"
      >
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4"
          >
            <span className="w-12 h-[1px] bg-[#f5f5f0]"></span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#f5f5f0] font-bold">
              Digital Product Studio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-6xl md:text-[8rem] lg:text-[10rem] leading-[0.9] font-bold tracking-tighter"
          >
            ENGINEERING
            <br />
            <span className="text-[#f5f5f0]/40">EXCELLENCE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl text-lg md:text-2xl font-light text-[#f5f5f0]/70 mt-8"
          >
            We design and build premium digital experiences for Fortune 500s and disruptive startups.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
