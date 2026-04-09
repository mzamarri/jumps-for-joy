import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DRAG_THRESHOLD = 60;

export default function SnapCarousel({
    cards = [],
    Card,
    visibleCount = 3,
    gap = 16,
}) {
    const viewportRef = useRef(null);
    const [cardIndex, setCardIndex] = useState(0);
    const [cardWidth, setCardWidth] = useState(0);
    const [cardsPerView, setCardsPerView] = useState(visibleCount);

    const maxIndex = useMemo(
        () => Math.max(0, cards.length - cardsPerView),
        [cards.length, cardsPerView]
    );

    useEffect(() => {
        setCardIndex(prev => Math.min(prev, maxIndex));
    }, [maxIndex]);

    useLayoutEffect(() => {
        const measure = () => {
            if (!viewportRef.current) return;
            const width = viewportRef.current.clientWidth;
            const nextVisibleCount = width < 640
                ? 1
                : width < 1024
                    ? Math.min(2, visibleCount)
                    : visibleCount;

            setCardsPerView(nextVisibleCount);

            const nextCardWidth = (width - gap * (nextVisibleCount - 1)) / nextVisibleCount;
            setCardWidth(Math.max(0, nextCardWidth));
        };

        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [visibleCount, gap]);

    const nextCard = () => setCardIndex(prev => Math.min(prev + 1, maxIndex));
    const prevCard = () => setCardIndex(prev => Math.max(prev - 1, 0));

    const handleDragEnd = (_, info) => {
        const delta = info.offset.x;

        if (delta <= -DRAG_THRESHOLD) {
            setCardIndex(prev => Math.min(prev + 1, maxIndex));
            return;
        }

        if (delta >= DRAG_THRESHOLD) {
            setCardIndex(prev => Math.max(prev - 1, 0));
            return;
        }

        setCardIndex(prev => prev);
    };

    const canShift = cards.length > cardsPerView;
    const canScrollLeft = cardIndex > 0;
    const canScrollRight = cardIndex < maxIndex;
    const step = cardWidth + gap;
    const translateX = -(cardIndex * step);
    const dragLeftLimit = -(maxIndex * step);

    return (
        <div className="relative w-full">
            <div ref={viewportRef} className="overflow-hidden">
                <motion.div
                    className="flex"
                    style={{ gap }}
                    animate={{ x: translateX }}
                    transition={{ type: "spring", stiffness: 360, damping: 38 }}
                    drag={canShift ? "x" : false}
                    dragConstraints={{ left: dragLeftLimit, right: 0 }}
                    dragElastic={0.06}
                    dragMomentum={false}
                    onDragEnd={handleDragEnd}
                >
                    {cards.map(card => (
                        <div
                            key={card.id}
                            className="shrink-0"
                            style={{ width: cardWidth }}
                        >
                            {Card ? <Card content={card} /> : null}
                        </div>
                    ))}
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
