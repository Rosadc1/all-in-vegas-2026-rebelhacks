import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Venue } from '@/types/venue-service-types';
import type { userType } from '@/types/user-service-types';
import type { CatalogEvent } from '@/features/catalog/mockData';

export interface SavedEntry {
    venue: Venue;
    event: CatalogEvent;
}

export interface CreatedEvent {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    location: { lat: number; lng: number } | null;
}

interface AppContextType {
    userType: userType | null;
    setUserType: (type: userType | null) => void;
    savedVenues: Map<string, SavedEntry>;
    toggleSaveVenue: (venue: Venue, event: CatalogEvent) => void;
    isVenueSaved: (venueId: string) => boolean;
    createdEvents: CreatedEvent[];
    addCreatedEvent: (event: CreatedEvent) => void;
    removeCreatedEvent: (id: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

function loadSavedVenues(): Map<string, SavedEntry> {
    const userID = localStorage.getItem('userID');
    if (!userID) return new Map();
    try {
        const raw = localStorage.getItem(`savedVenues_${userID}`);
        if (!raw) return new Map();
        const entries: [string, SavedEntry][] = JSON.parse(raw);
        return new Map(entries);
    } catch {
        return new Map();
    }
}

function persistSavedVenues(venues: Map<string, SavedEntry>) {
    const userID = localStorage.getItem('userID');
    if (!userID) return;
    localStorage.setItem(`savedVenues_${userID}`, JSON.stringify(Array.from(venues.entries())));
}

function loadCreatedEvents(): CreatedEvent[] {
    const userID = localStorage.getItem('userID');
    if (!userID) return [];
    try {
        const raw = localStorage.getItem(`createdEvents_${userID}`);
        if (!raw) return [];
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

function persistCreatedEvents(events: CreatedEvent[]) {
    const userID = localStorage.getItem('userID');
    if (!userID) return;
    localStorage.setItem(`createdEvents_${userID}`, JSON.stringify(events));
}

export function AppProvider({ children }: { children: ReactNode }) {
    const [userType, setUserTypeState] = useState<userType | null>(
        () => localStorage.getItem('userType') as userType | null
    );
    const [savedVenues, setSavedVenues] = useState<Map<string, SavedEntry>>(loadSavedVenues);
    const [createdEvents, setCreatedEvents] = useState<CreatedEvent[]>(loadCreatedEvents);

    const setUserType = (type: userType | null) => {
        setUserTypeState(type);
        if (type) {
            localStorage.setItem('userType', type);
        } else {
            localStorage.removeItem('userType');
        }
    };

    const toggleSaveVenue = (venue: Venue, event: CatalogEvent) => {
        setSavedVenues(prev => {
            const next = new Map(prev);
            if (next.has(venue.venueID)) {
                next.delete(venue.venueID);
            } else {
                next.set(venue.venueID, { venue, event });
            }
            persistSavedVenues(next);
            return next;
        });
    };

    const isVenueSaved = (venueId: string) => savedVenues.has(venueId);

    const addCreatedEvent = (event: CreatedEvent) => {
        setCreatedEvents(prev => {
            const next = [...prev, event];
            persistCreatedEvents(next);
            return next;
        });
    };

    const removeCreatedEvent = (id: string) => {
        setCreatedEvents(prev => {
            const next = prev.filter(e => e.id !== id);
            persistCreatedEvents(next);
            return next;
        });
    };

    return (
        <AppContext.Provider value={{ userType, setUserType, savedVenues, toggleSaveVenue, isVenueSaved, createdEvents, addCreatedEvent, removeCreatedEvent }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useAppContext must be used within AppProvider');
    return ctx;
}
