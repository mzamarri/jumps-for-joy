import { Link, useOutletContext } from 'react-router'
import { SnapCarousel } from 'components/ui'
import { Castle } from 'lucide-react'
import { useReadQuery } from '@apollo/client/react'
import { graphql, useFragment } from 'app/lib/gql/client'
import type { RootOutletContext } from 'app/root'

type RentalCategory = {
    id: string;
    slug: string;
    categoryName: string;
    shortDescription: string;
    imageUrl: string;
};

const RentalCategoryCardFieldsFragment = graphql(`
    fragment RentalCategoryCardFields on RentalCategory {
        sys {
            id
        }
        categoryName
        shortDescription
        categoryImage {
            contentType
            url
        }
        slug
    }
`)

export default function HomeCategories() {
    const { rentalCategoriesRef } = useOutletContext<RootOutletContext>();
    const { data } = useReadQuery(rentalCategoriesRef);
    const categoryItems = data.rentalCategoryCollection?.items.filter(item => item !== null) ?? [];
    const categories = useFragment(RentalCategoryCardFieldsFragment, categoryItems).flatMap(category => {
        if (!category.slug || !category.categoryImage?.url) return [];

        return [{
            id: category.sys.id,
            slug: category.slug,
            categoryName: category.categoryName ?? "Rental category",
            shortDescription: category.shortDescription ?? "",
            imageUrl: category.categoryImage.url
        }];
    });

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
                    <SnapCarousel cards={categories} Card={Card} visibleCount={3} />
                </div>
            </div>
        </div>
    )
}

function Card({ content }: { content: RentalCategory }) {
    return (
        <Link
            to={`/rentals/${content.slug}`}
            className='block overflow-hidden rounded-xl border border-border bg-card shadow-md transition-transform hover:cursor-pointer hover:-translate-y-1'
        >
            <div className='flex aspect-square items-center justify-center bg-muted md:h-64 md:aspect-auto'>
                <img
                    src={content.imageUrl}
                    alt={`${content.categoryName} category`}
                    className='w-full h-full object-contain p-3 select-none pointer-events-none md:p-4'
                    draggable={false}
                />
            </div>
            <div className='min-h-28 space-y-2 p-3 md:min-h-32 md:space-y-3 md:p-4'>
                <h1 className='text-lg font-semibold text-foreground md:text-xl'>{content.categoryName}</h1>
                <p className='text-xs leading-5 text-muted-foreground md:text-base'>{content.shortDescription}</p>
            </div>
        </Link>
    )
}
