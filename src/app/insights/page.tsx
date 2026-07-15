import React from 'react';
import Link from 'next/link';
import { insightsData } from '@/data/insights';

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-[#050505] pt-48 pb-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <header className="mb-24">
          <h1 className="font-heading text-6xl md:text-8xl font-bold tracking-tighter mb-6">
            INSIGHTS <br />
            <span className="text-[#f5f5f0]/30">& STRATEGY.</span>
          </h1>
          <p className="max-w-xl text-lg text-[#f5f5f0]/70 font-light">
            Thoughts, frameworks, and deep-dives from the engineering and design leadership at Studio X.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 border-t border-[#f5f5f0]/10 pt-16">
          {insightsData.map((post) => (
            <Link 
              key={post.slug}
              href={`/insights/${post.slug}`}
              className="group block"
            >
              <div className={`w-full aspect-video rounded-3xl overflow-hidden mb-8 relative ${post.coverColor}`}>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <div className="w-full h-full bg-gradient-to-br from-black/40 to-transparent mix-blend-overlay transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f5f5f0]/50">
                  {post.category}
                </span>
                <span className="w-4 h-[1px] bg-[#f5f5f0]/20"></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f5f5f0]/50">
                  {post.readTime}
                </span>
              </div>
              
              <h2 className="font-heading text-3xl font-bold tracking-tight mb-4 group-hover:text-[#f5f5f0]/80 transition-colors leading-tight">
                {post.title}
              </h2>
              
              <p className="text-sm text-[#f5f5f0]/70 leading-relaxed font-light line-clamp-3">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
