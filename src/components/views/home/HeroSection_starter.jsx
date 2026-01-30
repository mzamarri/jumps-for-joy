// STARTER VERSION - Build up to the advanced version step by step!

export default function HeroSectionStarter() {
    return (
        <section className="h-screen bg-blue-500 flex items-center justify-center text-white">
            <div className="text-center">
                <h1 className="text-5xl font-bold mb-4">
                    Welcome to Our Business
                </h1>
                <p className="text-xl mb-8">
                    We provide amazing services
                </p>
                <button className="bg-white text-blue-500 px-6 py-3 rounded">
                    Get Started
                </button>
            </div>
        </section>
    );
}

/* 
LEARNING PATH - Build these features step by step:

1. BASIC HERO (above) ✅
   - Full screen height
   - Centered content
   - Simple styling

2. ADD BACKGROUND IMAGE
   - Replace bg-blue-500 with background image
   - Add overlay for text readability

3. ADD STATE FOR MULTIPLE SLIDES
   - useState for currentSlide
   - Array of services data

4. ADD MANUAL NAVIGATION
   - Previous/Next buttons
   - Click handlers

5. ADD SLIDE INDICATORS
   - Dots at bottom
   - Click to jump to slide

6. ADD AUTO-ROTATION
   - useEffect with setInterval
   - Auto-advance every few seconds

7. ADD SMOOTH TRANSITIONS
   - CSS transitions
   - Fade effects

8. ADD ADVANCED STYLING
   - Backdrop blur
   - Hover effects
   - Responsive design

CONCEPTS TO LEARN:
- React hooks (useState, useEffect)
- Array methods (map, length)
- Conditional rendering
- Event handlers
- CSS positioning (absolute, relative)
- CSS transitions and animations
- Responsive design with Tailwind
*/