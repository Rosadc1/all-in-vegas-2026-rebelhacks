import { useNavigate } from 'react-router';
import { ChevronLeft, MapPin, Calendar, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function AboutPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Calendar,
      title: 'Event Scheduling',
      description: 'Browse and plan your convention schedule across multiple days and venues.',
    },
    {
      icon: MapPin,
      title: 'Venue Navigation',
      description: 'Interactive maps to help you find panels, exhibitors, and event spaces.',
    },
    {
      icon: Users,
      title: 'Connect with Others',
      description: 'Discover events that match your interests and connect with the community.',
    },
    {
      icon: Zap,
      title: 'AI-Powered Recommendations',
      description: 'Let our AI assistant build your perfect convention schedule based on what you love.',
    },
  ];

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
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#e63946] font-black">About</span>
          <h1 className="text-3xl font-black tracking-tighter mt-1">
            <span className="text-white">ALL IN</span>
            <span className="text-[#ffb703] ml-2">VEGAS</span>
          </h1>
          <div className="h-1 w-24 bg-[#e63946] mt-3 mb-6" />
        </div>

        {/* Description */}
        <Card className="bg-card border-border mb-6 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#e63946]" />
          <CardContent className="p-6">
            <p className="text-[#94a3b8] text-sm leading-relaxed mb-4">
              <span className="text-white font-bold">All In Vegas</span> is the ultimate convention companion for Las Vegas events. Whether you're attending a gaming expo, comic con, or fan festival — we give you everything you need to make the most of your experience.
            </p>
            <p className="text-[#94a3b8] text-sm leading-relaxed">
              Our platform helps attendees discover events, navigate sprawling venues, and build personalized schedules. For organizers, it provides powerful tools to publish events and reach the right audience.
            </p>
          </CardContent>
        </Card>

        {/* Features */}
        <h2 className="text-[10px] font-black text-[#e63946] uppercase tracking-[0.2em] mb-3 px-2">
          What We Offer
        </h2>
        <div className="space-y-3">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-card border-border overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#ffb703]/10 rounded-lg flex items-center justify-center shrink-0">
                    <feature.icon className="w-5 h-5 text-[#ffb703]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white uppercase tracking-wide mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-[#94a3b8] leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-[#94a3b8] mb-2">Version 1.0.0</p>
          <p className="text-xs text-[#94a3b8]">© 2026 All In Vegas. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
