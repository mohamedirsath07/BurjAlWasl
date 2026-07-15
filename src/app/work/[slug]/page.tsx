import React from 'react';
import { notFound } from 'next/navigation';
import { portfolioData } from '@/data/portfolio';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return portfolioData.map((p) => ({
    slug: p.slug,
  }));
}

export default async function CaseStudyPage({ params }: PageProps) {
  const resolvedParams = await params;
  const project = portfolioData.find(p => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050505]">
      
      {/* Hero */}
      <section className={`relative h-screen min-h-[800px] w-full flex flex-col justify-end px-6 md:px-12 pb-24 ${project.coverColor}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10" />
        <div className="relative z-20 max-w-[1600px] mx-auto w-full">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f5f5f0]/70">{project.client}</span>
            <span className="w-12 h-[1px] bg-[#f5f5f0]/30"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f5f5f0]/70">{project.year}</span>
          </div>
          <h1 className="font-heading text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.9] text-[#f5f5f0] mb-12">
            {project.title}
          </h1>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-[#f5f5f0]/10 pt-12">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f5f5f0]/50 mb-2">Category</h4>
              <p className="text-sm text-[#f5f5f0]/80">{project.category}</p>
            </div>
            <div className="md:col-span-3">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f5f5f0]/50 mb-2">Services</h4>
              <p className="text-sm text-[#f5f5f0]/80">{project.services.join(' • ')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Brief & Metrics */}
      <section className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <h2 className="text-2xl md:text-4xl font-light leading-relaxed text-[#f5f5f0]">
              {project.description}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            {project.metrics.map((metric, i) => (
              <div key={i} className="border-l border-[#f5f5f0]/10 pl-8">
                <div className="font-heading text-5xl md:text-7xl font-bold tracking-tighter text-[#f5f5f0] mb-4">
                  {metric.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#f5f5f0]/50">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Placeholder Gallery */}
      <section className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto grid gap-8">
        <div className={`w-full aspect-video rounded-3xl ${project.coverColor} opacity-50`}></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={`w-full aspect-[4/5] rounded-3xl ${project.coverColor} opacity-30`}></div>
          <div className={`w-full aspect-[4/5] rounded-3xl ${project.coverColor} opacity-30`}></div>
        </div>
      </section>

      {/* Next Project (Placeholder logic) */}
      <section className="py-32 px-6 md:px-12 border-t border-[#f5f5f0]/10 text-center">
        <Link href="/work" className="group inline-flex flex-col items-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f5f5f0]/50 mb-6">View All Projects</span>
          <span className="font-heading text-5xl md:text-7xl font-bold tracking-tighter group-hover:opacity-70 transition-opacity">Back to Work</span>
        </Link>
      </section>

    </main>
  );
}
