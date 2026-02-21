/**
 * Event Recommendation Form Validation Schema
 * Uses Zod for runtime validation with react-hook-form integration
 */

import { z } from 'zod';

export const eventRecommendationSchema = z.object({
  prompt: z
    .string()
    .min(10, 'Prompt must be at least 10 characters')
    .max(500, 'Prompt must not exceed 500 characters'),
  budget: z
    .number()
    .min(0, 'Budget must be a positive number')
    .optional(),
  dateRangeStart: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), 'Invalid start date'),
  dateRangeEnd: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), 'Invalid end date'),
  preferences: z
    .array(z.string())
    .optional(),
}).refine(
  (data) => {
    if (data.dateRangeStart && data.dateRangeEnd) {
      return new Date(data.dateRangeStart) <= new Date(data.dateRangeEnd);
    }
    return true;
  },
  {
    message: 'Start date must be before end date',
    path: ['dateRangeEnd'],
  }
);

export type EventRecommendationFormData = z.infer<typeof eventRecommendationSchema>;
