/**
 * AI Chat Modal State Management Hook
 * Manages modal visibility and mode selection
 */

import { useState, useCallback } from 'react';
import type { ChatMode, ChatModalState } from '../types/aiChatTypes';

const DEFAULT_STATE: ChatModalState = {
  isOpen: false,
  currentMode: 'recommendation',
};

export function useAIChatModal() {
  const [state, setState] = useState<ChatModalState>(DEFAULT_STATE);

  const openModal = useCallback((mode: ChatMode = 'recommendation') => {
    setState({
      isOpen: true,
      currentMode: mode,
    });
  }, []);

  const closeModal = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  const setMode = useCallback((mode: ChatMode) => {
    setState((prev) => ({
      ...prev,
      currentMode: mode,
    }));
  }, []);

  return {
    ...state,
    openModal,
    closeModal,
    setMode,
  };
}
