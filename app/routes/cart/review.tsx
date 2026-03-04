import { useState, useRef } from 'react'
import { useCart } from 'context/CartContext'
import emailjs from '@emailjs/browser'

const fieldSections = [
    {
        id: "primaryContact",
        title: "Primary Contact",
        fields: [
            {
                id: "firstName",
                type: "text",
                label: "First Name"
            },
            {
                id: "lastName",
                type: "text",
                label: "Last Name"
            },
            {
                id: "phoneNumber",
                type: "tel",
                label: "Phone Number"
            },
            {
                id: "email",
                type: "email",
                label: "Email Address"
            }
        ]
    },
    {
        id: "rentalAddress",
        title: "Rental Address",
        fields: [
            {
                id: "street",
                type: "text",
                label: "Street Address"
            },
            {
                id: "unit",
                type: "text",
                label: "Unit"
            },
            {
                id: "city",
                type: "text",
                label: "City"
            },
            {
                id: "state",
                type: "text",
                label: "State"
            },
            {
                id: "zip",
                type: "text",
                label: "Zip"
            }
        ]
    },
        {
        id: "schedule",
        title: "Rental Schedule",
        fields: [
            {
                id: "date",
                type: "text",
                label: "Date"
            },
            {
                id: "time",
                type: "text",
                label: "Time"
            },
            {
                id: "duration",
                type: "text",
                label: "Duration"
            }
        ]
    },
    
]

export default function ReviewSection() {
    const [ editingField, setEditingField ] = useState("");
    const { formData, saveFormData } = useCart();
    const [ canProceed, setCanProceed ] = useState(false);

    const handleEdit = (field) => setEditingField(field)

    const handleSave = (section, field, nextVal) => {
        saveFormData(section, field, nextVal);
        setEditingField(false);
    }

    const submitRequest = () => {
        if (canProceed) {
            console.log("Request Sent!");
            // emailjs.send("test_service", "contact_form", {
            //     formData: {...formData.current},
            //     email: "miguelazamarripar@gmail.com",
            //     name: "Mike"
            // }, "Ng-Hc13eVaX6RDXkP")
        }
    }

    const getFormVal = (section, field) => formData.current[section][field]

    const logFormData = () => {
        console.log("Form Data:");
        console.log(formData.current);
    }

    return (
        <>
            <div className='text-center'>
                <h1 className='text-6xl font-semibold'>Final Review</h1>
                <p className='text-gray-500'>Please double check information and submit request</p>
            </div>
            <div className="bg-white border border-gray-400 rounded-lg overflow-hidden shadow-lg">
                {fieldSections.map(section => (        
                    <div className='' key={section}>
                        <div className='bg-brand-blue px-4 py-8 border-b border-gray-400'>
                            <h1 className='text-2xl text-white'>{section.title}</h1>
                        </div>
                        <div className=''>
                            { section.fields.map(field => (
                                <UserInput
                                    key={field.id}
                                    type={field.type}
                                    name={field.id}
                                    label={field.label}
                                    edit={handleEdit}
                                    save={(field, value) => handleSave(section, field, value)}
                                    editingField={editingField}
                                    getFormVal={(field) => getFormVal(section.id, field)}
                                />
                            )) }
                        </div>
                    </div>
                ))}
            </div>
            <div className='bg-white border-3 border-brand-blue rounded-lg px-4'>
                <div className='py-8'>
                    <h2 className='text-lg text-brand-blue-dark'>Order Summary</h2>
                </div>
                <div className='divide-y-1 divide-gray-400 border-b border-gray-400'>
                    {[...Array(5)].map(() => (
                        <div className='flex justify-between items-end py-4'>
                            <div>
                                <h2 className='text-lg'>Item Name</h2>
                                <p className='text-gray-500 text-sm'>qty: 1 x $15</p>
                            </div>
                            <p className='text-brand-blue-dark'>$199.99</p>
                        </div>
                    ))}
                </div>
                <div className='border-y border-gray-400 space-y-2 mt-4 py-4 text-gray-500'>
                    <p className=''>Subtotal: $200</p>
                    <p className=''>Delviery Fee: $50</p>
                </div>
                <div className='py-8'>
                    <h1 className='text-2xl '>Total: $5000</h1>
                </div>
            </div>
            <div className='flex flex-col items-center space-y-8'>
                <div className='flex justify-center gap-2'>
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
                <button onClick={submitRequest} className={`py-4 px-16 rounded-lg ${
                    canProceed 
                        ? "text-white bg-brand-blue hover:cursor-pointer hover:bg-brand-blue-dark"
                        : "bg-gray-300 text-gray-500"
                }`}>
                    Submit Request
                </button>
            </div>
        </>
    )
}

function UserInput({ type, name, label, edit, save, editingField, getFormVal }) {
    const [ value, setValue ] = useState(getFormVal(name));
    const lastValue = useRef(getFormVal(name));
    const saveClicked = useRef(false);


    const handleBlur = () => {
        if (!saveClicked.current) {
            setValue(lastValue.current);
        }
        saveClicked.current = false
    }

    return (
        <div className="flex px-4 py-8 border-b border-gray-400">
            {name === editingField ? (
                <>
                    <div className="flex-9 flex">
                        <label className="flex-1" htmlFor={name}> {label}</label>
                        <div className='flex-1'>
                            <input 
                                className="bg-brand-blue-light p-2 border border-gray-400 rounded-sm"
                                type={type}
                                id={name}
                                onChange={e => setValue(e.target.value)}
                                onFocus={() => lastValue.current = value}
                                onBlur={handleBlur}
                                autoFocus
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        className="flex-1 hover:cursor-pointer"
                        onClick={() => save(name, value)}
                        onMouseDown={() => saveClicked.current = true}
                    >
                        Save
                    </button>
                </>
            ) : (
                <>
                    <div 
                        className="flex-9 flex"
                    >
                        <p className='flex-1'>{label}</p>
                        <p className="flex-1">{value}</p>
                    </div>
                    <button
                        type="button"
                        className="flex-1 hover:cursor-pointer"
                        onClick={() => edit(name)}
                    >
                        Edit
                    </button>
                </>
            )}
        </div>
    )
}