'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Award, Calendar, ShieldCheck, Star } from 'lucide-react';
import { LandingButton } from '../LandingButton';
import { HeroVideoBackground } from './HeroVideoBackground';

const ACCENT = '#3a9cc5';

const EASE = [0.16, 1, 0.3, 1] as const;

const HERO_STATS = [
  { value: 5000, suffix: '+', label: 'Projects Completed' },
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
];

const HEADLINE = ['Elevating', 'Spaces with', 'Precision.'];

// ── Count-up stat ──
function AnimatedStat({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (reduceMotion) return;
    let raf = 0;
    let start: number | null = null;
    const duration = 1800;

    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = progress * (2 - progress);
      setCount(Math.floor(eased * value));
      if (progress < 1) raf = window.requestAnimationFrame(step);
    };

    const timeout = window.setTimeout(() => {
      raf = window.requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      window.clearTimeout(timeout);
      window.cancelAnimationFrame(raf);
    };
  }, [value, delay, reduceMotion]);

  return (
    <div className="flex flex-col select-none" aria-label={`${value}${suffix} ${label}`}>
      <span className="font-heading text-4xl font-light tracking-tight text-white md:text-5xl">
        {count.toLocaleString()}
        <span className="font-medium" style={{ color: ACCENT }}>
          {suffix}
        </span>
      </span>
      <span className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
        {label}
      </span>
    </div>
  );
}

export function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const fadeUp = {
    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative isolate flex min-h-screen w-full items-center overflow-hidden pb-24 pt-32"
    >
      <HeroVideoBackground />

      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex max-w-3xl flex-col text-left"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3">
            <span className="h-[1.5px] w-8" style={{ backgroundColor: ACCENT }} />
            <span
              className="text-[10px] font-bold uppercase tracking-[0.3em]"
              style={{ color: ACCENT }}
            >
              Premium Luxury Interior Solutions
            </span>
          </motion.div>

          {/* Headline — line-by-line reveal */}
          <h1 className="mb-8 font-heading text-5xl font-light leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
            {HEADLINE.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  style={i === 2 ? { color: ACCENT, fontWeight: 500 } : undefined}
                  initial={reduceMotion ? { opacity: 0 } : { y: '115%' }}
                  animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
                  transition={{ duration: 1.1, delay: 0.3 + i * 0.18, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="mb-6 max-w-xl text-base font-light leading-relaxed text-slate-300 md:text-lg"
          >
            International standard bespoke window treatments, curtains, blinds, and interior
            solutions engineered for the finest villas, penthouses, and commercial environments
            across the UAE.
          </motion.p>

          {/* Trust badges */}
          <motion.div
            variants={fadeUp}
            className="ln-glass mb-8 flex max-w-xl flex-wrap items-center gap-4 rounded-2xl p-4"
          >
            <div className="flex items-center gap-2 border-r border-white/10 pr-4">
              <div className="flex" style={{ color: ACCENT }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <span className="text-[10px] font-bold tracking-wide text-white">5.0 Rating</span>
            </div>
            <div className="flex items-center gap-2 border-r border-white/10 pr-4">
              <ShieldCheck className="h-4 w-4" style={{ color: ACCENT }} />
              <span className="text-[10px] font-medium uppercase tracking-wider text-slate-300">
                Trusted by Architects
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4" style={{ color: ACCENT }} />
              <span className="text-[10px] font-medium uppercase tracking-wider text-slate-300">
                Premium Materials
              </span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
            <LandingButton
              href="/consultation"
              size="lg"
              className="text-xs uppercase tracking-[0.2em]"
            >
              Book Free Consultation
              <Calendar size={16} className="opacity-80" />
            </LandingButton>
            <LandingButton
              href="#work"
              size="lg"
              variant="secondary"
              className="text-xs uppercase tracking-[0.2em]"
            >
              View Projects
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </LandingButton>
          </motion.div>

          {/* Stats */}
          <motion.dl
            variants={fadeUp}
            className="mt-12 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/10 pt-8 md:gap-12"
          >
            {HERO_STATS.map((stat, i) => (
              <AnimatedStat
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={1 + i * 0.2}
              />
            ))}
          </motion.dl>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#services"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="group absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400">
          Scroll Down
        </span>
        <span className="relative flex h-10 w-6 justify-center rounded-full border-[1.5px] border-white/25 transition-colors duration-500 group-hover:border-white/50">
          <motion.span
            animate={{ y: [2, 12, 2] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
            className="mt-2 h-[3px] w-[3px] rounded-full"
            style={{ backgroundColor: ACCENT }}
          />
        </span>
      </motion.a>
    </section>
  );
}
