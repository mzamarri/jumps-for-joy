import { useState } from 'react';
import { Link } from 'react-router';
import {
    BadgeCheck,
    CalendarCheck,
    ChevronRight,
    CircleAlert,
    Clock3,
    Mail,
    MapPin,
    ShieldCheck,
    Truck,
} from 'lucide-react';
import Icon from 'components/ui/Icon';
import { InfoOverlay } from 'components/ui';
import { locationInfoCards, serviceAreas } from 'data/locationDetails';

const deliverySteps = [
    {
        id: 'step-1',
        step: '1',
        icon: CalendarCheck,
        title: 'Share event details',
        description: 'Send the date, address, venue type, setup surface, and start time so we can plan the delivery properly from the start.',
    },
    {
        id: 'step-2',
        step: '2',
        icon: BadgeCheck,
        title: 'We confirm logistics',
        description: 'We review the route, equipment fit, access notes, and any delivery fees before your reservation details are finalized.',
    },
    {
        id: 'step-3',
        step: '3',
        icon: Truck,
        title: 'Delivery and setup',
        description: 'Our team arrives within the arranged window, places the equipment, and completes setup before your event whenever possible.',
    },
    {
        id: 'step-4',
        step: '4',
        icon: Clock3,
        title: 'Pickup after the event',
        description: 'Once your rental period ends, we return for teardown and pickup so cleanup stays simple on your end.',
    },
];

const planningNotes = [
    {
        id: 'ready',
        title: 'What to Have Ready',
        points: [
            'A clear path from unloading area to the setup location.',
            'Accurate surface information such as grass, concrete, turf, or dirt.',
            'Power access for inflatables, or enough notice if a generator is needed.',
            'Any gate codes, parking instructions, HOA rules, or park requirements.',
        ],
    },
    {
        id: 'avoid-delays',
        title: 'Best Ways to Avoid Delays',
        points: [
            'Measure the setup space before booking larger inflatables or slides.',
            'Let us know about stairs, narrow side yards, or long walking distances.',
            'Have an adult on-site to confirm final placement during delivery.',
            'Share weather concerns early so we can talk through safe options.',
        ],
    },
];

export default function LocationPage() {
    const [selectedCard, setSelectedCard] = useState<typeof locationInfoCards[number] | null>(null);

    return (
        <>
            <div className='bg-primary px-4 py-16 text-center text-primary-foreground sm:px-6 sm:py-24'>
                <h1 className='mt-3 text-4xl font-bold sm:text-5xl lg:text-6xl'>
                    Location & <span className='text-secondary'>Delivery</span>
                </h1>
                <p className='mx-auto mt-3 max-w-3xl text-base text-primary-foreground/80 sm:text-lg'>
                    Everything you need to know about where we deliver, how our rental delivery process works,
                    and what helps setup go smoothly on event day.
                </p>
            </div>

            <div className='mx-auto max-w-6x space-y-12 sm:space-y-12 py-16'>

                {/* Service Area */}
                <div className='space-y-6 mx-auto max-w-6xl px-4 sm:px-8'>
                    <div className='space-y-2 text-center'>
                        <p className='font-semibold uppercase tracking-widest text-primary'>Service Area</p>
                        <h2 className='text-3xl sm:text-4xl font-bold text-foreground'>Where We Deliver</h2>
                        <p className='mx-auto max-w-2xl text-muted-foreground'>
                            We serve Chandler, AZ and the surrounding East Valley communities. Below is a full list of areas within our standard delivery range.
                        </p>
                    </div>
                    <div className='flex flex-col lg:flex-row gap-6 lg:gap-10'>

                        {/* Left: scope + outside area */}
                        <div className='flex-2 space-y-6'>
                            <div className="space-y-4">
                                <h3 className='flex items-center gap-2 text-xl sm:text-2xl font-bold text-foreground'>
                                    Serving Chandler, AZ & Surrounding Areas
                                </h3>
                                <p className='text-s leading-7 text-muted-foreground'>
                                    Jump For Joy Inflatables is based in Chandler, Arizona and delivers within approximately
                                    a 30-mile radius of our home base. That puts us well within reach of most East Valley
                                    neighborhoods, parks, schools, churches, and event venues. Every delivery is coordinated
                                    around your event timing so equipment is fully set up and ready before guests arrive.
                                    We handle transport, installation, and pickup — so you can focus on the event itself.
                                </p>
                            </div>
                            <div className='space-y-4'>
                                <h3 className='text-xl sm:text-2xl font-bold text-foreground'>Outside Our Core Area?</h3>
                                <p className='text-s leading-7 text-muted-foreground'>
                                    We can often accommodate locations just beyond our standard delivery range, but distance,
                                    travel time, and access complexity may affect pricing. The quickest way to get a clear
                                    answer is to send us your exact event address — we can usually confirm availability fast.
                                </p>
                            </div>
                        </div>

                        {/* Right: city list */}
                        <div className='flex-3 rounded-2xl border border-border bg-card px-4 sm:px-6 shadow-sm py-6 sm:py-8 space-y-8'>
                            <div className='space-y-2'>
                                <h1 className='text-xl sm:text-2xl font-bold flex items-center gap-2'>
                                    <MapPin className='h-5 w-5 sm:h-6 sm:w-6 text-accent' />
                                    List of Areas We Serve
                                </h1>
                                <p className='max-w-2xl text-sm text-muted-foreground'>
                                    The communities below are the areas we most commonly deliver to within our standard
                                    service range. If your venue is nearby but not listed, contact us and we can review
                                    the address and availability for your event.
                                </p>
                            </div>
                            <div className=''>
                                <ul className='grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3'>
                                    {serviceAreas.map(city => (
                                        <li
                                            key={city}
                                            className='text-sm sm:text-md text-center font-semibold bg-primary/10 py-2 px-3 rounded-full flex justify-center items-center'
                                        >
                                            {city}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* How It Works - bg-primary theme */}
                <div className='bg-primary px-4 sm:px-8 py-10 sm:py-12'>
                    <div className="max-w-4xl mx-auto">
                        <div className='space-y-2 text-center'>
                            <p className='text-secondary font-semibold uppercase tracking-widest'>How It Works</p>
                            <h2 className='text-3xl sm:text-4xl font-bold text-primary-foreground'>Our Delivery Process</h2>
                            <p className='mx-auto max-w-2xl text-primary-foreground/80'>
                                The goal is simple: make delivery predictable, setup efficient, and pickup easy once your event is over.
                            </p>
                        </div>
                        <div className='mt-6 space-y-4'>
                            {deliverySteps.map(item => (
                                <div key={item.id} className='flex items-center gap-4 rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-4 sm:p-5'>
                                    <Icon
                                        icon={item.step}
                                        containerClassName='h-12 w-12 rounded-xl bg-secondary/20'
                                        iconClassName='text-xl text-secondary'
                                    />
                                    <div className='flex-1'>
                                        <h3 className='text-xl font-semibold text-primary-foreground'>{item.title}</h3>
                                        <p className='text-s leading-6 text-primary-foreground/75'>{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='max-w-6xl mx-auto space-y-16'>
                    {/* Delivery and Setup Information */}
                    <div className='px-4 sm:px-8 space-y-6'>
                        <div className='space-y-2 text-center'>
                            <p className='font-semibold uppercase tracking-widest text-primary'>Important Details</p>
                            <h2 className='text-3xl sm:text-4xl font-bold text-foreground'>Delivery and Setup Information</h2>
                            <p className='mx-auto max-w-2xl text-muted-foreground'>
                                Review these points before booking so your event day goes smoothly from arrival through pickup.
                            </p>
                        </div>
                        <div className='flex flex-col md:flex-row justify-cente gap-8'>
                            <div className='flex flex-col items-center gap-8'>
                                {planningNotes.map(section => (
                                    <div key={section.id} className=''>
                                        <h2 className='text-center md:text-left text-2xl font-bold text-foreground'>{section.title}</h2>
                                        <ul className='mt-4 space-y-3'>
                                            {section.points.map(point => (
                                                <li key={point} className='flex items-start gap-3 text-sm leading-6 text-muted-foreground'>
                                                    <BadgeCheck className='mt-0.5 h-4 w-4 shrink-0 text-primary' />
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                            <div className='mx-auto space-y-4 max-w-lg'>
                                {locationInfoCards.map(card => (
                                    <button
                                        key={card.id}
                                        type='button'
                                        onClick={() => setSelectedCard(card)}
                                        className='group flex w-full cursor-pointer flex-col rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition-all hover:border-primary/30 hover:shadow-md sm:p-6'
                                    >
                                        <Icon
                                            icon={card.icon}
                                            containerClassName='mb-4 h-11 w-11 rounded-xl bg-primary/10'
                                            iconClassName='h-5 w-5 text-primary'
                                        />
                                        <h3 className='text-xl font-semibold text-foreground'>{card.title}</h3>
                                        <p className='mt-2 flex-1 text-sm leading-6 text-muted-foreground'>{card.summary}</p>
                                        <span className='mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary'>
                                            Learn More
                                            <ChevronRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5' />
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className='px-4 sm:px-8'>
                        <div className='max-w-2xl w-full mx-auto p-6 sm:px-8 sm:py-12 rounded-2xl bg-primary text-center text-primary-foreground space-y-4'>
                            <h2 className='text-2xl sm:text-3xl font-bold'>Questions About Your <span className="text-secondary">Event Address?</span></h2>
                            <p className='text-primary-foreground/85'>
                                Reach out with your venue address, surface type, and event timing. We can help confirm
                                whether your location works well for the rental setup you have in mind.
                            </p>
                            <div className='mx-auto max-w-3xl flex flex-col justify-center gap-3 sm:flex-row'>
                                <Link
                                    to='/contact'
                                    className='flex-1 flex items-center justify-center gap-2 rounded-lg bg-accent px-8 py-3 font-semibold text-accent-foreground transition-colors hover:bg-accent/90 sm:w-auto'
                                >
                                    <Mail className='h-4 w-4' />
                                    Contact Us
                                </Link>
                                <Link
                                    to='/faq'
                                    className='flex-1 flex items-center justify-center gap-2 rounded-lg border border-primary-foreground/30 bg-primary-foreground/10 px-8 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/20 sm:w-auto'
                                >
                                    <CircleAlert className='h-4 w-4' />
                                    FAQ
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <InfoOverlay
                open={!!selectedCard}
                onClose={() => setSelectedCard(null)}
                title={selectedCard?.title}
                summary={selectedCard?.summary}
                details={selectedCard?.details ?? []}
            />
        </>
    );
}
