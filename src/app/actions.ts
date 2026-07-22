'use server';

import { z } from 'zod';

const contactSchema = z.object({
  contactName: z.string().min(2),
  contactEmail: z.string().email(),
  contactPhone: z.string().min(8),
  contactMethod: z.enum(['Phone', 'Email', 'WhatsApp']),
  consultationTime: z.string().min(1),
  // Additional data that could be sent from the store
  propertyType: z.string().optional(),
  serviceRequired: z.string().optional(),
});

export async function submitConsultation(formData: z.infer<typeof contactSchema>) {
  // 1. Validate on the server
  const parsed = contactSchema.safeParse(formData);
  
  if (!parsed.success) {
    return { success: false, error: 'Invalid form data' };
  }

  // 2. Mock a realistic delay (e.g., sending to CRM, triggering email)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // 3. Log to server console (representing CRM insertion)
  console.log('✅ [CRM] New Consultation Lead Received:', parsed.data);

  return { success: true, message: 'Consultation request received successfully.' };
}
