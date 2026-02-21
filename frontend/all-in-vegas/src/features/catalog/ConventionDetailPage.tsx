import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Calendar as CalendarIcon, MapPin, Bookmark, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ImageWithFallback } from '@/components/image/ImageWithFallback';
import { catalogEvents, catalogVenues } from './mockData';

export function ConventionDetailPage() {
    const { conventionId } = useParams<{ conventionId: string }>();
    const navigate = useNavigate();

    const event = catalogEvents.find((e) => e.id === conventionId);
    const venues = catalogVenues.filter((s) => s.eventID === conventionId);

    if (!event) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
                <p className="text-[#94a3b8] font-bold uppercase tracking-widest">Convention not found</p>
                <Button
                    onClick={() => navigate('/catalog')}
                    className="bg-[#ffb703] text-[#0f0f1a] font-bold uppercase tracking-widest hover:bg-[#ffb703]/90"
                >
                    Back to Catalog
                </Button>
            </div>
        );
    }

    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

    return (
        <div className="min-h-screen bg-background pb-20">

            {/* Hero image */}
            <div className="relative h-72 sm:h-96 overflow-hidden">
                <ImageWithFallback
                    alt={event.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                {/* Back button overlaid on image */}
                <button
                    onClick={() => navigate('/catalog')}
                    className="absolute top-6 left-6 flex items-center gap-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full transition-colors text-[10px] font-bold uppercase tracking-widest text-white"
                >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Catalog
                </button>

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-8">
                    <Badge className="mb-3 bg-[#e63946] text-white border-none font-bold uppercase text-[9px] tracking-widest">
                        {event.category}
                    </Badge>
                    <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-none">
                        {event.title}
                    </h1>
                </div>
            </div>

            <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">

                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 mb-8"
                >
                    <div className="bg-card border border-border rounded-xl p-4 border-l-2 border-l-[#ffb703]">
                        <div className="flex items-center gap-2 mb-1">
                            <CalendarIcon className="w-4 h-4 text-[#ffb703]" />
                            <span className="text-[9px] font-bold uppercase tracking-widest text-[#94a3b8]">Dates</span>
                        </div>
                        <p className="text-sm font-black text-white uppercase">
                            {startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} –{' '}
                            {endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                        <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider mt-0.5">
                            {startDate.getFullYear()}
                        </p>
                    </div>

                    <div className="bg-card border border-border rounded-xl p-4 border-l-2 border-l-[#ffb703]">
                        <div className="flex items-center gap-2 mb-1">
                            <MapPin className="w-4 h-4 text-[#ffb703]" />
                            <span className="text-[9px] font-bold uppercase tracking-widest text-[#94a3b8]">Venue</span>
                        </div>
                        <p className="text-sm font-black text-white uppercase">{event.location}</p>
                        <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider mt-0.5">Las Vegas, NV</p>
                    </div>

                </motion.div>

                {/* Save button */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.05 }}
                    className="mb-10"
                >
                    <Button className="bg-card border border-[#ffb703]/40 text-[#ffb703] hover:bg-[#ffb703]/10 font-bold uppercase tracking-widest h-12 px-8">
                        <Bookmark className="w-4 h-4 mr-2" />
                        Save Convention
                    </Button>
                </motion.div>

                {/* About */}
                <motion.section
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.1 }}
                    className="mb-10"
                >
                    <h2 className="text-lg font-black text-white uppercase tracking-tight mb-1">About This Convention</h2>
                    <div className="h-0.5 w-12 bg-[#ffb703] mb-4" />
                    <p className="text-[#94a3b8] leading-relaxed text-sm">{event.description}</p>
                </motion.section>

                {/* Venues */}
                {venues.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.15 }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-lg font-black text-white uppercase tracking-tight">Scheduled Venues</h2>
                                <div className="h-0.5 w-12 bg-[#ffb703] mt-1" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">
                                <span className="text-[#ffb703]">{venues.length}</span> venues
                            </span>
                        </div>

                        <div className="space-y-3">
                            {venues.map((venue) => (
                                <motion.div
                                    key={venue.venueID}
                                    whileHover={{ x: 4 }}
                                    onClick={() => navigate(`/catalog/venue/${venue.venueID}`)}
                                    className="bg-card rounded-xl border border-border hover:border-[#ffb703] transition-all cursor-pointer relative overflow-hidden group"
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ffb703]" />
                                    <div className="p-5 pl-6">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-black text-white uppercase tracking-tight mb-2">
                                                    {venue.title}
                                                </h3>
                                                <p className="text-xs text-[#94a3b8] mb-3 line-clamp-1 leading-relaxed">
                                                    {venue.description}
                                                </p>
                                                <div className="flex flex-wrap gap-4 text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">
                                                    <span className="flex items-center gap-1.5">
                                                        <Clock className="w-3.5 h-3.5 text-[#ffb703]" />
                                                        {venue.time} · {venue.time}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <MapPin className="w-3.5 h-3.5 text-[#ffb703]" />
                                                        ({venue.location.x1}, {venue.location.y1})
                                                    </span>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-[#94a3b8] group-hover:text-[#ffb703] transition-colors flex-shrink-0 mt-1" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}
            </div>
        </div>
    );
}
