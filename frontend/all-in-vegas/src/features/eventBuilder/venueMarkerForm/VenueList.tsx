import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import type { Venue } from '@/types/venue-service-types';

interface VenueListProps {
    venues: (Omit<Venue, "venueID" | "eventID"> & {id:number})[];
    onRemoveVenue: (id: string | number) => void;
}

export function VenueList({ venues, onRemoveVenue }: VenueListProps) {
    if (venues.length === 0) {
        return (
            <div className="p-4 text-center text-gray-500">
                No venues added yet. Click on the map and fill the form to add venues.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Venues to Create ({venues.length})</h3>
            {venues.map((venue) => (
                <Card key={venue.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                        <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                                <h4 className="font-semibold text-base">{venue.title}</h4>
                                <p className="text-sm text-gray-300 mt-1">{venue.description}</p>
                                <p className="text-xs text-gray-300 mt-2">
                                    Time: {new Date(venue.time).toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-300 mt-1">
                                    Location: ({venue.location.x.toFixed(4)}, {venue.location.y.toFixed(4)})
                                </p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onRemoveVenue(venue.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
