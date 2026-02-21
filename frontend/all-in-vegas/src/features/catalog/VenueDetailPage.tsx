import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Clock, MapPin, Bookmark, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { catalogVenues, catalogEvents } from './mockData';
import { useAppContext } from '@/context/AppContext';

export function VenueDetailPage() {
    const { venueId } = useParams<{ venueId: string }>();
    const navigate = useNavigate();
    const { toggleSaveVenue, isVenueSaved, userType } = useAppContext();

    const venue = catalogVenues.find((v) => v.venueID === venueId);
    const parentEvent = venue ? catalogEvents.find((e) => e.id === venue.eventID) : null;
    const saved = venue ? isVenueSaved(venue.venueID) : false;

    if (!venue) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
                <p className="text-[#94a3b8] font-bold uppercase tracking-widest">Venue not found</p>
                <Button
                    onClick={() => navigate('/catalog')}
                    className="bg-[#ffb703] text-[#0f0f1a] font-bold uppercase tracking-widest hover:bg-[#ffb703]/90"
                >
                    Back to Catalog
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            <div className="pt-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">

                {/* Back nav */}
                <div className="flex items-center gap-2 mb-8 text-[#94a3b8]">
                    <button
                        onClick={() => navigate('/catalog')}
                        className="flex items-center gap-2 hover:text-[#ffb703] transition-colors text-[10px] font-bold uppercase tracking-widest"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Catalog
                    </button>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white truncate">
                        {venue.title}
                    </span>
                </div>

                {/* Hero block */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="mb-10"
                >
                    <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight leading-none mb-4">
                        {venue.title}
                    </h1>
                    <div className="h-1 w-20 bg-[#ffb703] mb-6" />

                    {/* Key facts grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        <div className="bg-card border border-border rounded-xl p-4 border-l-2 border-l-[#ffb703]">
                            <div className="flex items-center gap-2 mb-1">
                                <Clock className="w-4 h-4 text-[#ffb703]" />
                                <span className="text-[9px] font-bold uppercase tracking-widest text-[#94a3b8]">Time</span>
                            </div>
                            <p className="text-sm font-black text-white uppercase">{venue.time}</p>
                        </div>

                        <div className="bg-card border border-border rounded-xl p-4 border-l-2 border-l-[#ffb703]">
                            <div className="flex items-center gap-2 mb-1">
                                <MapPin className="w-4 h-4 text-[#ffb703]" />
                                <span className="text-[9px] font-bold uppercase tracking-widest text-[#94a3b8]">Coordinates</span>
                            </div>
                            <p className="text-sm font-black text-white font-mono">
                                ({venue.location.x1}, {venue.location.y1})
                            </p>
                        </div>
                    </div>

                    {/* Save button */}
                    <Button
                        onClick={() => {
                            if (!userType) { navigate('/login'); return; }
                            if (venue && parentEvent) toggleSaveVenue(venue, parentEvent);
                        }}
                        className={`border font-bold uppercase tracking-widest h-12 px-8 transition-colors ${
                            saved
                                ? 'bg-[#ffb703]/10 border-[#ffb703] text-[#ffb703]'
                                : 'bg-card border-[#ffb703]/40 text-[#ffb703] hover:bg-[#ffb703]/10'
                        }`}
                    >
                        <Bookmark className="w-4 h-4 mr-2" fill={saved ? 'currentColor' : 'none'} />
                        {saved ? 'Saved' : 'Save Venue'}
                    </Button>
                </motion.div>

                {/* About */}
                <motion.section
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.1 }}
                    className="mb-10"
                >
                    <h2 className="text-lg font-black text-white uppercase tracking-tight mb-3">About This Venue</h2>
                    <p className="text-[#94a3b8] leading-relaxed text-sm">{venue.description}</p>
                </motion.section>

                {/* Parent convention */}
                {parentEvent && (
                    <motion.section
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.2 }}
                        className="mb-10"
                    >
                        <h2 className="text-lg font-black text-white uppercase tracking-tight mb-3">Part of Convention</h2>
                        <motion.div
                            whileHover={{ x: 4 }}
                            onClick={() => navigate(`/catalog/convention/${parentEvent.id}`)}
                            className="bg-card border border-border hover:border-[#ffb703] rounded-xl p-5 cursor-pointer transition-all group flex items-center justify-between gap-4"
                        >
                            <div>
                                <Badge className="bg-[#e63946]/10 text-[#e63946] border border-[#e63946]/30 font-bold uppercase text-[8px] tracking-widest mb-2">
                                    {parentEvent.category}
                                </Badge>
                                <h3 className="font-black text-white uppercase tracking-tight">{parentEvent.title}</h3>
                                <div className="flex flex-wrap gap-3 mt-2 text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3 text-[#ffb703]" />
                                        {parentEvent.location}
                                    </span>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-[#94a3b8] group-hover:text-[#ffb703] transition-colors flex-shrink-0" />
                        </motion.div>
                    </motion.section>
                )}
            </div>
        </div>
    );
}
