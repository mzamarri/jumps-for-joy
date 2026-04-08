import { useRef, useState } from "react"
import { Check } from "lucide-react"
import { Form, Outlet, useLocation } from "react-router"
import { initialRequestDraft } from "./types.js";


const stepperSections = [
    {
        step: 1,
        name: "Cart",
    },
    {
        step: 2,
        name: "Details",
    },
    {
        step: 3,
        name: "Review",
    }
]

export default function CartLayout() {
    const formRef = useRef(null);
    const [draft, setDraft] = useState(initialRequestDraft);

    return (
        <Form 
            ref={formRef} style={{"--h-stepper": "4rem"}}
            onSubmit={e => e.preventDefault()}
            className=""
        >
            <RentalRequestStepper />
            <Outlet context={{ draft, setDraft }} />
        </Form>
    )
}

function RentalRequestStepper() {
    const location = useLocation();

    console.log("Location " + location.pathname)
    let step = 1;
    if (location.pathname === "/details") {
        step = 2;
    } else if (location.pathname === "/review") {
        step = 3;
    }

    return (
        <div className='bg-card h-(--h-stepper) border-b border-border flex justify-center items-center'>
            <ol className='w-full max-w-lg flex justify-center items-center gap-4 px-4'>
                {stepperSections.map(s => (
                    <>
                        <li className='flex items-center gap-2'>
                            <div className={`w-8 h-8 sm:w-10 sm:h-10 font-bold rounded-full flex justify-center items-center ${
                                step > s.step 
                                    ? "bg-secondary text-secondary-foreground"
                                    : (step === s.step)
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-muted-foreground"
                            }`}>
                                {
                                    s.step < step
                                        ? <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                                        : s.step
                                }
                            </div>
                            <span className='hidden sm:inline font-semibold text-foreground' >
                                {s.name}
                            </span>
                        </li>
                        {s.step < 3 && <div className='h-px flex-1 bg-border '/>}
                    </>
                ))}
            </ol>
        </div>
    )
}
