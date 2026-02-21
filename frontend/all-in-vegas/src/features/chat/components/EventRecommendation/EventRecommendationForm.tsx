/**
 * Event Recommendation Form Component
 * Form for users to input their event recommendation prompt
 */

import { useEventRecommendationForm } from '../../hooks/useEventRecommendationForm';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { EventRecommendationFormData } from '@/utils/chat/eventRecommendationSchema';
import { LoaderCircle } from 'lucide-react';

interface EventRecommendationFormProps {
  isLoading?: boolean;
  onSubmit: (data: EventRecommendationFormData) => void | Promise<void>;
}

export function EventRecommendationForm({
  isLoading = false,
  onSubmit,
}: EventRecommendationFormProps) {
  const { register, handleSubmit, formState: { errors } } = useEventRecommendationForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Prompt Input */}
      <div className="space-y-2">
        <Label htmlFor="prompt" className="font-semibold">
          What are you looking for?
        </Label>
        <Textarea
          id="prompt"
          placeholder="e.g., 'I want high-energy nightlife events this weekend in Downtown Vegas'"
          className="min-h-24 resize-none border-primary-2"
          {...register('prompt')}
        />
        <p className="text-xs text-muted-foreground">
          {errors.prompt ? (
            <span className="text-red-500">{errors.prompt.message}</span>
          ) : (
            'Tip: The more details you provide, the better the recommendations'
          )}
        </p>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading && <LoaderCircle className='w-4 h-4 animate-spin'/>}
        {isLoading ? 'Generating recommendations ...' : 'Get Recommendations'}
      </Button>
    </form>
  );
}
