'use client';

import React from 'react';
import { useConsultationStore } from '@/store/useConsultationStore';
import { motion } from 'framer-motion';
import { CheckCircle2, MessageCircle } from 'lucide-react';

export function ConsultationSuccess() {
  const { data, resetForm } = useConsultationStore();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-2xl mx-auto text-center py-12"
    >
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-[#c5a55a] rounded-full blur-2xl opacity-20 animate-pulse" />
          <CheckCircle2 size={80} className="text-[#c5a55a] relative z-10" strokeWidth={1} />
        </div>
      </div>

      <h2 className="font-heading text-4xl md:text-5xl font-light text-[#0f2a4a] mb-6">
        Request Received, <br/>
        <span className="italic text-[#c5a55a]">{data.contactName.split(' ')[0]}</span>.
      </h2>

      <p className="text-slate-500 font-light text-lg mb-12">
        Thank you for choosing Burj Al Wasl. Our lead interior designer is reviewing your {data.propertyType.toLowerCase()} project details and will contact you via {data.contactMethod} shortly.
      </p>

      {/* Timeline Steps */}
      <div className="bg-slate-50 border border-black/5 rounded-2xl p-8 mb-12 text-left relative overflow-hidden">
        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0f2a4a] mb-8">What happens next?</h4>
        
        <div className="space-y-6 relative before:absolute before:inset-y-2 before:left-[11px] before:w-[1px] before:bg-black/10">
          
          <div className="flex gap-6 relative z-10">
            <div className="w-6 h-6 rounded-full bg-[#c5a55a] border-4 border-slate-50 shrink-0" />
            <div>
              <h5 className="font-bold text-[#0f2a4a] text-sm mb-1">Within 24 Hours</h5>
              <p className="text-slate-500 text-xs font-light">We will contact you to confirm the consultation timing.</p>
            </div>
          </div>

          <div className="flex gap-6 relative z-10">
            <div className="w-6 h-6 rounded-full bg-slate-200 border-4 border-slate-50 shrink-0" />
            <div>
              <h5 className="font-bold text-[#0f2a4a] text-sm mb-1">Initial Consultation</h5>
              <p className="text-slate-500 text-xs font-light">Discuss your vision, review fabric samples, and plan motorization.</p>
            </div>
          </div>

          <div className="flex gap-6 relative z-10">
            <div className="w-6 h-6 rounded-full bg-slate-200 border-4 border-slate-50 shrink-0" />
            <div>
              <h5 className="font-bold text-[#0f2a4a] text-sm mb-1">Free Site Measurement</h5>
              <p className="text-slate-500 text-xs font-light">Our engineers will visit the {data.location} property for precise mapping.</p>
            </div>
          </div>

        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <a 
          href={`https://wa.me/971501234567?text=Hi, I just submitted a consultation request for my ${data.propertyType} project.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-xs tracking-widest uppercase hover:bg-[#1ebd5a] transition-colors"
        >
          <MessageCircle size={18} />
          WhatsApp Us Now
        </a>
        
        <button 
          onClick={() => {
            resetForm();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-[#0f2a4a] transition-colors"
        >
          Submit Another Request
        </button>
      </div>

    </motion.div>
  );
}
