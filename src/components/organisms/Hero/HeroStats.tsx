'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

/**
 * AnimatedCounter — Counts up smoothly from 0 to target value.
 */
function AnimatedCounter({ value, suffix, label, delay }: StatItemProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 2000; // 2 seconds animation duration

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing out quadratic function
      const easeProgress = progress * (2 - progress);
      setCount(Math.floor(easeProgress * value));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const startTimeout = setTimeout(() => {
      window.requestAnimationFrame(step);
    }, delay * 1000);

    return () => clearTimeout(startTimeout);
  }, [value, delay]);

  return (
    <div className="flex flex-col select-none" aria-label={`${value}${suffix} ${label}`}>
      <span className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-tight">
        {count}
        <span className="text-[#1e81b0] font-medium">{suffix}</span>
      </span>
      <span className="text-[10px] uppercase tracking-widest text-slate-400 mt-2 font-semibold">
        {label}
      </span>
    </div>
  );
}

/**
 * HeroStats — Renders the animated counter stats at the bottom of the hero section.
 */
export function HeroStats() {
  const stats = [
    { value: 5000, suffix: '+', label: 'Projects Completed', delay: 1.2 },
    { value: 15, suffix: '+', label: 'Years Experience', delay: 1.4 },
    { value: 98, suffix: '%', label: 'Client Satisfaction', delay: 1.6 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-3 gap-6 md:gap-12 border-t border-white/10 pt-10 mt-16 max-w-2xl relative z-10"
    >
      {stats.map((stat, i) => (
        <AnimatedCounter
          key={stat.label}
          value={stat.value}
          suffix={stat.suffix}
          label={stat.label}
          delay={stat.delay}
        />
      ))}
    </motion.div>
  );
}
export default HeroStats;
