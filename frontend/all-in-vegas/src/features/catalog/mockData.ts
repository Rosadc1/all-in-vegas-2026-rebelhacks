import type { Venue } from '@/types/venue-service-types';

export interface CatalogEvent {
    id: string;
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
    category: string;
    image: string;
}

export const catalogEvents: CatalogEvent[] = [
    {
        id: '1',
        title: 'CES 2026',
        description: "The world's largest tech event showcasing innovation and technology. CES is the global gathering place for all who thrive on the business of consumer technologies. It has served as the proving ground for innovators and breakthrough technologies for over 50 years.",
        location: 'Las Vegas Convention Center',
        startDate: '2026-01-06',
        endDate: '2026-01-09',
        category: 'Technology',
        image: 'https://images.unsplash.com/photo-1768590149213-8ab16aaf7511?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXMlMjB2ZWdhcyUyMGNvbnZlbnRpb24lMjBjZW50ZXJ8ZW58MXx8fHwxNzcxNjI3MDIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
        id: '2',
        title: 'MAGIC Fashion Week',
        description: "Premier fashion trade show featuring the latest trends from top designers and emerging brands. MAGIC is the world's largest B2B fashion marketplace, bringing together the most important brands, retailers, and industry professionals.",
        location: 'Mandalay Bay Convention Center',
        startDate: '2026-02-16',
        endDate: '2026-02-18',
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbmZlcmVuY2UlMjBldmVudHxlbnwxfHx8fDE3NzE1OTAzMTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
        id: '3',
        title: 'World of Concrete',
        description: 'Leading construction and concrete industry event featuring live equipment demonstrations, education, and networking. The premier annual international event dedicated to the commercial construction industries.',
        location: 'Las Vegas Convention Center',
        startDate: '2026-01-20',
        endDate: '2026-01-23',
        category: 'Construction',
        image: 'https://images.unsplash.com/photo-1768590149213-8ab16aaf7511?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXMlMjB2ZWdhcyUyMGNvbnZlbnRpb24lMjBjZW50ZXJ8ZW58MXx8fHwxNzcxNjI3MDIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
        id: '4',
        title: 'NAB Show',
        description: 'Media, entertainment and technology event connecting content professionals with the tools, technologies and connections needed to drive the future of storytelling.',
        location: 'Las Vegas Convention Center',
        startDate: '2026-04-11',
        endDate: '2026-04-14',
        category: 'Media',
        image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbmZlcmVuY2UlMjBldmVudHxlbnwxfHx8fDE3NzE1OTAzMTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
];

export const catalogVenues: Venue[] = [
    // CES Venues
    {
        venueID: 'v1',
        eventID: '1',
        title: 'Opening Keynote: The Future of Everything',
        description: 'A visionary look at how technology is reshaping our world. Industry leaders take the main stage to unveil the products and ideas that will define the next decade.',
        time: '09:00 AM',
        location: { x: 36.1340, y: -115.1520 },
    },
    {
        venueID: 'v2',
        eventID: '1',
        title: 'AI in Everyday Life',
        description: 'Exploring practical applications of AI from home to work. A deep dive into how artificial intelligence is being woven into consumer products, enterprise tools, and daily routines.',
        time: '11:00 AM',
        location: { x: 36.1350, y: -115.1510 },
    },
    {
        venueID: 'v3',
        eventID: '1',
        title: 'Robotics & Automation Expo',
        description: 'Live demonstrations of the latest industrial and consumer robots. See cutting-edge automation in action and meet the teams building the machines of tomorrow.',
        time: '02:00 PM',
        location: { x: 36.1360, y: -115.1500 },
    },
    // MAGIC Venues
    {
        venueID: 'v4',
        eventID: '2',
        title: '2026 Color & Style Forecast',
        description: 'Unveiling the major trends that will dominate the fashion industry. Industry forecasters and top designers reveal the palettes, silhouettes, and materials shaping the season.',
        time: '10:00 AM',
        location: { x: 36.0930, y: -115.1750 },
    },
    {
        venueID: 'v5',
        eventID: '2',
        title: 'Sustainable Supply Chains',
        description: 'How to build an ethical and eco-friendly fashion brand from the ground up. Practical insights from leaders who have successfully integrated sustainability into every layer of production.',
        time: '01:30 PM',
        location: { x: 36.0940, y: -115.1740 },
    },
    // World of Concrete Venues
    {
        venueID: 'v6',
        eventID: '3',
        title: 'Concrete Innovations 2026',
        description: 'New materials and mixing techniques for stronger, more durable structures. Researchers and engineers present the latest breakthroughs in concrete science.',
        time: '08:30 AM',
        location: { x: 36.1340, y: -115.1525},
    },
    {
        venueID: 'v7',
        eventID: '3',
        title: 'Smart City Infrastructure',
        description: 'Integrating sensors and data into modern urban construction. Exploring how smart materials and IoT connectivity are transforming how cities are built and managed.',
        time: '11:00 AM',
        location: { x: 36.1355, y: -115.1515},
    },
    // NAB Show Venues
    {
        venueID: 'v8',
        eventID: '4',
        title: 'Streaming Wars: 2026',
        description: 'Analyzing the shift in global media consumption patterns. A frank discussion on where subscribers are going, what content wins, and how the major platforms are adapting.',
        time: '10:00 AM',
        location: { x: 36.1340, y: -115.1530 },
    },
    {
        venueID: 'v9',
        eventID: '4',
        title: 'Next-Gen Broadcast Tech',
        description: 'Deep dive into 8K and beyond. Sony engineers walk through the full production pipeline — from acquisition to delivery — for next-generation broadcast formats.',
        time: '02:00 PM',
        location: { x: 36.1350, y: -115.1520},
    },
];
