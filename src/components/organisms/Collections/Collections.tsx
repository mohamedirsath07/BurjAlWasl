'use client';

import React, { useState } from 'react';
import { useIntersection } from '@/hooks';
import { cn } from '@/lib/cn';
import { Eye } from 'lucide-react';
import Image from 'next/image';

type FilterType = 'all' | 'curtains' | 'motorized' | 'interiors';

export function Collections() {
  const { ref, isVisible } = useIntersection({ threshold: 0.1 });
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');

  const galleryItems = [
    {
      title: "Luxury Villa Living",
      category: "interiors",
      img: "home-hall-interiro.jpeg",
      desc: "Bespoke high ceiling drape integration",
      featured: true // Takes 2 columns
    },
    {
      title: "Hospitality Suite",
      category: "curtains",
      img: "curtain-hotel.jpeg",
      desc: "Flame-retardant luxury hotel sheer system",
      featured: false
    },
    {
      title: "Dual Layer Control",
      category: "motorized",
      img: "daytime-nightime-screen.jpeg",
      desc: "Smart sheer & blackout motorization",
      featured: false
    },
    {
      title: "Master Bedroom Sancturary",
      category: "interiors",
      img: "room-interior.jpeg",
      desc: "Integrated light-blocking drapes",
      featured: true // Takes 2 columns
    },
    {
      title: "Modern Wave Curtains",
      category: "curtains",
      img: "curtain.jpeg",
      desc: "Elegant custom fold drapery",
      featured: false
    },
    {
      title: "Intelligent Automation screen",
      category: "motorized",
      img: "automation-screen-img.jpeg",
      desc: "Silent motor controls & schedules",
      featured: false
    }
  ];

  const filteredItems = selectedFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedFilter);

  return (
    <section id="collections" ref={ref as any} className="pt-40 pb-64 bg-white relative selection:bg-[#c5a55a] selection:text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className={cn(
          "mb-24 flex flex-col items-center text-center transition-all duration-[1200ms] transform",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        )}>
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[1px] bg-[#c5a55a]"></span>
            <span className="text-[#c5a55a] uppercase tracking-[0.3em] text-[10px] font-bold">Our Gallery</span>
            <span className="w-12 h-[1px] bg-[#c5a55a]"></span>
          </div>
          <h3 className="font-heading text-5xl md:text-6xl lg:text-7xl font-light text-[#0f2a4a] leading-tight mb-8">
            Bespoke <br/><span className="italic font-medium text-[#c5a55a]">Collections.</span>
          </h3>
          <p className="text-slate-500 font-light text-lg max-w-2xl mx-auto leading-relaxed">
            Explore our curated projects, fabrics, and intelligent systems, manufactured to international standards.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className={cn(
          "flex flex-wrap justify-center gap-4 mb-20 transition-all duration-[1200ms] delay-300 transform",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          {(['all', 'curtains', 'motorized', 'interiors'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={cn(
                "px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-500 border focus:outline-none focus:ring-2 focus:ring-[#c5a55a] focus:ring-offset-2",
                selectedFilter === filter 
                  ? "bg-[#0f2a4a] text-white border-[#0f2a4a] shadow-lg" 
                  : "bg-transparent text-[#0f2a4a] border-[#0f2a4a]/20 hover:border-[#c5a55a] hover:text-[#c5a55a]"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Asymmetrical Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, i) => (
            <div
              key={item.title}
              className={cn(
                "group relative overflow-hidden rounded-2xl bg-[#f8f9fa] transition-all duration-[1200ms] transform",
                item.featured ? "md:col-span-2 lg:col-span-2 aspect-[16/9] lg:aspect-[21/9]" : "col-span-1 aspect-square lg:aspect-[4/5]",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"
              )}
              style={{ transitionDelay: `${200 + (i * 100)}ms` }}
            >
              {/* Image Container with Zoom effect */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <Image
                  src={`/${item.img}`}
                  alt={item.title}
                  fill
                  sizes={item.featured ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 100vw, 33vw"}
                  className="object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                {/* Luxury Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#091d33]/90 via-[#091d33]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                
                {/* Hover Eye Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transform scale-50 group-hover:scale-100 transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <Eye size={24} strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              {/* Text Description Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a55a] drop-shadow-md">
                  {item.category}
                </span>
                <h4 className="text-2xl md:text-3xl font-light text-white mt-2 mb-1 tracking-tight">
                  {item.title}
                </h4>
                <p className="text-sm text-slate-300 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
