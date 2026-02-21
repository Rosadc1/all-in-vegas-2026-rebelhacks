import type { Event } from '@/types/event-service-types';

export const mockEvents: Event[] = [
    {
        eventID: '1',
        title: 'CES 2026',
        description: "The world's largest tech event showcasing innovation and technology",
        location: 'Las Vegas Convention Center',
        date: ['2026-01-06', '2026-01-09'],
        tags: ['Technology', 'featured'],
    },
    {
        eventID: '2',
        title: 'MAGIC Fashion Week',
        description: 'Premier fashion trade show featuring the latest trends',
        location: 'Mandalay Bay Convention Center',
        date: ['2026-02-16', '2026-02-18'],
        tags: ['Fashion', 'featured'],
    },
    {
        eventID: '3',
        title: 'World of Concrete',
        description: 'Leading construction and concrete industry event',
        location: 'Las Vegas Convention Center',
        date: ['2026-01-20', '2026-01-23'],
        tags: ['Construction'],
    },
    {
        eventID: '4',
        title: 'NAB Show',
        description: 'Media, entertainment and technology event',
        location: 'Las Vegas Convention Center',
        date: ['2026-04-11', '2026-04-14'],
        tags: ['Media'],
    },
];
