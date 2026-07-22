import { Check, Sparkles } from 'lucide-react';
import { cn } from '@/lib/cn';
import { SectionHeading } from '../SectionHeading';
import { Reveal } from '../Reveal';
import { LandingButton } from '../LandingButton';
import { PRICING } from '../landing.data';

export function PricingSection() {
  return (
    <section id="pricing" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:py-28">
      <SectionHeading
        eyebrow="Pricing"
        title="Transparent packages for"
        highlight="every space"
        description="Clear starting points with no hidden costs. Every project is finalised with a tailored quote after your free consultation."
      />

      <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
        {PRICING.map((tier, i) => (
          <Reveal key={tier.name} delay={i * 0.08} className="h-full">
            <div
              className={cn(
                'relative flex h-full flex-col rounded-3xl p-8 transition-all duration-500',
                tier.featured
                  ? 'ln-glass-strong is-active shadow-[var(--ln-shadow)] lg:-translate-y-4'
                  : 'ln-glass',
              )}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gradient-to-r from-[var(--ln-accent-strong)] to-[var(--ln-accent)] px-4 py-1 text-xs font-semibold text-white shadow-lg">
                  <Sparkles size={13} /> Most popular
                </span>
              )}

              <h3 className="font-heading text-2xl font-semibold text-[var(--ln-heading)]">
                {tier.name}
              </h3>
              <p className="mt-1 text-sm text-[var(--ln-text-muted)]">{tier.tagline}</p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-heading text-3xl font-semibold text-[var(--ln-heading)]">
                  {tier.price}
                </span>
                <span className="text-sm text-[var(--ln-text-muted)]">{tier.period}</span>
              </div>

              <div className="ln-hairline my-6" />

              <ul className="flex flex-1 flex-col gap-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-[var(--ln-text)]">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--ln-accent)]/15 text-[var(--ln-accent)]">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <LandingButton
                  href="/consultation"
                  variant={tier.featured ? 'primary' : 'secondary'}
                  size="lg"
                  className="w-full"
                >
                  {tier.cta}
                </LandingButton>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
