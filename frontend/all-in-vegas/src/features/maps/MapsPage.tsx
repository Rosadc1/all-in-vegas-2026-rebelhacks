import { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { googleMapLasVegasBoundaries, lasVegasCenter } from '@/global/googleMapBoundaries';
import { googleMapsAPIKey } from '@/global/googleMapAPI';
import { catalogVenues, catalogEvents } from '@/features/catalog/mockData';

const LIBRARIES: ('places')[] = ['places'];
const MAP_ZOOM = 12;

export function MapsPage() {
    const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: googleMapsAPIKey,
        libraries: LIBRARIES,
    });

    const selectedVenue = selectedVenueId
        ? catalogVenues.find(v => v.venueID === selectedVenueId)
        : null;
    const selectedEvent = selectedVenue
        ? catalogEvents.find(e => e.id === selectedVenue.eventID)
        : null;

    return (
        <div className="min-h-screen bg-background pb-20">
            <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto">

                {/* Header */}
                <div className="mb-6">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-black mb-1 block">
                        Las Vegas
                    </span>
                    <h1 className="text-4xl font-black uppercase tracking-tight">Event Map</h1>
                    <div className="h-1 w-20 bg-secondary mt-2 mb-4" />
                    <p className="text-muted-foreground text-sm font-medium">
                        Find convention venues and session locations across the city.
                    </p>
                </div>

                {/* Map */}
                <div className="rounded-2xl overflow-hidden border border-border" style={{ height: '60vh' }}>
                    {isLoaded ? (
                        <GoogleMap
                            mapContainerStyle={{ width: '100%', height: '100%' }}
                            center={lasVegasCenter}
                            zoom={MAP_ZOOM}
                            options={{
                                restriction: {
                                    latLngBounds: googleMapLasVegasBoundaries,
                                    strictBounds: true,
                                },
                            }}
                        >
                            {catalogVenues.map((venue) => {
                                const isSelected = venue.venueID === selectedVenueId;
                                return (
                                    <Marker
                                        key={venue.venueID}
                                        position={{ lat: venue.location.x, lng: venue.location.y }}
                                        onClick={() =>
                                            setSelectedVenueId(isSelected ? null : venue.venueID)
                                        }
                                        icon={isSelected ? {
                                            url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
                                            scaledSize: new window.google.maps.Size(48, 48),
                                        } : undefined}
                                        zIndex={isSelected ? 10 : 1}
                                    />
                                );
                            })}
                        </GoogleMap>
                    ) : (
                        <div className="w-full h-full bg-card flex items-center justify-center">
                            <p className="text-muted-foreground text-sm font-bold uppercase tracking-wider">
                                Loading map...
                            </p>
                        </div>
                    )}
                </div>

                {/* Selected venue callout */}
                {selectedVenue && selectedEvent && (
                    <div className="mt-4 p-4 bg-card rounded-xl border border-secondary">
                        <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                            <div>
                                <Badge className="font-bold uppercase text-[8px] tracking-widest mb-1">
                                    {selectedEvent.category}
                                </Badge>
                                <h3 className="text-base font-black uppercase tracking-tight">
                                    {selectedVenue.title}
                                </h3>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {selectedVenue.description}
                                </p>
                                <p className="text-[10px] font-bold text-secondary uppercase tracking-wider mt-2">
                                    {selectedEvent.title} · {selectedVenue.time}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Convention + venue list */}
                <div className="mt-8">
                    <h2 className="text-lg font-black uppercase tracking-tight mb-4">All Locations</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {catalogEvents.map((event) => {
                            const venues = catalogVenues.filter(v => v.eventID === event.id);
                            return (
                                <div key={event.id} className="bg-card rounded-xl border border-border p-4">
                                    <Badge className="font-bold uppercase text-[8px] tracking-widest mb-2">
                                        {event.category}
                                    </Badge>
                                    <h3 className="text-sm font-black uppercase tracking-tight mb-1">
                                        {event.title}
                                    </h3>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1 mb-3">
                                        <MapPin className="w-3 h-3 text-secondary" />
                                        {event.location}
                                    </p>
                                    <div className="space-y-1.5">
                                        {venues.map((venue) => (
                                            <button
                                                key={venue.venueID}
                                                onClick={() =>
                                                    setSelectedVenueId(
                                                        venue.venueID === selectedVenueId ? null : venue.venueID
                                                    )
                                                }
                                                className={`w-full text-left p-2 rounded-lg text-[10px] font-bold uppercase tracking-wide transition-colors
                                                    ${selectedVenueId === venue.venueID
                                                        ? 'bg-secondary text-secondary-foreground'
                                                        : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
                                                    }`}
                                            >
                                                {venue.title}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}
