'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData, Category } from '@/data/portfolio';
import { ArrowRight, Search } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/cn';
import Link from 'next/link';

const categories: ('All' | Category)[] = [
  'All',
  'Luxury Villas',
  'Apartments',
  'Hotels',
  'Restaurants',
  'Corporate Offices',
  'Commercial Spaces'
];

export function PortfolioGrid() {
  const [activeFilter, setActiveFilter] = useState<'All' | Category>('All');

  const filteredProjects = activeFilter === 'All' 
    ? portfolioData 
    : portfolioData.filter(p => p.category === activeFilter);

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={cn(
                "px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-500 border",
                activeFilter === category 
                  ? "bg-[#0f2a4a] text-white border-[#0f2a4a]" 
                  : "bg-transparent text-[#0f2a4a] border-[#0f2a4a]/10 hover:border-[#0f2a4a]/40"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry-Style Grid & Empty State */}
        <motion.div layout className="min-h-[400px] relative">
          <AnimatePresence mode="popLayout">
            {filteredProjects.length === 0 ? (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center py-24"
              >
                <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-6 text-slate-300">
                  <Search size={32} strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-3xl font-light text-[#0f2a4a] mb-4">No projects found</h3>
                <p className="text-slate-400 font-light max-w-md">
                  We are currently curating our finest work for this category. Please check back later or explore our other collections.
                </p>
              </motion.div>
            ) : (
              <motion.div 
                key="grid"
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project, index) => {
                    const isLarge = index % 3 === 0;
                    const colSpan = isLarge ? "lg:col-span-8" : "lg:col-span-4";
                    const aspect = isLarge ? "aspect-[16/9] lg:aspect-[16/10]" : "aspect-[4/5] lg:aspect-[3/4]";

                    return (
                      <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className={cn("group relative w-full overflow-hidden bg-slate-100 rounded-xl", colSpan)}
                      >
                        <Link href={`/portfolio/${project.slug}`} className="block w-full h-full">
                          <div className={cn("relative w-full overflow-hidden", aspect)}>
                            <div className="absolute inset-0 bg-[#05111d] z-0" />
                            <Image 
                              src={project.coverImage} 
                              alt={project.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover transition-transform duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 opacity-80 group-hover:opacity-100"
                            />
                            
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#05111d]/90 via-[#05111d]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
                            
                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out flex flex-col justify-end">
                              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a55a] mb-3">
                                {project.serviceCategory}
                              </span>
                              <h3 className="font-heading text-3xl md:text-4xl font-light text-white leading-tight mb-2">
                                {project.title}
                              </h3>
                              <div className="flex items-center gap-2 text-white/70 text-sm font-light mb-6">
                                <span>{project.location}</span>
                                <span className="w-1 h-1 rounded-full bg-white/30" />
                                <span>{project.propertyType}</span>
                              </div>

                              <div className="flex items-center gap-3 text-white text-[11px] font-bold uppercase tracking-widest group/btn">
                                View Case Study
                                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
