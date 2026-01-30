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
                    const bgColors = ["bg-transparent", "bg-red-500", "bg-green-500", "bg-orange-500", "bg-gray-500"]

                    return (
                        <section key={section.id} className={`h-[calc(100vh-var(--h-nav))] ${bgColors[idx % bgColors.length]}`}>
                            {section.component}
                        </section>
                    )
                })
            }
        </div>
    )
}
