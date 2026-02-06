import { useCart } from 'context/CartContext'
import { useState } from 'react';

export default function DetailsSection({ formRef, nextStep }) {
    const { formData } = useCart();
    const [ canProceed, setCanProceed ] = useState(false);

    const handleNext = () => {
        if (canProceed) {
            const form = new FormData(formRef.current);
            formData.current = {
                primaryContact: {
                    firstName: form.get("firstName"),
                    lastName: form.get("lastName"),
                    phoneNumber: form.get("phoneNumber"),
                    email: form.get("email")
                },
                rentalAddress: {
                    street: form.get("street"),
                    unit: form.get("unit"),
                    city: form.get("city"),
                    state: form.get("state"),
                    zip: form.get("zip")
                },
                schedule: {
                    date: form.get("date"),
                    time: form.get("time"),
                    duration: form.get("duration")
                },
                notes: form.get("notes")
            }
            nextStep();
        } 
    }

    return (
        <>
            <div className='text-center space-y-2'>
                <h1 className='text-6xl font-semibold'>Request Details</h1>
                <p className='text-gray-500'>This will help us prepare an accurate quote & schedule</p>
            </div>
            <div className='bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg'>
                <PrimaryContact/>
                <RentalAddress/>
                <RentalSchdule/>
                <Notes/>
                <div className="flex justify-center space-x-2 py-8 mx-4 border-y border-gray-300">
                    <input
                        type="checkbox"
                        id="agree"
                        name="agree"
                        onChange={e => setCanProceed(e.target.checked)}
                    />
                    <label htmlFor="agree" className="flex justify-center">
                        I understand this is a request, not a booking
                    </label>
                </div>
                <div className='flex justify-center py-8'>
                    <button 
                        type="button"
                        className={`py-4 px-16 rounded-lg ${
                            canProceed 
                                ? "bg-brand-blue hover:bg-brand-blue-dark hover:cursor-pointer text-white"
                                : "bg-gray-300 text-gray-500"
                        }`}
                        onClick={handleNext}
                    >
                        Review
                    </button>
                </div>
            </div>
            <div className="flex flex-col">
            </div>
        </>
    )
}

function PrimaryContact() {
    return (
        <>
            <div className='bg-brand-blue py-8 px-4'>
                <h2 className='text-2xl text-white'>Primary Contact</h2>
            </div>
            <div className='space-y-4 px-4 py-8'>
                <div className='flex gap-8'>
                    <UserInput
                        id="first-name"
                        name="firstName"
                        type="text"
                        className="flex-1"
                        label="First Name"
                        required
                    />
                    <UserInput
                        type="text"
                        id="last-name"
                        name="lastName"
                        className="flex-1"
                        label="Last Name"
                        required
                    />
                </div>
                <div className="flex justify-between gap-8">
                    <UserInput
                        type="tel"
                        id="phone-number"
                        name="phoneNumber"
                        className="flex-1"
                        label="Phone Number"
                        required
                    />
                    <UserInput
                        type="email"
                        id="email"
                        name="email"
                        className="flex-3"
                        label="Email Address"
                        required
                    />
                </div>
            </div>
        </>
    )
}

function RentalAddress() {
    return (
        <>
            <div className='bg-brand-blue py-8 px-4'>
                <h2 className='text-2xl text-white'>Rental Service Location</h2>
            </div>
            <div className='space-y-4 px-4 py-8'>
                <div className='flex gap-8'>
                    <UserInput
                        id="street"
                        name="street"
                        type="text"
                        className="flex-4"
                        label="Street Address"
                        required
                    />
                    <UserInput
                        type="number"
                        id="unit"
                        name="unit"
                        className="flex-1"
                        label="Unit/Apt"
                        required
                    />
                </div>
                <div className="flex gap-8">
                    <UserInput
                        type="text"
                        id="city"
                        name="city"
                        className="flex-1"
                        label="City"
                        required
                    />
                    <UserInput
                        type="text"
                        id="state"
                        name="state"
                        className="flex-1"
                        label="State"
                        required
                    />
                    <UserInput
                        type="text"
                        id="zip"
                        name="zip"
                        className="flex-1"
                        label="Zip"
                        required
                    />
                </div>
            </div>
        </>
    )
}

function RentalSchdule() {
    return (
        <>
            <div className='bg-brand-blue px-4 py-8'>
                <h2 className='text-2xl text-white'>Rental Schedule</h2>
            </div>
            <div className="px-4 py-8 flex gap-16">
                <UserInput
                    type="date"
                    id="date"
                    name="date"
                    label="Rental Date"
                    className=""
                />
                <UserInput
                    type="time"
                    id="time"
                    name="time"
                    className=""
                    label="Start Time"
                />
                <div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="duration">Duration</label>
                        <select
                            id="duration"
                            name="duration"
                            className="bg-white p-2 rounded-sm border border-gray-300"
                        >
                            <option>Select Duration</option>
                            <option>Same Day</option>
                            <option>Over Night</option>
                            <option>2-3 Days</option>
                            <option>1 Week</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}

function Notes() {
    return (
        <>
            <div className='bg-brand-blue px-4 py-8 '>
                <h2 className='text-2xl text-white'>Notes (Optional)</h2>
            </div>
            <div className='px-4 py-8'>
                <textarea
                    className="bg-white w-full p-2 rounded-sm border border-gray-300"
                    rows="10"
                />
            </div>
        </>
    )
}

function UserInput({ id, name, type, className, label, required}) {
    return (
        <div className={className}>
            <div className="flex flex-col space-y-2">
                <label htmlFor={name}>{ label }</label>
                <input
                    type={type}
                    id={id}
                    name={name}
                    className="bg-white p-2 rounded-sm border-gray-300 border"
                    required={required}
                />
            </div>
        </div>
    )
}