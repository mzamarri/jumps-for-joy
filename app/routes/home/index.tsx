import HeroSection from './HeroSection'
import ServiceOverview from './ServiceOverview'
import Featured from './Featured'
import Locations from './Locations'
import RentalCategories from './RentalCategories'
import { AnimatePresence, motion } from "motion/react";

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
            <AnimatePresence>
                {sections.map((section, idx) => (
                    <motion.section
                        key={section.id}
                        initial={{ opacity: 0, y: 28, scale: 0.985 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20 }}
                        viewport={{ amount: 0.2, once: true }}
                        transition={{ duration: 0.45, ease: "easeOut", delay: idx * 0.06 }}
                    >
                        {section.component}
                    </motion.section>
                ))}
            </AnimatePresence>
        </div>
    )
}
