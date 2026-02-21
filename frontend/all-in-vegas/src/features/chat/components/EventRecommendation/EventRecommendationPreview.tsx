/**
 * Event Recommendation Preview Component
 * Displays recommended events in a clean card layout
 */

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Event } from '@/types/event-service-types';

interface EventRecommendationPreviewProps {
  events: Event[];
  isLoading?: boolean;
  onSelectEvent?: (eventId: string) => void;
  onStartOver?: () => void;
}

export function EventRecommendationPreview({
  events,
  isLoading = false,
  onSelectEvent,
  onStartOver,
}: EventRecommendationPreviewProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
          <p className="text-sm text-muted-foreground">Finding perfect events...</p>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center space-y-4">
          <p className="text-base font-medium">No events found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your preferences</p>
          {onStartOver && (
            <Button onClick={onStartOver} variant="outline">
              Try Again
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
      {events.map((event) => (
        <Card key={event.eventID} className="p-4 hover:bg-accent transition-colors cursor-pointer">
          <div className="space-y-2">
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-semibold text-base line-clamp-2">{event.title}</h3>
              {onSelectEvent && (
                <Button
                  size="sm"
                  onClick={() => onSelectEvent(event.eventID)}
                  variant="outline"
                >
                  Select
                </Button>
              )}
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {event.description}
            </p>

            <div className="flex gap-2 flex-wrap">
              {event.tag?.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <p>📍 {event.location}</p>
              {event.date && event.date.length > 0 && (
                <p>📅 {event.date.join(', ')}</p>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
