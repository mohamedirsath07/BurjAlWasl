import React from 'react';
import { notFound } from 'next/navigation';
import { insightsData } from '@/data/insights';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return insightsData.map((p) => ({
    slug: p.slug,
  }));
}

export default async function InsightPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = insightsData.find(p => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050505] pt-48 pb-32">
      <article className="max-w-[1200px] mx-auto px-6 md:px-12">
        
        {/* Back Link */}
        <Link 
          href="/insights" 
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#f5f5f0]/50 hover:text-[#f5f5f0] transition-colors mb-16"
        >
          <ArrowLeft size={16} />
          Back to Insights
        </Link>

        {/* Header */}
        <header className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f5f5f0]/70">{post.category}</span>
            <span className="w-12 h-[1px] bg-[#f5f5f0]/30"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f5f5f0]/70">{post.date}</span>
          </div>
          
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95] text-[#f5f5f0] mb-12">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 border-t border-[#f5f5f0]/10 pt-8">
            <div className="w-12 h-12 rounded-full bg-[#1a1a1a]"></div>
            <div>
              <p className="text-sm font-bold text-[#f5f5f0]">{post.author}</p>
              <p className="text-xs text-[#f5f5f0]/50">{post.readTime}</p>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className={`w-full aspect-[21/9] rounded-3xl overflow-hidden mb-24 relative ${post.coverColor}`}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent mix-blend-overlay"></div>
        </div>

        {/* Typography Content Container */}
        <div 
          className="max-w-[800px] mx-auto prose prose-invert prose-lg md:prose-xl prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[#f5f5f0] prose-p:font-light prose-p:text-[#f5f5f0]/80 prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
      </article>

      {/* CTA Section */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 mt-32 pt-32 border-t border-[#f5f5f0]/10 text-center">
        <h3 className="font-heading text-4xl md:text-6xl font-bold tracking-tight mb-8">Ready to elevate your product?</h3>
        <Link 
          href="/contact" 
          className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-[#f5f5f0] text-[#050505] text-sm font-bold uppercase tracking-widest hover:bg-white hover:scale-105 transition-all duration-300"
        >
          Let's Talk
        </Link>
      </section>

    </main>
  );
}
