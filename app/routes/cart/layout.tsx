import { useState, useRef, useEffect } from "react"
import { CartProvider } from "context/CartContext"
import { Form, Outlet } from "react-router"


const stepperSections = [
    {
        step: 1,
        name: "cart",
    },
    {
        step: 2,
        name: "details",
    },
    {
        step: 3,
        name: "review",
    }
]

export default function CartLayout() {
    const formRef = useRef(null);

    return (
        <CartProvider>
            <Form 
                ref={formRef} style={{"--h-stepper": "4rem"}}
                onSubmit={e => e.preventDefault()}
                className=""
            >
                <RentalRequestStepper/>
                <div className="px-24">
                    <Outlet/>
                </div>
            </Form>
        </CartProvider>
    )
}

// function Section({ formRef, step, nextStep, prevStep, className }) {
//     const sectionRef = useRef(null);

//     const SectionContent = stepperSections.find(section => section.step === step).section;

//     useEffect(() => window.scrollTo({ top: 0 }), [step])

//     return (
//         <section ref={sectionRef} className={className}>
//             <SectionContent formRef={formRef} nextStep={nextStep} prevStep={prevStep}/>
//         </section>
//     )
// }

function RentalRequestStepper() {
    return (
        <div className='sticky top-(--h-nav) z-1 bg-brand-yellow'>
            <button
                type="button"
                className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-brand-blue text-white rounded-md hover:bg-brand-blue-dark hover:cursor-pointer"
            >
                Go Back
            </button>
            <div className="">
                <ol className='min-h-(--h-stepper) flex justify-center items-center '>
                    <li className='flex items-center'>
                        <div className='w-12 h-12 bg-brand-blue border-2 border-brand-blue text-white rounded-full flex justify-center items-center'>
                            1
                        </div>
                        <p className='ml-2' >
                            Cart
                        </p>
                        <div className='h-px w-24 mx-4 bg-black '/>
                    </li>
                    <li className='flex items-center'>
                        <div className='w-12 h-12 bg-white border-2 border-brand-blue text-brand-blue-dark rounded-full flex justify-center items-center'>
                            2
                        </div>
                        <p className='ml-2'>
                            Details
                        </p>
                        <div className='h-px w-24 mx-4 bg-black'/>
                    </li>
                    <li className='flex items-center'>
                        <div className='w-12 h-12 bg-white border-2 border-brand-blue text-brand-blue-dark rounded-full flex justify-center items-center'>
                            3
                        </div>
                        <p className='ml-2'>
                            Review
                        </p>
                    </li>
                </ol>
            </div>
        </div>
    )
}
