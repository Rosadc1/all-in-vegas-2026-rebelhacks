import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, BookmarkX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppContext } from '@/context/AppContext';
import { useNavigate } from 'react-router';
import type { SavedEntry } from '@/context/AppContext';

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

export function CalendarPage() {
    const { savedVenues, toggleSaveVenue } = useAppContext();
    const navigate = useNavigate();

    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedDay, setSelectedDay] = useState<number | null>(null);

    const savedEntries: SavedEntry[] = Array.from(savedVenues.values());

    // Calendar grid: array of day numbers (or null for padding)
    const calendarDays = useMemo(() => {
        const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const days: (number | null)[] = [];
        for (let i = 0; i < firstDayOfWeek; i++) days.push(null);
        for (let d = 1; d <= daysInMonth; d++) days.push(d);
        while (days.length % 7 !== 0) days.push(null);
        return days;
    }, [currentMonth, currentYear]);

    // Returns saved entries whose parent event spans the given day
    const getEntriesForDay = (day: number): SavedEntry[] => {
        const date = new Date(currentYear, currentMonth, day);
        date.setHours(12, 0, 0, 0);
        return savedEntries.filter(({ event }) => {
            const start = new Date(event.startDate);
            const end = new Date(event.endDate);
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
            return date >= start && date <= end;
        });
    };

    const prevMonth = () => {
        if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
        else setCurrentMonth(m => m - 1);
        setSelectedDay(null);
    };

    const nextMonth = () => {
        if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
        else setCurrentMonth(m => m + 1);
        setSelectedDay(null);
    };

    // Timeline: group saved venues by parent event, sorted by event start date
    const timelineGroups = useMemo(() => {
        const groups = new Map<string, { eventId: string; eventTitle: string; eventLocation: string; startDate: string; endDate: string; category: string; venues: SavedEntry[] }>();
        for (const entry of savedEntries) {
            const { event } = entry;
            if (!groups.has(event.id)) {
                groups.set(event.id, {
                    eventId: event.id,
                    eventTitle: event.title,
                    eventLocation: event.location,
                    startDate: event.startDate,
                    endDate: event.endDate,
                    category: event.category,
                    venues: [],
                });
            }
            groups.get(event.id)!.venues.push(entry);
        }
        return Array.from(groups.values()).sort(
            (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
    }, [savedEntries]);

    const selectedDayEntries = selectedDay !== null ? getEntriesForDay(selectedDay) : [];

    return (
        <div className="min-h-screen bg-background pb-20">
            <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto">

                {/* Page header */}
                <div className="mb-8">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-black mb-1 block">Personal</span>
                    <h1 className="text-4xl font-black text-foreground uppercase tracking-tight">My Schedule</h1>
                    <div className="h-1 w-20 bg-secondary mt-2 mb-4" />
                    <p className="text-muted-foreground text-sm font-medium uppercase tracking-wide">
                        Your saved sessions and personal convention calendar.
                    </p>
                </div>

                {savedEntries.length === 0 ? (
                    <div className="text-center py-24 bg-card/50 rounded-2xl border border-dashed border-border">
                        <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-20" />
                        <p className="text-muted-foreground text-lg font-black uppercase tracking-widest mb-2">No saved venues yet</p>
                        <p className="text-muted-foreground text-sm mb-6">
                            Browse events, open a session, and tap the bookmark to build your schedule.
                        </p>
                        <Button
                            onClick={() => navigate('/')}
                            className="font-bold uppercase tracking-wider"
                        >
                            Browse Events
                        </Button>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">

                        {/* ── Calendar ── */}
                        <div className="bg-card rounded-2xl border border-border overflow-hidden">

                            {/* Month navigation */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                                <button
                                    onClick={prevMonth}
                                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5 text-foreground" />
                                </button>
                                <h2 className="text-xl font-black text-foreground uppercase tracking-tight">
                                    {MONTH_NAMES[currentMonth]} {currentYear}
                                </h2>
                                <button
                                    onClick={nextMonth}
                                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                                >
                                    <ChevronRight className="w-5 h-5 text-foreground" />
                                </button>
                            </div>

                            {/* Day-of-week labels */}
                            <div className="grid grid-cols-7 border-b border-border/50">
                                {DAY_LABELS.map(d => (
                                    <div
                                        key={d}
                                        className="py-2 text-center text-[10px] font-black text-muted-foreground uppercase tracking-widest"
                                    >
                                        {d}
                                    </div>
                                ))}
                            </div>

                            {/* Day cells */}
                            <div className="grid grid-cols-7">
                                {calendarDays.map((day, idx) => {
                                    if (day === null) {
                                        return (
                                            <div
                                                key={`pad-${idx}`}
                                                className={`min-h-[88px] border-b border-border/20 ${(idx + 1) % 7 !== 0 ? 'border-r' : ''}`}
                                            />
                                        );
                                    }

                                    const dayEntries = getEntriesForDay(day);
                                    const hasEntries = dayEntries.length > 0;
                                    const isToday =
                                        day === today.getDate() &&
                                        currentMonth === today.getMonth() &&
                                        currentYear === today.getFullYear();
                                    const isSelected = day === selectedDay;

                                    // Collect unique event titles for dots
                                    const uniqueEvents = [...new Map(dayEntries.map(e => [e.event.id, e.event])).values()];

                                    return (
                                        <motion.div
                                            key={day}
                                            onClick={() => hasEntries && setSelectedDay(isSelected ? null : day)}
                                            whileHover={hasEntries ? { backgroundColor: 'hsl(var(--muted)/0.4)' } : {}}
                                            className={`min-h-[88px] p-2 border-b border-border/20 transition-colors relative select-none
                                                ${(idx + 1) % 7 !== 0 ? 'border-r' : ''}
                                                ${hasEntries ? 'cursor-pointer' : ''}
                                                ${isSelected ? 'bg-primary/8' : ''}
                                            `}
                                        >
                                            {/* Day number */}
                                            <div className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold mb-1 mx-auto
                                                ${isToday ? 'bg-secondary text-secondary-foreground' : ''}
                                                ${isSelected && !isToday ? 'bg-primary text-primary-foreground' : ''}
                                                ${!isToday && !isSelected ? 'text-foreground' : ''}
                                            `}>
                                                {day}
                                            </div>

                                            {/* Event pills */}
                                            {hasEntries && (
                                                <div className="space-y-0.5">
                                                    {uniqueEvents.slice(0, 2).map(event => (
                                                        <div
                                                            key={event.id}
                                                            className="text-[8px] font-bold text-primary bg-primary/10 rounded px-1 py-0.5 truncate leading-tight"
                                                        >
                                                            {event.title}
                                                        </div>
                                                    ))}
                                                    {uniqueEvents.length > 2 && (
                                                        <div className="text-[8px] font-bold text-muted-foreground px-1">
                                                            +{uniqueEvents.length - 2} more
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Selected-day session list */}
                            <AnimatePresence>
                                {selectedDay !== null && selectedDayEntries.length > 0 && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden border-t border-border bg-muted/20"
                                    >
                                        <div className="p-5">
                                            <h3 className="text-xs font-black text-foreground uppercase tracking-tight mb-3">
                                                {MONTH_NAMES[currentMonth]} {selectedDay} — My Sessions
                                            </h3>
                                            <div className="space-y-2">
                                                {selectedDayEntries.map(({ venue, event }) => (
                                                    <motion.div
                                                        key={venue.venueID}
                                                        initial={{ opacity: 0, x: -8 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        onClick={() => navigate(`/catalog/venue/${venue.venueID}`)}
                                                        className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border hover:border-secondary transition-colors cursor-pointer"
                                                    >
                                                        <div className="w-0.5 h-8 bg-secondary rounded-full shrink-0" />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-xs font-black text-foreground uppercase truncate">{venue.title}</p>
                                                            <p className="text-[10px] text-muted-foreground font-bold uppercase">{venue.time} · {event.title}</p>
                                                        </div>
                                                        <Badge variant="outline" className="border-secondary text-secondary text-[10px] font-bold shrink-0">
                                                            {venue.time}
                                                        </Badge>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* ── Timeline ── */}
                        <div className="sticky top-20">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-black text-foreground uppercase tracking-tight">Saved Sessions</h2>
                                <Badge variant="outline" className="border-secondary text-secondary font-bold text-[10px]">
                                    {savedEntries.length} saved
                                </Badge>
                            </div>

                            <ScrollArea className="h-[calc(100vh-14rem)]">
                                <div className="space-y-8 pr-2">
                                    {timelineGroups.map((group, groupIdx) => (
                                        <div key={group.eventId} className="relative">

                                            {/* Vertical connector line */}
                                            {groupIdx < timelineGroups.length - 1 && (
                                                <div className="absolute left-[5px] top-8 bottom-[-2rem] w-px bg-border" />
                                            )}

                                            {/* Event header row */}
                                            <div className="flex items-start gap-3 mb-3">
                                                <div className="w-3 h-3 rounded-full bg-secondary shrink-0 mt-1 ring-2 ring-background" />
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-[10px] font-black text-secondary uppercase tracking-widest mb-0.5">
                                                        {new Date(group.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                        {' – '}
                                                        {new Date(group.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </div>
                                                    <h3 className="text-sm font-black text-foreground uppercase tracking-tight truncate">{group.eventTitle}</h3>
                                                    <p className="text-[10px] text-muted-foreground font-bold uppercase flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" />
                                                        {group.eventLocation}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Venue cards */}
                                            <div className="ml-6 space-y-2">
                                                {group.venues.map(({ venue, event }) => (
                                                    <motion.div
                                                        key={venue.venueID}
                                                        whileHover={{ x: 4 }}
                                                        className="p-3 bg-card rounded-lg border border-border hover:border-secondary transition-colors group relative overflow-hidden"
                                                    >
                                                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary" />
                                                        <div className="flex items-start gap-2 pl-2">
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center gap-1.5 mb-1">
                                                                    <Clock className="w-3 h-3 text-secondary shrink-0" />
                                                                    <span className="text-[10px] font-black text-secondary uppercase">{venue.time}</span>
                                                                </div>
                                                                <p
                                                                    onClick={() => navigate(`/catalog/venue/${venue.venueID}`)}
                                                                    className="text-xs font-black text-foreground uppercase cursor-pointer hover:text-secondary transition-colors truncate"
                                                                >
                                                                    {venue.title}
                                                                </p>
                                                                <p className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">{venue.description}</p>
                                                            </div>
                                                            <button
                                                                onClick={() => toggleSaveVenue(venue, event)}
                                                                title="Remove from schedule"
                                                                className="p-1.5 hover:bg-muted rounded transition-colors shrink-0 opacity-0 group-hover:opacity-100"
                                                            >
                                                                <BookmarkX className="w-4 h-4 text-muted-foreground hover:text-destructive transition-colors" />
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
