import { HeroSection, ServiceOverview, Featured, Locations, RentalCategories } from './'

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
            {
                sections.map((section, idx) => {

                    return (
                        <section key={section.id} className={`flex`}>
                            {section.component}
                        </section>
                    )
                })
            }
        </div>
    )
}
