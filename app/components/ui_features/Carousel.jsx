import { useRef, useState } from 'react';
import { motion, useMotionValue } from 'motion/react';

const DRAG_BUFFER = 50;
const GAP = 4;

export default function Carousel({ cards=[] }) {
    const cardsRef = useRef([]);
    const dragX = useMotionValue(0);
    const [cardIndex, setCardIndex] = useState(0);

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
    }

    const prevCard = () => {
        if (cardIndex > 0) setCardIndex(cardIndex - 1);
    }

    const nextCard = () => {
        if (cardIndex < cards.length - 3) setCardIndex(cardIndex + 1);
    }

    const cardOffset = cardsRef.current[cardIndex] ? cardsRef.current[cardIndex].offsetLeft : 0;

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
                    {cards.map((card, i) => (
                        <div 
                            key={i}
                            className='h-[95%] shrink-0 bg-white border border-gray-400 rounded-lg shadow-xl' 
                            style={{width: `calc((100% - 2 * (${GAP} * var(--spacing))) / 3)`}}
                            ref={dn => cardsRef.current[i] = dn}
                        >
                            {card}
                        </div>
                    ))}
                </motion.div>
            </div>
            <button 
                className='absolute top-1/2 left-16 bg-gray-400 w-14 h-14 rounded-full'
                onClick={prevCard}
            >
                <img src='arrow-left.svg' className=''/>
            </button>
            <button 
                className='absolute top-1/2 right-16 bg-gray-400 w-14 h-14 rounded-full'
                onClick={nextCard}
            >
                <img src='arrow-right.svg' className='w-full h-full' />
            </button>
        </div>
        
    )
}