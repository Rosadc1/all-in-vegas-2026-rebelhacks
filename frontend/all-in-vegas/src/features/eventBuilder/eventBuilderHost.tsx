import { VenueMap } from "./venueMarkerForm/venueMap";
import { EventForm } from "./eventForm/eventForm";
import { LoadScript, type Libraries } from "@react-google-maps/api";
import { googleMapsAPIKey } from "@/global/googleMapAPI";
import { useState } from "react";

const libraries:Libraries = ["places"];


export default function EventBuilderHost() {
    const [chosenLocation, setChosenLocation] = useState<{ lat: number; lng: number } | null>(null);

    return (
        <LoadScript googleMapsApiKey={googleMapsAPIKey} libraries={libraries}>
            <div className="flex flex-col gap-10">
                <EventForm setChosenLocation={(location: {lat: number; lng: number}) => setChosenLocation({lat: location.lat, lng: location.lng})}/>
                <VenueMap chosenLat={chosenLocation?.lat} chosenLng={chosenLocation?.lng}/>
            </div>
        </LoadScript>
        
    )
}
