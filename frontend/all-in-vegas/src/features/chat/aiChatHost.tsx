/**
 * AI Chat Feature Host Component
 * Main feature container managing state and layout
 * Can be used in navigation/header or as a standalone feature
 */

import { useAIChatModal } from './hooks/useAIChatModal';
import { AIChatButton } from './components/AIChatButton';
import { AIChatModal } from './components/AIChatModal';

export function AIChatHost() {
  const { isOpen, currentMode, openModal, closeModal, setMode } = useAIChatModal();

  return (
    <span>
      {/* Trigger Button */}
      <AIChatButton onClick={() => openModal('recommendation')} />

      {/* Modal */}
      <AIChatModal
        isOpen={isOpen}
        onClose={closeModal}
        onOpenChange={(open) => {
          if (!open) closeModal();
          else openModal(currentMode);
        }}
      />
    </span>
  );
}

export default AIChatHost;
