'use client';

import React from 'react';
import { useIntersection } from '@/hooks';
import { cn } from '@/lib/cn';
import { CaseStudy } from '@/data/portfolio';

export function CaseStudyStory({ project }: { project: CaseStudy }) {
  const { ref, isVisible } = useIntersection({ threshold: 0.1 });

  return (
    <section ref={ref as any} className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        {/* Left Column: The Narrative */}
        <div className={cn(
          "lg:col-span-8 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
        )}>
          <div className="mb-16">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a55a] mb-6">Client Challenge</h3>
            <p className="text-2xl md:text-3xl font-light text-[#0f2a4a] leading-relaxed">
              "{project.clientChallenge}"
            </p>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a55a] mb-6">Our Design Strategy</h3>
            <p className="text-lg text-slate-500 font-light leading-relaxed">
              {project.designStrategy}
            </p>
          </div>
        </div>

        {/* Right Column: Materials & Details */}
        <div className={cn(
          "lg:col-span-4 transition-all duration-[1200ms] delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform border-t lg:border-t-0 lg:border-l border-black/10 pt-16 lg:pt-0 lg:pl-16",
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
        )}>
          <div className="mb-12">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0f2a4a] mb-8">Premium Materials Used</h3>
            <ul className="space-y-4">
              {project.materials.map((material, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-600 font-light text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a55a]"></span>
                  {material}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0f2a4a] mb-8">Installation Journey</h3>
            <div className="space-y-8">
              {project.installationSteps.map((step, i) => (
                <div key={i} className="relative pl-6 border-l border-black/10">
                  <div className="absolute top-0 -left-[5px] w-2 h-2 rounded-full bg-white border-2 border-[#c5a55a]"></div>
                  <h4 className="text-sm font-bold text-[#0f2a4a] mb-1">{step.title}</h4>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
