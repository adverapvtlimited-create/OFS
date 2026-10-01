import { z } from "zod";
import { validatePhoneNumber } from "../countries.js";

// Phone regex allowing worldwide international formats (+1, +44, +971, +91, etc.)
const internationalPhoneRegex = /^[+]?[\d\s\-\(\)\.]{6,25}$/;

export const contactEnquirySchema = z.object({
  name: z
    .string({ required_error: "Full name is required" })
    .trim()
    .min(2, { message: "Full name must be at least 2 characters." })
    .max(100, { message: "Full name cannot exceed 100 characters." }),

  email: z
    .string({ required_error: "Email address is required" })
    .trim()
    .email({
      message: "Please enter a valid business or personal email address.",
    })
    .max(120, { message: "Email cannot exceed 120 characters." }),

  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .min(6, { message: "Phone number must contain at least 6 digits." })
    .max(30, { message: "Phone number cannot exceed 30 characters." })
    .regex(internationalPhoneRegex, {
      message:
        "Please enter a valid international phone number (e.g. +971 50 123 4567, +1 202 555 0123, +91 98200 00000).",
    })
    .refine(
      (val) => {
        const res = validatePhoneNumber(val);
        return res.isValid;
      },
      {
        message:
          "Please enter a valid worldwide phone number for the selected country.",
      },
    ),

  company: z
    .string()
    .trim()
    .max(150, { message: "Company name cannot exceed 150 characters." })
    .optional()
    .nullable()
    .transform((val) => (val && val.trim() ? val.trim() : "Not Specified")),

  service: z
    .string()
    .trim()
    .max(100, { message: "Service title cannot exceed 100 characters." })
    .optional()
    .nullable()
    .transform((val) =>
      val && val.trim() ? val.trim() : "General Procurement",
    ),

  urgency: z
    .string()
    .trim()
    .max(60)
    .optional()
    .nullable()
    .transform((val) =>
      val && val.trim() ? val.trim() : "Standard (1-2 Days)",
    ),

  message: z
    .string()
    .trim()
    .max(3000, { message: "Message cannot exceed 3,000 characters." })
    .optional()
    .nullable()
    .transform((val) => (val && val.trim() ? val.trim() : "")),

  formType: z.string().trim().max(50).optional().default("general"),
});

export const updateEnquiryStatusSchema = z.object({
  id: z.string().trim().min(1, { message: "Enquiry ID is required." }),
  status: z.enum(
    ["NEW", "IN_REVIEW", "CONTACTED", "QUOTED", "CLOSED", "ARCHIVED"],
    {
      errorMap: () => ({ message: "Invalid status value." }),
    },
  ),
});

export const enquiryQuerySchema = z.object({
  id: z.string().trim().min(1, { message: "Enquiry ID is required." }),
});

export const validatePdfFile = (file) => {
  if (!file) return { valid: true };
  const maxBytes = 10 * 1024 * 1024; // 10MB
  const isPdf =
    (file.type && file.type === "application/pdf") ||
    (file.name && file.name.toLowerCase().endsWith(".pdf"));

  if (!isPdf) {
    return { valid: false, error: "Only PDF documents (.pdf) are permitted." };
  }

  if (file.size > maxBytes) {
    return {
      valid: false,
      error: "Document file size must be less than 10MB.",
    };
  }

  return { valid: true };
};
