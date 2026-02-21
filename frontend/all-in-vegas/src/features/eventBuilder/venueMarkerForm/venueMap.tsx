import { GoogleMap, Marker} from '@react-google-maps/api';
import { defaultZoomLevel, googleMapLasVegasBoundaries} from '@/global/googleMapBoundaries';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { routerMap } from '@/global/routerMap';
import { useNavigate } from 'react-router';

interface VenueMapProps {
    isLoaded?: boolean;
    chosenLat?: number;
    chosenLng?: number;
}

export function VenueMap({ isLoaded, chosenLat, chosenLng }: VenueMapProps) {
    const useNav = useNavigate();
    if(!chosenLat || !chosenLng) {
        return(<></>);
    }

    return(
        <Card className='w-1/2 self-center mt-10 min-w-120 mb-10'>
            <CardHeader>
                <h2 className='text-2xl font-bold'>Select Event Location</h2>
                <p className='text-muted-foreground'>Search for the location of your event and select the correct one from the dropdown</p>
            </CardHeader>
            <CardContent className='flex flex-col gap-5'>
                <p>Click on the map to select your event location</p>
                <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '400px', borderRadius: '8px' }}
                        center={
                        {
                            lat: chosenLat,
                            lng: chosenLng
                        }
                        }
                        zoom={defaultZoomLevel}
                        options={{
                            restriction: {
                                latLngBounds: googleMapLasVegasBoundaries,
                                strictBounds: true
                            }
                        }}
                    ></GoogleMap>
                    <div className='flex flex-row justify-end gap-5'>
                        <Button onClick={() => useNav(routerMap.HOME)} variant="outline" type="button">Cancel</Button>
                        <Button type="submit">Submit</Button>
                    </div>
                    
            </CardContent>
        </Card>
    );
}