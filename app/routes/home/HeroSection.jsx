import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight, Phone } from 'lucide-react'
import slide1 from "../../assets/inside-bounce-house.png"
import slide2 from "../../assets/party-setup.png"
import slide3 from "../../assets/event-setup.png"
import slide4 from "../../assets/event-worker.png"

const services = [
    {
        id: 1,
        title: {
            primaryFg: "Jump For Joy",
            secondary: "Inflatables"
        },
        subtitle: "1 Peter 1:8",
        description: "From backyard birthdays to school festivals, we deliver bright, clean inflatables that turn ordinary gatherings into easy, joy-filled events everyone remembers.",
        image: slide1,
        bgColor: "bg-primary/70"
    },
    {
        id: 2,
        title: {
            primaryFg: "Rentals For",
            secondary: "Every Occasion"
        },
        subtitle: "From Birthdays to Block Parties",
        description: "Choose from bounce houses, slides, tents, tables, and event essentials that help you build a setup that fits your space, crowd, and schedule.",
        image: slide2,
        bgColor: "bg-primary/70"
        
    },
    {
        id: 3,
        title: {
            primaryFg: "Why",
            secondary: "Choose Us"
        },
        subtitle: "Safe, Clean & Fun",
        description: "Our team arrives on time, sets up with care, and keeps safety first so families, schools, and churches can enjoy a smooth event with confidence.",
        image: slide3,
        bgColor: "bg-primary/70"
    },
    {
        id: 4,
        title: {
            primaryFg: "Ready To ",
            secondary: "Get Started"
        },
        subtitle: "Simple Booking, Helpful Support",
        description: "Browse the rentals, request what you need, and reach out during business hours for guidance on the best options for your celebration.",
        image: slide4,
        bgColor: "bg-primary/70"
    }
]

export default function HeroSection() {

    const [ currentSlide, setCurrentSlide ] = useState(0);
    const touchStartX = useRef(null);
    const touchStartY = useRef(null);

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

    function handleTouchStart(event) {
        const touch = event.touches[0];
        touchStartX.current = touch.clientX;
        touchStartY.current = touch.clientY;
    }

    function handleTouchEnd(event) {
        if (touchStartX.current === null || touchStartY.current === null) return;

        const touch = event.changedTouches[0];
        const deltaX = touch.clientX - touchStartX.current;
        const deltaY = touch.clientY - touchStartY.current;

        if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }

        touchStartX.current = null;
        touchStartY.current = null;
    }

    const currentService = services[currentSlide];

    return (
        <>
            <div className="hero-section flex flex-col pb-8 bg-primary md:hidden">
                <div
                    className="relative aspect-video overflow-hidden touch-pan-y"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentService.image}
                            src={currentService.image}
                            alt={`${currentService.title.primaryFg} ${currentService.title.secondary}`}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </AnimatePresence>
                    <div className={`absolute inset-0 ${currentService.bgColor}`} />
                    <div className="absolute inset-0 bg-linear-to-t from-primary/45 via-transparent to-primary/10" />

                    <div className="absolute inset-0 z-10 flex">
                        <button
                            type="button"
                            aria-label="Previous slide"
                            onClick={prevSlide}
                            className="flex flex-1 items-center justify-start px-4"
                        >
                            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/20 text-primary-foreground/80 backdrop-blur-sm">
                                <ChevronLeft className="h-5 w-5" />
                            </span>
                        </button>
                        <button
                            type="button"
                            aria-label="Next slide"
                            onClick={nextSlide}
                            className="flex flex-1 items-center justify-end px-4"
                        >
                            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/20 text-primary-foreground/80 backdrop-blur-sm">
                                <ChevronRight className="h-5 w-5" />
                            </span>
                        </button>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 z-20 bg-linear-to-t from-primary/65 to-transparent px-4 pb-4 pt-10">
                        <div className="flex items-center justify-center gap-1.5">
                            {
                                services.map((_, i) => (
                                    <button 
                                        key={i} 
                                        onClick={() => setCurrentSlide(i)}
                                        className={`slide-dot rounded-full h-2.5 cursor-pointer transition-all ${
                                            i === currentSlide 
                                                ? 'bg-secondary w-8'
                                                : 'bg-primary-foreground/40 w-2.5'
                                        }`}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>

                <div className="flex flex-1 flex-col justify-between bg-primary px-5 pb- pt-5">
                    <div className="flex flex-col justify-between">
                        <p className="w-fit rounded-full bg-secondary text-secondary-foreground px-4 py-1 text-sm font-bold uppercase tracking-[0.2em">
                            Party Rentals
                        </p>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentService.id}
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.45, ease: "easeOut" }}
                                className="flex h-[16.5rem] flex-col justify-center space-y-3 sm:h-[17rem]"
                            >
                                <h1 className='text-4xl leading-tight font-bold text-primary-foreground'>
                                    {currentService.title.primaryFg} <span className='text-secondary'>{currentService.title.secondary}</span>
                                </h1>
                                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                                    {currentService.subtitle}
                                </p>
                                <p className="text-sm leading-7 text-primary-foreground/90">
                                    {currentService.description}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        <div className='min-h-30'>
                            <div className='flex flex-col gap-3'>
                                <button className='font-semibold bg-accent hover:bg-accent/90 text-accent-foreground px-5 py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer'>
                                    Browse Rentals <ArrowRight className='w-4 h-4'/>
                                </button>
                                <button 
                                    className='font-semibold text-primary-foreground hover:bg-primary-foreground/10 border-2 border-primary-foreground/30 hover:border-primary-foreground/50 px-5 py-3 rounded-xl cursor-pointer flex items-center justify-center gap-2'
                                >
                                    <Phone className='w-4 h-4'/> Contact Us
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hero-section relative hidden w-full overflow-hidden bg-primary md:block" style={{height: "calc(100vh - var(--h-nav))"}}>
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

                <div className="slide-title px-4 py-2 bg-secondary/30 text-primary-foreground rounded-full absolute top-8 right-16 z-20">
                    <h2 className="text-center text-lg">{currentService.id}/{services.length}</h2>
                </div>
                <div className='absolute inset-0 z-10 flex flex-col justify-end gap-8'>
                    <div className='flex flex-col items-center justify-center px-8 text-center'>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentService.id}
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.45, ease: "easeOut" }}
                                className='flex h-[18rem] max-w-5xl flex-col items-center justify-center space-y-5 lg:h-[19rem]'
                            >
                                <h1 className='text-primary-foreground font-bold text-6xl'>
                                    {currentService.title.primaryFg} <span className='text-secondary'>{currentService.title.secondary}</span>
                                </h1>
                                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-secondary md:text-base">
                                    {currentService.subtitle}
                                </p>
                                <p className="w-full px-24 text-xl text-primary-foreground/90">
                                    {currentService.description}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                        <div className='mt-8 min-h-15'>
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
                        </div>
                    </div>
                    <div className='w-full pb-10'>
                        <div className='flex justify-center items-center gap-8'>
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
                </div>
            </div>
        </>
    )
}
