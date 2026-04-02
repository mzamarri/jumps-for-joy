import { useState } from 'react';
import { InfoOverlay } from 'components/ui_features'
import { Instagram, Facebook, Balloon, PartyPopper, ShieldCheck, CalendarCheck, ChevronRight } from 'lucide-react'
import bounceHouse from '/Logo-bounce-house-remade.png'

const cards = [
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
    const [selectedCard, setSelectedCard] = useState(null);

    return (
        <div className="service-overview px-24 py-12">
            <div className='flex justify-center items-center'>
                <div className='w-full max-w-6xl text-center space-y-6'>
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground font-semibold text-sm rounded-full">
                        <Balloon/> What We Do
                    </span>
                    <div className='flex gap-8'>
                        <div className='space-y-4 text-center'>
                            <h1 className='text-6xl font-bold text-foreground rounded-lg'>
                                More Than Just <span className='text-primary'>Bounce Houses</span>
                            </h1>
                            <p className='max-w-3xl mx-auto text-lg text-muted-foreground'>
                                Bounce houses are at the heart of our rental services, offering 
                                a fun and engaging centerpiece for parties and events of all kinds. 
                                Alongside our inflatable rentals, we provide a selection of event 
                                essentials such as tables, chairs, and additional equipment to help 
                                hosts create a complete and well-organized setup. By offering multiple 
                                rental options in one place, we make planning easier and reduce the 
                                need to coordinate with multiple vendors. Whether you’re hosting a small 
                                backyard celebration or a larger gathering, our services are designed to 
                                adapt to different spaces, guest counts, and event layouts.
                            </p>
                        </div>
                        <div className='relative max-w-sm bg-secondary/90 overflow-hidden rounded-full border-9 border-primary'>
                            <div
                                className='absolute inset-0 bg-card'
                            />
                            <img 
                                src={bounceHouse}
                                alt="Bounce House Image"
                                className='relative z-10 object-contain bg-secondary/90'
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-3 gap-3'>
                        {cards.map(card => (
                            <div
                                key={card.id}
                                className="group bg-card text-left space-y-3 border border-border p-4 rounded-xl shadow-sm hover:shadow-md hover:border-primary/30 cursor-pointer"
                                onClick={() => setSelectedCard(card)}
                            >
                                <div className='w-10 h-10 bg-primary/10 group-hover:bg-secondary/30 flex justify-center items-center rounded-lg'>
                                    <card.icon className='w-5 h-5 text-primary group-hover:text-secondary-foreground'/>
                                </div>
                                <h1 className='text-foreground font-bold'>{card.title}</h1>
                                <p className="text-sm text-muted-foreground">{card.summary}</p>
                                <span className='inline-flex items-center gap-1 text-xs text-primary font-semibold group-hover:gap-2 transition-all'>
                                    Learn More <ChevronRight className='w-3 h-3' />
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-col items-center space-y-4'>
                        <p className='max-w-3xl text-muted-foreground text-lg'>
                            Want inspiration for your next event? Check out our social media to 
                            see real setups, creative ideas, and the fun we help create for our 
                            customers!
                        </p>
                        <div className='flex gap-3'>
                            <div className='group p-4 bg-primary/10 rounded-full hover:bg-secondary/30 cursor-pointer'>
                                <Facebook className='text-primary group-hover:text-secondary-foreground fill-current'/>
                            </div>
                            <div className='group p-4 bg-primary/10 rounded-full hover:bg-secondary/30 cursor-pointer'>
                                <Instagram className='text-primary group-hover:text-secondary-foreground'/>
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
        </div>
    )
}
