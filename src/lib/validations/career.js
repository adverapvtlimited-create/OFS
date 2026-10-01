import { z } from 'zod';
import { validatePhoneNumber } from '../countries.js';

const internationalPhoneRegex = /^[+]?[\d\s\-\(\)\.]{6,25}$/;

export const careerApplicationSchema = z.object({
  fullName: z
    .string({ required_error: 'Full name is required' })
    .trim()
    .min(2, { message: 'Full name must be at least 2 characters.' })
    .max(100, { message: 'Full name cannot exceed 100 characters.' }),

  email: z
    .string({ required_error: 'Email address is required' })
    .trim()
    .email({ message: 'Please enter a valid email address.' })
    .max(120, { message: 'Email cannot exceed 120 characters.' }),

  phone: z
    .string({ required_error: 'Phone number is required' })
    .trim()
    .min(6, { message: 'Phone number must contain at least 6 digits.' })
    .max(30, { message: 'Phone number cannot exceed 30 characters.' })
    .regex(internationalPhoneRegex, { message: 'Please enter a valid international phone number (e.g. +971 50 123 4567, +1 202 555 0123, +91 98200 00000).' })
    .refine((val) => {
      const res = validatePhoneNumber(val);
      return res.isValid;
    }, { message: 'Please enter a valid worldwide phone number for the selected country.' }),

  experienceYears: z
    .string()
    .trim()
    .max(50, { message: 'Experience cannot exceed 50 characters.' })
    .optional()
    .nullable()
    .transform((val) => (val && val.trim() ? val.trim() : 'N/A')),

  currentCompany: z
    .string()
    .trim()
    .max(120, { message: 'Current company name cannot exceed 120 characters.' })
    .optional()
    .nullable()
    .transform((val) => (val && val.trim() ? val.trim() : 'N/A')),

  jobTitle: z
    .string()
    .trim()
    .max(120)
    .optional()
    .nullable()
    .transform((val) => (val && val.trim() ? val.trim() : 'General Application')),

  jobId: z
    .string()
    .trim()
    .max(100)
    .optional()
    .nullable()
    .transform((val) => (val && val.trim() ? val.trim() : 'general')),

  coverNote: z
    .string()
    .trim()
    .max(3000, { message: 'Cover note cannot exceed 3,000 characters.' })
    .optional()
    .nullable()
    .transform((val) => (val && val.trim() ? val.trim() : '')),

  resumeName: z
    .string()
    .trim()
    .max(255)
    .optional()
    .nullable()
    .transform((val) => (val && val.trim() ? val.trim() : 'resume-attached.pdf')),
});

export const updateApplicationStatusSchema = z.object({
  id: z.string().trim().min(1, { message: 'Application ID is required.' }),
  status: z.enum(['UNDER_REVIEW', 'SHORTLISTED', 'HIRED', 'REJECTED'], {
    errorMap: () => ({ message: 'Invalid application status.' }),
  }),
});

export const careerQuerySchema = z.object({
  id: z.string().trim().min(1, { message: 'Application ID is required.' }),
});

export const validateResumeFile = (file) => {
  if (!file) return { valid: true };
  const maxBytes = 10 * 1024 * 1024; // 10MB
  const isPdf =
    (file.type && file.type === 'application/pdf') ||
    (file.name && file.name.toLowerCase().endsWith('.pdf'));

  if (!isPdf) {
    return { valid: false, error: 'Only PDF resumes (.pdf) are accepted.' };
  }

  if (file.size > maxBytes) {
    return { valid: false, error: 'Resume file size must be less than 10MB.' };
  }

  return { valid: true };
};
