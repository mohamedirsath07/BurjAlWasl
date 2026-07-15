import React from 'react';

const services = [
  {
    title: 'Brand Identity',
    description: 'We craft iconic brand systems that command attention and build trust. From strategic positioning to visual identity, we create brands that dominate their category.',
    tags: ['Strategy', 'Visual Identity', 'Design Systems', 'Copywriting'],
  },
  {
    title: 'Web Platforms',
    description: 'Award-winning digital experiences that blend cinematic design with uncompromising performance. Built on modern stacks for Fortune 500s and ambitious startups.',
    tags: ['Next.js', 'WebGL', 'Framer Motion', 'Headless CMS'],
  },
  {
    title: 'Product Design',
    description: 'Intuitive, conversion-optimized interfaces for SaaS and web applications. We solve complex user problems with elegant, scalable design patterns.',
    tags: ['UX Research', 'UI Design', 'Prototyping', 'User Testing'],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#050505] pt-48 pb-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <header className="mb-32">
          <h1 className="font-heading text-6xl md:text-8xl font-bold tracking-tighter mb-6">
            CAPABILITIES.
          </h1>
          <p className="max-w-xl text-lg text-[#f5f5f0]/70 font-light">
            We are a full-service digital product studio. We do not do everything—but what we do, we do at a world-class level.
          </p>
        </header>

        <div className="flex flex-col border-t border-[#f5f5f0]/10">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="py-16 md:py-24 border-b border-[#f5f5f0]/10 grid grid-cols-1 lg:grid-cols-12 gap-12 group cursor-pointer"
            >
              <div className="lg:col-span-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f5f5f0]/30 group-hover:text-[#f5f5f0]/60 transition-colors">
                  0{index + 1}
                </span>
              </div>
              <div className="lg:col-span-4">
                <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-[#f5f5f0] group-hover:translate-x-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  {service.title}
                </h2>
              </div>
              <div className="lg:col-span-6 flex flex-col gap-8">
                <p className="text-lg md:text-2xl font-light leading-relaxed text-[#f5f5f0]/70">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  {service.tags.map(tag => (
                    <span 
                      key={tag}
                      className="px-4 py-2 rounded-full border border-[#f5f5f0]/10 text-xs font-bold uppercase tracking-widest text-[#f5f5f0]/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
