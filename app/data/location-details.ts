import type { ComponentType } from 'react';
import { CircleAlert, Toolbox, Truck } from 'lucide-react';

export type LocationInfoCard = {
    id: string;
    icon: ComponentType<{ className?: string }>;
    title: string;
    summary: string;
    details: string[];
};

export const locationInfoCards: LocationInfoCard[] = [
    {
        id: 'delivery',
        icon: Truck,
        title: 'Delivery Information',
        summary: 'How arrival, setup timing, and pickup are typically handled.',
        details: [
            'Delivery windows are coordinated in advance so setup is complete before your event start time whenever possible.',
            'Please make sure access paths are clear and large enough for equipment transport from curb to setup area.',
            'If your location has access restrictions, gates, stairs, or timing limitations, sharing those details early helps avoid delays.',
            'After your event, pickup is scheduled to keep breakdown quick and safe without disrupting cleanup.',
        ],
    },
    {
        id: 'setup',
        icon: Toolbox,
        title: 'Setup Requirements',
        summary: 'What we need on-site to install equipment safely and correctly.',
        details: [
            'Inflatables need a level setup area with enough clearance around sides and overhead for safe operation.',
            'Reliable power within practical cable distance is required for blower-based equipment.',
            'Surface type matters for anchoring, so let us know whether setup is on grass, concrete, turf, or another surface.',
            'Weather, wind, and moisture conditions can affect setup decisions, and safety requirements always come first.',
        ],
    },
    {
        id: 'fees',
        icon: CircleAlert,
        title: 'Delivery Distance & Fees',
        summary: 'When delivery pricing can change based on distance or site access.',
        details: [
            'Delivery fees are usually based on distance, travel time, and any special access or setup complexity.',
            'Events outside standard service zones may still be available with adjusted delivery pricing.',
            'We review location details up front so your quote reflects realistic logistics and avoids day-of surprises.',
            'If you are near the edge of our service area, contact us and we can confirm availability quickly.',
        ],
    },
];

export const serviceAreas = [
    'Ahwatukee',
    'Gold Canyon',
    'Phoenix',
    'Apache Junction',
    'Guadalupe',
    'Power Ranch',
    'Arcadia',
    'Higley',
    'Queen Creek',
    'Avondale',
    'Johnson Ranch',
    'Red Mountain Ranch',
    'Chandler Heights',
    'Laveen',
    'San Tan Valley',
    'Corona del Sol',
    'McCormick Ranch',
    'Scottsdale',
    'Dobson Ranch',
    'Mesa',
    'Seville',
    'Eastmark',
    'Morrison Ranch',
    'Sun Lakes',
    'Fountain Hills',
    'Ocotillo',
    'Superstition Springs',
    'Gilbert',
    'Paradise Valley',
    'Tempe',
];
