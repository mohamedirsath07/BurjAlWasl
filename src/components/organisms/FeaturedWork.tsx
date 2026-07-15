'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
  {
    title: 'Fintech Revolution',
    client: 'Global Bank',
    category: 'Web App',
    year: '2025',
    color: 'bg-[#1a1a1a]',
  },
  {
    title: 'Luxury Automotive',
    client: 'EV Brand',
    category: 'E-Commerce',
    year: '2024',
    color: 'bg-[#0f172a]',
  },
  {
    title: 'Health & Wellness',
    client: 'Zoya Resort',
    category: 'Branding & Platform',
    year: '2024',
    color: 'bg-[#1e1b4b]',
  },
];

export function FeaturedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create a horizontal scroll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Moves the inner container horizontally
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66.66%']);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[300vh] bg-[#050505]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        
        <div className="absolute top-24 left-6 md:left-12 z-20">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f5f5f0]/50">
            Selected Work
          </h2>
        </div>

        <motion.div 
          style={{ x }} 
          className="flex gap-8 md:gap-24 px-6 md:px-32 w-[300vw]"
        >
          {projects.map((project, index) => (
            <div 
              key={index}
              className="relative w-[80vw] md:w-[60vw] h-[60vh] md:h-[70vh] flex-shrink-0 group cursor-pointer"
            >
              <div className={`w-full h-full rounded-2xl overflow-hidden ${project.color} transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[0.98]`}>
                {/* Image Placeholder */}
                <div className="w-full h-full opacity-50 mix-blend-overlay bg-gradient-to-br from-black/40 to-transparent"></div>
              </div>

              {/* Project Meta */}
              <div className="absolute -bottom-16 left-0 right-0 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <div>
                  <h3 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-[#f5f5f0]">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#f5f5f0]/50 mt-2 font-bold uppercase tracking-widest">
                    {project.client} &bull; {project.category}
                  </p>
                </div>
                <div className="text-[#f5f5f0]/30 font-heading text-4xl font-bold">
                  {project.year}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
