import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Venue } from '@/types/venue-service-types';
import type { userType } from '@/types/user-service-types';
import type { CatalogEvent } from '@/features/catalog/mockData';

export interface SavedEntry {
    venue: Venue;
    event: CatalogEvent;
}

interface AppContextType {
    userType: userType | null;
    setUserType: (type: userType | null) => void;
    savedVenues: Map<string, SavedEntry>;
    toggleSaveVenue: (venue: Venue, event: CatalogEvent) => void;
    isVenueSaved: (venueId: string) => boolean;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
    const [userType, setUserType] = useState<userType | null>(null);
    const [savedVenues, setSavedVenues] = useState<Map<string, SavedEntry>>(new Map());

    const toggleSaveVenue = (venue: Venue, event: CatalogEvent) => {
        setSavedVenues(prev => {
            const next = new Map(prev);
            if (next.has(venue.venueID)) {
                next.delete(venue.venueID);
            } else {
                next.set(venue.venueID, { venue, event });
            }
            return next;
        });
    };

    const isVenueSaved = (venueId: string) => savedVenues.has(venueId);

    return (
        <AppContext.Provider value={{ userType, setUserType, savedVenues, toggleSaveVenue, isVenueSaved }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useAppContext must be used within AppProvider');
    return ctx;
}
