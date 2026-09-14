import { z } from 'zod';

// Phone regex allowing international formats: +91 9876543210, (123) 456-7890, +1-800-555-0199, etc.
const phoneRegex = /^[+]?[\d\s\-\(\)\.]{7,25}$/;

export const contactEnquirySchema = z.object({
  name: z
    .string({ required_error: 'Full name is required' })
    .trim()
    .min(2, { message: 'Full name must be at least 2 characters.' })
    .max(100, { message: 'Full name cannot exceed 100 characters.' }),

  email: z
    .string({ required_error: 'Email address is required' })
    .trim()
    .email({ message: 'Please enter a valid business or personal email address.' })
    .max(120, { message: 'Email cannot exceed 120 characters.' }),

  phone: z
    .string({ required_error: 'Phone number is required' })
    .trim()
    .min(7, { message: 'Phone number must be at least 7 digits.' })
    .max(25, { message: 'Phone number cannot exceed 25 characters.' })
    .regex(phoneRegex, { message: 'Please enter a valid phone number containing digits (e.g. +91 98200 00000).' })
    .refine((val) => {
      const digits = val.replace(/\D/g, '');
      return digits.length >= 7 && digits.length <= 15;
    }, { message: 'Phone number must contain between 7 and 15 digits.' }),

  company: z
    .string()
    .trim()
    .max(150, { message: 'Company name cannot exceed 150 characters.' })
    .optional()
    .nullable()
    .transform((val) => (val && val.trim() ? val.trim() : 'Not Specified')),

  service: z
    .string()
    .trim()
    .max(100, { message: 'Service title cannot exceed 100 characters.' })
    .optional()
    .nullable()
    .transform((val) => (val && val.trim() ? val.trim() : 'General Procurement')),

  urgency: z
    .string()
    .trim()
    .max(60)
    .optional()
    .nullable()
    .transform((val) => (val && val.trim() ? val.trim() : 'Standard (1-2 Days)')),

  message: z
    .string()
    .trim()
    .max(3000, { message: 'Message cannot exceed 3,000 characters.' })
    .optional()
    .nullable()
    .transform((val) => (val && val.trim() ? val.trim() : '')),

  formType: z
    .string()
    .trim()
    .max(50)
    .optional()
    .default('general'),
});

export const updateEnquiryStatusSchema = z.object({
  id: z.string().trim().min(1, { message: 'Enquiry ID is required.' }),
  status: z.enum(['NEW', 'IN_REVIEW', 'CONTACTED', 'QUOTED', 'CLOSED', 'ARCHIVED'], {
    errorMap: () => ({ message: 'Invalid status value.' }),
  }),
});

export const enquiryQuerySchema = z.object({
  id: z.string().trim().min(1, { message: 'Enquiry ID is required.' }),
});

export const validatePdfFile = (file) => {
  if (!file) return { valid: true };
  const maxBytes = 10 * 1024 * 1024; // 10MB
  const isPdf =
    (file.type && file.type === 'application/pdf') ||
    (file.name && file.name.toLowerCase().endsWith('.pdf'));

  if (!isPdf) {
    return { valid: false, error: 'Only PDF documents (.pdf) are permitted.' };
  }

  if (file.size > maxBytes) {
    return { valid: false, error: 'Document file size must be less than 10MB.' };
  }

  return { valid: true };
};
