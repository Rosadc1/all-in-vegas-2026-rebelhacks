import { VenueMap } from "./venueMarkerForm/venueMap";
import { EventForm, type EventFormData } from "./eventForm/eventForm";
import { LoadScript, type Libraries } from "@react-google-maps/api";
import { googleMapsAPIKey } from "@/global/googleMapAPI";
import { useState, useRef } from "react";
import { useCreateEventMutation } from "@/services/event-service";
import { useCreateVenueMutation } from "@/services/venue-service";
import { useAppContext } from "@/context/AppContext";
import { useNavigate } from "react-router";
import { routerMap } from "@/global/routerMap";
import { Button } from "@/components/ui/button";

import { LoaderCircle } from "lucide-react";
import type { Venue } from "@/types/venue-service-types";

const libraries: Libraries = ["places"];

export default function EventBuilderHost() {
    const [chosenLocation, setChosenLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [venues, setVenues] = useState<(Omit<Venue, "venueID" | "eventID"> & {id:number})[]>([]);
    const [eventCreated, setEventCreated] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [eventLoading, setEventLoading] = useState<boolean>();

    const eventFormRef = useRef<{ getEventData: () => EventFormData | null }>(null);
    const [createEvent] = useCreateEventMutation();
    const [createVenue] = useCreateVenueMutation();
    
    const navigate = useNavigate();

    const handleCreateEvent = async () => {
        try {
            setEventLoading(true)
            setError(null);
            const eventData = eventFormRef.current?.getEventData();

            if (!eventData) {
                setError("Please fill in all event details");
                return;
            }

            // Generate a simple event ID (in production, backend would do this)
            const userID = localStorage.getItem("userID");
            if(!userID){
                throw new Error("User is not logged in.");
            }
            const response = await createEvent({
                userId: userID,
                title: eventData.title,
                description: eventData.description,
                date: eventData.date,
                location: eventData.location,
            }).unwrap();
  
            if (response.status === 201) {
                setEventCreated(true);
            }
        } catch (err: any) {
            setError(err?.data?.message || "Failed to create event");
            console.error("Error creating event:", err);
        } finally { 
            setEventLoading(false);
        }
    };

    const handleSubmitAllVenues = async () => {
        if (venues.length === 0) {
            setError("Please add at least one venue");
            return;
        }

        try {
            setIsSubmitting(true);
            setError(null);
            const eventData = eventFormRef.current?.getEventData();

            if (!eventData) {
                setError("Event data not found");
                return;
            }

            const eventID = `event-${Date.now()}`; // Should match the created event ID

            // Create each venue
            for (const venue of venues) {
                await createVenue({
                    eventID,
                    title: venue.title,
                    description: venue.description,
                    time: venue.time,
                    location: venue.location,
                }).unwrap();
            }

            // Success - navigate to home or success page
            navigate(routerMap.HOME);
        } catch (err: any) {
            setError(err?.data?.message || "Failed to create venues");
            console.error("Error creating venues:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <LoadScript googleMapsApiKey={googleMapsAPIKey} libraries={libraries}>
            <div className="flex flex-col gap-10 pb-10">
                {error && (
                    <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
                        {error}
                    </div>
                )}
                <EventForm ref={eventFormRef} setChosenLocation={setChosenLocation} />
                {!eventCreated && (
                    <div className="flex justify-center">
                        <Button
                            onClick={handleCreateEvent}
                            size="lg"
                            className="px-8"
                            disabled={eventLoading}
                        >
                            { eventLoading && <LoaderCircle className="w-4 h-4 animate-spin"/>}
                            Create Event
                        </Button>
                    </div>
                )}

                {/* Step 2: Venue Map (shows after event created) */}
                {eventCreated && (
                    <>
                        <VenueMap
                            chosenLat={chosenLocation?.lat}
                            chosenLng={chosenLocation?.lng}
                            onVenuesChange={setVenues}
                            eventCreated={eventCreated}
                        />

                        <div className="flex justify-center gap-4 mb-10">
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => {
                                    setEventCreated(false);
                                    setVenues([]);
                                    navigate(routerMap.HOME);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSubmitAllVenues}
                                disabled={venues.length === 0 || isSubmitting}
                                size="lg"
                            >
                                {isSubmitting && <LoaderCircle className="w-4 h-4 animate-spin"/>}
                                {`Submit ${venues.length} Venue(s)`}
                                
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </LoadScript>
    );
}
