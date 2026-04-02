import { useState, useRef } from 'react'
import { Link, useOutletContext } from "react-router";
import { ArrowLeft } from 'lucide-react';
import emailjs from '@emailjs/browser'
import type { CartOutletContext, FieldName, ReviewSection } from "./types.js";

const fieldSections: ReviewSection[] = [
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
        id: "eventInfo",
        title: "Event Information",
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
            },
            {
                id: "eventType",
                type: "text",
                label: "Event Type"
            },
            {
                id: "surfaceType",
                type: "text",
                label: "Surface Type"
            }
        ]
    },
    
]

export default function ReviewSection() {
    const [ editingField, setEditingField ] = useState<FieldName | "">("");
    const { draft, setDraft } = useOutletContext<CartOutletContext>();
    const [ canProceed, setCanProceed ] = useState(false);

    const handleEdit = (field: FieldName) => setEditingField(field)

    const handleSave = (field: FieldName, nextVal: string) => {
        setDraft(prev => ({
            ...prev,
            [field]: nextVal
        }));
        setEditingField("");
    }

    const submitRequest = () => {
        if (canProceed) {
            console.log("Request Sent!");
            // emailjs.send("test_service", "contact_form", {
            //     formData: {...draft},
            //     email: "miguelazamarripar@gmail.com",
            //     name: "Mike"
            // }, "Ng-Hc13eVaX6RDXkP")
        }
    }

    const getFormVal = (field: FieldName): string => draft[field] ?? "";

    const logFormData = () => {
        console.log("Form Data:");
        console.log(draft);
    }

    return (
        <div
            className="px-24 py-8 space-y-8"
        >
            <Link
                to="/details"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
                <ArrowLeft className="w-4 h-4" /> Back To Details
            </Link>
            <div className='text-center space-y-2'>
                <h1 className='text-6xl font-bold'>Final <span className="text-primary">Review</span></h1>
                <p className='text-lg text-muted-foreground'>Please double check information and submit request</p>
            </div>
            <div className="space-y-8">
                {fieldSections.map(section => (        
                    <div className='text-foreground bg-card border border-border rounded-lg p-8 space-y-4 shadow-md' key={section.id}>
                        <h1 className='text-2xl font-semibold text-primary'>{section.title}</h1>
                        <div className='divide-y divide-border'>
                            { section.fields.map(field => (
                                <UserInput
                                    key={field.id}
                                    type={field.type}
                                    name={field.id}
                                    label={field.label}
                                    edit={handleEdit}
                                    save={handleSave}
                                    editingField={editingField}
                                    getFormVal={getFormVal}
                                />
                            )) }
                        </div>
                    </div>
                ))}
            </div>
            <div className='text-foreground bg-card border border-border rounded-lg p-8 shadow-md'>
                <div className='pb-8'>
                    <h2 className='text-lg text-primary'>Order Summary</h2>
                </div>
                <div className='divide-y divide-border border-b border-border'>
                    {[...Array(5)].map((_, idx) => (
                        <div key={`summary-item-${idx}`} className='flex justify-between items-end py-4'>
                            <div>
                                <h2 className='text-lg'>Item Name</h2>
                                <p className='text-muted-foreground text-sm'>qty: 1 x $15</p>
                            </div>
                            <p className='text-primary'>$199.99</p>
                        </div>
                    ))}
                </div>
                <div className='border-y border-border space-y-2 mt-4 py-4 text-muted-foreground'>
                    <p className=''>Subtotal: $200</p>
                    <p className=''>Delviery Fee: $50</p>
                </div>
                <div className='pt-8'>
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
                        <label htmlFor="agree" className="flex justify-center text-muted-foreground">
                            I understand this is a request, not a booking
                        </label>
                </div>
                <button onClick={submitRequest} className={`py-4 px-16 rounded-lg ${
                    canProceed 
                        ? "text-white bg-primary hover:cursor-pointer hover:bg-primary-dark"
                        : "bg-gray-300 text-gray-500"
                }`}>
                    Submit Request
                </button>
            </div>
        </div>
    )
}

type UserInputProps = {
    type: string;
    name: FieldName;
    label: string;
    edit: (field: FieldName) => void;
    save: (field: FieldName, value: string) => void;
    editingField: FieldName | "";
    getFormVal: (field: FieldName) => string;
};

function UserInput({ type, name, label, edit, save, editingField, getFormVal }: UserInputProps) {
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
        <div className="flex items-center justify-between gap-6 py-5">
            {name === editingField ? (
                <>
                    <div className="flex flex-1 items-center justify-between gap-6">
                        <label className="font-semibold min-w-52" htmlFor={name}> {label}</label>
                        <div className='flex-1'>
                            <input 
                                className="w-full bg-background p-2 border border-border rounded-sm"
                                type={type}
                                id={name}
                                value={value}
                                onChange={e => setValue(e.target.value)}
                                onFocus={() => lastValue.current = value}
                                onBlur={handleBlur}
                                autoFocus
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        className="hover:cursor-pointer font-semibold text-primary"
                        onClick={() => save(name, value)}
                        onMouseDown={() => saveClicked.current = true}
                    >
                        Save
                    </button>
                </>
            ) : (
                <>
                    <div className="flex flex-1 items-center justify-between gap-6">
                        <p className='font-semibold min-w-52'>{label}</p>
                        <p className="flex-1 text-muted-foreground">{value}</p>
                    </div>
                    <button
                        type="button"
                        className="hover:cursor-pointer font-semibold text-primary"
                        onClick={() => edit(name)}
                    >
                        Edit
                    </button>
                </>
            )}
        </div>
    )
}
