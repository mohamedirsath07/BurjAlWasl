'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CaseStudy } from '@/data/portfolio';
import Image from 'next/image';

export function CaseStudyHero({ project }: { project: CaseStudy }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section className="relative h-screen min-h-[700px] w-full flex flex-col justify-end overflow-hidden bg-[#05111d]">
      
      {/* Parallax Background Image */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-[120%]"
      >
        <Image 
          src={project.heroImage} 
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Luxury Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05111d] via-[#05111d]/40 to-transparent" />
      </motion.div>

      {/* Hero Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="text-[#c5a55a] uppercase tracking-[0.3em] text-[10px] font-bold">Case Study</span>
          <span className="w-12 h-[1px] bg-[#c5a55a]"></span>
          <span className="text-white/70 uppercase tracking-widest text-[10px]">{project.category}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-5xl md:text-7xl lg:text-[90px] font-light text-white leading-[1.05] tracking-tight mb-12 max-w-4xl"
        >
          {project.title}
        </motion.h1>

        {/* Quick Meta Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 border-t border-white/10 pt-10"
        >
          <div>
            <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">Location</h4>
            <p className="text-white text-sm font-light">{project.location}</p>
          </div>
          <div>
            <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">Property Type</h4>
            <p className="text-white text-sm font-light">{project.propertyType}</p>
          </div>
          <div>
            <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">Primary Service</h4>
            <p className="text-white text-sm font-light">{project.serviceCategory}</p>
          </div>
          <div>
            <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">Project Scale</h4>
            <p className="text-white text-sm font-light">{project.stats.sqft} SQFT</p>
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
}
