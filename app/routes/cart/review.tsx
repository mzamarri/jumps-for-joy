import { useState, type FormEvent, useRef, useEffect } from 'react'
import { Link,  useOutletContext, Form, redirect, useSubmit, type FormMethod } from "react-router";
import { ArrowLeft, Save, SquarePen, ShoppingBag } from 'lucide-react';
import Icon from 'components/ui/icon';
import { useCart } from "context/cart-context";
import { fields, initialRequestDraft, type CartItem, type CartOutletContext, type FieldConfig, type FieldName, type KeyOfUnion, type RequestDraft } from "./types.js";
import { formatField, validateDraft, type ValidationErrors } from "./util/validation";
import { sendBookingRequestEmails, type EmailFormat, type EmailFieldName, emailFields } from "lib/emailjs-client"
import { getCost, writeStorageDraft } from './util/storage.js';
import { detailsFieldSections } from './details.js';
import { appConfig } from 'app/config.js';
import { validateCart } from './util/validation';

const fieldSections = detailsFieldSections.map(section => ({
    ...section,
    fields: section.fields.flat()
}))

const formatCurrency = (value: number) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
    }).format(value);

export async function clientAction({ request }: { request: Request }) {
    const normalizeFormData = (formData: FormData): Record<string, string> => {
        const formFields = [
            ...fields,
            "cart",
            "deliveryFee"
        ] as const
        const data: Record<string, string> = {}

        for (const field of formFields) {
            const value = formData.get(field);
            data[field] = typeof value === "string" ? value : "";
        }

        return data;
    }

    const normalizeCart = (cartData: string): CartItem[] => {
        if (!cartData) return [];

        const parsedCartData = JSON.parse(cartData);
        try {
            const cart = validateCart.parse(parsedCartData);
            return cart;
        } catch {
            console.log("Not a valid array of cart items. Returning [].");
            return []
        }
    }

    console.log("running action...")
    const formData = await request.formData();

    try {
        const entries = normalizeFormData(formData);
        const cart = normalizeCart(entries?.cart ?? "");
        const subTotal = cart.reduce((sum, item) => sum + item.cost, 0);
        const total = subTotal + Number(entries.deliveryFee);
        const itemsSummary = cart
            .map(cartItem => {
                const { name, cost } = cartItem;
                const quantity = cartItem.singleItem ? 1 : cartItem.quantity;
                return `${quantity} x ${name} - ${formatCurrency(quantity * cost)}`
            })
            .join("\n");

        const emailFields: EmailFormat = {
            fullName: `${entries.firstName} ${entries.lastName}`,
            email: entries.email,
            phoneNumber: entries.phoneNumber,
            fullAddress: `${entries.street} ${entries.city} ${entries.state} ${entries.zip}`,
            date: entries.date,
            time: entries.time,
            eventType: entries.eventType,
            surfaceType: entries.surfaceType,
            notes: entries.notes,
            itemsSummary,
            deliveryFee: formatCurrency(Number(entries.deliveryFee)),
            subTotal: formatCurrency(subTotal),
            total: formatCurrency(total)
        }

        await sendBookingRequestEmails(emailFields);
        console.log("Successfully sent");
    } catch (error) {
        console.error("Booking request email failed", error);
        return { error: "There was an error sending your request. Please try again." };
    }

    return redirect("/success?source=booking");
}

export default function ReviewSection() {
    const { cart } = useCart()
    const { draft, cost } = useOutletContext<CartOutletContext>();
    const [ errors, setErrors ] = useState<ValidationErrors>(validateDraft(draft));
    const [ fieldsEditing, setFieldsEditing ] = useState<Record<FieldName, boolean>>(fields.reduce((acc, fieldName) => {
        acc[fieldName] = false;
        return acc;
    }, {} as Record<FieldName, boolean>));
    const [ requestAcknowledged, setRequestAcknowledged ] = useState(false);
    const editingField = Object.values(fieldsEditing).some(value => value);
    const canSubmitRequest = 
        Object.keys(errors).length === 0 && 
        !editingField && 
        requestAcknowledged
    const submit = useSubmit();

    const validateField = (fieldName: FieldName, draft: RequestDraft): string => {
        const newErrors = validateDraft(draft);
        setErrors(newErrors);
        return errors[fieldName] !== undefined ? errors[fieldName] : "";
    }

    const setIsEditing = (fieldName: FieldName, value: boolean) => {
        setFieldsEditing(prev => ({
            ...prev,
            [fieldName]: value
        }))
    }

    const handleSubmitRequest = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (Object.keys(errors).length !== 0) {
            return;
        }

        const formData = new FormData(event.currentTarget);
        formData.append("cart", JSON.stringify(cart));
        formData.append("deliveryFee", String(appConfig.booking.deliveryFee));

        submit(formData, {
            method: event.currentTarget.method as FormMethod
        });
    };

    return (
        <Form 
            method="post"
            className="max-w-4xl m-4 sm:mx-8 lg:mx-auto py-8 space-y-8"
            onSubmit={handleSubmitRequest}
        >
            <Link
                to="/cart/details"
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
                        <h1 className='text-xl md:text-2xl text-primary-foreground bg-primary py-6 px-4 md:px-8 font-bold flex gap-4 items-center'>
                            <Icon
                                icon={section.icon}
                                containerClassName="bg-secondary/30 border-2 border-secondary w-10 h-10 rounded-xl"
                                iconClassName="h-5 w-5 text-secondary"
                            />
                            {section.name}
                        </h1>
                        <div className='divide-y divide-border'>
                            { section.fields.map(field => (
                                <Field
                                    key={field.id}
                                    field={field}
                                    error={errors[field.name] ?? ""}
                                    isEditing={fieldsEditing[field.name]}
                                    setIsEditing={setIsEditing}
                                    validateField={validateField}
                                />
                            )) }
                        </div>
                    </div>
                ))}
            </div>

            {/* Order Summary */}
            <div className='text-primary-foreground bg-card border border-border rounded-xl overflow-hidden'>
                <div className='px-4 md:px-8 py-6 bg-primary text-secondary-foreground'>
                    <h1 className='text-3xl text-secondary font-semibold flex items-center gap-2'>
                        <Icon
                            icon={ShoppingBag}
                            containerClassName='w-10 h-10 bg-secondary rounded-xl'
                            iconClassName='w-5 h-5 text-secondary-foreground'
                        />
                        Order Summary
                    </h1>
                </div>
                <div className="text-foreground px-4 md:px-8 py-4 space-y-4">
                    <div className='space-y-4 py-4'>
                        {cart.length > 0 ? (
                            cart.map(item => (
                                <div key={item.id} className='flex items-end justify-between gap-4'>
                                    <div>
                                        <h2 className='text-lg font-semibold'>
                                            {String(item.name ?? "Rental Item")}
                                        </h2>
                                        <p className='text-sm text-muted-foreground'>
                                            qty: {item.singleItem ? 1 : item.quantity} x {formatCurrency(item.cost)}
                                        </p>
                                    </div>
                                    <p className='rounded-full bg-secondary px-4 py-2 font-semibold text-secondary-foreground'>
                                        {formatCurrency(getCost(item))}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className=''>
                                No items have been added to your cart yet.
                            </p>
                        )}
                    </div>
                    <div className='border-y border-border space-y-2 py-4'>
                        <p className='flex justify-between gap-4'>
                            <span className='text-muted-foreground'>Subtotal:</span>
                            <span className=''>{formatCurrency(cost.subTotal)}</span>
                        </p>
                        <p className='flex justify-between gap-4'>
                            <span className='text-muted-foreground'>Delivery Fee:</span>
                            <span className=''>{formatCurrency(cost.deliveryFee)}</span>
                        </p>
                    </div>
                    <div className='flex items-center justify-between gap-4 py-4'>
                        <h1 className='text-2xl font-semibold'>Total:</h1>
                        <span className="text-2xl font-bold text-primary">{formatCurrency(cost.subTotal + cost.deliveryFee)}</span>
                    </div>
                </div>
            </div>
            <div className='flex flex-col items-center space-y-8'>
                <div className='flex justify-center gap-2'>
                        <input
                            type="checkbox"
                            id="agree"
                            name="agree"
                            defaultChecked={false}
                            onChange={e => setRequestAcknowledged(e.target.checked)}
                        />
                        <label htmlFor="agree" className="flex justify-center">
                            I understand this is a request, not a booking
                        </label>
                </div>
                <div
                    className='relative w-full'
                >
                    <button 
                        type="submit" 
                        disabled={!canSubmitRequest} 
                        className={`py-3 w-full rounded-lg ${
                            canSubmitRequest
                                ? "text-accent-foreground bg-accent hover:bg-accent/90  hover:cursor-pointer"
                                : "bg-muted text-muted-foreground"
                        }`}
                    >
                        Submit Request
                    </button>
                    <p className='w-full h-8 absolute text-destructive flex justify-center items-center'>
                        {requestAcknowledged && editingField ? "Save all fields." : ""}
                    </p>
                </div>
            </div>
        </Form>
    )
}

function Field({ field, error, isEditing, setIsEditing, validateField }: { 
    field: FieldConfig, 
    error: string,
    isEditing: boolean,
    setIsEditing: (fieldName: FieldName, value: boolean) => void,
    validateField: (fieldName: FieldName, draft: RequestDraft) => string
}) {
    const { draft, setDraft } = useOutletContext<CartOutletContext>();
    const [ checkError, setCheckError ] = useState(true);
    const inputRef = useRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [isEditing]);

    const setFieldRef = (
        element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null
    ) => {
        inputRef.current = element;
    }

    const handleFieldChange = (nextValue: string) => {
        const newDraft = {
            ...draft,
            [field.name]: formatField(field.name, nextValue)
        };

        setDraft(newDraft);
        validateField(field.name, newDraft);
    }

    const handleSave = () => {
        if (error) {
            setCheckError(true);
            inputRef !== null && inputRef.current?.focus();
            return;
        };

        setCheckError(false);
        setIsEditing(field.name, false);
    }

    const handleEdit = () => {
        console.log("isEditing: ", isEditing)
        setIsEditing(field.name, true);
    }

    const editingClass = isEditing 
        ? `bg-background rounded-sm ${error ? "border-destructive focus:outline-destructive" : "border-border"}`
        : "text-muted-foreground border-transparent appearance-none resize-none";

    const applyFullWidth: FieldConfig["type"][] = [
        "text",
        "email",
        "tel"
    ] 

    return (
        <div className="px-4 md:px-8 flex items-center gap-6 py-7 sm:py-8">
            <div 
                className={`
                    flex-1 flex flex-col 
                    ${field.type === "text-area" 
                        ? "sm:flex-col sm:gap-2" 
                        : "sm:flex-row sm:justify-between sm:items-center sm:gap-4"
                    }
                `}
            >
                <label 
                    className={`
                        p-2 font-semibold ${field.type === "text-area" ? "w-full" : "w-40"}
                    `} 
                    htmlFor={
                        field.name
                    }
                >
                    {field.label}:
                </label>
                <div 
                    className={`
                        flex-1 relative
                        ${!isEditing 
                            ? `
                                [&_input:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_var(--color-card)_inset]
                                [&_input:-webkit-autofill]:[-webkit-text-fill-color:var(--color-muted-foreground)]
                                [&_input:-webkit-autofill]:border-card
                                [&_textarea:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_var(--color-card)_inset]
                                [&_textarea:-webkit-autofill]:[-webkit-text-fill-color:var(--color-muted-foreground)]
                                [&_textarea:-webkit-autofill]:border-card
                                [&_select:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_var(--color-card)_inset]
                                [&_select:-webkit-autofill]:[-webkit-text-fill-color:var(--color-muted-foreground)]
                                [&_select:-webkit-autofill]:border-card
                            ` : ""
                        
                        }
                    `}
                >
                    {field.type === "select" ? (
                        <select
                            className={`w-56 p-2 border ${editingClass}`}
                            id={field.name}
                            name={field.name}
                            value={draft[field.name]}
                            disabled={!isEditing}
                            onChange={e => handleFieldChange(e.target.value)}
                            aria-invalid={Boolean(error)}
                            aria-describedby={`${field.name}-review-error`}
                            ref={setFieldRef}
                        >
                            {field.options?.map((option, idx) => (
                                <option
                                    key={idx}
                                    value={option.value}
                                    disabled={option.disabled}
                                >
                                    {option.displayText}
                                </option>
                            ))}
                        </select>
                    ) : field.type === "text-area" ? (
                        <textarea
                            className={`w-full p-2 border ${editingClass}`}
                            id={field.id}
                            name={field.name}
                            value={draft[field.name]}
                            disabled={!isEditing}
                            required={field.required}
                            rows={3}
                            onChange={e => handleFieldChange(e.target.value)}
                            ref={setFieldRef}
                        />
                    ) : (
                        <input
                            className={`p-2 border ${editingClass} ${applyFullWidth.includes(field.type) ? "w-full" : "w-56"}`}
                            id={field.name}
                            name={field.name}
                            value={draft[field.name]}
                            type={field.type}
                            disabled={!isEditing}
                            required={field.required}
                            onChange={e => handleFieldChange(e.target.value)}
                            aria-invalid={Boolean(error)}
                            aria-describedby={`${field.name}-review-error`}
                            ref={setFieldRef}
                        />
                    )}
                    <p
                        id={`${field.name}-review-error`}
                        className={`absolute bottom-0 translate-y-full pt-1 text-sm font-medium leading-5 text-destructive ${checkError ? "visible" : "invisible"}`}
                    >
                        {error ?? "No validation error"}
                    </p>
                </div>
                <input
                    type='hidden'
                    name={field.name}
                    value={draft[field.name]}
                />
            </div>
            <button
                type="button"
                disabled={Boolean(error)}
                className={`w-12 h-12 sm:w-24 flex justify-center items-center sm:gap-2 sm:px-4 sm:py-2 rounded-full ${
                    error
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : `hover:cursor-pointer ${isEditing ? "bg-secondary/30 text-secondary-foreground" : "bg-primary/10 text-primary"}`
                }`}
                onClick={isEditing ? handleSave : handleEdit}
            >
                {isEditing ? (
                    <><Save className="w-5 h-5"/> <span className="hidden sm:inline">Save</span></>
                ) : (
                    <><SquarePen className="w-5 h-5"/> <span className="hidden sm:inline">Edit</span></>
                )}
            </button>
        </div>
    )
}
