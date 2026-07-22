'use client';

import React from 'react';
import { useIntersection, useScroll } from '@/hooks';
import { MagneticButton } from '@/components/atoms/MagneticButton';
import { cn } from '@/lib/cn';
import Image from 'next/image';

export function Expertise() {
  const { scrollY } = useScroll();
  const { ref: ref1, isVisible: isVis1 } = useIntersection({ threshold: 0.2 });
  const { ref: ref2, isVisible: isVis2 } = useIntersection({ threshold: 0.2 });

  return (
    <section id="expertise" className="pt-40 pb-56 bg-[#f8f9fa] relative selection:bg-[#0f2a4a] selection:text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-8">
            <span className="w-12 h-[1px] bg-[#c5a55a]"></span>
            <span className="text-[#c5a55a] uppercase tracking-[0.3em] text-[10px] font-bold">What We Do</span>
          </div>
          <h2 className="font-heading text-5xl md:text-7xl font-light text-[#0f2a4a] leading-tight">
            Our <span className="italic font-medium text-[#c5a55a]">Expertise</span>
          </h2>
        </div>

        {/* ── Block 01: Residential ── */}
        <div ref={ref1 as any} className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32 mb-40">
          
          <div className={cn(
            "w-full lg:w-1/2 relative h-[70vh] overflow-hidden rounded-sm shadow-2xl transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
            isVis1 ? "clip-path-full scale-100 opacity-100" : "clip-path-inset scale-95 opacity-0"
          )} 
          style={{ clipPath: isVis1 ? 'inset(0% 0% 0% 0%)' : 'inset(10% 10% 10% 10%)' }}>
            <div 
              className="absolute top-0 left-0 w-full h-[120%] transition-transform duration-700 ease-out"
              style={{ transform: `translate3d(0, ${(scrollY * -0.05) + 50}px, 0)` }}
            >
              <Image 
                src="/WhatsApp Image 2026-07-04 at 5.43.51 PM.jpeg" 
                alt="Residential Elegance Bedroom" 
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
          
          <div className={cn(
            "w-full lg:w-1/2 relative transition-all duration-1000 delay-300 transform",
            isVis1 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"
          )}>
            <div className="font-[family-name:var(--font-heading)] text-[140px] md:text-[200px] font-bold text-[#c5a55a]/10 leading-none absolute -z-10 -top-24 -left-12 pointer-events-none select-none tracking-tighter">
              01
            </div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a55a] mb-6">Residential Sanctuaries</h4>
            <h3 className="font-heading text-4xl md:text-5xl font-light text-[#0f2a4a] leading-[1.1] mb-8">
              Master Bedrooms & <br/>Living Spaces.
            </h3>
            <p className="text-slate-500 font-light leading-relaxed mb-10 text-lg max-w-md">
              We craft perfect rest environments. Our premium blackout solutions, layered with elegant sheer drapes, offer ultimate light control and privacy, transforming intimate spaces into serene escapes.
            </p>
            <MagneticButton variant="outline" className="px-10 py-4">View Residential</MagneticButton>
          </div>

        </div>

        {/* ── Block 02: Commercial ── */}
        <div ref={ref2 as any} className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-32">
          
          <div className={cn(
            "w-full lg:w-1/2 relative h-[70vh] overflow-hidden rounded-sm shadow-2xl transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
            isVis2 ? "clip-path-full scale-100 opacity-100" : "clip-path-inset scale-95 opacity-0"
          )} 
          style={{ clipPath: isVis2 ? 'inset(0% 0% 0% 0%)' : 'inset(10% 10% 10% 10%)' }}>
            <div 
              className="absolute top-0 left-0 w-full h-[120%] transition-transform duration-700 ease-out"
              style={{ transform: `translate3d(0, ${(scrollY * -0.05) + 150}px, 0)` }}
            >
              <Image 
                src="/WhatsApp Image 2026-07-04 at 5.43.39 PM.jpeg" 
                alt="Corporate Excellence" 
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className={cn(
            "w-full lg:w-1/2 relative transition-all duration-1000 delay-300 transform",
            isVis2 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"
          )}>
            <div className="font-[family-name:var(--font-heading)] text-[140px] md:text-[200px] font-bold text-[#c5a55a]/10 leading-none absolute -z-10 -top-24 -left-12 pointer-events-none select-none tracking-tighter">
              02
            </div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a55a] mb-6">Corporate & Hospitality</h4>
            <h3 className="font-heading text-4xl md:text-5xl font-light text-[#0f2a4a] leading-[1.1] mb-8">
              Executive <br/>Environments.
            </h3>
            <p className="text-slate-500 font-light leading-relaxed mb-10 text-lg max-w-md">
              Elevating boardrooms and commercial spaces with sophisticated, fire-retardant sheer tracks. We provide professional aesthetics that inspire productivity while effectively managing glare and temperature.
            </p>
            <MagneticButton variant="outline" className="px-10 py-4">View Commercial</MagneticButton>
          </div>

        </div>

      </div>
    </section>
  );
}
