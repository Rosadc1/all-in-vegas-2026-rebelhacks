/**
 * AI Chat Feature - Form Type Definitions
 */

import type { Event } from '@/types/event-service-types';

/**
 * Event Recommendation Form Fields
 */
export interface EventRecommendationFormInputs {
  prompt: string;
}

/**
 * Event Recommendation Response
 */
export interface EventRecommendationResult {
  recommendedEvents: Event[];
  reasoning?: string;
}

/**
 * Schedule Builder Form Fields
 */
export interface ScheduleBuilderFormInputs {
  selectedEventIds: string[];
  scheduleStrategy?: 'chronological' | 'optimized' | 'balanced';
  notes?: string;
}

/**
 * Generated Schedule Response
 */
export interface GeneratedSchedule {
  scheduleId: string;
  generatedAt: Date;
  events: ScheduleItem[];
  summary?: string;
}

/**
 * Individual Schedule Item with timing
 */
export interface ScheduleItem {
  eventId: string;
  event: Event;
  scheduledDate: Date;
  startTime?: string;
  endTime?: string;
  notes?: string;
}
