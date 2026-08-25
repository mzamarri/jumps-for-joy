import { SnapCarousel } from 'components/ui'
import { Castle } from 'lucide-react'
import RentalCategoryCard from 'components/contentful/ctf-rental-category-card'
import type { SectionProps } from '.'

export default function HomeCategories({ queryData }: SectionProps) {
    const rentalCategoriesGroup = queryData?.rentalCategoriesGroup?.items[0]?.rentalCategoriesCollection?.items.filter(item => item !== null) ?? [];
    const rentalCategoryCollection = queryData?.rentalCategoryCollection?.items.filter(item => {
        if (item === null) return false
        return !rentalCategoriesGroup.some(groupItem => groupItem?.sys?.id === item.sys.id);
    }) ?? [];
    const rentalCategories = [ ...rentalCategoriesGroup, ...rentalCategoryCollection ]

    return (
        <div className='relative w-full overflow-hidden px-4 py-8 sm:px-6 lg:px-24'>
            <div className='flex flex-col space-y-8 md:space-y-10 items-center'>
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
                <SnapCarousel cards={[...rentalCategories, ...rentalCategories, ...rentalCategories, ...rentalCategories, ...rentalCategories]} Card={RentalCategoryCard} visibleCount={3} />
            </div>
        </div>
    )
}
