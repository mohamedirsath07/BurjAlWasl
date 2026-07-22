import Image from 'next/image';
import { Quote, Star } from 'lucide-react';
import { SectionHeading } from '../SectionHeading';
import { Reveal } from '../Reveal';
import { GlassCard } from '../GlassCard';
import { TESTIMONIALS } from '../landing.data';

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:py-28"
    >
      <SectionHeading
        eyebrow="Testimonials"
        title="Trusted by clients who"
        highlight="expect the best"
        description="Homeowners, designers and hospitality groups choose Burj Al Wasl for craftsmanship that meets a global standard."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={(i % 2) * 0.08}>
            <GlassCard className="flex h-full flex-col gap-5 p-7">
              <div className="flex items-center justify-between">
                <Quote size={28} className="text-[var(--ln-accent)]" />
                <div className="flex items-center gap-0.5 text-[var(--ln-gold)]">
                  {[...Array(t.rating)].map((_, s) => (
                    <Star key={s} size={15} fill="currentColor" />
                  ))}
                </div>
              </div>
              <p className="flex-1 text-base leading-relaxed text-[var(--ln-text)]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 border-t border-[var(--ln-border)] pt-5">
                <div className="relative h-11 w-11 overflow-hidden rounded-full">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-[var(--ln-heading)]">{t.name}</p>
                  <p className="text-sm text-[var(--ln-text-muted)]">{t.role}</p>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
