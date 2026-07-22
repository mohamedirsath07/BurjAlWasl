// =============================================================================
// Burj Al Wasl — Premium Landing Page
// =============================================================================
// Narrative flow:
// Nav → Hero → Trust bar → Services → Process → Work → Testimonials
//   → Pricing → FAQ → CTA → Footer
// =============================================================================

import { LandingThemeProvider } from './LandingThemeProvider';
import { AnimatedBackground } from './AnimatedBackground';
import { LandingNav } from './sections/LandingNav';
import { HeroSection } from './sections/HeroSection';
import { TrustBar } from './sections/TrustBar';
import { FeaturesSection } from './sections/FeaturesSection';
import { ProcessSection } from './sections/ProcessSection';
import { ShowcaseSection } from './sections/ShowcaseSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { PricingSection } from './sections/PricingSection';
import { FaqSection } from './sections/FaqSection';
import { CtaSection } from './sections/CtaSection';
import { LandingFooter } from './sections/LandingFooter';

export function LandingPage() {
  return (
    <LandingThemeProvider>
      <AnimatedBackground />
      <LandingNav />
      <main>
        <HeroSection />
        <TrustBar />
        <FeaturesSection />
        <ProcessSection />
        <ShowcaseSection />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
        <CtaSection />
      </main>
      <LandingFooter />
    </LandingThemeProvider>
  );
}
