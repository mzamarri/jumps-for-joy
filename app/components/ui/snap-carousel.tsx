import { useEffect, useLayoutEffect, useMemo, useRef, useState, type RefObject } from "react";
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
    const x = useMotionValue(0);

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

    const animateToIndex = (nextIndex: number) => {
        setCardIndex(nextIndex);

        const translateX = -nextIndex * step;

        animate(x, translateX, {
            type: "spring",
            stiffness: 360,
            damping: 38
        });
    }

    const nextCard = () => animateToIndex(Math.min(cardIndex + 1, maxIndex));
    const prevCard = () => animateToIndex(Math.max(cardIndex - 1, 0));

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

        let nextIndex = cardIndex;
        if (delta <= -DRAG_THRESHOLD) {
            nextIndex = Math.min(cardIndex + 1, maxIndex);
        }

        if (delta >= DRAG_THRESHOLD) {
            nextIndex = Math.max(cardIndex - 1, 0);
        }

        animateToIndex(nextIndex);
    };

    const cardWidth = 384; // 384px = 24rem
    const gap = 32; // 32px = 2rem;
    const step = cardWidth + gap;
    const containerWidth = (3 * cardWidth) + (2 * gap);
    const maxIndex = cards.length - visibleCards;
    const dragLeftLimit = -maxIndex * step;

    const canShift = visibleCount < cards.length;
    const canScrollRight = cardIndex < maxIndex;
    const canScrollLeft = cardIndex > 0;

    return (
        <div className="relative w-full">
            <div 
                className="overflow-hidden p-4 box-content  "
                style={{width: containerWidth}}
            >
                <div
                    style={{width: containerWidth}}
                >
                    <motion.div
                        className={`w-max`}
                        style={{ 
                            x,
                            display: "flex",
                            gap
                        }}
                        drag={canShift ? "x" : false}
                        dragConstraints={{left: dragLeftLimit, right: 0}}
                        dragElastic={0.1}
                        dragMomentum={false}
                        onDrag={handleHasDragged}
                        onDragEnd={handleDragEnd}
                    >
                        {cards.map(card => (
                            <div
                                key={card.id}
                                style={{
                                    width: cardWidth
                                }}
                            >
                                {Card ? <Card rentalCategory={card} hasDragged={cardDraggedRef} /> : null}
                            </div>
                        ))}
                    </motion.div>
                </div>
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
