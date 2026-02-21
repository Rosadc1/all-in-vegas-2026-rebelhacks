/**
 * Schedule Builder Form Component
 * Allows users to select multiple events and configure schedule generation options
 */

import { useScheduleBuilderForm } from '../../hooks/useScheduleBuilderForm';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Event } from '@/types/event-service-types';
import type { ScheduleBuilderFormData } from '@/utils/chat/scheduleBuilderSchema';

interface ScheduleBuilderFormProps {
  selectedEvents: Event[];
  isLoading?: boolean;
  onSubmit: (data: ScheduleBuilderFormData) => void | Promise<void>;
}

export function ScheduleBuilderForm({
  selectedEvents,
  isLoading = false,
  onSubmit,
}: ScheduleBuilderFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useScheduleBuilderForm();

  const selectedEventIds = watch('selectedEventIds');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Selected Events Display */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="font-semibold">
            Selected Events ({selectedEventIds.length})
          </Label>
        </div>

        {selectedEvents.length > 0 ? (
          <div className="space-y-2 max-h-[150px] overflow-y-auto">
            {selectedEvents.map((event) => (
              <Card key={event.eventID} className="p-3 bg-secondary/50">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.location}
                    </p>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setValue(
                        'selectedEventIds',
                        selectedEventIds.filter((id) => id !== event.eventID)
                      );
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic">
            No events selected. Return to event recommender to add events.
          </p>
        )}

        {errors.selectedEventIds && (
          <p className="text-sm text-red-500">{errors.selectedEventIds.message}</p>
        )}
      </div>

      {/* Schedule Strategy */}
      <div className="space-y-2">
        <Label htmlFor="strategy" className="font-semibold">
          Schedule Strategy
        </Label>
        <Select defaultValue="chronological">
          <SelectTrigger id="strategy">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="chronological">
              Chronological - Events in date order
            </SelectItem>
            <SelectItem value="optimized">
              Optimized - Minimize travel time
            </SelectItem>
            <SelectItem value="balanced">
              Balanced - Mix of both strategies
            </SelectItem>
          </SelectContent>
        </Select>
        {errors.scheduleStrategy && (
          <p className="text-sm text-red-500">{errors.scheduleStrategy.message}</p>
        )}
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes" className="font-semibold">
          Additional Notes
        </Label>
        <Textarea
          id="notes"
          placeholder="Any special requirements or preferences for schedule generation..."
          className="min-h-[80px] resize-none"
          {...register('notes')}
        />
        {errors.notes && (
          <p className="text-sm text-red-500">{errors.notes.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading || selectedEvents.length === 0}
        className="w-full"
      >
        {isLoading ? 'Generating Schedule...' : 'Generate Schedule'}
      </Button>
    </form>
  );
}
