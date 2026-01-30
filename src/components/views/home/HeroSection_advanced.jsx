import { useState, useEffect } from 'react';

export default function HeroSectionAdvanced() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Sample services data - replace with your actual services
    const services = [
        {
            id: 1,
            title: "Web Development",
            description: "Modern, responsive websites that drive results",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
            bgColor: "from-blue-600 to-blue-800"
        },
        {
            id: 2,
            title: "Digital Marketing",
            description: "Strategic marketing campaigns that reach your audience",
            image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop",
            bgColor: "from-green-600 to-green-800"
        },
        {
            id: 3,
            title: "Consulting",
            description: "Expert advice to accelerate your business growth",
            image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&h=600&fit=crop",
            bgColor: "from-purple-600 to-purple-800"
        },
        {
            id: 4,
            title: "Support & Maintenance",
            description: "Ongoing support to keep your business running smoothly",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
            bgColor: "from-orange-600 to-orange-800"
        }
    ];

    // Auto-rotate slides
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % services.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [services.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % services.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
    };

    const currentService = services[currentSlide];

    return (
        <section className="relative h-full overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <img 
                    src={currentService.image} 
                    alt={currentService.title}
                    className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${currentService.bgColor} opacity-75 transition-all duration-1000`}></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-full text-white text-center px-4">
                <div className="max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        {currentService.title}
                    </h1>
                    <p className="text-xl md:text-2xl mb-8">
                        {currentService.description}
                    </p>
                    <button className="bg-white text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105">
                        Learn More
                    </button>
                </div>
            </div>

            {/* Navigation Arrows */}
            <button 
                onClick={prevSlide}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full w-12 h-12 flex items-center justify-center transition-all"
            >
                <div className="w-0 h-0 border-t-[6px] border-b-[6px] border-r-[10px] border-t-transparent border-b-transparent border-r-white"></div>
            </button>
            
            <button 
                onClick={nextSlide}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full w-12 h-12 flex items-center justify-center transition-all"
            >
                <div className="w-0 h-0 border-t-[6px] border-b-[6px] border-l-[10px] border-t-transparent border-b-transparent border-l-white"></div>
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {services.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                            index === currentSlide 
                                ? 'bg-white scale-125' 
                                : 'bg-white/50 hover:bg-white/75'
                        }`}
                    />
                ))}
            </div>

            {/* Service Counter */}
            <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full">
                {currentSlide + 1} / {services.length}
            </div>
        </section>
    );
}