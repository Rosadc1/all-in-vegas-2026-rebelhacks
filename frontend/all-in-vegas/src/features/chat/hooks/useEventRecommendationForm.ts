/**
 * Event Recommendation Form Validation Hook
 * Integrates react-hook-form with Zod validation
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventRecommendationSchema, type EventRecommendationFormData } from '@/utils/chat/eventRecommendationSchema';

export function useEventRecommendationForm() {
  const form = useForm<EventRecommendationFormData>({
    resolver: zodResolver(eventRecommendationSchema),
    defaultValues: {
      prompt: '',
      budget: undefined,
      dateRangeStart: undefined,
      dateRangeEnd: undefined,
      preferences: [],
    },
  });

  return form;
}
