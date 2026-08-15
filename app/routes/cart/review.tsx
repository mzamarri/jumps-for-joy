import { useCallback, useEffect, useState, type FormEvent, type KeyboardEvent } from 'react'
import { Link, useNavigation, useOutletContext, Form, redirect, useOutlet } from "react-router";
import { ArrowLeft, Save, SquarePen, User, MapPin, CalendarDays, ShoppingBag } from 'lucide-react';
import Icon from 'components/ui/icon';
import { useCart } from "context/cart-context";
import { useAppConfig } from "context/app-config-context";
import type { CartOutletContext, FieldConfig, FieldName, FieldSection, RequestDraft } from "./types.js";
import { sanitizeFieldValue, validateDraft, validateField } from "./util/validation.js";
import { removePreviousPhoneDigit } from "../../lib/validation/form";
import { sendBookingRequestEmails } from "lib/emailjs-client"
import { getCost } from './util/cart-helpers.js';
import { detailsFieldSections } from './details.js';

const fieldSections = detailsFieldSections.map(section => ({
    ...section,
    fields: section.fields.flat()
}))

const formatValidationMessage = (errors: Record<string, string>) =>
    `Please fix the following before submitting: ${Object.values(errors).join(" ")}`;

export async function clientAction({ request }: { request: Request }) {
    console.log("running action...")
    const formData = await request.formData();
    const intent = String(formData.get("_intent") ?? "");

    if (intent !== "submit-booking") {
        return null;
    }

    const serializedEmailParams = String(formData.get("emailParams") ?? "");

    if (!serializedEmailParams) {
        return { error: "Unable to submit request. Please try again." };
    }

    try {
        const emailParams = JSON.parse(serializedEmailParams) as Record<string, string>;
        await sendBookingRequestEmails(emailParams);
        console.log("Successfully sent");
    } catch (error) {
        console.error("Booking request email failed", error);
        return { error: "There was an error sending your request. Please try again." };
    }

    return redirect("/success?source=booking");
}

export default function ReviewSection() {
    const { cart } = useCart()
    const [ errors, setErrors ] = useState<ValidationErrors>(validateDraft({}));
    const [ canSubmitRequest, setCanSubmitRequest ] = useState(true);
    console.log("errors: ", errors);

    const validateField = (fieldName: FieldName, draft: RequestDraft): string => {
        if (canSubmitRequest) {
            return "";
        };

        setErrors(validateDraft(draft));
        if (Object.keys(errors).length === 0) {
            setCanSubmitRequest(true);
        }
        return errors[fieldName] !== undefined ? errors[fieldName] : "";
    }

    const handleReviewRequest = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (!canSubmitRequest) {
            event.preventDefault();
            return;
        }

        if (Object.keys(errors).length !== 0) {
            event.preventDefault();
            setCanSubmitRequest(false);
            return;
        }
    };

    return (
        <Form method="post" className="max-w-4xl m-4 sm:mx-8 lg:mx-auto py-8 space-y-8">
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
                                    canSubmitRequest={canSubmitRequest}
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
                            <span className=''>{formatCurrency(subtotal)}</span>
                        </p>
                        <p className='flex justify-between gap-4'>
                            <span className='text-muted-foreground'>Delivery Fee:</span>
                            <span className=''>{formatCurrency(deliveryFee)}</span>
                        </p>
                    </div>
                    <div className='flex items-center justify-between gap-4 py-4'>
                        <h1 className='text-2xl font-semibold'>Total:</h1>
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
                {(statusMessage || actionError) ? (
                    <p className="w-full rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-center text-sm font-semibold text-destructive" role="alert">
                        {statusMessage || actionError}
                    </p>
                ) : null}
                <button type="submit" disabled={!canProceed || isSubmitting} className={`py-3 w-full rounded-lg ${
                    canProceed && !isSubmitting
                        ? "text-accent-foreground bg-accent hover:bg-accent/90  hover:cursor-pointer"
                        : "bg-muted text-muted-foreground"
                }`}>
                    {isSubmitting ? "Sending Request..." : "Submit Request"}
                </button>
            </div>
        </Form>
    )
}

function Field({ field, error, canSubmitRequest, validateField }: { 
    field: FieldConfig, 
    error: string,
    canSubmitRequest: boolean, 
    validateField: (fieldName: FieldName, draft: RequestDraft) => string
}) {
    const { draft, setDraft } = useOutletContext<CartOutletContext>();
    const [ checkError, setCheckError ] = useState(true);

    const handleFieldChange = (nextValue: string) => {
        const newDraft = {...draft};
        switch (field.name) {
            case "phoneNumber":
                const digits = sanitizePhoneNumber(nextValue);
                newDraft[field.name] = formatPhoneNumber(digits);
                break;
            case "zip":
                const zip = sanitizeZip(nextValue);
                newDraft[field.name] = formatZipCode(zip);
                break;
            default:
                newDraft[field.name] = nextValue;
        }

        setDraft(newDraft);
        if (!canSubmitReques) {
            validateField(field.name, newDraft);
        }
    }

    return (
        <div className="px-4 md:px-8 flex items-center gap-6 py-7 sm:py-8">
            {isEditing ? (
                <>
                    <div className='flex-1 sm:flex sm:items-center'>
                        <label className="inline-block p-2 text-base font-semibold min-w-52" htmlFor={name}>{label}</label>
                        <div className="flex-1 relative">
                            {type === "select" ? (
                                <select
                                    className={`h-11 bg-background px-2 flex-items-center border rounded-sm ${visibleError ? "border-destructive" : "border-border"}`}
                                    id={name}
                                    value={nextValue}
                                    onChange={e => handleFieldChange(e.target.value)}
                                    onBlur={() => handleFieldChange(nextValue)}
                                    aria-invalid={Boolean(visibleError)}
                                    aria-describedby={`${name}-review-error`}
                                    autoFocus
                                >
                                    {options?.map((option, idx) => (
                                        <option
                                            key={idx}
                                            value={option.value}
                                            disabled={option.disabled}
                                        >
                                            {option.displayText}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    className={`w-full bg-background p-2 border rounded-sm ${visibleError ? "border-destructive" : "border-border"}`}
                                    type={type}
                                    id={name}
                                    value={nextValue}
                                    onChange={e => handleFieldChange(e.target.value)}
                                    onKeyDown={e => {
                                        if (name === "phoneNumber") {
                                            handlePhoneKeyDown(e);
                                            return;
                                        }

                                        if (e.key === "Enter") {
                                            handleSave();
                                        }
                                    }}
                                    onBlur={() => handleFieldChange(nextValue)}
                                    autoFocus
                                    aria-invalid={Boolean(visibleError)}
                                    aria-describedby={`${name}-review-error`}
                                    inputMode={name === "phoneNumber" || name === "zip" ? "numeric" : undefined}
                                    maxLength={name === "phoneNumber" ? 14 : name === "state" ? 2 : name === "zip" ? 10 : undefined}
                                />
                            )}
                            <p
                                id={`${name}-review-error`}
                                className={`absolute bottom-0 translate-y-full pt-1 text-sm font-medium leading-5 text-destructive ${visibleError ? "visible" : "invisible"}`}
                            >
                                {visibleError ?? "No validation error"}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        disabled={Boolean(saveError)}
                        className={`flex justify-center items-center sm:gap-2 sm:w-auto sm:h-auto sm:px-4 sm:py-2 w-10 h-10 rounded-full ${
                            saveError
                                ? "bg-muted text-muted-foreground cursor-not-allowed"
                                : "hover:cursor-pointer bg-primary/10 text-primary"
                        }`}
                        onClick={handleSave}
                    >
                        <Save className="w-5 h-5"/> <span className="hidden sm:inline">Save</span>
                    </button>
                </>
            ) : (
                <>
                    <div className='flex-1 sm:flex sm:items-center'>
                        <p className='p-2 font-semibold sm:min-w-52'>{label}</p>
                        <p className="p-2 border border-transparent text-muted-foreground">{value}</p>
                    </div>
                    <button
                        type="button"
                        className="flex justify-center items-center sm:gap-2 hover:cursor-pointer bg-mute text-primary sm:w-auto sm:h-auto sm:px-4 sm:py-2 w-10 h-10 rounded-full"
                        onClick={handleEdit}
                    >
                        <SquarePen className="w-5 h-5"/> <span className="hidden sm:inline">Edit</span>
                    </button>
                </>
            )}
        </div>
    )
}

