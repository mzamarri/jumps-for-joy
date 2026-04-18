import type { ComponentType } from 'react';
import { Link } from 'react-router';
import {
    CalendarCheck,
    ChevronDown,
    CreditCard,
    Info,
    Mail,
    MapPin,
    PartyPopper,
    ShieldCheck,
    Truck,
} from 'lucide-react';
import Icon from 'components/ui/Icon';

type FAQItem = {
    id: string;
    question: string;
    answer: string;
};

type FAQSectionData = {
    id: string;
    icon: ComponentType<{ className?: string }>;
    title: string;
    description: string;
    questions: FAQItem[];
};

const faqSections: FAQSectionData[] = [
    {
        id: 'booking',
        icon: CalendarCheck,
        title: 'Booking & Reservation',
        description: 'Questions about reserving a date, changing an order, and what we need to lock in your event.',
        questions: [
            {
                id: 'lead-time',
                question: 'How far in advance should I book?',
                answer: 'We recommend booking as early as possible, especially for weekends, holidays, and spring or summer dates. Popular units can book out quickly, so reserving two to three weeks ahead gives you the best selection.',
            },
            {
                id: 'needed-info',
                question: 'What information do you need to confirm a reservation?',
                answer: 'We usually need your event date, event address, rental selection, expected start time, and a few setup details such as surface type, available space, and whether power is nearby.',
            },
            {
                id: 'changes',
                question: 'Can I change my rental items after I book?',
                answer: 'In many cases, yes. If availability allows, we can usually help you swap, add, or remove items before the event. The earlier you contact us, the easier it is to adjust your reservation.',
            },
            {
                id: 'cancel-reschedule',
                question: 'What happens if I need to cancel or reschedule?',
                answer: 'Policies can depend on timing and availability, but we always encourage you to reach out as soon as plans change. We will review your options and help you understand the next steps for your date.',
            },
        ],
    },
    {
        id: 'delivery',
        icon: Truck,
        title: 'Delivery & Setup',
        description: 'Answers about arrival windows, setup expectations, and what helps the delivery process go smoothly.',
        questions: [
            {
                id: 'setup-included',
                question: 'Do you set up the inflatable?',
                answer: 'Yes. Delivery includes setup and later pickup. Our team handles positioning, anchoring, and final setup checks so the inflatable is ready for use before your event whenever possible.',
            },
            {
                id: 'ready-before-delivery',
                question: 'What should I have ready before you arrive?',
                answer: 'Please make sure the setup area is clear, level, and accessible. It also helps to know the exact surface type ahead of time and to have power available nearby when the rental requires it.',
            },
            {
                id: 'delivery-time',
                question: 'How long do setup and pickup usually take?',
                answer: 'The time can vary depending on the rental and location, but standard setups are usually handled efficiently once our team is on-site. Larger units or access challenges may take a little longer.',
            },
            {
                id: 'stay-onsite',
                question: 'Do I need to be there when you deliver?',
                answer: 'It is best to have an adult available at delivery so the final setup location can be confirmed and any last-minute site questions can be answered quickly.',
            },
        ],
    },
    {
        id: 'pricing',
        icon: CreditCard,
        title: 'Pricing & Payments',
        description: 'Common questions about rental pricing, deposits, delivery fees, and what is included in the total.',
        questions: [
            {
                id: 'included-price',
                question: 'What is included in the rental price?',
                answer: 'Rental pricing generally covers the equipment itself along with delivery, professional setup, and pickup within the standard service area. Some event-specific logistics can affect the final total.',
            },
            {
                id: 'outside-area-fees',
                question: 'Are there extra fees for delivery outside your area?',
                answer: 'Sometimes, yes. Additional travel distance, longer drive times, or special access requirements can affect delivery pricing. We can confirm that once we review the event address.',
            },
            {
                id: 'payment-due',
                question: 'When is payment due?',
                answer: 'A deposit is typically required to reserve your date, and the remaining balance is due according to the booking terms provided when your reservation is confirmed.',
            },
            {
                id: 'deposit-required',
                question: 'Do you require a deposit to hold my reservation?',
                answer: 'Yes, most bookings require a deposit so your event date and rental items are reserved. This helps prevent scheduling conflicts and keeps the calendar accurate.',
            },
        ],
    },
    {
        id: 'safety',
        icon: ShieldCheck,
        title: 'Safety & Weather',
        description: 'Important safety and weather-related questions that come up before and during event planning.',
        questions: [
            {
                id: 'cleaned-inspected',
                question: 'Are the inflatables cleaned and inspected?',
                answer: 'Yes. Units are cleaned, sanitized, and checked before delivery. We also review setup conditions on-site to make sure the inflatable is installed safely for the event.',
            },
            {
                id: 'unsafe-weather',
                question: 'What happens if the weather is unsafe?',
                answer: 'Safety comes first. If wind, rain, lightning, or other unsafe conditions affect setup or use, we will communicate with you about available options and the safest path forward.',
            },
            {
                id: 'surface-types',
                question: 'What surfaces can you set up on?',
                answer: 'We can often set up on grass, concrete, asphalt, or turf depending on the unit and the anchoring method needed. Sharing surface details in advance helps us confirm what works best.',
            },
            {
                id: 'supervision',
                question: 'Do I need to supervise the inflatable during the event?',
                answer: 'Yes. Adult supervision is important throughout use. Hosts should make sure riders follow the guidelines for safe use, capacity, and age-appropriate play.',
            },
        ],
    },
    {
        id: 'service-area',
        icon: MapPin,
        title: 'Service Area & Locations',
        description: 'Questions about coverage, event venues, and what to expect if your location has access limitations.',
        questions: [
            {
                id: 'service-my-area',
                question: 'Do you service my area?',
                answer: 'We serve Chandler and many nearby East Valley communities. If you are unsure whether your address is within range, send us the exact location and we can confirm availability quickly.',
            },
            {
                id: 'venue-types',
                question: 'Can you deliver to parks, schools, or church campuses?',
                answer: 'Yes, many of our rentals are delivered to homes, parks, schools, churches, and community venues. It helps if you share any venue rules, permit requirements, or access notes in advance.',
            },
            {
                id: 'limited-access',
                question: 'What if my venue has gates, stairs, or limited access?',
                answer: 'Please let us know ahead of time. Access restrictions, long walking paths, or timing limitations can affect setup planning, and in some cases may affect pricing or unit compatibility.',
            },
            {
                id: 'power-water',
                question: 'Do I need power or water at the setup location?',
                answer: 'Inflatables typically require a standard power source nearby, and water slides also need access to a hose. If your venue does not have those available, let us know and we can discuss possible options.',
            },
        ],
    },
    {
        id: 'event-day',
        icon: PartyPopper,
        title: 'Event Day & Equipment',
        description: 'Helpful questions about rental timing, choosing the right unit, and what to expect during the event.',
        questions: [
            {
                id: 'rental-length',
                question: 'How long is a standard rental period?',
                answer: 'Most rentals are scheduled around your event day timeline. We coordinate delivery and pickup with you directly so the equipment is there when you need it and removed when the event is over.',
            },
            {
                id: 'capacity',
                question: 'How many kids can use a bounce house at one time?',
                answer: 'Capacity depends on the specific unit. Each inflatable has size and rider guidelines, and following those limits is important for safe, enjoyable use throughout the event.',
            },
            {
                id: 'generator',
                question: 'Do you offer generators if my venue does not have power?',
                answer: 'Yes, generator options may be available depending on the event setup. If you know power will be an issue, mention it early so we can recommend the right solution.',
            },
            {
                id: 'choose-rental',
                question: 'Can you help me choose the right rental for my event?',
                answer: 'Absolutely. If you share the age range, guest count, venue type, and event goals, we can help you narrow down rentals that fit the space and make sense for the occasion.',
            },
        ],
    },
];

export default function FAQPage() {
    return (
        <div>
            <div className='bg-primary px-4 py-16 text-center text-primary-foreground md:px-8 md:py-24'>
                <h1 className='mt-3 text-4xl font-bold md:text-5xl lg:text-6xl'>
                    Frequently Asked <span className='text-secondary'>Questions</span>
                </h1>
                <p className='mx-auto mt-3 max-w-2xl text-base text-primary-foreground/80 sm:text-lg'>
                    Everything you need to know about renting, delivery, setup, and booking.
                    Browse the topics below to jump straight to the questions that matter most.
                </p>
            </div>

            <div className='mx-auto max-w-4xl space-y-12 py-10 md:space-y-14 md:py-16'>
                <div className='space-y-5 px-4 sm:px-8 '>
                    {faqSections.map(section => (
                        <FAQSection key={section.id} section={section} />
                    ))}
                </div>

                <div className="px-4 sm:px-8">
                    <div className='max-w-2xl w-full mx-auto p-6 sm:px-8 sm:py-12 rounded-2xl bg-primary text-center text-primary-foreground space-y-4'>
                        <h2 className='text-2xl sm:text-3xl font-bold'>Still Have <span className='text-secondary'>Questions?</span></h2>
                        <p className='text-primary-foreground/85'>
                            If you did not see your question here, reach out directly and we can help with event-specific
                            details, delivery questions, and rental recommendations.
                        </p>
                        <Link
                            to='/contact'
                            className='mx-auto flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-8 py-3 font-semibold text-accent-foreground transition-colors hover:bg-accent/90 md:w-auto'
                        >
                            <Mail className='w-5 h-5'/>
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FAQSection({ section }: { section: FAQSectionData }) {
    return (
        <section className='space-y-6 md:space-y-8'>
            <div className='flex items-center gap-2'>
                <Icon
                    icon={section.icon}
                    containerClassName='h-11 w-11 rounded-xl bg-primary/10 shrink-0'
                    iconClassName='h-5 w-5 text-primary'
                />
                <h3 className='text-xl font-bold text-foreground md:text-3xl'>{section.title}</h3>
            </div>

            <div className='space-y-3'>
                {section.questions.map(item => (
                    <details
                        key={item.id}
                        className='group bg-card rounded-xl shadow-sm p-4 transition-colors'
                    >
                        <summary className='flex cursor-pointer list-none items-start justify-between gap-4 font-bold text-foreground [&::-webkit-details-marker]:hidden'>
                            <span>{item.question}</span>
                            <ChevronDown className='mt-0.5 h-4 w-4 shrink-0 transition-transform group-open:rotate-180' />
                        </summary>
                        <div className='pt-3 text-sm leading-6 text-muted-foreground md:text-base'>
                            {item.answer}
                        </div>
                    </details>
                ))}
            </div>
        </section>
    );
}
