'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Ruler, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/cn';

export function ConsultationHero() {
  const trustElements = [
    { icon: Star, label: "5.0 Google Rating" },
    { icon: CheckCircle2, label: "500+ Projects Completed" },
    { icon: ShieldCheck, label: "10-Year Warranty" },
    { icon: Ruler, label: "Free Site Measurement" },
  ];

  return (
    <section className="relative pt-48 pb-16 lg:pb-32 bg-[#05111d] flex flex-col items-center justify-center overflow-hidden selection:bg-[#c5a55a]">
      {/* Background ambient gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0f2a4a]/40 via-[#05111d] to-[#05111d] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Editorial Headline */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="w-8 h-[1px] bg-[#c5a55a]"></span>
            <span className="text-[#c5a55a] uppercase tracking-[0.3em] text-[10px] font-bold">Design Consultation</span>
          </motion.div>

          <h1 className="font-heading text-5xl md:text-6xl lg:text-[72px] font-light text-white leading-[1.05] tracking-tight mb-8">
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              Bring your
            </motion.div>
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="italic text-[#c5a55a]"
            >
              vision to life.
            </motion.div>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-400 text-lg md:text-xl font-light leading-relaxed max-w-lg mb-12"
          >
            Schedule a private consultation with our lead designers. We'll explore premium fabrics, discuss intelligent motorization, and craft a bespoke plan for your space.
          </motion.p>

          {/* Trust Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="grid grid-cols-2 gap-y-6 gap-x-4"
          >
            {trustElements.map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-white/80">
                <item.icon size={18} className="text-[#c5a55a]" strokeWidth={1.5} />
                <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Luxury Imagery */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[4/5] lg:aspect-square w-full rounded-2xl overflow-hidden shadow-2xl"
        >
          <img 
            src="/room-interior.jpeg" 
            alt="Luxury interior design consultation"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#05111d]/60 via-transparent to-transparent" />
        </motion.div>

      </div>
    </section>
  );
}
