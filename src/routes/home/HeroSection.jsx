import { useState } from 'react';

const services = [
    {
        id: 1,
        title: "Slide 1",
        description: "Description 1",
        image: "img 1",
        bgColor: "bg-blue-200"
    },
    {
        id: 2,
        title: "Slide 2",
        description: "Description 2",
        image: "img 2",
        bgColor: "bg-blue-400"
        
    },
    {
        id: 3,
        title: "Slide 3",
        description: "Description 3",
        image: "img 3",
        bgColor: "bg-blue-600"
    },
    {
        id: 4,
        title: "Slide 4",
        description: "Description 4",
        image: "img 4",
        bgColor: "bg-blue-800"
    }
]

export default function HeroSection() {

    const [ currentSlide, setCurrentSlide ] = useState(0);

    function nextSlide() {
        setCurrentSlide(next => (next + 1) % services.length);
    }

    function prevSlide() {
        setCurrentSlide(current => (current - 1 + services.length) % services.length );
    }

    const currentService = services[currentSlide];

    return (
        <div class="hero-section w-full relative" style={{height: "calc(100vh - var(--h-nav))"}}>
            <div class={`image ${currentService.bgColor} w-full h-full absolute -z-1`}>

            </div>
            <h1 class="text-white w-full text-3xl text-center absolute z-0 bottom-1/3">{currentService.description}</h1>

            <div class="slide-title w-[150px] h-[40px] bg-orange-400 absolute top-1/30 right-1/20">
                <h2 class="text-center text-2xl">{currentService.title}</h2>
            </div>

            <button 
                class="left-arrow w-[75px] h-[75px] p-2 bg-gray-400 rounded-full absolute bottom-1/4 left-12 cursor-pointer"
                onClick={prevSlide}    
            >
                <img src="arrow-left.svg" class="w-full h-full"></img>
            </button>
            <button 
                class="right-arrow w-[75px] h-[75px] p-2 bg-gray-400  rounded-full absolute bottom-1/4 right-12 cursor-pointer"
                onClick={nextSlide}    
            >
                <img src="arrow-right.svg" />
            </button>

            <div class="slider w-[120px] h-[50px] bg-purple-500 absolute bottom-1/20 left-1/2 -translate-x-1/2 flex justify-around items-end px-3 pb-2 rounded-2xl">
                {
                    services.map((_, i) => (
                        <button 
                            key={i} 
                            class={`slide-dot rounded-full w-3 h-3 cursor-pointer ${
                                i === currentSlide 
                                    ? 'bg-purple-200'
                                    : 'bg-purple-400'
                            }`}
                        />
                    ))
                }
            </div>

        </div>
    )
}