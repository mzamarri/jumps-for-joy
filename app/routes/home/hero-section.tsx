import { useEffect, useMemo, useRef, useState } from 'react';
import type { MouseEvent, TouchEvent } from 'react';
import { Link } from "react-router"
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, LayoutGrid, Phone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import slide1 from "../../assets/inside-bounce-house.png"
import slide2 from "../../assets/party-setup.png"
import slide3 from "../../assets/event-setup.png"
import slide4 from "../../assets/event-worker.png"
import { useFragment } from '../../lib/gql/client/fragment-masking';
import { graphql } from '../../lib/gql/client/';
import type { HeroSlidesQuery } from '../../lib/gql/client/graphql';
import { useContentfulInspectorMode } from '@contentful/live-preview/react';

type HeroSectionProps = {
    queryData?: HeroSlidesQuery;
};

type HeroSlide = {
    id: string;
    title: {
        foreground: string;
        secondary: string;
    };
    subTitle: string;
    description: string;
    image: string;
    imageAlt: string;
    bgColor: string;
};

type CtaComponent = {
    id: string;
    internalName: string;
    ctaText: string;
    targetPage: string;
    Icon: LucideIcon | null;
};
const HeroSlideFieldsFragment = graphql(`
    fragment HeroSlideFields on HeroSlide {
    __typename
    sys {
        __typename
        id
    }
    internalName
    titleForegroundColor
    titleSecondaryColor
    slidePosition
    subTitle
    description
    slideImage {
        url
        title
        description
    }
    }
`)

const fallbackSlides: HeroSlide[] = [
    {
        id: "fallback-1",
        title: {
            foreground: "Jump For Joy",
            secondary: "Inflatables"
        },
        subTitle: "1 Peter 1:8",
        description: "From backyard birthdays to school festivals, we deliver bright, clean inflatables that turn ordinary gatherings into easy, joy-filled events everyone remembers.",
        image: slide1,
        imageAlt: "Inside a bounce house",
        bgColor: "bg-primary/70"
    },
    {
        id: "fallback-2",
        title: {
            foreground: "More Than Just",
            secondary: "Bounce Houses"
        },
        subTitle: "From Birthdays to Block Parties",
        description: "Choose from bounce houses, slides, tents, tables, and event essentials that help you build a setup that fits your space, crowd, and schedule.",
        image: slide2,
        imageAlt: "Party setup with event rentals",
        bgColor: "bg-primary/70"
        
    },
    {
        id: "fallback-3",
        title: {
            foreground: "Why",
            secondary: "Choose Us"
        },
        subTitle: "Safe, Clean & Fun",
        description: "Our team arrives on time, sets up with care, and keeps safety first so families, schools, and churches can enjoy a smooth event with confidence.",
        image: slide3,
        imageAlt: "Outdoor event rental setup",
        bgColor: "bg-primary/70"
    },
    {
        id: "fallback-4",
        title: {
            foreground: "Ready To",
            secondary: "Get Started"
        },
        subTitle: "Simple Booking, Helpful Support",
        description: "Browse the rentals, request what you need, and reach out during business hours for guidance on the best options for your celebration.",
        image: slide4,
        imageAlt: "Event worker setting up rentals",
        bgColor: "bg-primary/70"
    }
]

const fallbackCtas: CtaComponent[] = [
    {
        id: "fallback-rentals",
        internalName: "Browse rentals",
        ctaText: "Browse Rentals",
        targetPage: "/rentals",
        Icon: LayoutGrid
    },
    {
        id: "fallback-contact",
        internalName: "Contact us",
        ctaText: "Contact Us",
        targetPage: "/contact",
        Icon: Phone
    }
];

const MotionDiv = motion.div;
const MotionImg = motion.img;
const preloadedHeroImages = new Map<string, HTMLImageElement>();

function preloadHeroImage(src: string) {
    if (typeof window === 'undefined' || preloadedHeroImages.has(src)) return;

    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
        preloadedHeroImages.set(src, image);
    };
    image.onerror = () => {
        preloadedHeroImages.delete(src);
    };
    preloadedHeroImages.set(src, image);
    image.src = src;
}

function isDesktopViewport() {
    if (typeof window === 'undefined') return false;

    return window.matchMedia('(min-width: 1024px)').matches;
}

function TapHintOverlay({ visible }: { visible: boolean }) {
    return (
        <AnimatePresence>
            {
                visible ? (
                    <MotionDiv
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                        className="pointer-events-none absolute inset-0 z-40 flex text-primary-foreground lg:hidden"
                        aria-hidden="true"
                    >
                        <div className="flex w-1/3 items-center justify-start border-r border-primary-foreground/10 bg-primary-foreground/5 px-4 md:px-6">
                            <div className="flex items-center gap-2 rounded-full bg-primary/28 px-4 py-2 backdrop-blur-md shadow-[0_10px_28px_rgba(15,23,42,0.28)]">
                                <ChevronLeft className="h-5 w-5 shrink-0" />
                                <span className="text-xs font-semibold uppercase tracking-[0.24em]">Tap</span>
                            </div>
                        </div>
                        <div className="w-1/3" />
                        <div className="flex w-1/3 items-center justify-end border-l border-primary-foreground/10 bg-primary-foreground/5 px-4 md:px-6">
                            <div className="flex items-center gap-2 rounded-full bg-primary/28 px-4 py-2 backdrop-blur-md shadow-[0_10px_28px_rgba(15,23,42,0.28)]">
                                <span className="text-xs font-semibold uppercase tracking-[0.24em]">Tap</span>
                                <ChevronRight className="h-5 w-5 shrink-0" />
                            </div>
                        </div>
                    </MotionDiv>
                ) : null
            }
        </AnimatePresence>
    );
}

function normalizeImageUrl(url?: string | null) {
    if (!url) return "";
    return url.startsWith("//") ? `https:${url}` : url;
}

function normalizeTargetPage(targetPage: string) {
    if (!targetPage) return "/";
    if (targetPage.startsWith("/")) return targetPage;
    return `/${targetPage}`;
}

function getCtaClassName(index: number, viewport: "mobile" | "desktop") {
    if (viewport === "mobile") {
        return index === 0
            ? "font-semibold bg-accent hover:bg-accent/90 text-accent-foreground px-5 py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
            : "font-semibold text-primary-foreground hover:bg-primary-foreground/10 border-2 border-primary-foreground/30 hover:border-primary-foreground/50 px-5 py-3 rounded-xl cursor-pointer flex items-center justify-center gap-2";
    }

    return index === 0
        ? "font-semibold bg-accent hover:bg-accent/90 text-accent-foreground px-9 py-3 rounded-lg flex items-center gap-2 cursor-pointer"
        : "font-semibold text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 border border-primary-foreground/30 hover:border-primary-foreground/50 px-9 py-3 rounded-lg cursor-pointer flex items-center gap-2";
}

function HeroCtaLinks({
    ctas,
    viewport
}: {
    ctas: CtaComponent[];
    viewport: "mobile" | "desktop";
}) {
    return (
        <>
            {ctas.map((cta, index) => {
                const Icon = cta.Icon;

                return (
                    <Link
                        key={cta.id}
                        to={normalizeTargetPage(cta.targetPage)}
                        className={getCtaClassName(index, viewport)}
                        aria-label={cta.internalName}
                    >
                        {Icon ? <Icon className='w-4 h-4' /> : null}
                        {cta.ctaText}
                    </Link>
                );
            })}
        </>
    );
}

export default function HeroSection({ queryData }: HeroSectionProps) {
    const slideItems = queryData?.heroSlideCollection?.items.filter(
        (item): item is NonNullable<typeof item> => item !== null
    ) ?? [];
    const heroSlides = useFragment(HeroSlideFieldsFragment, slideItems);
    const services = useMemo<HeroSlide[]>(() => {
        const sortedHeroSlides = heroSlides
            .map((slide, originalIndex) => ({ slide, originalIndex }))
            .sort((a, b) => (
                (a.slide.slidePosition ?? Number.MAX_SAFE_INTEGER)
                - (b.slide.slidePosition ?? Number.MAX_SAFE_INTEGER)
                || a.originalIndex - b.originalIndex
            ));
        const mappedSlides = sortedHeroSlides.flatMap(({ slide }, index) => {
            const fallbackSlide = fallbackSlides[index];
            const image = normalizeImageUrl(slide.slideImage?.url) || fallbackSlide?.image;

            if (!image) return [];

            return [{
                id: slide.sys.id,
                title: {
                    foreground: slide.titleForegroundColor ?? fallbackSlide?.title.foreground ?? "",
                    secondary: slide.titleSecondaryColor ?? fallbackSlide?.title.secondary ?? ""
                },
                subTitle: slide.subTitle ?? fallbackSlide?.subTitle ?? "",
                description: slide.description ?? fallbackSlide?.description ?? "",
                image,
                imageAlt: slide.slideImage?.description
                    ?? slide.slideImage?.title
                    ?? slide.titleForegroundColor
                    ?? fallbackSlide?.imageAlt
                    ?? "Hero slide",
                bgColor: fallbackSlide?.bgColor ?? "bg-primary/70"
            }];
        });

        return mappedSlides.length > 0 ? mappedSlides : fallbackSlides;
    }, [heroSlides]);
    const ctas = fallbackCtas;

    const [ currentSlide, setCurrentSlide ] = useState(0);
    const [ canAutoplay, setCanAutoplay ] = useState(false);
    const [ showTapHint, setShowTapHint ] = useState(false);
    const touchStartX = useRef<number | null>(null);
    const touchStartY = useRef<number | null>(null);
    const mobileHeroRef = useRef<HTMLDivElement | null>(null);
    const desktopHeroRef = useRef<HTMLDivElement | null>(null);
    const autoplayTimeoutRef = useRef<number | null>(null);
    const tapHintTimeoutRef = useRef<number | null>(null);
    const hasShownTapHintRef = useRef(false);

    useEffect(() => {
        setCurrentSlide(prev => Math.min(prev, services.length - 1));
    }, [services.length]);

    useEffect(() => {
        const imageUrls = [...new Set(services.map(service => service.image).filter(Boolean))];

        imageUrls.forEach(preloadHeroImage);
    }, [services]);

    useEffect(() => {
        const heroSections = [mobileHeroRef.current, desktopHeroRef.current].filter(
            (section): section is HTMLDivElement => section !== null
        );

        if (isDesktopViewport()) {
            setCanAutoplay(true);
            return;
        }

        if (!heroSections.length || hasShownTapHintRef.current) return;

        const observer = new IntersectionObserver(
            entries => {
                if (
                    hasShownTapHintRef.current
                    || isDesktopViewport()
                    || !entries.some(entry => entry.isIntersecting)
                ) return;

                hasShownTapHintRef.current = true;
                setShowTapHint(true);

                if (tapHintTimeoutRef.current) {
                    clearTimeout(tapHintTimeoutRef.current);
                }

                tapHintTimeoutRef.current = window.setTimeout(() => {
                    setShowTapHint(false);
                    setCanAutoplay(true);
                    tapHintTimeoutRef.current = null;
                }, 2800);

                observer.disconnect();
            },
            {
                threshold: 0.45
            }
        );

        heroSections.forEach(section => observer.observe(section));

        return () => {
            observer.disconnect();

            if (tapHintTimeoutRef.current) {
                clearTimeout(tapHintTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        clearAutoplayTimer();

        if (!canAutoplay) return;

        autoplayTimeoutRef.current = window.setTimeout(() => {
            setCurrentSlide(prev => (prev + 1) % services.length);
        }, 6500);

        return () => {
            clearAutoplayTimer();
        };
    }, [canAutoplay, currentSlide]);

    function clearAutoplayTimer() {
        if (autoplayTimeoutRef.current) {
            clearTimeout(autoplayTimeoutRef.current);
            autoplayTimeoutRef.current = null;
        }
    }

    function dismissTapHint() {
        setShowTapHint(false);
        setCanAutoplay(true);

        if (tapHintTimeoutRef.current) {
            clearTimeout(tapHintTimeoutRef.current);
            tapHintTimeoutRef.current = null;
        }
    }

    function nextSlide() {
        clearAutoplayTimer();
        dismissTapHint();
        setCurrentSlide(next => (next + 1) % services.length);
    }

    function prevSlide() {
        clearAutoplayTimer();
        dismissTapHint();
        setCurrentSlide(current => (current - 1 + services.length) % services.length);
    }

    function goToSlide(index: number) {
        if (index === currentSlide) return;

        clearAutoplayTimer();
        dismissTapHint();
        setCurrentSlide(index);
    }

    function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
        const touch = event.touches[0];
        touchStartX.current = touch.clientX;
        touchStartY.current = touch.clientY;
    }

    function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
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

    function isInteractiveTarget(target: EventTarget | null) {
        if (!(target instanceof Element)) return false;

        return Boolean(
            target.closest('a, button, input, select, textarea, summary, [role="button"]')
        );
    }

    function handleHeroTap(event: MouseEvent<HTMLDivElement>) {
        if (isDesktopViewport() || isInteractiveTarget(event.target)) return;

        const bounds = event.currentTarget.getBoundingClientRect();
        const tapX = event.clientX - bounds.left;
        const zoneWidth = bounds.width / 3;

        if (tapX <= zoneWidth) {
            prevSlide();
            return;
        }

        if (tapX >= bounds.width - zoneWidth) {
            nextSlide();
        }
    }

    const currentService = services[currentSlide] ?? services[0];
    const inspectorProps = useContentfulInspectorMode({ entryId: currentService.id });

    

    return (
        <>
            <div
                ref={mobileHeroRef}
                className="relative md:hidden"
                onClick={handleHeroTap}
            >
                <div className="hero-section flex flex-col pb-8 bg-primary">
                    <div
                        className="relative aspect-video overflow-hidden touch-pan-y"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        <AnimatePresence mode="wait">
                            <MotionImg
                                key={currentService.image}
                                src={currentService.image}
                                alt={currentService.imageAlt}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.02 }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        </AnimatePresence>
                        <div className={`absolute inset-0 ${currentService.bgColor}`} />
                        <div className="absolute inset-0 bg-linear-to-t from-primary/45 via-transparent to-primary/10" />
                        <div className="absolute bottom-3 left-0 right-0 z-10 flex items-center justify-center gap-1.5">
                            {
                                services.map((_, i) => (
                                    <button 
                                        key={i} 
                                        onClick={() => goToSlide(i)}
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

                    <div className="flex flex-1 flex-col justify-between bg-primary px-5 pb- pt-5">
                        <div className="flex flex-col justify-between">
                            <p className="w-fit rounded-full bg-secondary text-secondary-foreground px-4 py-1 text-sm font-bold uppercase tracking-[0.2em">
                                Party Rentals
                            </p>
                            <AnimatePresence mode="wait">
                                <MotionDiv
                                    key={currentService.id}
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -12 }}
                                    transition={{ duration: 0.45, ease: "easeOut" }}
                                    className="flex h-[16.5rem] flex-col justify-center space-y-3 sm:h-[17rem]"
                                >
                                    <h1 className='text-4xl leading-tight font-bold text-primary-foreground'>
                                        <span {...(inspectorProps({ fieldId: "titleForegroundColor" }) ?? {})}>
                                            {currentService.title.foreground}
                                        </span>{" "}
                                        <span
                                            className='text-secondary'
                                            {...(inspectorProps({ fieldId: "titleSecondaryColor" }) ?? {})}
                                        >
                                            {currentService.title.secondary}
                                        </span>
                                    </h1>
                                    <p
                                        className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary"
                                        {...(inspectorProps({ fieldId: "subTitle" }) ?? {})}
                                    >
                                        {currentService.subTitle}
                                    </p>
                                    <p
                                        className="text-sm leading-7 text-primary-foreground/90"
                                        {...(inspectorProps({ fieldId: "description" }) ?? {})}
                                    >
                                        {currentService.description}
                                    </p>
                                </MotionDiv>
                            </AnimatePresence>

                            <div className='min-h-30'>
                                <div className='flex flex-col gap-3'>
                                    <HeroCtaLinks ctas={ctas} viewport="mobile" />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <TapHintOverlay visible={showTapHint} />
            </div>

            <div
                ref={desktopHeroRef}
                className="hero-section relative hidden w-full overflow-hidden bg-primary md:block"
                style={{height: "calc(100vh - var(--h-nav))"}}
                onClick={handleHeroTap}
            >
                <AnimatePresence mode="wait">
                    <MotionDiv
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
                    <h2 className="text-center text-lg">{currentSlide + 1}/{services.length}</h2>
                </div>
                <div className='absolute inset-0 z-10 flex flex-col justify-end gap-8'>
                    <div className='flex flex-col items-center justify-center px-8 text-center'>
                        <AnimatePresence mode="wait">
                            <MotionDiv
                                key={currentService.id}
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.45, ease: "easeOut" }}
                                className='flex h-[18rem] max-w-5xl flex-col items-center justify-center space-y-5 lg:h-[19rem]'
                            >
                                <h1 className='text-primary-foreground font-bold text-6xl lg:text-7xl'>
                                    <span {...(inspectorProps({ fieldId: "titleForegroundColor" }) ?? {})}>
                                        {currentService.title.foreground}
                                    </span>{" "}
                                    <span
                                        className='text-secondary'
                                        {...(inspectorProps({ fieldId: "titleSecondaryColor" }) ?? {})}
                                    >
                                        {currentService.title.secondary}
                                    </span>
                                </h1>
                                <p
                                    className="text-sm font-semibold uppercase tracking-widest text-secondary md:text-lg"
                                    {...(inspectorProps({ fieldId: "subTitle" }) ?? {})}
                                >
                                    {currentService.subTitle}
                                </p>
                                <p
                                    className="w-full px-24 text-xl text-primary-foreground/90"
                                    {...(inspectorProps({ fieldId: "description" }) ?? {})}
                                >
                                    {currentService.description}
                                </p>
                            </MotionDiv>
                        </AnimatePresence>
                        <div className='mt-8 min-h-15'>
                            <div className='flex flex-wrap justify-center gap-8'>
                                <HeroCtaLinks ctas={ctas} viewport="desktop" />
                            </div>
                            <div className="mt-4 flex justify-center lg:hidden">
                                <div className="slider space-x-1">
                                    {
                                        services.map((_, i) => (
                                            <button 
                                                key={i} 
                                                onClick={() => goToSlide(i)}
                                                className={`slide-dot rounded-full h-3 cursor-pointer ${
                                                    i === currentSlide 
                                                        ? 'bg-secondary w-9'
                                                        : 'bg-primary-foreground/40 w-3'
                                                }`}
                                            />
                                        ))
                                    }
                                </div>
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
                            <div className="slider hidden lg:block space-x-1">
                                {
                                    services.map((_, i) => (
                                        <button 
                                            key={i} 
                                            onClick={() => goToSlide(i)}
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

                <TapHintOverlay visible={showTapHint} />
            </div>
        </>
    )
}
