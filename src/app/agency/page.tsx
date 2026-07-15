import React from 'react';
import { LogoMarquee } from '@/components/ui/LogoMarquee';

export default function AgencyPage() {
  return (
    <main className="min-h-screen bg-[#050505] pt-48 pb-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <header className="mb-32">
          <h1 className="font-heading text-6xl md:text-8xl font-bold tracking-tighter mb-6">
            SILENT LUXURY <br />
            <span className="text-[#f5f5f0]/30">& TECHNICAL BRILLIANCE.</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-16">
            <p className="text-xl md:text-3xl font-light leading-relaxed text-[#f5f5f0]/90">
              We are a global digital product studio based in Dubai, creating category-defining web experiences and software for the world's most ambitious brands.
            </p>
            <p className="text-sm font-light leading-relaxed text-[#f5f5f0]/50">
              Founded on the belief that design should not just be seen, but felt. We combine cinematic aesthetics with rigorous engineering to build platforms that convert, engage, and dominate. Our work isn't just a website; it's a strategic asset designed to outpace the competition.
            </p>
          </div>
        </header>

        {/* Studio Image Placeholder */}
        <section className="w-full aspect-[21/9] rounded-3xl overflow-hidden bg-[#1a1a1a] mb-32 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-12">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#f5f5f0]">Studio X Headquarters — DIFC, Dubai</h3>
          </div>
        </section>
      </div>

      <LogoMarquee />

    </main>
  );
}
