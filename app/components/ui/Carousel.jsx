import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue } from 'motion/react';
import arrowLeft from '../../assets/arrow-left.svg';
import arrowRight from '../../assets/arrow-right.svg';

const DRAG_BUFFER = 50;
const GAP = 4;

export default function Carousel({ cards=[], Card }) {
    const dragX = useMotionValue(0);
    const [ cardIndex, setCardIndex ] = useState(0);
    const [ cardOffset, setCardOffset ] = useState(0);
    const cardRef = useRef(null); 

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
                className='absolute top-1/2 left-16 bg-gray-400 w-14 h-14 rounded-full'
                onClick={prevCard}
            >
                <img src={arrowLeft} className=''/>
            </button>
            <button 
                className='absolute top-1/2 right-16 bg-gray-400 w-14 h-14 rounded-full'
                onClick={nextCard}
            >
                <img src={arrowRight} className='w-full h-full' />
            </button>
        </div>
        
    )
}
