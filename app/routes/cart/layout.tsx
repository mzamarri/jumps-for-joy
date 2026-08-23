import { useState } from "react"
import { Check } from "lucide-react"
import { Outlet, useLocation } from "react-router"
import { readStorageDraft } from "./util/storage.js";
import { useCart } from "context/cart-context.js";
import { useAppConfig } from "context/app-config-context.js";
import type { Route } from "./+types/layout.js";


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

// Create a loader function to preload any form data or start fresh. As of now 
// there is a bug with link in details.tsx. Since useEffect calls setDraft after
// loading draft from local storage, the time before causes link to navigate even
// if the fields contains errors. 
export async function clientLoader() {
    const draft = readStorageDraft();
    return { draft }
}

export function HydrateFallback() {
    return <div className="h-full">is Loading...</div>
}

export default function CartLayout({ loaderData }: Route.ComponentProps) {
    const [ draft, setDraft ] = useState(loaderData.draft);
    const { booking } = useAppConfig();
    const { cart } = useCart();
    const cost = {
        subTotal: cart.reduce((subTotal, item) => subTotal + (item.cost * (item.singleItem ? 1 : item.quantity)), 0),
        deliveryFee: booking.deliveryFee,
    }

    return (
        <div style={{"--h-stepper": "4rem"}}>
            <RentalRequestStepper />
            <Outlet context={{ draft, setDraft, cost }} />
        </div>
    )
}

function RentalRequestStepper() {
    const location = useLocation();

    console.log("Location " + location.pathname)
    let step = 1;
    if (location.pathname === "/cart/details") {
        step = 2;
    } else if (location.pathname === "/cart/review") {
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
