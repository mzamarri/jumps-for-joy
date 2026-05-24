import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValue } from 'motion/react';
import arrowLeft from '../../assets/arrow-left.svg';
import arrowRight from '../../assets/arrow-right.svg';

const DRAG_BUFFER = 50;
const GAP = 4;

type CarouselCard = {
    id: string | number;
};

type CarouselProps<TCard extends CarouselCard> = {
    cards?: TCard[];
    Card?: React.ComponentType<{ content: TCard }>;
};

export default function Carousel<TCard extends CarouselCard>({ cards = [], Card: _Card }: CarouselProps<TCard>) {
    const dragX = useMotionValue(0);
    const [ cardIndex, setCardIndex ] = useState(0);
    const [ cardOffset, setCardOffset ] = useState(0);
    const cardRef = useRef<HTMLDivElement | null>(null); 

    console.log("Card index: " + cardIndex)
    console.log("dragX: " + dragX.get());
    console.log("Card Offset: " + cardOffset);

    useLayoutEffect(() => {
        if (!cardRef.current) return
        setCardOffset(cardRef.current.offsetLeft)
    }, [cardIndex])

    const handleDragEnd = () => { 
        const x = dragX.get();
        console.log(x);
        console.log("card index on dragEnd: " + cardIndex);
        console.log("cards length: " + cards.length)

        if (x <= -DRAG_BUFFER && cardIndex < cards.length - 3) {
            setCardIndex(cardIndex + 1);
            console.log(cardIndex);

        } else if (x >= DRAG_BUFFER && cardIndex > 0) {
            setCardIndex(cardIndex - 1);
            console.log(cardIndex);
        }

        dragX.set(0); 
    }

    const prevCard = () => {
        if (cardIndex > 0) setCardIndex(cardIndex - 1);
    }

    const nextCard = () => {
        if (cardIndex < cards.length - 3) setCardIndex(cardIndex + 1);
    }

    return (
        <div className='h-full'>
            <div className="carousel h-full w-full overflow-hidden">
                <motion.div 
                    className={`flex gap-${GAP} h-full`}
                    style={{x: dragX}}
                    drag="x"
                    dragConstraints={{
                        left: 0,
                        right: 0
                    }}
                    animate={{ 
                        translateX: -cardOffset
                    }}
                    onDragEnd={handleDragEnd}
                >
                    {cards.map((card, idx) => (
                        <div 
                            key={card.id}
                            ref={ idx === cardIndex ? cardRef : null}
                            className='bg-gray-500 h-96 shrink-0'
                            style={{
                                width: `calc((100% - (2 * var(--spacing) * ${GAP})) / 3)`
                            }}
                        >
                           
                        </div>
                    ))}
                </motion.div>
            </div>
            <button
                type="button"
                className='absolute top-1/2 left-16 bg-gray-400 w-14 h-14 rounded-full'
                onClick={prevCard}
            >
                <img src={arrowLeft} className='' alt=''/>
            </button>
            <button
                type="button"
                className='absolute top-1/2 right-16 bg-gray-400 w-14 h-14 rounded-full'
                onClick={nextCard}
            >
                <img src={arrowRight} className='w-full h-full' alt='' />
            </button>
        </div>
        
    )
}
