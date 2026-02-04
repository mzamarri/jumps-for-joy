import { useCart } from 'context/CartContext'

export default function DetailsSection({ formRef, nextStep }) {
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
        nextStep();
    }

    return (
        <section className='px-8 my-12 bg-gray-300'>
            <div className='text-center space-y-4 py-8'>
                <h1 className='text-xl'>Request Details</h1>
                <p>This will help us prepare an accurate quote & schedule</p>
            </div>
            <div className='border-t'>
                <PrimaryContact/>
                <RentalAddress/>
                <RentalSchdule/>
                <Notes/>
            </div>
            <div className="py-8">
                <div className="flex justify-center space-x-2">
                    <input
                        type="checkbox"
                        id="agree"
                        name="agree"
                    />
                    <label htmlFor="agree" className="flex justify-center">
                        I understand this is a request, not a booking
                    </label>
                </div>
            </div>
            <div className="border-t py-12 flex justify-center">
                <button 
                    type="button"
                    className="py-4 px-16 rounded-lg bg-gray-800 text-white"
                    onClick={handleNext}
                >
                    Review
                </button>
            </div>
        </section>
    )
}

function PrimaryContact() {
    return (
        <div className='py-8 space-y-4 border-b'>
                <h2 className='text-lg'>Primary Contact</h2>
                <div className='space-y-4'>
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
            </div>
    )
}

function RentalAddress() {
    return (
        <div className='py-8 space-y-4 border-b'>
                <h2 className='text-lg'>Rental Service Location</h2>
                <div className='space-y-4'>
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
            </div>
    )
}

function RentalSchdule() {
    return (
        <div className='py-8 space-y-4 border-b'>
            <h2 className='text-lg'>Rental Schedule</h2>
            <div className="flex gap-16">
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
                            className="bg-white p-2 rounded-sm border border-gray-500"
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
        </div>
    )
}

function Notes() {
    return (
        <div className='py-8 space-y-4 border-b'>
            <h2 className='text-lg'>Notes (Optional)</h2>
            <textarea
                className="bg-white w-full p-2 rounded-sm border border-gray-500"
                rows="10"
            />
        </div>
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
                    className="bg-white p-2 rounded-sm border-gray-500 border"
                    required={required}
                />
            </div>
        </div>
    )
}