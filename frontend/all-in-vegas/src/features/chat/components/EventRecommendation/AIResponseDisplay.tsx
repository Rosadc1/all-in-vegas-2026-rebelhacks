/**
 * AI Response Display Component
 * Displays the AI's text recommendation response in a beautiful format
 */

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface AIResponseDisplayProps {
  response: string;
  isLoading?: boolean;
  onStartOver?: () => void;
  onProceed?: () => void;
}

export function AIResponseDisplay({
  response,
  isLoading = false,
  onStartOver,
  onProceed,
}: AIResponseDisplayProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Analyzing your preferences...</p>
            <p className="text-xs text-muted-foreground">This may take a moment</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-amber-500" />
        <h3 className="text-sm font-semibold text-muted-foreground">AI Recommendations</h3>
      </div>

      {/* Response Card */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <div className="space-y-4">
          {/* Quote mark decoration */}
          <div className="text-4xl text-blue-200 font-serif">"</div>

          {/* Response Text */}
          <p className="text-base leading-relaxed text-gray-800 whitespace-pre-wrap">
            {response}
          </p>

          {/* Closing quote */}
          <div className="text-4xl text-blue-200 font-serif text-right">„</div>
        </div>
      </Card>

      {/* Info Box */}
      <Card className="p-4 bg-blue-50 border-blue-100">
        <p className="text-xs text-blue-900">
          💡 <span className="font-semibold">Next:</span> You can search for events matching these recommendations or build a custom schedule.
        </p>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        {onStartOver && (
          <Button onClick={onStartOver} variant="outline" className="flex-1">
            ← New Search
          </Button>
        )}
        {onProceed && (
          <Button onClick={onProceed} className="flex-1">
            Continue →
          </Button>
        )}
      </div>
    </div>
  );
}
