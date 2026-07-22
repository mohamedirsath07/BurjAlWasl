import { SectionHeading } from '../SectionHeading';
import { Reveal } from '../Reveal';
import { PROCESS_STEPS } from '../landing.data';

export function ProcessSection() {
  return (
    <section id="process" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:py-28">
      <SectionHeading
        eyebrow="How it works"
        title="A seamless journey"
        highlight="from brief to install"
        description="A refined, transparent process that keeps you informed at every step and delivers a flawless result on schedule."
      />

      <div className="relative mt-16 grid gap-6 md:grid-cols-4">
        {/* connecting line */}
        <div className="ln-hairline absolute left-0 right-0 top-7 hidden md:block" />

        {PROCESS_STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <Reveal key={step.step} delay={i * 0.1}>
              <div className="relative flex flex-col items-center text-center md:items-start md:text-left">
                <div className="ln-glass-strong relative z-10 mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl text-[var(--ln-accent)]">
                  <Icon size={24} strokeWidth={1.75} />
                  <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-[var(--ln-accent-strong)] to-[var(--ln-accent)] text-[10px] font-bold text-white">
                    {step.step}
                  </span>
                </div>
                <h3 className="mb-2 font-heading text-lg font-semibold text-[var(--ln-heading)]">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--ln-text-muted)]">
                  {step.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
