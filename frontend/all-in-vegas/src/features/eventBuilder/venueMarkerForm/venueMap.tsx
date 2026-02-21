import { GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api';
import { defaultZoomLevel, googleMapLasVegasBoundaries, lasVegasCenter} from '@/global/googleMapBoundaries';
import { useEffect } from 'react';
const API_KEY = '';

export function VenueMap() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: API_KEY,
    });
    useEffect(() => { 
        console.log("Map loaded:", isLoaded);
    }, [isLoaded]);
    return(
        isLoaded && (<GoogleMap
                mapContainerStyle={{ width: '100%', height: '400px' }}
                center={lasVegasCenter}
                zoom={defaultZoomLevel}
                options={{
                    restriction: {
                        latLngBounds: googleMapLasVegasBoundaries,
                        strictBounds: true
                    }
                }}
            ></GoogleMap>)
    );
}