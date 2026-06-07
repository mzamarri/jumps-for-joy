import HeroSection from './hero-section'
import ServiceOverview from './service-overview'
import Featured from './featured'
import Locations from './locations'
import RentalCategories from './rental-categories'
import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { useReadQuery } from '@apollo/client/react'
import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import type { HomeContentQuery } from '../../lib/gql/client/graphql';
import { apolloLoader, isPreview } from 'app/apollo.server'
import type { Route } from './+types/index'
import { graphql } from 'lib/gql/client'

export type SectionProps = {
    queryData?: HomeContentQuery | null,
    isPreview?: Boolean
}

const HomeContentQueryDocument = graphql(`
    query HomeContent($preview: Boolean) {
        featuredItems: groupedContentCollection(limit: 6, where: { groupType: "featured" }, preview: $preview) {
            items {
                __typename
                sys {
                    id
                }
                featuredCardsCollection {
                    items {
                        __typename
                        sys {
                            id
                        }
                        ...RentalItemCard
                    }
                }
            }
        }
        heroSlides: groupedContentCollection(limit: 4, where: { groupType: "hero" }, preview: $preview) {
            items {
                __typename
                sys {
                    id
                }
                groupType
                heroSlidesCollection {
                    items {
                        __typename
                        sys {
                            id
                        }
                        ...HeroSlideFields
                    }
                }
            }
        }
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
        rentalCategoryCollection(limit: 25, preview: $preview) {
            items {
                __typename
                sys {
                    id
                }
                ...RentalCategoryCardFields
            }
        }
    }
`);

const sections = [
    {
        id: "hero-section",
        component: HeroSection
    },
    {
        id: "service-overview",
        component: ServiceOverview
    },{
        id: "featured",
        component: Featured
    },
    {
        id: "location",
        component: Locations
    },
    {
        id: "rental-categories",
        component: RentalCategories
    }
]

export const loader = apolloLoader<Route.LoaderArgs>()(({ preloadQuery }) => {
    const variables = { preview: isPreview };
    const homeContentRef = preloadQuery(HomeContentQueryDocument, { variables });

    return {
        homeContentRef,
        isPreview
    }
})

export default function Home({ loaderData }: Route.ComponentProps) {
    const homeContentData = useReadQuery(loaderData.homeContentRef);
    const liveHomeContentData = useContentfulLiveUpdates(homeContentData.data);

    const location = useLocation();
    useEffect(() => {
        const id = location.hash.replace("#", "");
        if (loaderData.isPreview && ["featured", "hero"].includes(id)) {
            document.getElementById(id)?.scrollIntoView();
        }
    }, [])

    return (
        <div className='home relative z-0 overflow-hidden'>
            {sections.map(section => (
                <section key={section.id}>
                    <section.component
                        queryData={liveHomeContentData}
                        isPreview={loaderData.isPreview}
                    />
                </section>
            ))}
        </div>
    );
}
