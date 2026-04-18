import HeroSection from './HeroSection'
import ServiceOverview from './ServiceOverview'
import Featured from './Featured'
import Locations from './Locations'
import RentalCategories from './RentalCategories'

const sections = [
    {
        id: "hero-section",
        component: <HeroSection/>
    },
    {
        id: "service-overview",
        component: <ServiceOverview/>
    },{
        id: "featured",
        component: <Featured/>
    },
    {
        id: "location",
        component: <Locations/>
    },
    {
        id: "rental-categories",
        component: <RentalCategories/>
    }
]

export default function Home() {
    return (
        <div className='home relative z-0 overflow-hidden'>
            {sections.map(section => (
                <section key={section.id}>
                    {section.component}
                </section>
            ))}
        </div>
    )
}
