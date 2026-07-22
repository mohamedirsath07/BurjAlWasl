import React from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { CustomCursor } from '@/components/atoms/CustomCursor';
import { CaseStudyCTA } from '@/components/organisms/CaseStudy/CaseStudyCTA';
import Link from 'next/link';

export const metadata = {
  title: 'Our Services | Burj Al Wasl',
  description: 'Explore our premium interior solutions including luxury curtains, intelligent motorization, bespoke blinds, and custom upholstery.',
};

const servicesList = [
  { slug: 'luxury-curtains', title: 'Luxury Curtains', description: 'Bespoke window dressings tailored from the world\'s finest textiles.', img: '/curtain.jpeg' },
  { slug: 'motorized-systems', title: 'Intelligent Motorization', description: 'Silent, smart-home integrated automation for curtains and blinds.', img: '/automation-screen-img.jpeg' },
  { slug: 'custom-blinds', title: 'Custom Blinds', description: 'Architectural shading solutions for optimal light control.', img: '/curtain-hotel.jpeg' },
  { slug: 'premium-wallpapers', title: 'Premium Wallpapers', description: 'Exclusive wallcoverings to redefine your interior atmosphere.', img: '/home-hall-interiro.jpeg' },
  { slug: 'upholstery', title: 'Custom Upholstery', description: 'Masterful refinishing of luxury furniture pieces.', img: '/room-interior.jpeg' },
  { slug: 'flooring', title: 'Flooring Solutions', description: 'High-end hardwood and imported carpets.', img: '/curtain.jpeg' }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <CustomCursor />
      <Navbar />
      
      <section className="pt-48 pb-24 bg-[#05111d] text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-heading text-5xl md:text-7xl font-light text-white leading-tight mb-8">
            Expertise & <span className="italic text-[#c5a55a]">Craft.</span>
          </h1>
          <p className="text-slate-400 font-light text-lg">
            A comprehensive suite of luxury interior solutions designed for the most demanding spaces.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, i) => (
            <Link key={i} href={`/services/${service.slug}`} className="group block">
              <div className="aspect-[4/5] bg-slate-100 rounded-xl overflow-hidden relative mb-6">
                <img 
                  src={service.img} 
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05111d]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h3 className="font-heading text-2xl font-light text-[#0f2a4a] mb-2 group-hover:text-[#c5a55a] transition-colors">{service.title}</h3>
              <p className="text-slate-500 font-light text-sm">{service.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <CaseStudyCTA />
      <Footer />
    </main>
  );
}
