import React from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { CustomCursor } from '@/components/atoms/CustomCursor';
import { CaseStudyCTA } from '@/components/organisms/CaseStudy/CaseStudyCTA';

export const metadata = {
  title: 'About Us | Burj Al Wasl',
  description: 'Learn about Burj Al Wasl, Dubai\'s premier luxury interior design studio specializing in bespoke window treatments and motorization.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <CustomCursor />
      <Navbar />
      
      {/* Editorial Hero */}
      <section className="pt-48 pb-24 bg-[#05111d] text-center">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-[#c5a55a] uppercase tracking-[0.3em] text-[10px] font-bold block mb-8">Our Heritage</span>
          <h1 className="font-heading text-5xl md:text-7xl font-light text-white leading-tight mb-8">
            Defining <span className="italic text-slate-400">luxury</span> in every dimension.
          </h1>
          <p className="text-slate-400 font-light text-lg">
            Since our inception, Burj Al Wasl has been the trusted partner for the Middle East's most exclusive properties, delivering unparalleled craftsmanship in window treatments, upholstery, and intelligent motorization.
          </p>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-heading text-4xl font-light text-[#0f2a4a] mb-6">Our Philosophy</h2>
            <p className="text-slate-500 font-light leading-relaxed mb-6">
              We believe that the way light enters a room dictates its entire mood. A window is not just a structural element; it is the lens through which you experience the world.
            </p>
            <p className="text-slate-500 font-light leading-relaxed">
              By blending heritage craftsmanship with state-of-the-art automation, we give our clients absolute control over their environment, wrapped in the finest textiles the world has to offer.
            </p>
          </div>
          <div className="aspect-[4/5] bg-slate-100 rounded-xl overflow-hidden relative group">
            <img 
              src="/home-hall-interiro.jpeg" 
              alt="Craftsmanship"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Stats Block */}
      <section className="py-24 bg-[#f8f9fa] border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { number: "15+", label: "Years Experience" },
            { number: "500+", label: "Projects Completed" },
            { number: "40+", label: "Master Craftsmen" },
            { number: "100%", label: "Client Satisfaction" }
          ].map((stat, i) => (
            <div key={i}>
              <div className="font-heading text-5xl md:text-6xl font-light text-[#0f2a4a] mb-2">{stat.number}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#c5a55a]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <CaseStudyCTA />
      <Footer />
    </main>
  );
}
