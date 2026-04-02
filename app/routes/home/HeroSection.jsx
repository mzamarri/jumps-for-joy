import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight, Phone } from 'lucide-react'
import slide1 from "/slide1.png"
import slide2 from "/party-setup.png"
import slide3 from "/event-setup.png"
import slide4 from "/event-worker.png"

const services = [
    {
        id: 1,
        title: {
            primaryFg: "Jump For Joy",
            secondary: "Inflatables"
        },
        description: "Welcome to Jump For Joy Inflatables, where unforgettable celebrations begin. From backyard birthdays to big community events, we bring safe, clean, and exciting inflatable fun that keeps guests smiling all day.",
        image: slide1,
        bgColor: "bg-primary/70"
    },
    {
        id: 2,
        title: {
            primaryFg: "Rentals For",
            secondary: "Every Occasion"
        },
        description: "We offer a full range of event rentals to help make planning simple and stress-free. From inflatables and party essentials to event setup support, our team helps you create the right experience for any occasion.",
        image: slide2,
        bgColor: "bg-primary/70"
        
    },
    {
        id: 3,
        title: {
            primaryFg: "Why",
            secondary: "Choose Us"
        },
        description: "Families and event hosts choose us for dependable service, quality equipment, and a team that truly cares about your event. We show up on time, prioritize safety, and make sure everything is ready for a smooth, fun day.",
        image: slide3,
        bgColor: "bg-primary/70"
    },
    {
        id: 4,
        title: {
            primaryFg: "Ready To ",
            secondary: "Get Started"
        },
        description: "Ready to plan your event? Keep scrolling to explore our rentals and key details, or contact us during business hours and we will help you choose the perfect options for your celebration.",
        image: slide4,
        bgColor: "bg-primary/70"
    }
]

export default function HeroSection() {

    const [ currentSlide, setCurrentSlide ] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % services.length);
        }, 6500);

        return () => clearInterval(timer);
    }, []);

    function nextSlide() {
        setCurrentSlide(next => (next + 1) % services.length);
    }

    function prevSlide() {
        setCurrentSlide(current => (current - 1 + services.length) % services.length);
    }

    const currentService = services[currentSlide];

    return (
        <div className="hero-section w-full bg-primary relative overflow-hidden" style={{height: "calc(100vh - var(--h-nav))"}}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentService.image}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{backgroundImage: `url(${currentService.image})`}}
                />
            </AnimatePresence>
            <div className={`absolute inset-0 ${currentService.bgColor}`} />
            
            <div className="slide-title px-4 py-2 bg-secondary/30 text-primary-foreground rounded-full absolute top-8 right-16">
                <h2 className="text-center text-lg">{currentService.id}/{services.length}</h2>
            </div>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentService.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className='relative top-1/2 z-0 text-center space-y-6 flex flex-col items-center'
                >
                    <h1 className='text-primary-foreground font-bold text-6xl'>{currentService.title.primaryFg} <span className='text-secondary'>{currentService.title.secondary}</span></h1>
                    <p className="container px-24 text-primary-foreground/90 w-full text-xl">{currentService.description}</p>
                    {currentSlide === 3 && (
                        <div className='flex gap-8'>
                            <button className='font-semibold bg-accent hover:bg-accent/90 text-accent-foreground px-9 py-3 rounded-lg flex items-center gap-2 cursor-pointer'>
                                Browse Rentals <ArrowRight className='w-4 h-4'/>
                            </button>
                            <button 
                                className='font-semibold text-primary-foreground hover:bg-primary-foreground/10 border-2 border-primary-foreground/30 hover:border-primary-foreground/50 px-9 py-3 rounded-lg cursor-pointer flex items-center gap-2'
                            >
                                <Phone className='w-4 h-4'/> Contact Us
                            </button>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
            <div className='absolute bottom-1/12 w-full flex justify-center items-center gap-8'>
                <button 
                    className="left-arrow w-15 h-15 p-2 bg-secondary/30 text-primary-foreground rounded-full cursor-pointer"
                    onClick={prevSlide}    
                >
                    <ChevronLeft className='w-full h-full' />
                </button>
                <div className="slider space-x-1">
                    {
                        services.map((_, i) => (
                            <button 
                                key={i} 
                                onClick={() => setCurrentSlide(i)}
                                className={`slide-dot rounded-full h-3 cursor-pointer ${
                                    i === currentSlide 
                                        ? 'bg-secondary w-9'
                                        : 'bg-primary-foreground/40 w-3'
                                }`}
                            />
                        ))
                    }
                </div>
                <button 
                    className="right-arrow w-15 h-15 p-2 bg-secondary/30 text-primary-foreground  rounded-full cursor-pointer"
                    onClick={nextSlide}    
                >
                    <ChevronRight className='w-full h-full' />
                </button>

            </div>

        </div>
    )
}
