'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const clients = [
  'Sobha Constructions',
  'Landmark Group',
  'Avani+ Palm View Dubai',
  'Zoya Health & Wellbeing Resort',
  'Verona Resort',
  'Friends Avenue Cafe',
  'Ruwi Hotel Apartments',
  'Club Iris',
  'Master Technovision',
];

export function LogoMarquee() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="py-24 overflow-hidden bg-[#050505] border-t border-b border-[#f5f5f0]/10">
      <div className="text-center mb-12">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f5f5f0]/50">
          Our Top Clients
        </h2>
      </div>
      <div className="relative flex max-w-[100vw] overflow-hidden">
        {/* Left/Right Gradients for fade effect */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-[#050505] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-[#050505] to-transparent" />

        <motion.div
          animate={{ x: shouldReduceMotion ? '0%' : ['0%', '-50%'] }}
          transition={{
            duration: 30,
            ease: 'linear',
            repeat: Infinity,
          }}
          className={`flex whitespace-nowrap ${shouldReduceMotion ? 'overflow-x-auto' : ''}`}
        >
          {/* Double the list to create a seamless loop */}
          {[...clients, ...clients].map((client, index) => (
            <div
              key={index}
              className="flex items-center justify-center px-12 md:px-24"
            >
              {/* Since we don't have SVGs yet, we render clean typography as a placeholder for the logos */}
              <span className="font-heading text-xl md:text-3xl font-bold opacity-30 hover:opacity-100 transition-opacity duration-300">
                {client}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
