import { useState } from 'react'
import { Link, useOutletContext } from "react-router";
import { ArrowLeft, Save, SquarePen, User, MapPin, CalendarDays } from 'lucide-react';
import emailjs from '@emailjs/browser'
import { useCart } from "context/CartContext";
import type { CartOutletContext, FieldName, ReviewSection } from "./types.js";

const deliveryFee = 25;

const fieldSections: ReviewSection[] = [
    {
        id: "primaryContact",
        title: "Primary Contact",
        icon: User,
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
        icon: MapPin,
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
        icon: CalendarDays,
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
    const { cart } = useCart();
    const subtotal = cart.reduce((sum, item) => sum + item.cost * item.quantity, 0);
    const total = subtotal + deliveryFee;

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
        }
    }

    const getFormVal = (field: FieldName): string => draft[field] ?? "";

    const logFormData = () => {
        console.log("Form Data:");
        console.log(draft);
    }

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(value);

    return (
        <div
            className="max-w-4xl m-4 sm:mx-8 lg:mx-auto py-8 space-y-8"
        >
            <Link
                to="/details"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
                <ArrowLeft className="w-4 h-4" /> Back To Details
            </Link>
            <div className='text-center space-y-2'>
                <h1 className='text-4xl md:text-5xl font-bold'>Final <span className="text-primar">Review</span></h1>
                <p className='text-lg text-muted-foreground'>Please double check information and submit request</p>
            </div>
            <div className="space-y-8">
                {fieldSections.map(section => (        
                    <div className='text-foreground bg-card border border-border rounded-xl overflow-hidden' key={section.id}>
                        <h1 className='text-xl md:text-2xl border-b border-border bg-muted py-6 px-4 md:px-8 font-bold flex gap-4 items-center'>
                            <div className="bg-primary/10 w-10 h-10 flex justify-center items-center rounded-xl">
                                <section.icon className="h-5 w-5 text-primary" />
                            </div>
                            {section.title}
                        </h1>
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
            <div className='text-foreground bg-card border border-border rounded-xl overflow-hidden'>
                <div className='px-4 md:px-8 py-6 border-b border-border bg-primary text-primary-foreground'>
                    <h1 className='text-2xl font-semibold'>Order Summary</h1>
                </div>
                <div className="px-4 md:px-8 py-4 space-y-4">
                    <div className='space-y-4 py-4'>
                        {cart.length > 0 ? (
                            cart.map(item => (
                                <div key={item.id} className='flex items-end justify-between gap-4'>
                                    <div>
                                        <h2 className='text-lg font-semibold text-foreground'>
                                            {String(item.name ?? "Rental Item")}
                                        </h2>
                                        <p className='text-sm text-muted-foreground'>
                                            qty: {item.quantity} x {formatCurrency(item.cost)}
                                        </p>
                                    </div>
                                    <p className='rounded-full bg-secondary/20 px-4 py-2 font-semibold text-secondary-foreground'>
                                        {formatCurrency(item.cost * item.quantity)}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className='text-muted-foreground'>
                                No items have been added to your cart yet.
                            </p>
                        )}
                    </div>
                    <div className='border-y border-border space-y-2 py-4 text-muted-foreground'>
                        <p className='flex justify-between gap-4'>
                            <span>Subtotal:</span>
                            <span>{formatCurrency(subtotal)}</span>
                        </p>
                        <p className='flex justify-between gap-4'>
                            <span>Delivery Fee:</span>
                            <span>{formatCurrency(deliveryFee)}</span>
                        </p>
                    </div>
                    <div className='flex items-center justify-between gap-4 py-4'>
                        <h1 className='text-2xl font-semibold text-foreground'>Total:</h1>
                        <span className="text-2xl font-bold text-primary">{formatCurrency(total)}</span>
                    </div>
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
                <button onClick={submitRequest} className={`py-3 w-full rounded-lg ${
                    canProceed 
                        ? "text-accent-foreground bg-accent hover:bg-accent/90  hover:cursor-pointer"
                        : "bg-muted text-muted-foreground"
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

    return (
        <div className="px-4 md:px-8 flex items-center justify-between gap-6 py-4">
            {name === editingField ? (
                <>
                    <div className="flex flex-1 items-center justify-between gap-6">
                        <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2">
                            <label className="font-semibold min-w-52" htmlFor={name}> {label}</label>
                            <input 
                                className="w-full bg-background p-2 border border-border rounded-sm"
                                type={type}
                                id={name}
                                value={value}
                                onChange={e => setValue(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === "Enter") {
                                        save(name, value);
                                    }
                                }}
                                autoFocus
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        className="flex justify-center items-center sm:gap-2 hover:cursor-pointer bg-primary/10 text-primary sm:w-auto sm:h-auto sm:px-4 sm:py-2 w-10 h-10 rounded-full"
                        onClick={() => save(name, value)}
                    >
                        <Save className="w-5 h-5"/> <span className="hidden sm:inline">Save</span>
                    </button>
                </>
            ) : (
                <>
                    <div className="flex flex-col sm:flex-row flex-1 sm:items-center sm:justify-between gap-3 sm:gap-6 overflow-auto">
                        <p className='font-semibold sm:min-w-52'>{label}</p>
                        <p className="flex-1 text-muted-foreground">{value}</p>
                    </div>
                    <button
                        type="button"
                        className="flex justify-center items-center sm:gap-2 hover:cursor-pointer bg-mute text-primary sm:w-auto sm:h-auto sm:px-4 sm:py-2 w-10 h-10 rounded-full"
                        onClick={() => edit(name)}
                    >
                        <SquarePen className="w-5 h-5"/> <span className="hidden sm:inline">Edit</span>
                    </button>
                </>
            )}
        </div>
    )
}
