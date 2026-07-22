import React from 'react';
import { CustomCursor } from '@/components/atoms/CustomCursor';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { PortfolioHero, PortfolioGrid } from '@/components/organisms/Portfolio';

export const metadata = {
  title: 'Portfolio | Burj Al Wasl',
  description: 'Explore our world-class interior design portfolio, featuring luxury villas, corporate offices, and intelligent motorization systems.',
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-white">
      <CustomCursor />
      <Navbar />
      
      <PortfolioHero />
      <PortfolioGrid />

      <Footer />
    </main>
  );
}
