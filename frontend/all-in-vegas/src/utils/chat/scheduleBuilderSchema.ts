/**
 * Schedule Builder Form Validation Schema
 * Uses Zod for runtime validation with react-hook-form integration
 */

import { z } from 'zod';

export const scheduleBuilderSchema = z.object({
  selectedEventIds: z
    .array(z.string())
    .min(1, 'Select at least one event')
    .max(20, 'Cannot schedule more than 20 events'),
  scheduleStrategy: z
    .enum(['chronological', 'optimized', 'balanced']),
  notes: z
    .string()
    .max(300, 'Notes must not exceed 300 characters')
    .optional(),
});

export type ScheduleBuilderFormData = z.infer<typeof scheduleBuilderSchema>;
