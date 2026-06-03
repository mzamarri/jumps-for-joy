import HeroSection from './hero-section'
import ServiceOverview from './service-overview'
import Featured from './featured'
import Locations from './locations'
import RentalCategories from './rental-categories'
import { useOutletContext } from 'react-router'
import { useReadQuery } from '@apollo/client/react'
import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import type { HeroSlidesQuery } from '../../lib/gql/client/graphql';
import type { RootOutletContext } from '../../root';

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

export default function Home() {
    const { heroSlidesRef } = useOutletContext<RootOutletContext>();
    const heroSlidesData = useReadQuery(heroSlidesRef);
    const liveHeroSlidesData = useContentfulLiveUpdates(heroSlidesData.data as HeroSlidesQuery | undefined);

    return (
        <div className='home relative z-0 overflow-hidden'>
            {sections.map(section => (
                <section key={section.id}>
                    {
                        section.id === "hero-section"
                            ? (
                                <section.component
                                    queryData={liveHeroSlidesData}
                                />
                            )
                            : <section.component />
                    }
                </section>
            ))}
        </div>
    );
}
