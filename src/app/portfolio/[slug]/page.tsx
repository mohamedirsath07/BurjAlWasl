import React from 'react';
import { notFound } from 'next/navigation';
import { getCaseStudyBySlug, portfolioData } from '@/data/portfolio';
import { CustomCursor } from '@/components/atoms/CustomCursor';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import {
  CaseStudyHero,
  CaseStudyStory,
  BeforeAfterSlider,
  CaseStudyStats,
  ImmersiveGallery,
  RelatedProjects,
  CaseStudyCTA
} from '@/components/organisms/CaseStudy';

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for SSG
export function generateStaticParams() {
  return portfolioData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps) {
  const resolvedParams = await params;
  const project = getCaseStudyBySlug(resolvedParams.slug);
  if (!project) return { title: 'Project Not Found | Burj Al Wasl' };
  
  return {
    title: `${project.title} | Burj Al Wasl Case Study`,
    description: project.clientChallenge.substring(0, 160),
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const resolvedParams = await params;
  const project = getCaseStudyBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <CustomCursor />
      <Navbar />
      
      <CaseStudyHero project={project} />
      <CaseStudyStory project={project} />
      <BeforeAfterSlider project={project} />
      <ImmersiveGallery project={project} />
      <CaseStudyStats project={project} />
      <RelatedProjects currentSlug={project.slug} />
      <CaseStudyCTA />

      <Footer />
    </main>
  );
}
