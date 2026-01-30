import { useState, useRef } from "react"
import { useBooking } from "context/BookingContext"
import CartSection from './CartSection'
import DetailsSection from "./DetailsSection"

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
    }
]

export default function Cart() {
    const [cart, setCart] = useState([...Array(20)].map((_, idx) => {
        return {
            id: idx,
            cost: (idx * 12) + 10,
            quantity: 1
        }
    }));

    const [ step, setStep ] = useState(1);
    const { booking } = useBooking();

    const Section = stepperSections.find(section => section.step === step).section;

    const updateQuantity = (id, newQuantity) => {
        setCart(cart.map(item => 
            item.id === id ? {...item, quantity: Math.max(1, newQuantity)} : item
        ))
    }

    const removeItem = (id) => {
        setCart(cart.filter(item => item.id !== id)) 
    }

    const calcSubTotal = () => cart.reduce((subTotal, item) => subTotal + (item.cost * item.quantity), 0)

    return (
        <>
            <RentalRequestStepper/>
        </>
    )
}

function RentalRequestStepper() {
    return (
        <div className='bg-gray-300'>
            <ol className='flex justify-center items-center'>
                <li className='flex items-center'>
                    <div className='w-12 h-12 bg-orange-400 rounded-full flex justify-center items-center'>
                        1
                    </div>
                    <p className='ml-4'>
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
