/**
 * Event Recommendation Form Validation Hook
 * Integrates react-hook-form with Zod validation
 */

import { useForm, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventRecommendationSchema, type EventRecommendationFormData } from '@/utils/chat/eventRecommendationSchema';

export function useEventRecommendationForm(): UseFormReturn<EventRecommendationFormData> {
  const form = useForm<EventRecommendationFormData>({
    resolver: zodResolver(eventRecommendationSchema),
    defaultValues: {
      prompt: '',
    },
  });

  return form;
}
