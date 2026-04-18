import { Link } from 'react-router';
import { MapPin, ChevronRight, Truck, ShieldCheck, CircleAlert } from 'lucide-react';

const highlights = [
    {
        id: 'coverage',
        icon: MapPin,
        title: '30+ service areas',
        description: 'We deliver across Chandler and many nearby East Valley cities, neighborhoods, schools, parks, and venues.',
    },
    {
        id: 'delivery',
        icon: Truck,
        title: 'Delivery from start to finish',
        description: 'You share the event details, we confirm logistics, then our team delivers, sets up, and returns for pickup.',
    },
    {
        id: 'setup',
        icon: ShieldCheck,
        title: 'Setup and safety essentials',
        description: 'Clear access, a level surface, and nearby power help us install equipment safely and on time.',
    },
    {
        id: 'fees',
        icon: CircleAlert,
        title: 'Distance and fee notes',
        description: 'Longer drives, special access, and outside-area locations can affect delivery availability and pricing.',
    },
];

export default function Locations() {
    return (
        <div className='bg-primary text-primary-foreground'>
            <div className='mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16'>

                {/* Header */}
                <div className='mb-10 space-y-3 text-center sm:mb-12'>
                    <span className='inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground'>
                        <MapPin className='h-4 w-4' />
                        Service Area
                    </span>
                    <h2 className='text-3xl font-bold sm:text-4xl lg:text-5xl'>Where We Deliver</h2>
                    <p className='mx-auto max-w-2xl text-base leading-7 text-primary-foreground/80 sm:text-lg'>
                        We deliver and set up bounce houses throughout Chandler, AZ and surrounding communities,
                        bringing the fun right to your home, park, school, or event venue.
                    </p>
                </div>

                {/* Two-column layout */}
                <div className='grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12'>

                    {/* Left: compact summary cards */}
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5'>
                        {highlights.map(item => {
                            const ItemIcon = item.icon;
                            return (
                                <div
                                    key={item.id}
                                    className='flex min-h-[12rem] flex-col rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-5 sm:p-6'
                                >
                                    <div className='mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/20'>
                                        <ItemIcon className='h-5 w-5 text-secondary' />
                                    </div>
                                    <h3 className='text-base font-semibold leading-6 text-primary-foreground sm:text-lg'>{item.title}</h3>
                                    <p className='mt-2 text-sm leading-6 text-primary-foreground/75 sm:text-[0.95rem]'>{item.description}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right: coverage text + CTA + city list */}
                    <div className='space-y-6'>
                        <div>
                            <p className='font-semibold uppercase tracking-widest text-secondary'>Coverage</p>
                            <h3 className='mt-2 text-2xl font-bold sm:text-3xl'>Serving Chandler, AZ & the East Valley</h3>
                            <p className='mt-3 text-base leading-7 text-primary-foreground/80'>
                                Based in Chandler, we regularly deliver to families, schools, churches, and event
                                venues throughout the surrounding area. Over 30 communities are within our standard
                                delivery range. We schedule every delivery around your event timing so equipment is
                                fully set up before guests arrive. If your location is just beyond our usual area,
                                reach out and we can often make it work.
                            </p>
                            <p className='mt-5 text-base leading-7 text-primary-foreground/80'>
                                For a full list of areas we serve, a breakdown of the delivery process, setup requirements,
                                and other important delivery information, visit our Locations & Delivery page.
                            </p>
                            <Link
                                to='/location'
                                className='mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-base font-semibold text-accent-foreground transition-colors hover:bg-accent/90'
                            >
                                View Full Locations & Delivery Page
                                <ChevronRight className='h-4 w-4' />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
