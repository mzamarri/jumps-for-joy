import { Users, BadgeCheck, HeartHandshake, Truck, ShieldCheck, Star, CalendarCheck, LayoutGrid, Mail, PartyPopper, GraduationCap, Building2 } from 'lucide-react';
import { Link } from 'react-router';
import Icon from 'components/ui/Icon';

const values = [
    {
        id: 'service',
        icon: HeartHandshake,
        title: 'Service First',
        description: 'We focus on making event planning easier through clear communication and dependable support.',
    },
    {
        id: 'quality',
        icon: BadgeCheck,
        title: 'Quality & Safety',
        description: 'Every unit is cleaned, inspected, and set up with safety standards in mind before each rental.',
    },
    {
        id: 'community',
        icon: Users,
        title: 'Community Focused',
        description: 'We love helping local families, schools, and organizations create memorable experiences.',
    },
];

const stats = [
    { value: '100+', label: 'Events Served' },
    { value: '2+', label: 'Years in Business' },
    { value: '30+', label: 'Cities Covered' },
    { value: '100%', label: 'Satisfaction' },
];

const whoWeServe = [
    {
        id: 'families',
        icon: PartyPopper,
        title: 'Families & Birthdays',
        description: 'From backyard birthday parties to neighborhood block parties, we help families celebrate big.',
    },
    {
        id: 'schools',
        icon: GraduationCap,
        title: 'Schools & PTAs',
        description: 'Field days, end-of-year celebrations, carnivals, and fundraisers we handle the inflatable fun.',
    },
    {
        id: 'churches',
        icon: HeartHandshake,
        title: 'Churches & Nonprofits',
        description: 'Community outreach events, festivals, and youth gatherings we are proud to support your mission.',
    },
    {
        id: 'corporate',
        icon: Building2,
        title: 'Corporate & Company Events',
        description: 'Team outings, company picnics, and employee appreciation days with equipment that impresses.',
    },
];

const highlights = [
    {
        id: 'delivery',
        icon: Truck,
        title: 'Delivery, Setup & Teardown',
        description: 'Our team handles every step so you can focus entirely on your guests.',
    },
    {
        id: 'safety',
        icon: ShieldCheck,
        title: 'Safety Inspected',
        description: 'Every unit is inspected and sanitized before each rental to meet our safety standards.',
    },
    {
        id: 'variety',
        icon: Star,
        title: 'Wide Selection',
        description: 'Bounce houses, water slides, combos, tents, and generators. We cover every need.',
    },
    {
        id: 'booking',
        icon: CalendarCheck,
        title: 'Simple Booking Process',
        description: 'Browse online, send an inquiry, and get confirmation. No complicated forms or phone runarounds.',
    },
];

export default function AboutPage() {
    return (
        <div>
            {/* Hero */}
            <div className='bg-primary px-4 py-16 text-center text-primary-foreground md:px-8 md:py-24'>
                <h1 className='mt-3 text-4xl font-bold md:text-5xl lg:text-6xl'>
                    About <span className='text-secondary'>Us</span>
                </h1>
                <p className='mx-auto mt-3 max-w-2xl text-base text-primary-foreground/80 sm:text-lg'>
                    Jump For Joy Inflatables was built to help families and event hosts create stress-free celebrations
                    with dependable rentals and friendly service right here in the Chandler, AZ area.
                </p>
            </div>

            <div className='space-y-12 py-10 md:space-y-16 md:py-16'>

                {/* Our Story + Stats */}
                <div className='mx-auto max-w-6xl flex flex-col-reverse items-center gap-6 px-4 md:px-8 lg:flex-row lg:gap-16'>
                    <div className='max-w-2xl lg:max-w-lg space-y-4'>
                        <p className='uppercase tracking-[0.18em] text-sm font-semibold text-primary'>Our Story</p>
                        <h2 className='text-3xl font-bold text-foreground md:text-4xl'>
                            Built for the Community,<br className='hidden md:block' /> Powered by Fun
                        </h2>
                        <p className='text-muted-foreground leading-relaxed'>
                            We started with a simple goal: provide clean, safe, and exciting inflatables backed by
                            reliable delivery and professional setup. Over the years we have supported hundreds of
                            birthdays, school functions, church events, and neighborhood celebrations across the
                            greater Chandler area.
                        </p>
                        <p className='text-muted-foreground leading-relaxed'>
                            We specialize in making the rental process easy. From the moment you browse our catalog
                            to the final teardown, every detail is handled. We believe a great event starts with
                            equipment you can trust and a team that shows up on time.
                        </p>
                        <p className='text-muted-foreground leading-relaxed'>
                            We serve communities across Chandler, Gilbert, Mesa, Tempe, Scottsdale, and 25+ nearby
                            cities. If you are planning an event in the East Valley, chances are we cover your area.
                        </p>
                    </div>
                    <div className='w-full max-w-2xl lg:max-w-lg grid gap-3 grid-cols-2 md:gap-4'>
                        {stats.map(stat => (
                            <div key={stat.label} className='w-full py-12 rounded-2xl border border-border bg-card text-center shadow-md'>
                                <p className='text-2xl font-bold text-primary md:text-4xl'>{stat.value}</p>
                                <p className='text-base text-muted-foreground md:text-lg'>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Who We Serve */}
                <div className='mx-auto max-w-6xl space-y-6 px-4 md:px-8'>
                    <div className='text-center space-y-2'>
                        <p className='uppercase tracking-[0.18em] text-sm font-semibold text-primary'>Our Customers</p>
                        <h2 className='text-3xl font-bold text-foreground'>Who We Serve</h2>
                        <p className='text-muted-foreground max-w-2xl mx-auto'>
                            We work with people of all backgrounds across the East Valley. Whether it is a small family
                            birthday or a large community event, we have the equipment and experience to make it work.
                        </p>
                    </div>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                        {whoWeServe.map(group => (
                            <div key={group.id} className='flex items-start gap-4 rounded-xl border border-border bg-card p-5'>
                                <Icon
                                    icon={group.icon}
                                    containerClassName='w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0'
                                    iconClassName='w-6 h-6 text-primary'
                                />
                                <div className='space-y-1'>
                                    <h3 className='text-xl font-semibold text-foreground'>{group.title}</h3>
                                    <p className='text-muted-foreground'>{group.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Choose Us */}
                <div className='bg-primary py-16 text-primary-foreground'>
                    <div className='mx-auto max-w-5xl space-y-6 px-4 md:px-8'>
                        <div className='text-center space-y-2'>
                            <p className='text-secondary uppercase tracking-widest font-semibold'>Why Choose Us</p>
                            <h2 className='text-3xl font-bold'>Everything Handled, Start to Finish</h2>
                            <p className='text-primary-foreground/70 max-w-2xl mx-auto'>
                                From the moment you browse to the last stake pulled, we make the rental experience as smooth as possible.
                            </p>
                        </div>
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                            {highlights.map(item => (
                                <div key={item.id} className='flex flex-col items-start gap-4 rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 p-5 md:flex-row'>
                                    <Icon
                                        icon={item.icon}
                                        containerClassName='w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center shrink-0'
                                        iconClassName='w-6 h-6 text-secondary'
                                    />
                                    <div className='space-y-1'>
                                        <h3 className='text-xl font-semibold'>{item.title}</h3>
                                        <p className='text-primary-foreground/80'>{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Core Values */}
                <div className='mx-auto max-w-6xl space-y-6 px-4 md:px-8'>
                    <div className='text-center space-y-2'>
                        <p className='uppercase tracking-[0.18em] text-sm font-semibold text-primary'>What Drives Us</p>
                        <h2 className='text-3xl font-bold text-foreground'>Our Core Values</h2>
                        <p className='text-muted-foreground max-w-2xl mx-auto'>
                            These are the principles that guide every rental, every delivery, and every interaction
                            we have with our customers and community.
                        </p>
                    </div>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                        {values.map(value => (
                            <div key={value.id} className='bg-card border border-border rounded-xl p-6 space-y-3 text-center'>
                                <div className='flex justify-center'>
                                    <Icon
                                        icon={value.icon}
                                        containerClassName='w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center'
                                        iconClassName='w-6 h-6 text-primary'
                                    />
                                </div>
                                <h3 className='text-xl font-semibold text-foreground'>{value.title}</h3>
                                <p className='text-muted-foreground'>{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="px-4 sm:px-8">
                    <div className='max-w-2xl w-full mx-auto p-6 sm:px-8 sm:py-12 rounded-2xl bg-primary text-center text-primary-foreground space-y-4'>
                        <h2 className='text-2xl font-bold sm:text-3xl'>Thinking About <span className="text-secondary">Renting Party Equipment?</span></h2>
                        <p className='text-primary-foreground/85'>
                            Browse our full catalog to see what we have available, or reach out directly and we will help
                            you find the perfect setup for your event size and budget.
                        </p>
                        <div className='mx-auto flex max-w-2x flex-col justify-center gap-3 pt-2 md:flex-row'>
                            <Link
                                to='/rentals'
                                className='w-full flex justify-center items-center gap-2 rounded-lg bg-accent px-8 py-3 font-semibold text-accent-foreground transition-colors hover:bg-accent/90'
                            >
                                <LayoutGrid className='w-4 h-4' />
                                Browse Rentals
                            </Link>
                            <Link
                                to='/contact'
                                className='w-full flex justify-center items-center gap-2 rounded-lg border border-primary-foreground/30 bg-primary-foreground/15 px-8 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/25'
                            >
                                <Mail className='w-4 h-4' />
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
