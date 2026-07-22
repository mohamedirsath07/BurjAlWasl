import React from 'react';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { CustomCursor } from '@/components/atoms/CustomCursor';
import { CaseStudyCTA } from '@/components/organisms/CaseStudy/CaseStudyCTA';

const servicesData = [
  { slug: 'luxury-curtains', title: 'Luxury Curtains', subtitle: 'The fabric of your environment.' },
  { slug: 'motorized-systems', title: 'Intelligent Motorization', subtitle: 'Silent, smart, seamless.' },
  { slug: 'custom-blinds', title: 'Custom Blinds', subtitle: 'Architectural light control.' },
  { slug: 'premium-wallpapers', title: 'Premium Wallpapers', subtitle: 'Redefine your atmosphere.' },
  { slug: 'upholstery', title: 'Custom Upholstery', subtitle: 'Masterful refinishing.' },
  { slug: 'flooring', title: 'Flooring Solutions', subtitle: 'The foundation of luxury.' }
];

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = servicesData.find(s => s.slug === resolvedParams.slug);
  if (!service) return { title: 'Service Not Found | Burj Al Wasl' };
  
  return {
    title: `${service.title} | Burj Al Wasl`,
    description: service.subtitle,
  };
}

export default async function ServiceDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = servicesData.find(s => s.slug === resolvedParams.slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <CustomCursor />
      <Navbar />
      
      <section className="pt-48 pb-24 bg-[#05111d] text-center">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-[#c5a55a] uppercase tracking-[0.3em] text-[10px] font-bold block mb-8">Service</span>
          <h1 className="font-heading text-5xl md:text-7xl font-light text-white leading-tight mb-8">
            {service.title}
          </h1>
          <p className="text-slate-400 font-light text-lg">
            {service.subtitle}
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-slate-500 font-light text-xl leading-relaxed mb-12">
            This is the dedicated detail page for {service.title}. Our approach combines the finest materials available globally with meticulous craftsmanship to ensure that the end result surpasses standard expectations.
          </p>
        </div>
      </section>

      <CaseStudyCTA />
      <Footer />
    </main>
  );
}
