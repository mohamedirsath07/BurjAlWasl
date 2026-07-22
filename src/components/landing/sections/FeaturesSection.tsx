import { SectionHeading } from '../SectionHeading';
import { Reveal } from '../Reveal';
import { GlassCard } from '../GlassCard';
import { FEATURES } from '../landing.data';

export function FeaturesSection() {
  return (
    <section id="services" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:py-28">
      <SectionHeading
        eyebrow="What we do"
        title="Complete window solutions,"
        highlight="crafted end to end"
        description="From bespoke drapery to fully automated smart systems, every service is delivered with the precision and finish international clients expect."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <Reveal key={feature.title} delay={(i % 3) * 0.08}>
              <GlassCard interactive className="h-full p-7">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--ln-accent-strong)] to-[var(--ln-accent)] text-white shadow-[0_8px_24px_-8px_var(--ln-glow-1)]">
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <h3 className="mb-2 font-heading text-xl font-semibold text-[var(--ln-heading)]">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--ln-text-muted)]">
                  {feature.description}
                </p>
              </GlassCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
