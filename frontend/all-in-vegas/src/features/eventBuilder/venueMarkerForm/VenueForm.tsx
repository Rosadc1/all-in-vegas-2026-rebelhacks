import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';

export interface VenueFormData {
    title: string;
    description: string;
    time: string;
}

interface VenueFormProps {
    onAddVenue: (venue: VenueFormData, location: { lat: number; lng: number; x1: number; x2: number; y1: number; y2: number }) => void;
    selectedLocation: { lat: number; lng: number } | null;
    isDisabled?: boolean;
}

export function VenueForm({ onAddVenue, selectedLocation, isDisabled = false }: VenueFormProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !description || !time || !selectedLocation) {
            alert('Please fill in all fields and select a location on the map');
            return;
        }

        // Create bounding box around selected location (roughly 1km radius)
        const latOffset = 0.01; // approximately 1km
        const lngOffset = 0.01;

        onAddVenue(
            { title, description, time },
            {
                lat: selectedLocation.lat,
                lng: selectedLocation.lng,
                x1: selectedLocation.lng - lngOffset,
                x2: selectedLocation.lng + lngOffset,
                y1: selectedLocation.lat - latOffset,
                y2: selectedLocation.lat + latOffset,
            }
        );

        // Reset form
        setTitle('');
        setDescription('');
        setTime('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border rounded-lg">
            <h3 className="text-lg font-semibold">Add Venue</h3>

            {!selectedLocation && (
                <p className="text-sm text-amber-600 font-medium">Click on the map to select a location first</p>
            )}

            <Field>
                <FieldLabel>Venue Title</FieldLabel>
                <Input
                    type="text"
                    placeholder="e.g., Main Hall"
                    className='border-4-primary'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isDisabled}
                />
            </Field>

            <Field>
                <FieldLabel>Venue Description</FieldLabel>
                <Input
                    type="text"
                    placeholder="e.g., Main conference hall for keynotes"
                    value={description}
                    className='border-4-primary'
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={isDisabled}
                />
            </Field>

            <Field>
                <FieldLabel>Time</FieldLabel>
                <Input
                    type="datetime-local"
                    value={time}
                    className='border-4-primary'
                    onChange={(e) => setTime(e.target.value)}
                    disabled={isDisabled}
                />
            </Field>

            {selectedLocation && (
                <p className="text-sm text-gray-600">
                    Selected: {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                </p>
            )}

            <Button type="submit" disabled={!selectedLocation || isDisabled}>
                Add Venue
            </Button>
        </form>
    );
}
