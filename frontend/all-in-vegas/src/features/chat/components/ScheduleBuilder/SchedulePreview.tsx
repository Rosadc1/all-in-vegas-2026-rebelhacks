/**
 * Schedule Preview Component
 * Displays generated schedule in a timeline/calendar format
 */

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { ScheduleItem } from '../../types/formTypes';

interface SchedulePreviewProps {
  scheduleItems: ScheduleItem[];
  isLoading?: boolean;
  summary?: string;
  onConfirm?: () => void;
  onEdit?: () => void;
}

export function SchedulePreview({
  scheduleItems,
  isLoading = false,
  summary,
  onConfirm,
  onEdit,
}: SchedulePreviewProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
          <p className="text-sm text-muted-foreground">Generating your perfect schedule...</p>
        </div>
      </div>
    );
  }

  if (scheduleItems.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center space-y-4">
          <p className="text-base font-medium">No schedule generated yet</p>
          <p className="text-sm text-muted-foreground">Select events to get started</p>
          {onEdit && (
            <Button onClick={onEdit} variant="outline">
              Back to Events
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary */}
      {summary && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <p className="text-sm font-medium text-blue-900">{summary}</p>
        </Card>
      )}

      {/* Schedule Timeline */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {scheduleItems.map((item, index) => (
          <div key={`${item.eventId}-${index}`}>
            {index > 0 && <Separator className="my-2" />}

            <Card className="p-4 hover:bg-accent transition-colors">
              <div className="space-y-2">
                {/* Date and Time */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-muted-foreground">
                      {new Date(item.scheduledDate).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                    {item.startTime && (
                      <p className="text-sm font-medium">
                        🕐 {item.startTime}
                        {item.endTime && ` - ${item.endTime}`}
                      </p>
                    )}
                  </div>
                  <Badge variant="default">
                    {index + 1}
                  </Badge>
                </div>

                {/* Event Details */}
                <div>
                  <h3 className="font-semibold text-base">{item.event.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.event.description}
                  </p>
                </div>

                {/* Meta Info */}
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>📍 {item.event.location}</p>
                  {item.event.tag && item.event.tag.length > 0 && (
                    <div className="flex gap-1 flex-wrap mt-2">
                      {item.event.tag.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Notes */}
                {item.notes && (
                  <p className="text-xs italic text-muted-foreground border-l-2 border-muted pl-2 mt-2">
                    Note: {item.notes}
                  </p>
                )}
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {onEdit && (
          <Button onClick={onEdit} variant="outline" className="flex-1">
            Edit Schedule
          </Button>
        )}
        {onConfirm && (
          <Button onClick={onConfirm} className="flex-1">
            Accept Schedule
          </Button>
        )}
      </div>
    </div>
  );
}
