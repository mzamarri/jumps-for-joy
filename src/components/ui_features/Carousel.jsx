import { useRef, useState } from 'react';
import { motion, useMotionValue } from 'motion/react';

const DRAG_BUFFER=50;

export default function Carousel({ data=[] }) {
    const cardsRef = useRef([]);
    const dragX = useMotionValue(0);
    const [cardIndex, setCardIndex] = useState(0);

    const cards = data.map(item => (
        <Card 
            key={item.id}  
            item={item} 
            ref={dn => cardsRef.current[item.id] = dn}
        />
    ));

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
        <div className='h-full w-full absolute'>
            <div className="carousel h-full w-full bg-gray-300 overflow-hidden">
                <motion.div 
                    className="flex gap-3 h-full"
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
                    {cards}
                </motion.div>
            </div>
            <button 
                className='absolute top-1/2 -left-7 bg-gray-400 w-14 h-14 rounded-full'
                onClick={prevCard}
            >
                <img src='arrow-left.svg' className=''/>
            </button>
            <button 
                className='absolute top-1/2 -right-7 bg-gray-400 w-14 h-14 rounded-full'
                onClick={nextCard}
            >
                <img src='arrow-right.svg' className='w-full h-full' />
            </button>
        </div>
        
    )
}

function Card({ref}) {
    return (
        <div 
            class="card shrink-0 bg-yellow-100 w-[calc((100%-(2*(3*var(--spacing))))/3)] h-full rounded-3xl"
            ref={ref}
        >
            
        </div>
    )
}