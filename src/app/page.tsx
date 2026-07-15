import React from 'react';
import { Hero } from '@/components/organisms/Hero';
import { LogoMarquee } from '@/components/ui/LogoMarquee';
import { FeaturedWork } from '@/components/organisms/FeaturedWork';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <LogoMarquee />
      <FeaturedWork />
    </main>
  );
}
