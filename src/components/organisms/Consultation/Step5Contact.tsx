'use client';

import React from 'react';
import { useConsultationStore } from '@/store/useConsultationStore';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MagneticButton } from '@/components/atoms/MagneticButton';
import { User, Mail, Phone } from 'lucide-react';
import { submitConsultation } from '@/app/actions';

const contactSchema = z.object({
  contactName: z.string().min(2, "Name must be at least 2 characters"),
  contactEmail: z.string().email("Please enter a valid email address"),
  contactPhone: z.string().min(8, "Please enter a valid phone number"),
  contactMethod: z.enum(['Phone', 'Email', 'WhatsApp']),
  consultationTime: z.string().min(1, "Please specify a preferred time"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function Step5Contact() {
  const { data, updateData, nextStep, prevStep } = useConsultationStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      contactName: data.contactName,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      contactMethod: data.contactMethod as 'Phone' | 'Email' | 'WhatsApp' | undefined,
      consultationTime: data.consultationTime,
    }
  });

  const selectedMethod = watch('contactMethod');

  const onSubmit = async (formData: ContactFormValues) => {
    updateData(formData);
    
    // Connect to server action
    const fullData = {
      ...formData,
      propertyType: data.propertyType,
      serviceRequired: data.serviceRequired
    };
    
    const result = await submitConsultation(fullData);
    
    if (result.success) {
      nextStep();
    } else {
      console.error(result.error);
      // In a real app, we'd show a toast here
    }
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
        <h2 className="font-heading text-3xl md:text-4xl font-light text-[#0f2a4a] mb-4">Final Details</h2>
        <p className="text-slate-500 font-light">How should our design team reach you?</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Personal Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-[#0f2a4a] mb-3">Full Name *</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <User size={18} strokeWidth={1.5} />
              </div>
              <input
                {...register("contactName")}
                type="text"
                className={cn(
                  "w-full bg-slate-50 border rounded-lg pl-12 pr-6 py-4 text-slate-700 focus:outline-none transition-colors",
                  errors.contactName ? "border-red-300 focus:border-red-500 bg-red-50" : "border-black/10 focus:border-[#c5a55a]"
                )}
                placeholder="Enter your full name"
              />
            </div>
            {errors.contactName && <p className="text-red-500 text-xs mt-2">{errors.contactName.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#0f2a4a] mb-3">Email Address *</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Mail size={18} strokeWidth={1.5} />
              </div>
              <input
                {...register("contactEmail")}
                type="email"
                className={cn(
                  "w-full bg-slate-50 border rounded-lg pl-12 pr-6 py-4 text-slate-700 focus:outline-none transition-colors",
                  errors.contactEmail ? "border-red-300 focus:border-red-500 bg-red-50" : "border-black/10 focus:border-[#c5a55a]"
                )}
                placeholder="name@example.com"
              />
            </div>
            {errors.contactEmail && <p className="text-red-500 text-xs mt-2">{errors.contactEmail.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#0f2a4a] mb-3">Phone Number *</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Phone size={18} strokeWidth={1.5} />
              </div>
              <input
                {...register("contactPhone")}
                type="tel"
                className={cn(
                  "w-full bg-slate-50 border rounded-lg pl-12 pr-6 py-4 text-slate-700 focus:outline-none transition-colors",
                  errors.contactPhone ? "border-red-300 focus:border-red-500 bg-red-50" : "border-black/10 focus:border-[#c5a55a]"
                )}
                placeholder="+971 50 123 4567"
              />
            </div>
            {errors.contactPhone && <p className="text-red-500 text-xs mt-2">{errors.contactPhone.message}</p>}
          </div>

        </div>

        {/* Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#0f2a4a] mb-4">Preferred Contact Method *</label>
            <div className="flex gap-3">
              {['Phone', 'Email', 'WhatsApp'].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => {
                    setValue("contactMethod", method as any, { shouldValidate: true });
                  }}
                  className={cn(
                    "flex-1 py-3 px-2 text-center rounded-lg border text-xs font-bold tracking-widest uppercase transition-all",
                    selectedMethod === method 
                      ? "border-[#c5a55a] bg-[#c5a55a] text-white shadow-md" 
                      : "border-black/10 text-slate-500 hover:border-[#c5a55a]/50"
                  )}
                >
                  {method}
                </button>
              ))}
            </div>
            {errors.contactMethod && <p className="text-red-500 text-xs mt-2">{errors.contactMethod.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#0f2a4a] mb-4">Preferred Consultation Time *</label>
            <input
              {...register("consultationTime")}
              type="text"
              className={cn(
                "w-full bg-slate-50 border rounded-lg px-6 py-4 max-h-[42px] text-slate-700 focus:outline-none transition-colors",
                errors.consultationTime ? "border-red-300 focus:border-red-500 bg-red-50" : "border-black/10 focus:border-[#c5a55a]"
              )}
              placeholder="e.g. Weekday mornings, Tomorrow at 3PM"
            />
            {errors.consultationTime && <p className="text-red-500 text-xs mt-2">{errors.consultationTime.message}</p>}
          </div>

        </div>

        <div className="mt-16 flex items-center justify-between border-t border-black/5 pt-8">
          <button 
            type="button"
            onClick={prevStep}
            className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-[#0f2a4a] transition-colors"
          >
            Back
          </button>
          <MagneticButton 
            variant="primary" 
            type="submit"
            className={cn("px-10 py-5 text-xs tracking-widest", isSubmitting && "opacity-80 pointer-events-none")}
          >
            {isSubmitting ? "Submitting..." : "Book Free Consultation"}
          </MagneticButton>
        </div>
      </form>
    </motion.div>
  );
}
