/**
 * AI Chat Button Component
 * Trigger button to open the chatbot modal
 * Can be placed in header or navigation
 */

import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

interface AIChatButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'destructive';
}

export function AIChatButton({
  onClick,
  disabled = false,
  className,
  variant = 'default',
}: AIChatButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      size="lg"
      className={className}
      aria-label="Open AI Chat Assistant"
    >
      <MessageCircle className="h-5 w-5 mr-2" />
      AI Assistant
    </Button>
  );
}
