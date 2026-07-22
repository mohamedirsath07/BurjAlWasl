import React from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { ConsultationHero, MultiStepForm } from '@/components/organisms/Consultation';
import { CustomCursor } from '@/components/atoms/CustomCursor';

export const metadata = {
  title: 'Book a Consultation | Burj Al Wasl',
  description: 'Schedule a private consultation with our lead designers. Explore premium fabrics, discuss intelligent motorization, and craft a bespoke plan for your space.',
};

export default function ConsultationPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#c5a55a] selection:text-white">
      <CustomCursor />
      <Navbar />
      
      <ConsultationHero />
      <MultiStepForm />

      <Footer />
    </main>
  );
}
