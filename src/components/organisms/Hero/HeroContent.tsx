'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Award } from 'lucide-react';

/**
 * HeroContent — Luxury typography with line-by-line reveal.
 * 
 * Timing is calibrated to begin AFTER the curtain-open animation completes (~1.8s),
 * so the text emerges from behind the parting curtains naturally.
 */
export function HeroContent() {
  return (
    <div className="flex flex-col max-w-3xl z-10 relative text-left">
      {/* ── Top Premium Category Badge ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3 mb-6"
      >
        <span className="w-8 h-[1.5px] bg-[#c5a55a]" />
        <span className="text-[#c5a55a] uppercase tracking-[0.3em] text-[10px] font-bold">
          Premium Luxury Interior Solutions
        </span>
      </motion.div>

      {/* ── Main Editorial Headline ── */}
      <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.05] tracking-tight mb-8">
        <div className="overflow-hidden pb-1">
          <motion.div
            initial={{ y: '120%', rotate: 2 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ delay: 1.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Elevating
          </motion.div>
        </div>
        <div className="overflow-hidden pb-1">
          <motion.div
            initial={{ y: '120%', rotate: 2 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ delay: 2.0, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Spaces with
          </motion.div>
        </div>
        <div className="overflow-hidden pb-1">
          <motion.div
            initial={{ y: '120%', rotate: 2 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ delay: 2.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#c5a55a] font-medium"
          >
            Precision.
          </motion.div>
        </div>
      </h1>

      {/* ── Subheadline ── */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-slate-300 text-base md:text-lg font-light leading-relaxed max-w-xl mb-6"
      >
        International standard bespoke window treatments, curtains, blinds, and interior solutions engineered for the finest villas, penthouses, and commercial environments across the UAE.
      </motion.p>

      {/* ── Trust Badges ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap gap-4 items-center mb-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 max-w-xl shadow-[var(--shadow-xl)]"
      >
        <div className="flex items-center gap-2 pr-4 border-r border-white/10">
          <div className="flex text-[#c5a55a]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
          <span className="text-[10px] text-white font-bold tracking-wide">
            5.0 Rating
          </span>
        </div>

        <div className="flex items-center gap-2 pr-4 border-r border-white/10">
          <ShieldCheck className="w-4 h-4 text-[#c5a55a]" />
          <span className="text-[10px] text-slate-300 font-medium uppercase tracking-wider">
            Trusted by Architects
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[#c5a55a]" />
          <span className="text-[10px] text-slate-300 font-medium uppercase tracking-wider">
            Premium Materials
          </span>
        </div>
      </motion.div>
    </div>
  );
}
export default HeroContent;
