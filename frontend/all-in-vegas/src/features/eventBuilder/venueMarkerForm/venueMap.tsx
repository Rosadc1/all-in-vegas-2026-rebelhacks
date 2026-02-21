import { useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { defaultZoomLevel, googleMapLasVegasBoundaries } from '@/global/googleMapBoundaries';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { routerMap } from '@/global/routerMap';
import { useNavigate } from 'react-router';
import { VenueForm } from './VenueForm';
import { VenueList } from './VenueList';
import type { Venue } from '@/types/venue-service-types';

interface VenueMapProps {
    chosenLat?: number;
    chosenLng?: number;
    onVenuesChange?: (venues: (Omit<Venue, "venueID" | "eventID"> & {id:number})[]) => void;
    eventCreated?: boolean;
}

export function VenueMap({ chosenLat, chosenLng, onVenuesChange, eventCreated = false }: VenueMapProps) {
    const useNav = useNavigate();
    const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [venues, setVenues] = useState<(Omit<Venue, "venueID" | "eventID"> & {id:number})[]>([]);

    if (!chosenLat || !chosenLng) {
        return <></>;
    }

    const handleMapClick = (event: any) => {
        console.log(event);
        setSelectedLocation({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        });
    };

    const handleAddVenue = (venueData: any, location: any) => {
        const newVenue: Omit<Venue, "venueID" | "eventID"> & {id:number} = {
            id: venues.length,
            title: venueData.title,
            description: venueData.description,
            time: venueData.time,
            location: {
                x: (location.x1 + location.x2) / 2,
                y: (location.y1 + location.y2) / 2
            },
        };
        const updatedVenues = [...venues, newVenue];
        setVenues(updatedVenues);
        onVenuesChange?.(updatedVenues as (Omit<Venue, "venueID" | "eventID"> & {id:number})[]);
        setSelectedLocation(null); // Reset for next venue
    };

    const handleRemoveVenue = (id: string | number) => {
        const numId = typeof id === 'string' ? parseInt(id, 10) : id;
        const updatedVenues = venues.filter((v) => v.id !== numId);
        setVenues(updatedVenues);
        onVenuesChange?.(updatedVenues as (Omit<Venue, "venueID" | "eventID"> & {id:number})[]);
    };

    return (
        <Card className="w-1/2 min-w-120  self-center mt-10 mb-10">
            <CardHeader>
                <h2 className="text-2xl font-bold">Create Venues</h2>
                <p className="text-muted-foreground">
                    {!eventCreated
                        ? 'Create your event first to add venues'
                        : 'Click on the map to select a location, then fill out the form to add venues'}
                </p>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                {/* Map */}
                <div>
                    <p className="text-sm font-medium mb-2">Click on map to select venue location</p>
                    <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '400px', borderRadius: '8px' }}
                        center={{
                            lat: chosenLat,
                            lng: chosenLng,
                        }}
                        zoom={defaultZoomLevel}
                        onClick={handleMapClick}
                        options={{
                            restriction: {
                                latLngBounds: googleMapLasVegasBoundaries,
                                strictBounds: true,
                            },
                        }}
                    >
                        {/* Markers for selected venues */}
                        {venues.map((venue) => (
                            <Marker
                                key={venue.id}
                                position={{
                                    lat: venue.location.y,
                                    lng: venue.location.x,
                                }}
                                title={venue.title}
                            />
                        ))}

                        {/* Marker for current selected location */}
                        {selectedLocation && (
                            <Marker
                                position={{
                                    lat: selectedLocation.lat,
                                    lng: selectedLocation.lng,
                                }}
                                title="Selected Location"
                                options={{
                                    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                                }}
                            />
                        )}


                    </GoogleMap>
                </div>

                {/* Venue Form */}
                <VenueForm
                    onAddVenue={handleAddVenue}
                    selectedLocation={selectedLocation}
                    isDisabled={!eventCreated}
                />

                {/* Venue List */}
                <div className="mt-4 p-4 rounded-lg border">
                    <VenueList venues={venues} onRemoveVenue={handleRemoveVenue} />
                </div>
            </CardContent>
        </Card>
    );
}