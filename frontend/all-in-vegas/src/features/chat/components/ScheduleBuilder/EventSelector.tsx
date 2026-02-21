/**
 * Event Selector Component
 * Multi-select component for choosing events from available list
 */

import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Event } from '@/types/event-service-types';

interface EventSelectorProps {
  availableEvents: Event[];
  selectedEventIds: string[];
  onSelectionChange: (eventIds: string[]) => void;
  isLoading?: boolean;
}

export function EventSelector({
  availableEvents,
  selectedEventIds,
  onSelectionChange,
  isLoading = false,
}: EventSelectorProps) {
  const handleToggle = (eventId: string) => {
    if (selectedEventIds.includes(eventId)) {
      onSelectionChange(selectedEventIds.filter((id) => id !== eventId));
    } else {
      onSelectionChange([...selectedEventIds, eventId]);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
          <p className="text-sm text-muted-foreground">Loading events...</p>
        </div>
      </div>
    );
  }

  if (availableEvents.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-sm text-muted-foreground">No events available</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[350px] w-full rounded-md border p-4">
      <div className="space-y-3 pr-4">
        {availableEvents.map((event) => (
          <Card
            key={event.eventID}
            className="p-3 cursor-pointer hover:bg-accent transition-colors"
            onClick={() => handleToggle(event.eventID)}
          >
            <div className="flex gap-3">
              <Checkbox
                checked={selectedEventIds.includes(event.eventID)}
                onChange={(checked) => {
                  if (checked) {
                    onSelectionChange([...selectedEventIds, event.eventID]);
                  } else {
                    onSelectionChange(
                      selectedEventIds.filter((id) => id !== event.eventID)
                    );
                  }
                }}
                className="mt-1"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm line-clamp-2">{event.title}</p>
                <p className="text-xs text-muted-foreground my-1">
                  📍 {event.location}
                </p>
                {event.tag && event.tag.length > 0 && (
                  <div className="flex gap-1 flex-wrap">
                    {event.tag.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {event.tag.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{event.tag.length - 2}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
