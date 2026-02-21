import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Calendar, MapPin, Users, Bookmark, BookmarkCheck, ChevronRight, Clock } from 'lucide-react';
import type { Event } from '@/types/event-service-types';
import type { userType } from '@/types/user-service-types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ImageWithFallback } from '@/components/image/ImageWithFallback';

interface Session {
    id: string;
    title: string;
    description: string;
    time: string;
    duration: string;
    speaker: string;
    location: string;
}

interface EventSlideoutProps {
    event: Event;
    onClose: () => void;
    userType?: userType | null;
}

const mockSessions: Session[] = [
    {
        id: '1',
        title: 'Opening Keynote',
        description: "Join us for the official opening and discover what's next",
        time: '09:00 AM',
        duration: '90 min',
        speaker: 'Dr. Sarah Chen',
        location: 'Main Hall',
    },
    {
        id: '2',
        title: 'Innovation Showcase',
        description: 'Live demos of cutting-edge technology',
        time: '11:00 AM',
        duration: '60 min',
        speaker: 'Tech Leaders Panel',
        location: 'Innovation Stage',
    },
    {
        id: '3',
        title: 'AI & Machine Learning',
        description: 'Deep dive into artificial intelligence applications',
        time: '01:00 PM',
        duration: '120 min',
        speaker: 'Dr. Michael Ross',
        location: 'AI Summit',
    },
    {
        id: '4',
        title: 'Networking Reception',
        description: 'Connect with industry professionals',
        time: '05:00 PM',
        duration: '120 min',
        speaker: 'All Attendees',
        location: 'Grand Ballroom',
    },
];

export function EventSlideout({ event, onClose, userType }: EventSlideoutProps) {
    const [isSaved, setIsSaved] = useState(false);
    const [savedSessions, setSavedSessions] = useState<Set<string>>(new Set());

    const displayTags = event.tags.filter(t => t !== 'featured');
    const categoryTag = displayTags[0];
    const startDate = event.date[0] ? new Date(event.date[0]) : null;
    const endDate = event.date[1] ? new Date(event.date[1]) : null;

    const handleSaveEvent = () => {
        if (!userType) {
            alert('Please login to save events');
            return;
        }
        setIsSaved(!isSaved);
    };

    const handleSaveSession = (sessionId: string) => {
        if (!userType) {
            alert('Please login to save sessions');
            return;
        }
        setSavedSessions(prev => {
            const next = new Set(prev);
            if (next.has(sessionId)) {
                next.delete(sessionId);
            } else {
                next.add(sessionId);
            }
            return next;
        });
    };

    return (
        <>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />

            {/* Panel */}
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 bottom-0 w-full md:w-[600px] lg:w-[800px] bg-background shadow-2xl z-[70] overflow-hidden border-l border-border"
            >
                <div className="h-full flex flex-col">

                    {/* Header Image */}
                    <div className="relative h-64 overflow-hidden shrink-0">
                        <ImageWithFallback
                            alt={event.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/50 to-transparent" />

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors backdrop-blur-sm"
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>

                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            {categoryTag && (
                                <Badge variant="outline" className="mb-2 border-primary text-primary font-bold uppercase text-[10px]">
                                    {categoryTag}
                                </Badge>
                            )}
                            <h2 className="text-4xl font-black text-foreground mb-2 uppercase tracking-tight">{event.title}</h2>
                            <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                {startDate && (
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4 text-secondary" />
                                        <span>
                                            {startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                            {endDate && ` - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                                        </span>
                                    </div>
                                )}
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4 text-secondary" />
                                    <span>{event.location}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="px-6 py-4 border-b border-border shrink-0">
                        <Button
                            onClick={handleSaveEvent}
                            className={`w-full font-bold uppercase tracking-wider ${
                                isSaved
                                    ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                                    : 'bg-card hover:bg-muted text-secondary border border-secondary'
                            }`}
                        >
                            {isSaved ? (
                                <><BookmarkCheck className="w-4 h-4 mr-2" />Saved to Calendar</>
                            ) : (
                                <><Bookmark className="w-4 h-4 mr-2" />Save Event</>
                            )}
                        </Button>
                    </div>

                    {/* Tabs */}
                    <ScrollArea className="flex-1">
                        <div className="p-6">
                            <Tabs defaultValue="overview" className="w-full">
                                <TabsList className="grid w-full grid-cols-3 bg-card p-1">
                                    <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold uppercase text-[10px]">
                                        Overview
                                    </TabsTrigger>
                                    <TabsTrigger value="schedule" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold uppercase text-[10px]">
                                        Schedule
                                    </TabsTrigger>
                                    <TabsTrigger value="location" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold uppercase text-[10px]">
                                        Location
                                    </TabsTrigger>
                                </TabsList>

                                {/* Overview */}
                                <TabsContent value="overview" className="mt-6 space-y-6">
                                    <div>
                                        <h3 className="text-lg font-black text-foreground mb-3 uppercase tracking-tight">About This Event</h3>
                                        <p className="text-muted-foreground leading-relaxed text-sm">{event.description}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-foreground mb-3 uppercase tracking-tight">Event Details</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-start gap-3 p-4 bg-card rounded-lg border-l-4 border-secondary">
                                                <MapPin className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                                                <div>
                                                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Location</p>
                                                    <p className="text-sm font-bold text-foreground uppercase">{event.location}</p>
                                                </div>
                                            </div>
                                            {startDate && (
                                                <div className="flex items-start gap-3 p-4 bg-card rounded-lg border-l-4 border-primary">
                                                    <Calendar className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                                                    <div>
                                                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Dates</p>
                                                        <p className="text-sm font-bold text-foreground uppercase">
                                                            {startDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                                            {endDate && ` – ${endDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </TabsContent>

                                {/* Schedule */}
                                <TabsContent value="schedule" className="mt-6 space-y-4">
                                    <h3 className="text-lg font-black text-foreground uppercase tracking-tight">Event Schedule</h3>
                                    {mockSessions.map((session) => (
                                        <motion.div
                                            key={session.id}
                                            whileHover={{ x: 4 }}
                                            className="p-4 bg-card rounded-lg border border-border hover:border-secondary transition-colors"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Badge variant="outline" className="border-secondary text-secondary font-bold text-[10px]">
                                                            <Clock className="w-3 h-3 mr-1" />
                                                            {session.time}
                                                        </Badge>
                                                        <Badge variant="outline" className="border-border text-muted-foreground font-bold text-[10px]">
                                                            {session.duration}
                                                        </Badge>
                                                    </div>
                                                    <h4 className="font-black text-foreground mb-1 uppercase tracking-tight">{session.title}</h4>
                                                    <p className="text-xs text-muted-foreground mb-2">{session.description}</p>
                                                    <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                                        <span className="flex items-center gap-1"><Users className="w-3 h-3" />{session.speaker}</span>
                                                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{session.location}</span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleSaveSession(session.id)}
                                                    className="p-2 hover:bg-muted rounded-lg transition-colors shrink-0"
                                                >
                                                    {savedSessions.has(session.id)
                                                        ? <BookmarkCheck className="w-5 h-5 text-secondary" />
                                                        : <Bookmark className="w-5 h-5 text-muted-foreground" />
                                                    }
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </TabsContent>

                                {/* Location */}
                                <TabsContent value="location" className="mt-6 space-y-6">
                                    <div>
                                        <h3 className="text-lg font-black text-foreground mb-3 uppercase tracking-tight">Venue</h3>
                                        <div className="p-4 bg-card rounded-lg border border-border">
                                            <p className="font-black text-foreground mb-1 uppercase tracking-tight">{event.location}</p>
                                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Las Vegas, NV</p>
                                        </div>
                                    </div>

                                    <div className="bg-card rounded-lg border border-border overflow-hidden h-64 flex items-center justify-center relative">
                                        <div className="absolute inset-0 bg-primary/5" />
                                        <div className="text-center text-muted-foreground relative">
                                            <MapPin className="w-12 h-12 mx-auto mb-2 text-primary" />
                                            <p className="text-xs font-bold uppercase tracking-widest">Interactive map will be displayed here</p>
                                        </div>
                                    </div>

                                    <Button className="w-full font-bold uppercase tracking-widest h-12">
                                        Get Directions
                                        <ChevronRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </ScrollArea>
                </div>
            </motion.div>
        </>
    );
}
