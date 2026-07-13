import Link from 'next/link';
import { Section, Container } from '@/components/layout';

export default function Home() {
  return (
    <>
      {/* Hero Showcase Area */}
      <Section background="navy" spacing="large" className="min-h-[70vh] flex items-center justify-center">
        <Container size="normal" className="text-center flex flex-col items-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-azure mb-4">
            Bespoke Luxury Interiors
          </span>
          <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-7xl font-light tracking-tight max-w-4xl leading-tight">
            Crafting Perfect Light & Privacy Solutions
          </h1>
          <p className="mt-6 text-slate-300 text-lg max-w-2xl font-light leading-relaxed">
            Burj Al Wasl delivers premium curtains, motorized systems, wall coverings, and bespoke interior treatments for high-end residential and commercial spaces across the UAE.
          </p>
          <div className="mt-10 flex gap-4">
            <Link
              href="/contact"
              className="bg-azure hover:bg-azure-light text-white font-semibold text-sm tracking-wider uppercase px-8 py-4 rounded-full transition-all duration-300 shadow-lg"
            >
              Book Private Consultation
            </Link>
            <Link
              href="/services"
              className="border border-white/20 hover:border-white hover:bg-white/5 text-white font-semibold text-sm tracking-wider uppercase px-8 py-4 rounded-full transition-all duration-300"
            >
              Our Expertise
            </Link>
          </div>
        </Container>
      </Section>

      {/* Overview/Introduction Section */}
      <Section background="cream" spacing="normal">
        <Container size="normal" className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-azure">
              Our Vision
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl font-light text-navy leading-tight">
              A Legacy of Precision & Elegance
            </h2>
            <p className="text-slate-500 font-light leading-relaxed">
              Based in Dubai, we cater to architectural and interior challenges with tailor-made solutions. Every project starts with a meticulous study of space and light, followed by our world-class craftsmanship and precision fitting.
            </p>
          </div>
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
              <span className="block text-4xl font-light text-navy font-[family-name:var(--font-heading)]">100%</span>
              <span className="block text-xs uppercase tracking-wider text-slate-400 mt-2">Bespoke Fitting</span>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
              <span className="block text-4xl font-light text-navy font-[family-name:var(--font-heading)]">UAE</span>
              <span className="block text-xs uppercase tracking-wider text-slate-400 mt-2">Wide Delivery</span>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
