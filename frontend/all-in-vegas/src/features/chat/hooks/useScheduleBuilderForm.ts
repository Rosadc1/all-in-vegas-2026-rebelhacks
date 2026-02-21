/**
 * Schedule Builder Form Validation Hook
 * Integrates react-hook-form with Zod validation
 */

import { useForm, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { scheduleBuilderSchema, type ScheduleBuilderFormData } from '@/utils/chat/scheduleBuilderSchema';

export function useScheduleBuilderForm(): UseFormReturn<ScheduleBuilderFormData> {
  const form = useForm<ScheduleBuilderFormData>({
    resolver: zodResolver(scheduleBuilderSchema),
    defaultValues: {
      selectedEventIds: [],
      scheduleStrategy: 'chronological',
      notes: '',
    },
  });

  return form;
}
