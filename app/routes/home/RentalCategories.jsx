import { Link } from 'react-router'
import { SnapCarousel } from 'components/ui_features'
import { Castle } from 'lucide-react'
import categories from 'data/rentalCategories'

export default function HomeCategories() {
    return (
        <div className='relative w-full h-full bg-muted overflow-hidden py-12 px-24'>
            <div className='flex flex-col space-y-8'>
                <div className='text-center space-y-4'>
                    <span className='inline-flex items-center gap-2 font-semibold text-sm bg-secondary text-secondary-foreground py-2 px-4 rounded-full'>
                        <Castle className='w-4 h-4'/>
                        Get Started
                    </span>
                    <h1 className='text-6xl font-bold'>Browse by <span className='text-primary'>Categories</span></h1>
                    <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
                        Explore our different rental categories—from classic bounce houses and combo units
                        to water slides, obstacle courses, and party add-ons—so you can build the perfect
                        setup for your next event.
                    </p>
                </div>
                <div className='h-fit'>
                    <SnapCarousel cards={categories} Card={Card} visibleCount={3} />
                </div>
            </div>
        </div>
    )
}

function Card({ content }) {
    return (
        <Link
            to="/"
            className='block bg-card rounded-xl border border-border overflow-hidden shadow-md cursor-pointer'
        >
            <div className='h-64 bg-muted flex items-center justify-center'>
                <img
                    src={content.image}
                    alt={`${content.title} category`}
                    className='w-full h-full object-contain p-4 select-none pointer-events-none'
                    draggable={false}
                />
            </div>
            <div className='h-32 p-4 space-y-3'>
                <h1 className='text-xl font-semibold text-foreground'>{content.title}</h1>
                <p className='text-muted-foreground'>{content.description}</p>
            </div>
        </Link>
    )
}
