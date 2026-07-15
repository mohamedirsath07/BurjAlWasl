import React from 'react';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#050505] pt-48 pb-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24">
        
        <div>
          <h1 className="font-heading text-6xl md:text-8xl font-bold tracking-tighter mb-6">
            START <br />
            <span className="text-[#f5f5f0]/30">A PROJECT.</span>
          </h1>
          <p className="text-xl font-light leading-relaxed text-[#f5f5f0]/70 mb-16 max-w-md">
            We partner with visionary companies to build category-defining products. Tell us about your goals.
          </p>

          <div className="space-y-8">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f5f5f0]/50 mb-2">Email</h4>
              <a href="mailto:hello@studiox.ae" className="text-2xl font-light hover:text-[#f5f5f0]/70 transition-colors">hello@studiox.ae</a>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f5f5f0]/50 mb-2">Location</h4>
              <p className="text-lg font-light text-[#f5f5f0]/80">
                Burj Daman, DIFC<br />
                Dubai, United Arab Emirates
              </p>
            </div>
          </div>
        </div>

        {/* Minimalist Contact Form */}
        <div className="bg-[#111] p-8 md:p-16 rounded-3xl">
          <form className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f5f5f0]/50">Your Name</label>
              <input type="text" className="bg-transparent border-b border-[#f5f5f0]/20 pb-4 text-xl font-light text-[#f5f5f0] focus:outline-none focus:border-[#f5f5f0] transition-colors" placeholder="John Doe" />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f5f5f0]/50">Your Email</label>
              <input type="email" className="bg-transparent border-b border-[#f5f5f0]/20 pb-4 text-xl font-light text-[#f5f5f0] focus:outline-none focus:border-[#f5f5f0] transition-colors" placeholder="john@company.com" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f5f5f0]/50">Budget Range</label>
              <select className="bg-transparent border-b border-[#f5f5f0]/20 pb-4 text-xl font-light text-[#f5f5f0] focus:outline-none focus:border-[#f5f5f0] transition-colors appearance-none">
                <option value="50k">$50k - $100k</option>
                <option value="100k">$100k - $250k</option>
                <option value="250k">$250k+</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 mb-8">
              <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f5f5f0]/50">Project Details</label>
              <textarea rows={4} className="bg-transparent border-b border-[#f5f5f0]/20 pb-4 text-xl font-light text-[#f5f5f0] focus:outline-none focus:border-[#f5f5f0] transition-colors resize-none" placeholder="Tell us about what you want to build..."></textarea>
            </div>

            <button type="button" className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-[#f5f5f0] text-[#050505] text-sm font-bold uppercase tracking-widest hover:bg-white hover:scale-105 transition-all duration-300 w-full">
              Submit Inquiry
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}
