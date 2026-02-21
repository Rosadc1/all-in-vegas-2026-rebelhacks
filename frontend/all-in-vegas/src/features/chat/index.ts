/**
 * AI Chat Feature Exports
 * Central export point for all chat feature components and hooks
 */

// Components
export { AIChatHost } from './aiChatHost';
export { AIChatButton } from './components/AIChatButton';
export { AIChatModal } from './components/AIChatModal';
export { ChatModeSelector } from './components/ChatModeSelector';
export { EventRecommendationForm } from './components/EventRecommendation/EventRecommendationForm';
export { EventRecommendationPreview } from './components/EventRecommendation/EventRecommendationPreview';
export { ScheduleBuilderForm } from './components/ScheduleBuilder/ScheduleBuilderForm';
export { EventSelector } from './components/ScheduleBuilder/EventSelector';
export { SchedulePreview } from './components/ScheduleBuilder/SchedulePreview';

// Hooks
export { useAIChatModal } from './hooks/useAIChatModal';
export { useEventRecommendationForm } from './hooks/useEventRecommendationForm';
export { useScheduleBuilderForm } from './hooks/useScheduleBuilderForm';

// Types
export type { ChatMode, ChatModalState, AIChatContextType } from './types/aiChatTypes';
export type {
  EventRecommendationFormInputs,
  EventRecommendationResult,
  ScheduleBuilderFormInputs,
  GeneratedSchedule,
  ScheduleItem,
} from './types/formTypes';
