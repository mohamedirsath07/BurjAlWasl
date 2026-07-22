'use client';

import React, { useEffect, useState } from 'react';
import { useIntersection } from '@/hooks';
import { cn } from '@/lib/cn';
import { CaseStudy } from '@/data/portfolio';

// Quick counter hook
function useCounter(end: number, duration: number = 2000, trigger: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration, trigger]);

  return count;
}

export function CaseStudyStats({ project }: { project: CaseStudy }) {
  const { ref, isVisible } = useIntersection({ threshold: 0.2 });
  const materialCount = useCounter(project.stats.materialsUsed, 2500, isVisible);

  return (
    <section ref={ref as any} className="py-32 bg-[#f8f9fa] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24">
        
        {/* Stats Column */}
        <div className={cn(
          "flex flex-col justify-center transition-all duration-[1200ms] transform",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
        )}>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a55a] mb-12">Project Scale</h3>
          
          <div className="space-y-16">
            <div className="border-b border-black/5 pb-8">
              <div className="font-heading text-6xl md:text-7xl font-light text-[#0f2a4a] mb-2">{project.stats.duration}</div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Total Duration</div>
            </div>
            <div className="border-b border-black/5 pb-8">
              <div className="font-heading text-6xl md:text-7xl font-light text-[#0f2a4a] mb-2">{project.stats.sqft}</div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Square Feet Covered</div>
            </div>
            <div>
              <div className="font-heading text-6xl md:text-7xl font-light text-[#0f2a4a] mb-2 whitespace-nowrap">{materialCount}+</div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Premium Materials Sourced</div>
            </div>
          </div>
        </div>

        {/* Testimonial Column */}
        <div className={cn(
          "flex flex-col justify-center transition-all duration-[1200ms] delay-300 transform",
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"
        )}>
          <div className="relative">
            <span className="absolute -top-16 -left-8 text-[120px] font-heading text-[#c5a55a]/10 leading-none pointer-events-none">"</span>
            <blockquote className="text-2xl md:text-4xl font-light text-[#0f2a4a] leading-tight mb-12 relative z-10">
              {project.testimonial.quote}
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-[#c5a55a]"></div>
              <div>
                <h5 className="font-bold text-[#0f2a4a] text-sm tracking-widest uppercase">{project.testimonial.author}</h5>
                <p className="text-xs text-slate-500 font-light mt-1">{project.testimonial.role}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
