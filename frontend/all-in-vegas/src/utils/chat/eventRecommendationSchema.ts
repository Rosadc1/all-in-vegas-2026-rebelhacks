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
});

export type EventRecommendationFormData = z.infer<typeof eventRecommendationSchema>;
