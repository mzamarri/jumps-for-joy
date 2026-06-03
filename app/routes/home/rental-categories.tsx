import { Link, useOutletContext } from 'react-router'
import { SnapCarousel } from 'components/ui'
import { Castle } from 'lucide-react'
import { useReadQuery } from '@apollo/client/react'
import { useContentfulLiveUpdates } from '@contentful/live-preview/react'
import type { RootOutletContext } from 'app/root'
import type { RentalCategoriesQuery } from 'app/lib/gql/client/graphql'
import RentalCategoryCard from 'components/contentful/ctf-rental-category-card'

export default function HomeCategories() {
    const { rentalCategoriesRef } = useOutletContext<RootOutletContext>();
    const { data } = useReadQuery(rentalCategoriesRef);
    const liveData = useContentfulLiveUpdates(data as RentalCategoriesQuery | undefined);
    const categoryItems = liveData?.rentalCategoryCollection?.items.filter(item => item !== null) ?? [];

    return (
        <div className='relative w-full overflow-hidden px-4 py-8 sm:px-6 lg:px-24'>
            <div className='flex flex-col space-y-8 md:space-y-10'>
                <div className='text-center space-y-4'>
                    <span className='inline-flex items-center gap-2 font-semibold text-sm bg-secondary text-secondary-foreground py-2 px-4 rounded-full'>
                        <Castle className='w-4 h-4'/>
                        Get Started
                    </span>
                    <h1 className='text-4xl font-bold sm:text-5xl lg:text-6xl'>Browse by Categories</h1>
                    <p className='mx-auto max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg'>
                        Explore our different rental categories—from classic bounce houses and combo units
                        to water slides, obstacle courses, and party add-ons—so you can build the perfect
                        setup for your next event.
                    </p>
                </div>
                <div className='h-fit'>
                    <SnapCarousel cards={categoryItems} Card={RentalCategoryCard} visibleCount={3} />
                </div>
            </div>
        </div>
    )
}
