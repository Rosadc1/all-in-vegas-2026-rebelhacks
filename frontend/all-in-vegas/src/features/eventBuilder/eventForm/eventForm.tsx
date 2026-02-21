import { StandaloneSearchBox } from '@react-google-maps/api';
import { Input } from '@/components/ui/input';
import { googleMapLasVegasBoundaries } from '@/global/googleMapBoundaries';
import { useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DatePickerWithRange } from './dateRangePicker';
import { Field, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';

interface EventFormProps {
    setChosenLocation?: (location: { lat: number; lng: number }) => void;
}

export function EventForm({setChosenLocation }: EventFormProps) { 
    const searchBoxRef = useRef<any>(null);   
    
    const handleOnLoad = (ref: any) => {
        searchBoxRef.current = ref;
    }
    
    const handleOnPlacesChanged = () => {
        if (searchBoxRef.current) {
            const places = searchBoxRef.current.getPlaces();
            console.log(places[0].geometry.location.lat(), places[0].geometry.location.lng());
            if (setChosenLocation) {
                setChosenLocation({
                    lat: places[0].geometry.location.lat(),
                    lng: places[0].geometry.location.lng()
                });
            }
        }
    }
    
    return (
        <Card className='w-1/2 self-center mt-10 min-w-120'>
            <CardHeader>
                <h2 className='text-2xl font-bold'>Create New Event</h2>
                <p className='text-muted-foreground'>Enter the basic information for your convention or event</p>
            </CardHeader>
            <CardContent className='flex flex-col gap-5'>
                <form className='flex flex-col gap-5'>
                    <Field>
                        <FieldLabel>Event Name*</FieldLabel>
                        <Input className="border-primary-8" type="text" placeholder="Enter your event name" />
                    </Field>
                    <Field className="border-primary-8">
                        <FieldLabel>Event Description*</FieldLabel>
                        <Textarea className="border-primary-8" placeholder="Enter your event description" />
                    </Field>
                    <DatePickerWithRange/>
                </form>
                <p>Search for Event location</p>
                <StandaloneSearchBox
                        onLoad={handleOnLoad}
                        onPlacesChanged={handleOnPlacesChanged}
                        bounds={googleMapLasVegasBoundaries}
                    >
                        <Input
                            type="text"
                            placeholder="Search for Event location"
                            className='border-primary/20 border-2 focus:border-primary/50 focus:ring-0'
                            style={{
                                boxSizing: 'border-box',
                                width: '100%',
                                height: '32px',
                                padding: '0 12px',
                                borderRadius: '3px',
                                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                                outline: 'none',
                                textOverflow: 'ellipses',
                            }}
                        />
                    </StandaloneSearchBox>
        </CardContent>
        </Card>
    );

}