/**
 * Event Recommendation Form Component
 * Form for users to input their event recommendation preferences
 */

import { useEventRecommendationForm } from '../../hooks/useEventRecommendationForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import type { EventRecommendationFormData } from '@/utils/chat/eventRecommendationSchema';

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Prompt Input */}
      <div className="space-y-2">
        <Label htmlFor="prompt" className="font-semibold">
          What are you looking for? *
        </Label>
        <Textarea
          id="prompt"
          placeholder="e.g., 'I want high-energy nightlife events this weekend in Downtown Vegas'"
          className="min-h-[100px] resize-none"
          {...register('prompt')}
        />
        {errors.prompt && (
          <p className="text-sm text-red-500">{errors.prompt.message}</p>
        )}
      </div>

      {/* Budget Input */}
      <div className="space-y-2">
        <Label htmlFor="budget" className="font-semibold">
          Budget (USD)
        </Label>
        <Input
          id="budget"
          type="number"
          placeholder="e.g., 500"
          step="10"
          min="0"
          {...register('budget', { valueAsNumber: true })}
        />
        {errors.budget && (
          <p className="text-sm text-red-500">{errors.budget.message}</p>
        )}
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dateRangeStart" className="font-semibold">
            Start Date
          </Label>
          <Input
            id="dateRangeStart"
            type="date"
            {...register('dateRangeStart')}
          />
          {errors.dateRangeStart && (
            <p className="text-sm text-red-500">{errors.dateRangeStart.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateRangeEnd" className="font-semibold">
            End Date
          </Label>
          <Input
            id="dateRangeEnd"
            type="date"
            {...register('dateRangeEnd')}
          />
          {errors.dateRangeEnd && (
            <p className="text-sm text-red-500">{errors.dateRangeEnd.message}</p>
          )}
        </div>
      </div>

      {/* Preferences */}
      <Card className="p-4 bg-secondary/50">
        <p className="text-sm text-muted-foreground mb-2">
          💡 <span className="font-semibold">Tip:</span> The more details you provide, the better the recommendations
        </p>
      </Card>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? 'Finding Events...' : 'Get Recommendations'}
      </Button>
    </form>
  );
}
