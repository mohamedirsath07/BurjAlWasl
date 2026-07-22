'use client';

import React, { useState } from 'react';
import { useConsultationStore } from '@/store/useConsultationStore';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { Link2, UploadCloud, Plus, X } from 'lucide-react';
import { MagneticButton } from '@/components/atoms/MagneticButton';

export function Step4Inspiration() {
  const { data, updateData, nextStep, prevStep } = useConsultationStore();
  const [links, setLinks] = useState<string[]>(data.inspirationLinks.length ? data.inspirationLinks : ['']);

  const handleAddLink = () => {
    setLinks([...links, '']);
  };

  const handleUpdateLink = (index: number, value: string) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
    updateData({ inspirationLinks: newLinks });
  };

  const handleRemoveLink = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index);
    if (newLinks.length === 0) newLinks.push('');
    setLinks(newLinks);
    updateData({ inspirationLinks: newLinks });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-3xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="font-heading text-3xl md:text-4xl font-light text-[#0f2a4a] mb-4">Upload Inspiration</h2>
        <p className="text-slate-500 font-light">Share your Pinterest boards, Google Drive links, or moodboards.</p>
      </div>

      <div className="space-y-8">
        
        {/* URL Inputs */}
        <div className="space-y-4">
          <label className="block text-xs font-bold uppercase tracking-widest text-[#0f2a4a]">Reference Links</label>
          
          {links.map((link, index) => (
            <div key={index} className="flex items-center gap-3 relative">
              <div className="absolute left-4 text-slate-400">
                <Link2 size={18} strokeWidth={1.5} />
              </div>
              <input
                type="url"
                value={link}
                onChange={(e) => handleUpdateLink(index, e.target.value)}
                placeholder="https://pinterest.com/..."
                className="w-full bg-slate-50 border border-black/10 rounded-lg pl-12 pr-12 py-4 text-slate-700 focus:outline-none focus:border-[#c5a55a] transition-colors"
              />
              {links.length > 1 && (
                <button 
                  onClick={() => handleRemoveLink(index)}
                  className="absolute right-4 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              )}
            </div>
          ))}
          
          <button 
            onClick={handleAddLink}
            className="flex items-center gap-2 text-xs font-bold text-[#c5a55a] hover:text-[#0f2a4a] transition-colors uppercase tracking-widest mt-2"
          >
            <Plus size={14} /> Add Another Link
          </button>
        </div>

        {/* Simulated File Upload Zone */}
        <div className="mt-8">
          <label className="block text-xs font-bold uppercase tracking-widest text-[#0f2a4a] mb-4">Or Upload Files</label>
          <div className="border-2 border-dashed border-black/10 rounded-xl bg-slate-50 p-12 flex flex-col items-center justify-center text-center hover:border-[#c5a55a]/50 hover:bg-[#c5a55a]/5 transition-all cursor-pointer group">
            <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-[#c5a55a] transition-colors mb-4">
              <UploadCloud size={28} strokeWidth={1.5} />
            </div>
            <p className="text-sm font-bold text-[#0f2a4a] mb-2">Drag and drop your files here</p>
            <p className="text-xs text-slate-400 font-light max-w-xs">Supported files: JPG, PNG, PDF. Maximum size: 20MB.</p>
            <span className="mt-6 text-[10px] uppercase tracking-widest font-bold text-[#c5a55a] bg-white px-4 py-2 rounded-full shadow-sm">Browse Files</span>
          </div>
        </div>

      </div>

      <div className="mt-12 flex items-center justify-between">
        <button 
          onClick={prevStep}
          className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-[#0f2a4a] transition-colors"
        >
          Back
        </button>
        <MagneticButton 
          variant="primary" 
          onClick={nextStep} 
          className="px-8 py-4 text-xs tracking-widest"
        >
          Continue
        </MagneticButton>
      </div>
    </motion.div>
  );
}
