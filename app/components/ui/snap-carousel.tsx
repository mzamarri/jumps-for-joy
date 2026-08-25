import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { motion, animate, useMotionValue, type DragHandler } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DRAG_THRESHOLD = 60;
const HAS_DRAGGED_THRESHOLD = 10;

type SnapCarouselCard = {
    id: string | number;
};

type SnapCarouselProps<TCard extends SnapCarouselCard> = {
    cards?: TCard[];
    Card?: React.ComponentType<{ rentalCategory: TCard, hasDragged: RefObject<boolean> }>;
    visibleCount?: number;
    gap?: number;
};

export default function SnapCarousel<TCard extends SnapCarouselCard>({
    cards = [],
    Card,
    visibleCount = 3,
}: SnapCarouselProps<TCard>) {
    const [cardIndex, setCardIndex] = useState(0);
    const [visibleCards, setVisibleCards] = useState(visibleCount);
    const cardDraggedRef = useRef<boolean>(false);

    useEffect(() => {
        const sm = window.matchMedia("(max-width: 639px)");
        const md = window.matchMedia("(max-width: 1023px)");
        const updateVisibleCount = () => {
            if (sm.matches) {
                setVisibleCards(1);
            } else if (md.matches) {
                setVisibleCards(2);
            } else {
                setVisibleCards(3);
            }
        };
        updateVisibleCount();
        sm.addEventListener("change", updateVisibleCount);
        md.addEventListener("change", updateVisibleCount);
        return () => {
            sm.removeEventListener("change", updateVisibleCount);
            md.removeEventListener("change", updateVisibleCount);
        };
    }, [])

    const nextCard = () => setCardIndex(Math.min(cardIndex + 1, maxIndex));
    const prevCard = () => setCardIndex(Math.max(cardIndex - 1, 0));

    const handleHasDragged: DragHandler = (_event, info) => {
        if (!cardDraggedRef.current) {
            const delta = info.offset.x;
    
            if (delta <= -HAS_DRAGGED_THRESHOLD || delta >= HAS_DRAGGED_THRESHOLD) {
                cardDraggedRef.current = true;
            }
        }
    }

    const handleDragEnd: DragHandler = (_event, info) => {
        const delta = info.offset.x;

        if (delta <= -DRAG_THRESHOLD) {
            setCardIndex(Math.min(cardIndex + 1, maxIndex));
        }

        if (delta >= DRAG_THRESHOLD) {
            setCardIndex(Math.max(cardIndex - 1, 0));
        }
    };

    const maxIndex = cards.length - visibleCards;
    const canShift = visibleCount < cards.length;
    const canScrollRight = cardIndex < maxIndex;
    const canScrollLeft = cardIndex > 0;

    return (
        <div 
            className="relative w-fit"
        >
            <div 
                className="
                    overflow-hidden p-4 box-content
                    [--card-width:20rem]
                    [--card-gap:2rem]
                    [--step:calc(var(--card-width)+var(--card-gap))]
                "
            >
                <motion.div
                    style={{
                        width: `calc((${visibleCards - 1} * var(--card-gap)) + (${visibleCards} * var(--card-width)))`
                    }}
                    className=""
                    animate={{
                        x: `calc(-${cardIndex} * var(--step))`
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 360,
                        damping: 38
                    }}
                >
                    <motion.div
                        className={`w-max flex gap-(--card-gap)`}
                        drag={canShift ? "x" : false}
                        dragSnapToOrigin
                        dragConstraints={{left: 0, right: 0}}
                        dragElastic={0.2}
                        dragMomentum={false}
                        onDrag={handleHasDragged}
                        onDragEnd={handleDragEnd}
                    >
                        {cards.map(card => (
                            <div
                                key={card.id}
                                className="w-(--card-width)"
                            >
                                {Card ? <Card rentalCategory={card} hasDragged={cardDraggedRef} /> : null}
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {canShift && (
                <>
                    <button
                        type="button"
                        aria-label="Previous cards"
                        onClick={prevCard}
                        className={`absolute left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md disabled:opacity-40 sm:left-3 sm:h-11 sm:w-11 ${
                            canScrollLeft ? 'cursor-pointer hover:bg-muted' : 'cursor-default'
                        }`}
                        disabled={!canScrollLeft}
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        type="button"
                        aria-label="Next cards"
                        onClick={nextCard}
                        className={`absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md disabled:opacity-40 sm:right-3 sm:h-11 sm:w-11 ${
                            canScrollRight ? 'cursor-pointer hover:bg-muted' : 'cursor-default'
                        }`}
                        disabled={!canScrollRight}
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </>
            )}
        </div>
    );
}
