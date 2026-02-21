import { useNavigate } from 'react-router';
import { ChevronLeft, Bot, Mail, Sparkles, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function HelpCenterPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="pt-6 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </Button>

        {/* Header */}
        <div className="mb-8">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#e63946] font-black">Support</span>
          <h1 className="text-3xl font-black tracking-tighter text-white mt-1 uppercase">
            Help Center
          </h1>
          <div className="h-1 w-24 bg-[#e63946] mt-3 mb-6" />
        </div>

        {/* AI Feature CTA */}
        <h2 className="text-[10px] font-black text-[#e63946] uppercase tracking-[0.2em] mb-3 px-2">
          Try Our AI Assistant
        </h2>
        <Card className="bg-card border-border mb-6 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#ffb703]" />
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#e63946] to-[#ffb703] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,183,3,0.3)]">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-base font-black text-white uppercase tracking-wide">AI Convention Planner</h3>
                <p className="text-[10px] text-[#ffb703] font-bold uppercase tracking-widest">Powered by AI</p>
              </div>
            </div>
            <p className="text-[#94a3b8] text-sm leading-relaxed mb-4">
              Not sure where to start? Try out our <span className="text-white font-bold">AI assistant</span>! It can recommend events tailored to your interests and even build a full convention schedule for you automatically.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-[#ffb703] mt-0.5 shrink-0" />
                <p className="text-xs text-[#94a3b8]">
                  <span className="text-white font-semibold">Event Recommendations</span> — Tell the AI what you're into and it'll surface the best events for you.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-[#ffb703] mt-0.5 shrink-0" />
                <p className="text-xs text-[#94a3b8]">
                  <span className="text-white font-semibold">Schedule Builder</span> — Let the AI create a conflict-free day-by-day plan based on your preferences.
                </p>
              </div>
            </div>
            <p className="text-[#94a3b8] text-xs mt-4 italic">
              Tap the chat icon anywhere in the app to get started.
            </p>
          </CardContent>
        </Card>

        {/* Contact Us */}
        <h2 className="text-[10px] font-black text-[#e63946] uppercase tracking-[0.2em] mb-3 px-2">
          Contact Us
        </h2>
        <Card className="bg-card border-border overflow-hidden">
          <CardContent className="p-0">
            <a
              href="mailto:healthconnectproj@gmail.com"
              className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors"
            >
              <Mail className="w-5 h-5 text-[#ffb703]" />
              <div className="flex-1">
                <p className="text-sm font-bold text-white uppercase tracking-wide">Email Support</p>
                <p className="text-xs text-[#94a3b8] mt-0.5">healthconnectproj@gmail.com</p>
              </div>
              <span className="text-[#94a3b8]">›</span>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
