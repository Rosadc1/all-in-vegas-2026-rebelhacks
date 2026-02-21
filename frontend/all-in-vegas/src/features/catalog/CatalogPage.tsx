import { useState, useMemo, useEffect } from 'react';
import { Search, Calendar as CalendarIcon, MapPin, Clock, ChevronRight, Bookmark } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { useSearchParams, useNavigate } from 'react-router';
import { ImageWithFallback } from '@/components/image/ImageWithFallback';
import { catalogEvents, catalogVenues } from './mockData';
import { useAppContext } from '@/context/AppContext';

const categories = ['All', 'Technology', 'Fashion', 'Construction', 'Media', 'Automotive'];

interface CatalogPageProps {
    userType?: 'org' | 'customer' | null;
}

export function CatalogPage({ userType: _userType }: CatalogPageProps) {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { toggleSaveVenue, isVenueSaved, userType } = useAppContext();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [viewMode, setViewMode] = useState<'venues' | 'conventions'>('venues');

    useEffect(() => {
        const q = searchParams.get('q');
        if (q) setSearchQuery(q);
    }, [searchParams]);

    const filteredVenues = useMemo(() => {
        return catalogVenues.filter(venue => {
            const matchesSearch =
                venue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                venue.description.toLowerCase().includes(searchQuery.toLowerCase());
            const parentEvent = catalogEvents.find(e => e.id === venue.eventID);
            const matchesCategory = selectedCategory === 'All' || parentEvent?.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    const filteredConventions = useMemo(() => {
        return catalogEvents.filter(event => {
            const matchesSearch =
                event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    return (
        <div className="min-h-screen bg-background pb-20">
            <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#e63946] font-black mb-1 block">Vegas Events</span>
                    <h1 className="text-4xl font-black text-white uppercase tracking-tight">Schedule & Catalog</h1>
                    <div className="h-1 w-20 bg-[#ffb703] mt-2 mb-4" />
                    <p className="text-[#94a3b8] text-sm font-medium">Explore venues, keynotes, and conventions happening across the city.</p>
                </div>

                {/* View Switcher */}
                <div className="flex p-1 bg-card rounded-lg w-fit mb-6 border border-border">
                    <button
                        onClick={() => setViewMode('venues')}
                        className={`px-4 py-2 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all ${
                            viewMode === 'venues' ? 'bg-[#e63946] text-white' : 'text-[#94a3b8] hover:text-white'
                        }`}
                    >
                        Scheduled Venues
                    </button>
                    <button
                        onClick={() => setViewMode('conventions')}
                        className={`px-4 py-2 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all ${
                            viewMode === 'conventions' ? 'bg-[#e63946] text-white' : 'text-[#94a3b8] hover:text-white'
                        }`}
                    >
                        Full Conventions
                    </button>
                </div>

                {/* Search and Filters */}
                <div className="mb-6 space-y-4">
                    <div className="relative max-w-2xl">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#e63946]" />
                        <Input
                            type="search"
                            placeholder={
                                viewMode === 'venues'
                                    ? 'Search venues, speakers, or conventions...'
                                    : 'Search conventions...'
                            }
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 h-12 bg-card border-border text-white placeholder:text-[#94a3b8] focus:border-[#ffb703] focus:ring-1 focus:ring-[#ffb703]"
                        />
                    </div>

                    {/* Category Filters */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                variant={selectedCategory === category ? 'default' : 'outline'}
                                className={
                                    selectedCategory === category
                                        ? 'bg-[#ffb703] hover:bg-[#ffb703]/90 text-[#0f0f1a] border-none font-bold uppercase text-[10px] tracking-widest'
                                        : 'bg-card border-border text-[#94a3b8] hover:text-[#ffb703] hover:border-[#ffb703] font-bold uppercase text-[10px] tracking-widest'
                                }
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#94a3b8]">
                        Showing{' '}
                        <span className="text-[#ffb703]">
                            {viewMode === 'venues' ? filteredVenues.length : filteredConventions.length}
                        </span>{' '}
                        {viewMode}
                    </p>
                </div>

                {/* List Content */}
                <div className="space-y-4">
                    {viewMode === 'venues' ? (
                        filteredVenues.map((venue) => (
                            <motion.div
                                key={venue.venueID}
                                whileHover={{ x: 4 }}
                                onClick={() => navigate(`/catalog/venue/${venue.venueID}`)}
                                className="bg-card rounded-xl overflow-hidden cursor-pointer border border-border hover:border-[#ffb703] transition-all relative"
                            >
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ffb703]" />
                                <div className="p-5">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Badge className="bg-[#e63946]/10 text-[#e63946] border-[#e63946]/30 font-bold uppercase text-[8px] tracking-widest">
                                                    {venue.title}
                                                </Badge>
                                            </div>
                                            <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight">
                                                {venue.title}
                                            </h3>
                                            <p className="text-sm text-[#94a3b8] mb-3 line-clamp-1 leading-relaxed">
                                                {venue.description}
                                            </p>

                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                <div className="flex items-center gap-2 text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">
                                                    <Clock className="w-3.5 h-3.5 text-[#ffb703]" />
                                                    <span>
                                                        {venue.time} ({venue.time})
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">
                                                    <MapPin className="w-3.5 h-3.5 text-[#ffb703]" />
                                                    <span className="truncate">({venue.location.x1}, {venue.location.y1})</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className={`hover:bg-white/5 ${isVenueSaved(venue.venueID) ? 'text-[#ffb703]' : 'text-[#94a3b8] hover:text-[#ffb703]'}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (!userType) { navigate('/login'); return; }
                                                    const parentEvent = catalogEvents.find(ev => ev.id === venue.eventID);
                                                    if (parentEvent) toggleSaveVenue(venue, parentEvent);
                                                }}
                                            >
                                                <Bookmark className="w-5 h-5" fill={isVenueSaved(venue.venueID) ? 'currentColor' : 'none'} />
                                            </Button>
                                            <ChevronRight className="w-5 h-5 text-[#94a3b8]" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        filteredConventions.map((event) => (
                            <motion.div
                                key={event.id}
                                whileHover={{ x: 4 }}
                                onClick={() => navigate(`/catalog/convention/${event.id}`)}
                                className="bg-card rounded-xl overflow-hidden cursor-pointer border border-border hover:border-[#ffb703] transition-all group"
                            >
                                <div className="flex flex-col sm:flex-row gap-4 p-4">
                                    <div className="relative w-full sm:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                                        <ImageWithFallback
                                            alt={event.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/40" />
                                        <Badge className="absolute top-2 left-2 bg-[#e63946] text-white border-none font-bold uppercase text-[8px] tracking-tighter">
                                            {event.category}
                                        </Badge>
                                    </div>

                                    <div className="flex-1 min-w-0 sm:pl-2">
                                        <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight">
                                            {event.title}
                                        </h3>
                                        <p className="text-sm text-[#94a3b8] mb-3 line-clamp-2 leading-relaxed">
                                            {event.description}
                                        </p>

                                        <div className="flex flex-wrap gap-4 text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">
                                            <div className="flex items-center gap-1.5">
                                                <CalendarIcon className="w-4 h-4 text-[#ffb703]" />
                                                <span>
                                                    {new Date(event.startDate).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                    })}{' '}
                                                    –{' '}
                                                    {new Date(event.endDate).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    })}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="w-4 h-4 text-[#ffb703]" />
                                                <span className="truncate">{event.location}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center self-center">
                                        <ChevronRight className="w-5 h-5 text-[#94a3b8] group-hover:text-[#ffb703] transition-colors" />
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>

                {(viewMode === 'venues' ? filteredVenues.length : filteredConventions.length) === 0 && (
                    <div className="text-center py-20 bg-card/50 rounded-2xl border border-dashed border-border">
                        <Search className="w-12 h-12 text-[#94a3b8] mx-auto mb-4 opacity-20" />
                        <p className="text-[#94a3b8] text-lg font-bold uppercase tracking-widest">No results found</p>
                        <Button
                            variant="link"
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory('All');
                            }}
                            className="text-[#ffb703] mt-2 font-bold uppercase text-xs"
                        >
                            Clear all filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
