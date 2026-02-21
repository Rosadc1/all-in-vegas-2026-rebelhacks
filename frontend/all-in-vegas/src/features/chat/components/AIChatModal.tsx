/**
 * AI Chat Modal Component
 * Main modal container with mode switching and form displays
 */

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useGetEventRecommendationsMutation } from '@/services/ai-service';
import { ChatModeSelector } from './ChatModeSelector';
import { EventRecommendationForm } from './EventRecommendation/EventRecommendationForm';
import { EventRecommendationPreview } from './EventRecommendation/EventRecommendationPreview';
import { ScheduleBuilderForm } from './ScheduleBuilder/ScheduleBuilderForm';
import { EventSelector } from './ScheduleBuilder/EventSelector';
import { SchedulePreview } from './ScheduleBuilder/SchedulePreview';
import type { ChatMode } from '../types/aiChatTypes';
import type { EventRecommendationFormData } from '@/utils/chat/eventRecommendationSchema';
import type { ScheduleBuilderFormData } from '@/utils/chat/scheduleBuilderSchema';
import type { Event } from '@/types/event-service-types';
import type { ScheduleItem } from '../types/formTypes';

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange?: (open: boolean) => void;
}

type FormStep = 'modeSelect' | 'eventRecommendationForm' | 'eventRecommendationPreview' | 'eventSelector' | 'scheduleBuilderForm' | 'schedulePreview';

export function AIChatModal({
  isOpen,
  onClose,
  onOpenChange,
}: AIChatModalProps) {
  const [getEventRecommendations] = useGetEventRecommendationsMutation();
  const [mode, setMode] = useState<ChatMode>('recommendation');
  const [formStep, setFormStep] = useState<FormStep>('modeSelect');
  const [isLoading, setIsLoading] = useState(false);

  // Event Recommendation state
  const [recommendedEvents, setRecommendedEvents] = useState<Event[]>([]);

  // Schedule Builder state
  const [selectedScheduleEvents, setSelectedScheduleEvents] = useState<Event[]>([]);
  const [allAvailableEvents, setAllAvailableEvents] = useState<Event[]>([]);
  const [generatedSchedule, setGeneratedSchedule] = useState<ScheduleItem[]>([]);

  const handleModeChange = (newMode: ChatMode) => {
    setMode(newMode);
    setFormStep('modeSelect');
    // Reset relevant state when switching modes
    if (newMode === 'recommendation') {
      setRecommendedEvents([]);
    } else {
      setSelectedScheduleEvents([]);
      setGeneratedSchedule([]);
    }
  };

  const handleModalClose = () => {
    onOpenChange?.(false);
    onClose();
    // Reset state on close
    setTimeout(() => {
      setFormStep('modeSelect');
      setRecommendedEvents([]);
      setSelectedScheduleEvents([]);
      setGeneratedSchedule([]);
      setIsLoading(false);
    }, 300);
  };

  const handleRecommendationSubmit = async (data: EventRecommendationFormData) => {
    setIsLoading(true);
    try {
      const response = await getEventRecommendations({ prompt: data.prompt }).unwrap();
      
      // Convert recommended event names to Event objects with placeholder data
      const events: Event[] = response.Recommended.map((name, index) => ({
        eventID: `recommended-${index}`,
        userId: 'ai-recommendation',
        title: name,
        description: 'AI Recommended Event',
        date: [],
        location: 'Las Vegas, Nevada',
        tag: ['recommended'],
      }));
      
      setRecommendedEvents(events);
      setFormStep('eventRecommendationPreview');
    } catch (error) {
      console.error('Error getting recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScheduleBuilderSubmit = async (data: ScheduleBuilderFormData) => {
    setIsLoading(true);
    try {
      // TODO: Call AI API to generate schedule
      // const response = await aiChatService.generateSchedule(data);
      // setGeneratedSchedule(response.schedule);
      
      // Placeholder: mock data
      setGeneratedSchedule([]);
      setFormStep('schedulePreview');
    } catch (error) {
      console.error('Error generating schedule:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectEventFromRecommendation = (eventId: string) => {
    const event = recommendedEvents.find((e) => e.eventID === eventId);
    if (event) {
      setSelectedScheduleEvents((prev) => {
        const exists = prev.find((e) => e.eventID === eventId);
        if (exists) {
          return prev.filter((e) => e.eventID !== eventId);
        }
        return [...prev, event];
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <DialogHeader className="shrink-0">
          <div className="flex items-center justify-between pr-0">
            <div>
              <DialogTitle className="text-xl">
                {mode === 'recommendation' ? 'AI Event Recommender' : 'AI Schedule Builder (Coming Soon)'}
              </DialogTitle>
              <DialogDescription className="mt-1">
                {formStep === 'modeSelect'
                  ? 'Choose how AI can help you plan your Vegas trip'
                  : mode === 'recommendation'
                    ? 'Find events tailored to your preferences'
                    : 'Create an optimized schedule from your selected events'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <Separator className="mb-4" />

          <div className="px-6">
            {formStep === 'modeSelect' && (
              <ChatModeSelector
                currentMode={mode}
                onModeChange={handleModeChange}
              />
            )}

            {/* Event Recommendation Flow */}
            {mode === 'recommendation' && formStep === 'modeSelect' && (
              <div className="mt-4">
                <Button
                  onClick={() => setFormStep('eventRecommendationForm')}
                  className="w-full"
                >
                  Start Recommender
                </Button>
              </div>
            )}

            {mode === 'recommendation' && formStep === 'eventRecommendationForm' && (
              <EventRecommendationForm
                isLoading={isLoading}
                onSubmit={handleRecommendationSubmit}
              />
            )}

            {mode === 'recommendation' && formStep === 'eventRecommendationPreview' && (
              <div className="space-y-4">
                <EventRecommendationPreview
                  events={recommendedEvents}
                  isLoading={isLoading}
                  onSelectEvent={handleSelectEventFromRecommendation}
                  onStartOver={() => setFormStep('eventRecommendationForm')}
                />
                {selectedScheduleEvents.length > 0 && (
                  <Button
                    onClick={() => {
                      setMode('schedule');
                      setFormStep('eventSelector');
                    }}
                    className="w-full"
                  >
                    Build Schedule with Selected Events ({selectedScheduleEvents.length})
                  </Button>
                )}
              </div>
            )}

            {/* Schedule Builder Flow */}
            {mode === 'schedule' && formStep === 'modeSelect' && (
              <div className="mt-4">
                <Button
                  onClick={() => setFormStep('eventSelector')}
                  className="w-full"
                  disabled
                >
                  Start Schedule Builder (Not Available yet)
                </Button>
              </div>
            )}

            {mode === 'schedule' && formStep === 'eventSelector' && (
              <div className="space-y-4">
                <EventSelector
                  availableEvents={allAvailableEvents}
                  selectedEventIds={selectedScheduleEvents.map((e) => e.eventID)}
                  onSelectionChange={(eventIds) => {
                    setSelectedScheduleEvents(
                      allAvailableEvents.filter((e) =>
                        eventIds.includes(e.eventID)
                      )
                    );
                  }}
                  isLoading={isLoading}
                />
                {selectedScheduleEvents.length > 0 && (
                  <Button
                    onClick={() => setFormStep('scheduleBuilderForm')}
                    className="w-full"
                  >
                    Continue to Schedule Options
                  </Button>
                )}
              </div>
            )}

            {mode === 'schedule' && formStep === 'scheduleBuilderForm' && (
              <ScheduleBuilderForm
                selectedEvents={selectedScheduleEvents}
                isLoading={isLoading}
                onSubmit={handleScheduleBuilderSubmit}
              />
            )}

            {mode === 'schedule' && formStep === 'schedulePreview' && (
              <SchedulePreview
                scheduleItems={generatedSchedule}
                isLoading={isLoading}
                onEdit={() => setFormStep('scheduleBuilderForm')}
                onConfirm={handleModalClose}
              />
            )}
          </div>
        </div>

        {/* Navigation */}
        {formStep !== 'modeSelect' && (
          <div className="flex-shrink-0 border-t pt-4 px-6">
            <Button
              onClick={() => {
                if (mode === 'recommendation' && formStep === 'eventRecommendationPreview') {
                  setFormStep('eventRecommendationForm');
                } else if (mode === 'schedule' && formStep === 'scheduleBuilderForm') {
                  setFormStep('eventSelector');
                } else if (mode === 'schedule' && formStep === 'schedulePreview') {
                  setFormStep('scheduleBuilderForm');
                } else {
                  setFormStep('modeSelect');
                }
              }}
              variant="outline"
              className="w-full"
            >
              ← Back
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
