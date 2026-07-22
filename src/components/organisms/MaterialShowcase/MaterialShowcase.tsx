'use client';

import React, { useState } from 'react';
import { useIntersection } from '@/hooks';
import { cn } from '@/lib/cn';
import { motion, AnimatePresence } from 'framer-motion';

const materials = [
  {
    id: 'velvet',
    name: 'Velvet',
    tagline: 'Opulent Depth',
    description: 'Rich, heavy pile fabric that absorbs light and creates a sense of quiet luxury. Ideal for formal living rooms, master bedrooms, and cinematic spaces where sound dampening and thermal insulation are paramount.',
    applications: ['Master Bedrooms', 'Home Theaters', 'Formal Dining'],
    texture: '/curtain.jpeg',
    color: '#4a2c2a',
  },
  {
    id: 'linen',
    name: 'Linen',
    tagline: 'Natural Elegance',
    description: 'Breathable, textured weave that softens harsh light while preserving warmth. Its organic irregularity creates depth that synthetic fabrics cannot replicate. A timeless choice for spaces that value understated refinement.',
    applications: ['Living Rooms', 'Dining Areas', 'Coastal Villas'],
    texture: '/home-hall-interiro.jpeg',
    color: '#c5b69e',
  },
  {
    id: 'sheer',
    name: 'Sheer',
    tagline: 'Ethereal Light',
    description: 'Translucent voile and organza that diffuses sunlight into a warm, ambient glow. Layered beneath heavier drapes, sheers create dimensionality and protect interiors from UV exposure without sacrificing the view.',
    applications: ['All Living Spaces', 'Hospitality', 'Office Partitions'],
    texture: '/curtain-hotel.jpeg',
    color: '#f5f0e8',
  },
  {
    id: 'blackout',
    name: 'Blackout',
    tagline: 'Total Control',
    description: 'Triple-weave construction with an opaque interlining that eliminates 100% of external light. Engineered for absolute privacy and optimal sleep environments. Available in hundreds of luxury finishes.',
    applications: ['Bedrooms', 'Media Rooms', 'Conference Rooms'],
    texture: '/room-interior.jpeg',
    color: '#1a1a2e',
  },
];

export function MaterialShowcase() {
  const { ref, isVisible } = useIntersection({ threshold: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);
  const active = materials[activeIndex];

  return (
    <section ref={ref as React.Ref<HTMLElement>} className="py-40 bg-[#f8f9fa] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Section Header */}
        <div className={cn(
          "mb-24 transition-all duration-[1200ms] transform",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
        )}>
          <div className="flex items-center gap-4 mb-8">
            <span className="w-12 h-[1px] bg-[#c5a55a]" />
            <span className="text-[#c5a55a] uppercase tracking-[0.3em] text-[10px] font-bold">Materials</span>
          </div>
          <h2 className="font-heading text-5xl md:text-7xl font-light text-[#0f2a4a] leading-tight">
            The <span className="italic font-medium text-[#c5a55a]">Fabric</span> of Luxury.
          </h2>
        </div>

        {/* Material Selector Tabs */}
        <div className={cn(
          "flex flex-wrap gap-2 mb-16 transition-all duration-[1200ms] delay-200",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          {materials.map((mat, i) => (
            <button
              key={mat.id}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative px-8 py-4 text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-500 rounded-full border",
                activeIndex === i
                  ? "bg-[#0f2a4a] text-white border-[#0f2a4a]"
                  : "bg-transparent text-[#0f2a4a] border-[#0f2a4a]/10 hover:border-[#c5a55a]/50"
              )}
            >
              {mat.name}
            </button>
          ))}
        </div>

        {/* Active Material Display */}
        <div className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center transition-all duration-[1200ms] delay-300",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          
          {/* Image */}
          <div className="relative aspect-[4/5] lg:aspect-square rounded-2xl overflow-hidden shadow-2xl group">
            <AnimatePresence mode="wait">
              <motion.img
                key={active?.id}
                src={active?.texture}
                alt={active?.name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-[1.03]"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-[#05111d]/50 via-transparent to-transparent" />
            
            {/* Material Name Overlay */}
            <div className="absolute bottom-8 left-8 z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active?.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a55a]">{active?.tagline}</span>
                  <h3 className="font-heading text-5xl font-light text-white mt-2">{active?.name}</h3>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Text Content */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active?.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-slate-500 font-light text-lg leading-relaxed mb-12">
                  {active?.description}
                </p>

                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a55a] mb-6">Recommended For</h4>
                  <div className="flex flex-wrap gap-3">
                    {active?.applications.map((app) => (
                      <span
                        key={app}
                        className="px-5 py-2.5 rounded-full border border-[#0f2a4a]/10 text-[11px] font-medium text-[#0f2a4a] tracking-wide"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
