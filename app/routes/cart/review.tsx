import { useCallback, useEffect, useState, type FormEvent, type KeyboardEvent } from 'react'
import { Link, useNavigation, useOutletContext, Form, redirect } from "react-router";
import { ArrowLeft, Save, SquarePen, User, MapPin, CalendarDays, ShoppingBag } from 'lucide-react';
import Icon from 'components/ui/icon';
import { useCart } from "context/cart-context";
import { useAppConfig } from "context/app-config-context";
import type { CartOutletContext, FieldName, RequestDraft, ReviewSection } from "./types.js";
import { sanitizeFieldValue, validateDraft, validateField } from "./validation.js";
import { removePreviousPhoneDigit } from "../../lib/validation/form";
import { sendBookingRequestEmails } from "lib/emailjs-client"
import { getCost } from './cart-helpers.js';

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
                type: "date",
                label: "Date"
            },
            {
                id: "time",
                type: "time",
                label: "Time"
            },
            {
                id: "duration",
                type: "select",
                label: "Duration",
                options: [
                    {
                        value: "",
                        disabled: true,
                        displayText: "Select "
                    },
                    {
                        value: "same day",
                        displayText: "Same Day"
                    }
                ]
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
    const [ editingField, setEditingField ] = useState<FieldName | "">("");
    const { draft, setDraft, actionError, setFormSubmitValidator } = useOutletContext<CartOutletContext>();
    const [ canProceed, setCanProceed ] = useState(false);
    const [ statusMessage, setStatusMessage ] = useState("");
    const { cart } = useCart();
    const { booking } = useAppConfig();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    const deliveryFee = booking.deliveryFee;
    const subtotal = cart.reduce((sum, item) => sum + getCost(item), 0);
    const total = subtotal + deliveryFee;

    const handleEdit = (field: FieldName) => setEditingField(field)

    const handleSave = (field: FieldName, nextVal: string) => {
        const sanitizedValue = sanitizeFieldValue(field, nextVal);
        const error = validateField(field, sanitizedValue, draft);

        if (error) {
            setStatusMessage(error);
            return false;
        }

        setDraft(prev => ({
            ...prev,
            [field]: sanitizedValue
        }));
        setStatusMessage("");
        setEditingField("");
        return true;
    }

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(value);

    const fullName = `${draft.firstName} ${draft.lastName}`.trim();
    const cityAndState = [draft.city.trim(), draft.state.trim()].filter(Boolean).join(", ");
    const cityStateZip = [cityAndState, draft.zip.trim()].filter(Boolean).join(" ");
    const fullAddress = [draft.street.trim(), draft.unit.trim(), cityStateZip].filter(Boolean).join("\n");
    const itemsSummary = cart
        .map(item => `${item.singleItem ? 1 : item.quantity} x ${String(item.name ?? "Rental Item")} - ${formatCurrency(getCost(item))}`)
        .join("\n");

    const emailParams = {
        fullName,
        firstName: draft.firstName.trim(),
        email: draft.email.trim(),
        phoneNumber: draft.phoneNumber.trim(),
        date: draft.date.trim(),
        time: draft.time.trim(),
        duration: draft.duration.trim(),
        eventType: draft.eventType.trim() || "Not provided",
        surfaceType: draft.surfaceType.trim(),
        fullAddress,
        itemsSummary,
        notes: draft.notes.trim() || "None",
        subtotal: formatCurrency(subtotal),
        deliveryFee: formatCurrency(deliveryFee),
        total: formatCurrency(total),
        submittedAt: new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(new Date()),
    };

    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        if (!canProceed || isSubmitting) {
            event.preventDefault();
            return;
        }

        const validationErrors = validateDraft(draft);
        if (Object.keys(validationErrors).length > 0) {
            event.preventDefault();
            setStatusMessage(formatValidationMessage(validationErrors));
            return;
        }
        if (cart.length === 0) {
            event.preventDefault();
            setStatusMessage("Add at least one rental item before submitting your request.");
            return;
        }

        setStatusMessage("");
    }, [canProceed, cart.length, draft, isSubmitting]);

    useEffect(() => {
        setFormSubmitValidator?.(() => handleSubmit);
        return () => setFormSubmitValidator?.(null);
    }, [setFormSubmitValidator, handleSubmit]);

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
                                    value={draft[field.id]}
                                    draft={draft}
                                    options={field.options}
                                    onValidationMessage={setStatusMessage}
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
                <input type="hidden" name="_intent" value="submit-booking" />
                <input type="hidden" name="emailParams" value={JSON.stringify(emailParams)} />
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

type UserInputProps = {
    type: string;
    name: FieldName;
    label: string;
    edit: (field: FieldName) => void;
    save: (field: FieldName, value: string) => boolean;
    editingField: FieldName | "";
    value: string;
    draft: RequestDraft;
    options?: ReviewSection["fields"][number]["options"];
    onValidationMessage: (message: string) => void;
};

function UserInput({ type, name, label, edit, save, editingField, value, draft, options, onValidationMessage }: UserInputProps) {
    const [ nextValue, setNextValue ] = useState(value);
    const [ hasInteracted, setHasInteracted ] = useState(false);
    const isEditing = name === editingField;
    const saveError = isEditing ? validateField(name, nextValue, draft) : undefined;
    const visibleError = isEditing && hasInteracted ? saveError : undefined;

    useEffect(() => {
        if (!isEditing) {
            setNextValue(value);
            setHasInteracted(false);
        }
    }, [isEditing, value]);

    const handleEdit = () => {
        setNextValue(value);
        setHasInteracted(false);
        edit(name);
    };

    const handleFieldChange = (value: string) => {
        const sanitizedValue = sanitizeFieldValue(name, value);
        const error = validateField(name, sanitizedValue, draft);

        setNextValue(sanitizedValue);
        setHasInteracted(true);
        onValidationMessage(error ?? "");
    };

    const handleSave = () => {
        setHasInteracted(true);

        if (saveError) {
            return;
        }

        save(name, nextValue);
    };

    const handlePhoneKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Backspace") {
            return;
        }

        const { selectionStart, selectionEnd } = event.currentTarget;

        if (selectionStart === null || selectionEnd === null) {
            return;
        }

        event.preventDefault();
        handleFieldChange(removePreviousPhoneDigit(nextValue, selectionStart, selectionEnd));
    };

    return (
        <div className="px-4 md:px-8 flex items-center justify-between gap-6 py-4">
            {isEditing ? (
                <>
                    <div className="flex flex-1 items-center justify-between gap-6">
                        <div className="flex-1">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                <label className="font-semibold min-w-52" htmlFor={name}>{label}</label>
                                {type === "select" ? (
                                    <select
                                        className={`w-full bg-background p-2 border rounded-sm ${visibleError ? "border-destructive" : "border-border"}`}
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
                            </div>
                            <p
                                id={`${name}-review-error`}
                                className={`mt-1 min-h-5 text-sm font-medium leading-5 text-destructive sm:ml-52 ${visibleError ? "visible" : "invisible"}`}
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
                    <div className="flex flex-col sm:flex-row flex-1 sm:items-center sm:justify-between gap-3 sm:gap-6 overflow-auto">
                        <p className='font-semibold sm:min-w-52'>{label}</p>
                        <p className="flex-1 text-muted-foreground">{value}</p>
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
