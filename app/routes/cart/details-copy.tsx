import { Link } from "react-router"
import { useCart } from 'context/cart-context'
import { ArrowLeft } from "lucide-react";

export default function DetailsSection({ formRef, }) {
    const { formData } = useCart();

    const handleNext = () => {
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
    }

    return (
        <div
            className="px-16 py-8 space-y-8"
        >
            <Link
                to="/cart"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
                <ArrowLeft className="w-4 h-4" /> Back To Cart
            </Link>
            <div className='text-center space-y-2'>
                <h1 className='text-6xl font-bold'>Request <span className="text-primary">Details</span></h1>
                <p className='text-lg text-muted-foreground'>This will help us prepare an accurate quote & schedule</p>
            </div>
            <div className='bg-card border border-border rounded-lg overflow-hidden shadow-lg'>
                <PrimaryContact/>
                <RentalAddress/>
                <RentalSchdule/>
                <Notes/>
            </div>
            <div className='flex justify-center'>
                <Link 
                    type="button"
                    to="/review"
                    className="py-4 px-16 rounded-lg bg-accent hover:bg-accent-light hover:cursor-pointer text-white"
                    onClick={handleNext}
                >
                    Review
                </Link>
            </div>
        </div>
    )
}

function PrimaryContact() {
    return (
        <>
            <div className='bg-primary py-8 px-4'>
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
            <div className='bg-primary py-8 px-4'>
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
            <div className='bg-primary px-4 py-8'>
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
                            className="bg-white p-2 rounded-sm border border-border"
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
            <div className='bg-primary px-4 py-8 '>
                <h2 className='text-2xl text-white'>Notes (Optional)</h2>
            </div>
            <div className='px-4 py-8'>
                <textarea
                    className="bg-white w-full p-2 rounded-sm border border-border"
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
                    className="bg-white p-2 rounded-sm border border-border"
                    required={required}
                />
            </div>
        </div>
    )
}
