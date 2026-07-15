import React from 'react';
import Link from 'next/link';
import { portfolioData } from '@/data/portfolio';

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-[#050505] pt-48 pb-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <header className="mb-24">
          <h1 className="font-heading text-6xl md:text-8xl font-bold tracking-tighter mb-6">
            SELECTED <br />
            <span className="text-[#f5f5f0]/30">WORKS.</span>
          </h1>
          <p className="max-w-xl text-lg text-[#f5f5f0]/70 font-light">
            A curated collection of our finest digital products, platforms, and experiences designed for global brands.
          </p>
        </header>

        <div className="flex flex-col gap-32">
          {portfolioData.map((project, index) => (
            <Link 
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group block"
            >
              <div className={`w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden mb-8 relative ${project.coverColor}`}>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                {/* Placeholders for actual images */}
                <div className="w-full h-full bg-gradient-to-br from-black/40 to-transparent mix-blend-overlay transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-8">
                  <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-2 group-hover:text-[#f5f5f0]/80 transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f5f5f0]/50">
                    {project.client}
                  </p>
                </div>
                <div className="md:col-span-4 flex flex-col items-start md:items-end gap-2 text-sm text-[#f5f5f0]/70">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
