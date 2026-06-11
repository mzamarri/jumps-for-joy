import { Search } from 'lucide-react'
import RentalCategoryCard from "components/contentful/ctf-rental-category-card";
import { graphql } from 'lib/gql/client';
import { apolloLoader } from 'app/apollo.server';
import type { Route } from './+types';
import { useReadQuery } from '@apollo/client/react';
import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import { isPreview } from "app/apollo.server"

const RentalCategoriesQueryDocument = graphql(`
    query RentalCategories($preview: Boolean) {
        rentalCategoriesGroup: groupedContentCollection(limit: 25, where: { groupType: "rental-categories" }, preview: $preview) {
            items {
                __typename
                sys {
                    id
                }
                rentalCategoriesCollection {
                    items {
                        __typename
                        sys {
                            id
                        }
                        ...RentalCategoryCardFields
                    }
                }
            }
        }
        rentalCategoryCollection(limit: 25) {
            items {
                __typename
                sys {
                    id
                }
                ...RentalCategoryCardFields
            }
        }
    }
`)

export const loader = apolloLoader<Route.LoaderArgs>()(({ preloadQuery }) => {
    const variables = { preview: isPreview };
    const rentalCategoriesRef = preloadQuery(RentalCategoriesQueryDocument, { variables });

    return { rentalCategoriesRef }
});

export default function Rentals({ loaderData }: Route.ComponentProps) {
    const { data } = useReadQuery(loaderData.rentalCategoriesRef);
    const liveData = useContentfulLiveUpdates(data);
    const rentalCategoriesGroup = liveData?.rentalCategoriesGroup?.items[0]?.rentalCategoriesCollection?.items.filter(item => item !== null) ?? [];
    const rentalCategoryCollection = liveData?.rentalCategoryCollection?.items.filter(item => {
        if (item === null) return false
        return !rentalCategoriesGroup.some(groupItem => groupItem?.sys?.id === item.sys.id);
    }) ?? [];
    const rentalCategories = [ ...rentalCategoriesGroup, ...rentalCategoryCollection ]

    return (
        <div className='px-4 py-8 space-y-4 sm:px-6 lg:px-24'>
            <title>Bounce Houses, Water Slides, Dry Slides & More Party Rentals</title>
            <meta name='description' content='Browse our selection of bounce houses, water slides, tents, tables, chairs, generators, and party rentals available in Chandler, Arizona and surrounding communities.' />
            <div className='text-center space-y-3'>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground font-semibold text-sm rounded-full">
                    <Search className="w-4 h-4" /> Browse Our Collection
                </span>
                <h1 className='text-foreground text-4xl font-bold sm:text-5xl lg:text-6xl'>Rental Categories</h1>
                <p className="text-muted-foreground text-base sm:text-lg">Choose a category to browse our selection of rental items</p>
            </div>
            <ul className='grid grid-cols-2 gap-4 p-4 lg:grid-cols-3'>
                {
                    rentalCategories.map(category => <RentalCategoryCard rentalCategory={category} />)
                }
            </ul>
        </div>
    )
}
