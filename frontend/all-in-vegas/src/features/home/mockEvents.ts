import type { Event } from '@/types/event-service-types';
import type { Venue } from '@/types/venue-service-types';

export const mockVenues: Venue[] = [
    {
        venueID: '1',
        eventID: '1',
        title: 'Opening Keynote',
        description: "Join us for the official opening and discover what's next",
        time: '09:00 AM',
        location: { x1: 36.1340, x2: 36.1345, y1: -115.1520, y2: -115.1515 },
    },
    {
        venueID: '2',
        eventID: '1',
        title: 'Innovation Showcase',
        description: 'Live demos of cutting-edge technology',
        time: '11:00 AM',
        location: { x1: 36.1350, x2: 36.1355, y1: -115.1510, y2: -115.1505 },
    },
    {
        venueID: '3',
        eventID: '1',
        title: 'AI & Machine Learning',
        description: 'Deep dive into artificial intelligence applications',
        time: '01:00 PM',
        location: { x1: 36.1360, x2: 36.1365, y1: -115.1500, y2: -115.1495 },
    },
    {
        venueID: '4',
        eventID: '1',
        title: 'Networking Reception',
        description: 'Connect with industry professionals',
        time: '05:00 PM',
        location: { x1: 36.1370, x2: 36.1375, y1: -115.1490, y2: -115.1485 },
    },
];

export const mockEvents: Event[] = [
    {
        eventID: '1',
        userId: 'mock-organizer',
        title: 'CES 2026',
        description: "The world's largest tech event showcasing innovation and technology",
        location: 'Las Vegas Convention Center',
        date: ['2026-01-06', '2026-01-09'],
        tag: ['Technology', 'featured'],
    },
    {
        eventID: '2',
        userId: 'mock-organizer',
        title: 'MAGIC Fashion Week',
        description: 'Premier fashion trade show featuring the latest trends',
        location: 'Mandalay Bay Convention Center',
        date: ['2026-02-16', '2026-02-18'],
        tag: ['Fashion', 'featured'],
    },
    {
        eventID: '3',
        userId: 'mock-organizer',
        title: 'World of Concrete',
        description: 'Leading construction and concrete industry event',
        location: 'Las Vegas Convention Center',
        date: ['2026-01-20', '2026-01-23'],
        tag: ['Construction'],
    },
    {
        eventID: '4',
        userId: 'mock-organizer',
        title: 'NAB Show',
        description: 'Media, entertainment and technology event',
        location: 'Las Vegas Convention Center',
        date: ['2026-04-11', '2026-04-14'],
        tag: ['Media'],
    },
];
