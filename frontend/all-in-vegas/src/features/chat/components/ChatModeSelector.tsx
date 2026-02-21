/**
 * Chat Mode Selector Component
 * Allows users to switch between Event Recommendation and Schedule Builder modes
 */

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sparkles, Calendar } from 'lucide-react';
import type { ChatMode } from '../types/aiChatTypes';

interface ChatModeSelectorProps {
  currentMode: ChatMode;
  onModeChange: (mode: ChatMode) => void;
  disabled?: boolean;
}

export function ChatModeSelector({
  currentMode,
  onModeChange,
  disabled = false,
}: ChatModeSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-semibold text-muted-foreground">Choose Mode</p>
        <div className="grid grid-cols-2 gap-3">
          {/* Event Recommendation Mode */}
          <Button
            variant={currentMode === 'recommendation' ? 'default' : 'outline'}
            onClick={() => onModeChange('recommendation')}
            disabled={disabled}
            className="h-auto flex-col gap-2 p-3"
          >
            <Sparkles className="h-5 w-5" />
            <span className="text-xs font-medium">Recommendations</span>
          </Button>

          {/* Schedule Builder Mode */}
          <Button
            variant={currentMode === 'schedule' ? 'default' : 'outline'}
            onClick={() => onModeChange('schedule')}
            disabled={disabled}
            className="h-auto flex-col gap-2 p-3"
          >
            <Calendar className="h-5 w-5" />
            <span className="text-xs font-medium">Build Schedule</span>
          </Button>
        </div>
      </div>

      {/* Mode Description */}
      <div className="text-xs text-muted-foreground">
        {currentMode === 'recommendation' ? (
          <p>
            Describe what you're looking for and we'll recommend events tailored to your preferences
          </p>
        ) : (
          <p>
            Select multiple events to create an optimized schedule for your Vegas trip
          </p>
        )}
      </div>

      <Separator />
    </div>
  );
}
