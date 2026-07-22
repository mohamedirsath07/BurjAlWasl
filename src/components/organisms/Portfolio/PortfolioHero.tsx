'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function PortfolioHero() {
  return (
    <section className="relative pt-48 pb-24 bg-[#05111d] flex flex-col items-center justify-center overflow-hidden selection:bg-[#c5a55a]">
      {/* Background ambient gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0f2a4a]/40 via-[#05111d] to-[#05111d] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="w-12 h-[1px] bg-[#c5a55a]"></span>
          <span className="text-[#c5a55a] uppercase tracking-[0.3em] text-[10px] font-bold">Curated Work</span>
          <span className="w-12 h-[1px] bg-[#c5a55a]"></span>
        </motion.div>

        <h1 className="font-heading text-5xl md:text-7xl lg:text-[100px] font-light text-white leading-[1.05] tracking-tight mb-8">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            Portfolio &
          </motion.div>
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="italic text-slate-400"
          >
            Case Studies.
          </motion.div>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-slate-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto"
        >
          Explore a selection of our finest residential and commercial projects. A testament to precision, light, and unparalleled luxury.
        </motion.p>
      </div>
    </section>
  );
}
