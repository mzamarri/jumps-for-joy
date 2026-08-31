import { useState } from 'react';
import { InfoOverlay } from 'components/ui'
import { Balloon, PartyPopper, ShieldCheck, CalendarCheck, ChevronRight } from 'lucide-react'
import { SiFacebook, SiInstagram } from '@icons-pack/react-simple-icons';
import type { LucideIcon } from 'lucide-react'
import bounceHouse from '../../assets/service-overview-picture.png'

type OverviewCard = {
    id: string;
    icon: LucideIcon;
    title: string;
    summary: string;
    details: string[];
};

const cards: OverviewCard[] = [
    {
        id: "event-types",
        icon: PartyPopper,
        title: "Event Types",
        summary: "From backyard birthdays to school functions and community celebrations, we offer rental setups tailored to the size and style of your event.",
        details: [
            "We help match rental types to your event goals, available space, and expected age ranges so guests stay engaged safely.",
            "For birthdays, we usually recommend one main inflatable plus supporting items like tables or shaded seating to keep flow organized.",
            "For schools and community events, we can suggest layouts that manage higher traffic, separate activity zones, and reduce long lines.",
            "If your event has mixed age groups, we can walk through options that balance toddler-friendly play and more active choices for older kids."
        ]
    },
    {
        id: "safety",
        icon: ShieldCheck,
        title: "Safety & Cleanliness",
        summary: "Every inflatable and rental item is cleaned, sanitized, and inspected before delivery so your guests can enjoy a safe, worry-free experience.",
        details: [
            "Each unit is cleaned and sanitized between rentals, then inspected for wear, anchoring points, and proper blower operation before delivery.",
            "At setup, we check surface conditions, power access, and spacing so the equipment is installed according to safe use requirements.",
            "We provide clear use guidance so hosts understand capacity, supervision expectations, and weather-related safety considerations.",
            "If conditions change on event day, we prioritize safety and can advise adjustments to protect guests and equipment."
        ]
    },
    {
        id: "booking",
        icon: CalendarCheck,
        title: "Easy Booking & Reliable Service",
        summary: "Our straightforward booking process, clear communication, and on-time delivery make planning simple from reservation to event day.",
        details: [
            "Booking is structured to reduce confusion: confirm your event details, select rentals, and lock timing with clear next steps.",
            "Before your event, we communicate delivery windows, setup expectations, and what you need ready at the location.",
            "On event day, our goal is punctual setup and smooth pickup so your timeline stays predictable.",
            "If you need to adjust something before the date, we’ll review availability and help you update your plan quickly."
        ]
    }
]

export default function ServiceOverview() {
    const [selectedCard, setSelectedCard] = useState<OverviewCard | null>(null);

    return (
        <div className="service-overview px-4 py-8 sm:px-6 lg:px-24">
            <div className='flex justify-center items-center'>
                <div className='w-full max-w-6xl text-center space-y-8'>
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground font-semibold text-sm rounded-full">
                        <Balloon className='w-4 h-4'/> What We Do
                    </span>
                    <div 
                        className='
                            text-center lg:text-center
                            flex flex-col-reverse items-center gap-8 
                            xl:flex-row lg:justify-center xl:items-center lg:gap-16
                        '
                    >
                        <div className='space-y-4 max-w-3xl'>
                            <h1 className='text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl'>
                                Party Rentals For Every Occasion
                            </h1>
                            <p className="text-sm font-semibold uppercase tracking-widest text-primary sm:text-lg">
                                Serving Chandler, Arizona and nearby communities
                            </p>
                            <p className='mx-auto max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg lg:mx-0'>
                                Jump For Joy Inflatables provides bounce houses, slides, tents, tables,
                                chairs, and event essentials for birthdays, school functions, church
                                gatherings, and community events. We help hosts create a fun, organized
                                setup with reliable rental support from planning through event day.
                            </p>
                        </div>  
                        <img 
                            src={bounceHouse}
                            alt="Bounce House Image"
                            className='
                                relative z-10 rounded-full shrink-0
                                w-80 h-80
                                sm:w-88 sm:h-88
                                md:w-96 md:h-96
                                lg:w-104 lg:h-104
                            '
                        />
                    </div>
                    <div className='grid grid-cols-1 gap-3 md:grid-cols-3'>
                        {cards.map(card => (
                            <OverviewCardButton
                                key={card.id}
                                card={card}
                                onSelect={() => setSelectedCard(card)}
                            />
                        ))}
                    </div>
                    <div className='flex flex-col items-center space-y-4'>
                        <p className='max-w-3xl text-base text-muted-foreground sm:text-lg'>
                            Want inspiration for your next event? Check out our social media to 
                            see real setups, creative ideas, and the fun we help create for our 
                            customers!
                        </p>
                        <div className='flex gap-3'>
                            <a 
                                className='group p-4 bg-primary/10 rounded-full hover:bg-secondary/30 cursor-pointer'
                                href=''
                            >
                                <SiFacebook size={28} className='text-primary group-hover:text-secondary-foreground'/>
                            </a>
                            <a 
                                className='group p-4 bg-primary/10 rounded-full hover:bg-secondary/30 cursor-pointer'
                                href=''
                            >
                                <SiInstagram size={28} className='text-primary group-hover:text-secondary-foreground'/>
                            </a>
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
        </div>
    )
}

function OverviewCardButton({ card, onSelect }: { card: OverviewCard; onSelect: () => void }) {
    const CardIcon = card.icon;

    return (
        <div
            className="group bg-card text-left space-y-3 border border-border p-4 rounded-xl shadow-sm hover:shadow-md hover:border-primary/30 cursor-pointer"
            onClick={onSelect}
        >
            <div className='w-10 h-10 bg-primary/10 group-hover:bg-secondary/30 flex justify-center items-center rounded-lg'>
                <CardIcon className='w-5 h-5 text-primary group-hover:text-secondary-foreground'/>
            </div>
            <h1 className='text-foreground font-bold'>{card.title}</h1>
            <p className="text-sm text-muted-foreground">{card.summary}</p>
            <span className='inline-flex items-center gap-1 text-xs text-primary font-semibold group-hover:gap-2 transition-all'>
                Learn More <ChevronRight className='w-3 h-3' />
            </span>
        </div>
    );
}
