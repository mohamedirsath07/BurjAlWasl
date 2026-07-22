'use client';

import React from 'react';
import { CaseStudy, portfolioData } from '@/data/portfolio';
import { useIntersection } from '@/hooks';
import { cn } from '@/lib/cn';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function RelatedProjects({ currentSlug }: { currentSlug: string }) {
  const { ref, isVisible } = useIntersection({ threshold: 0.1 });
  
  // Get 2 other projects
  const related = portfolioData.filter(p => p.slug !== currentSlug).slice(0, 2);

  if (related.length === 0) return null;

  return (
    <section ref={ref as any} className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0f2a4a] mb-12">Related Projects</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {related.map((project, i) => (
            <Link 
              key={project.slug} 
              href={`/portfolio/${project.slug}`}
              className={cn(
                "group block transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
              )}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="aspect-[16/9] w-full overflow-hidden mb-6">
                <Image 
                  src={project.coverImage} 
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-heading text-2xl font-light text-[#0f2a4a] mb-2">{project.title}</h4>
                  <p className="text-[#c5a55a] text-[10px] font-bold uppercase tracking-widest">{project.category}</p>
                </div>
                <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center text-[#0f2a4a] group-hover:bg-[#0f2a4a] group-hover:text-white transition-all duration-300">
                  <ArrowRight size={20} strokeWidth={1} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
