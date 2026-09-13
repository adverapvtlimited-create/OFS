import { z } from 'zod';

export const newsletterSchema = z.object({
  email: z
    .string({ required_error: 'Email address is required' })
    .trim()
    .email({ message: 'Please enter a valid email address.' })
    .max(120, { message: 'Email cannot exceed 120 characters.' }),
});
