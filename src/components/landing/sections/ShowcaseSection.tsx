import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '../SectionHeading';
import { Reveal } from '../Reveal';
import { LandingButton } from '../LandingButton';
import { SHOWCASE } from '../landing.data';
import { cn } from '@/lib/cn';

export function ShowcaseSection() {
  return (
    <section id="work" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:py-28">
      <SectionHeading
        eyebrow="Our work"
        title="Interiors we've"
        highlight="brought to life"
        description="A glimpse of recent residential and hospitality projects across the UAE, each tailored to its space and light."
      />

      <div className="mt-14 grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-4">
        {SHOWCASE.map((item, i) => (
          <Reveal
            key={item.src}
            delay={(i % 4) * 0.06}
            className={cn(
              'group relative overflow-hidden rounded-2xl',
              // feature the 1st and 4th tiles larger on desktop
              i === 0 && 'col-span-2 row-span-2',
              i === 3 && 'md:col-span-2',
            )}
          >
            <div className="relative h-full w-full">
              <Image
                src={item.src}
                alt={`${item.title} — ${item.category}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-[var(--ln-gold)]">
                    {item.category}
                  </p>
                  <h3 className="font-heading text-lg font-semibold text-white">{item.title}</h3>
                </div>
                <span className="ln-glass-strong grid h-9 w-9 shrink-0 translate-y-2 place-items-center rounded-full text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <LandingButton href="/portfolio" variant="secondary" size="lg">
          Explore full portfolio
          <ArrowUpRight size={18} />
        </LandingButton>
      </div>
    </section>
  );
}
