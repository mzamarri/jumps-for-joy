import { useState, useRef, useEffect } from "react"
import CartSection from './CartSection'
import DetailsSection from "./DetailsSection"
import ReviewSection from "./ReviewSection"
import { CartProvider } from "context/CartContext"

const stepperSections = [
    {
        step: 1,
        name: "cart",
        section: CartSection
    },
    {
        step: 2,
        name: "details",
        section: DetailsSection
    },
    {
        step: 3,
        name: "review",
        section: ReviewSection
    }
]

export default function Cart() {
    const [ step, setStep ] = useState(1);
    const formRef = useRef(null);

    const nextStep = () => setStep(step + 1);
    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    return (
        <CartProvider>
            <form 
                ref={formRef} style={{"--h-stepper": "4rem"}}
                onSubmit={e => e.preventDefault()}
                className=""
            >
                <RentalRequestStepper prevStep={prevStep}/>
                <div className="px-24">
                    <Section
                        formRef={formRef}
                        step={step} 
                        nextStep={nextStep} 
                        prevStep={prevStep}
                    />
                </div>
            </form>
        </CartProvider>
    )
}

function Section({ formRef, step, nextStep, prevStep }) {
    const sectionRef = useRef(null);

    const SectionContent = stepperSections.find(section => section.step === step).section;

    useEffect(() => window.scrollTo({ top: 0 }), [step])

    return (
        <section ref={sectionRef} className="">
            <SectionContent formRef={formRef} nextStep={nextStep} prevStep={prevStep}/>
        </section>
    )
}

function RentalRequestStepper({ prevStep }) {
    return (
        <div className='sticky top-(--h-nav) z-1'>
            <button
                type="button"
                className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-gray-400 rounded-md"
                onClick={prevStep}
            >
                Go Back
            </button>
            <ol className='min-h-(--h-stepper) flex justify-center items-center bg-gray-200'>
                <li className='flex items-center'>
                    <div className='w-12 h-12 bg-orange-400 rounded-full flex justify-center items-center'>
                        1
                    </div>
                    <p className='ml-4' >
                        Cart
                    </p>
                    <div className='h-px w-24 mx-4 bg-black '/>
                </li>
                <li className='flex items-center'>
                    <div className='w-12 h-12 bg-orange-400 rounded-full flex justify-center items-center'>
                        2
                    </div>
                    <p className='ml-4'>
                        Details
                    </p>
                    <div className='h-px w-24 mx-4 bg-black'/>
                </li>
                <li className='flex items-center'>
                    <div className='w-12 h-12 bg-orange-400 rounded-full flex justify-center items-center'>
                        3
                    </div>
                    <p className='ml-4'>
                        Review
                    </p>
                </li>
            </ol>
        </div>
    )
}
