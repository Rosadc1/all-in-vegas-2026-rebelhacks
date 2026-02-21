/**
 * AI Chat Feature - Type Definitions
 */

export type ChatMode = 'recommendation' | 'schedule';

export interface ChatModalState {
  isOpen: boolean;
  currentMode: ChatMode;
}

export interface AIChatContextType {
  isLoading: boolean;
  error: string | null;
}
