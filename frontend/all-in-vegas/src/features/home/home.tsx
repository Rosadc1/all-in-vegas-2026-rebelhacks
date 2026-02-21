import { useState } from 'react';
import { Search, TrendingUp, Calendar as CalendarIcon, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ImageWithFallback } from '@/components/image/ImageWithFallback';
import { mockEvents } from './mockEvents';
import { EventSlideout } from './EventSlideout';
import type { Event } from '@/types/event-service-types';
import { AIChatHost } from '../chat';

export function HomePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const filteredEvents = mockEvents.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tag.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const featuredEvents = filteredEvents.filter(e => e.tag.includes('featured'));
    const upcomingEvents = filteredEvents.filter(e => !e.tag.includes('featured'));

    return (
        <div className="min-h-screen bg-background pb-20 overflow-x-hidden">
            <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto">

                {/* Hero */}
                <div className="mb-8 relative">
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10" />
                    <div className="absolute top-20 -right-20 w-60 h-60 bg-secondary/5 rounded-full blur-3xl -z-10" />
                    <div className="flex flex-col mb-2">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-black mb-1">Convention Platform</span>
                        <h1 className="text-5xl font-black mb-2 tracking-tighter">
                            <span className="text-foreground block leading-none">ALL IN</span>
                            <span className="text-secondary block leading-none">VEGAS</span>
                        </h1>
                        <div className="h-1 w-24 bg-primary mt-2 mb-4" />
                    </div>
                    <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">Schedule • Navigate • Connect</p>
                </div>

                {/* Search */}
                <div className="mb-8 flex flex-row gap-10">
                    <div className="relative max-w-2xl flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                        <Input
                            type="search"
                            placeholder="Search events..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 h-12"
                        />
                    </div>
                    <AIChatHost/>
                </div>

                {/* Featured Events */}
                {featuredEvents.length > 0 && (
                    <div className="mb-12">
                        <div className="flex items-center gap-2 mb-4">
                            <TrendingUp className="w-5 h-5 text-secondary" />
                            <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">Featured Events</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {featuredEvents.map((event) => {
                                const displayTag = event.tag.find(t => t !== 'featured') ?? event.tag[0];
                                return (
                                    <motion.div
                                        key={event.eventID}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        onClick={() => setSelectedEvent(event)}
                                        className="bg-card rounded-xl overflow-hidden cursor-pointer border border-border hover:border-secondary transition-all group relative"
                                    >
                                        <div className="absolute top-0 left-0 w-1 h-full bg-primary z-10" />
                                        <div className="relative h-64 overflow-hidden">
                                            <ImageWithFallback
                                                alt={event.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                                            <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground border-none font-bold uppercase text-[10px]">
                                                Featured
                                            </Badge>
                                            <div className="absolute bottom-4 left-6 right-4">
                                                <Badge variant="outline" className="mb-2 border-primary text-primary font-bold uppercase text-[10px]">
                                                    {displayTag}
                                                </Badge>
                                                <h3 className="text-3xl font-black text-foreground mb-2 tracking-tight uppercase">{event.title}</h3>
                                                <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                                    {event.date[0] && (
                                                        <div className="flex items-center gap-1">
                                                            <CalendarIcon className="w-4 h-4 text-secondary" />
                                                            <span>{new Date(event.date[0]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                                        </div>
                                                    )}
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="w-4 h-4 text-secondary" />
                                                        <span className="truncate">{event.location}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* All Events */}
                <div className="mb-12">
                    <h2 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tight">All Events</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {upcomingEvents.map((event) => {
                            const displayTag = event.tag[0];
                            return (
                                <motion.div
                                    key={event.eventID}
                                    whileHover={{ y: -4 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedEvent(event)}
                                    className="bg-card rounded-xl overflow-hidden cursor-pointer border border-border hover:border-secondary transition-all"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <ImageWithFallback
                                            alt={event.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                                        {displayTag && (
                                            <Badge className="absolute top-3 right-3 bg-muted text-foreground border-border font-bold uppercase text-[10px]">
                                                {displayTag}
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="p-4 border-l-4 border-primary">
                                        <h3 className="font-black text-foreground mb-2 uppercase tracking-tight">{event.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{event.description}</p>
                                        <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                            {event.date[0] && (
                                                <div className="flex items-center gap-1">
                                                    <CalendarIcon className="w-3 h-3 text-secondary" />
                                                    <span>{new Date(event.date[0]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-3 h-3 text-secondary" />
                                                <span className="truncate">{event.location.split(' ')[0]}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Event Slideout */}
            <AnimatePresence>
                {selectedEvent && (
                    <EventSlideout
                        key={selectedEvent.eventID}
                        event={selectedEvent}
                        onClose={() => setSelectedEvent(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
