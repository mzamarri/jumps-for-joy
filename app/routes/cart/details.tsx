import { useEffect, useState, type Dispatch, type KeyboardEvent, type SetStateAction } from "react";
import { Link, useOutlet, useOutletContext } from "react-router"
import { ArrowLeft, ArrowRight, CalendarDays, MapPin, User } from "lucide-react";
import type { CartOutletContext, FieldConfig, FieldSection, FieldName, SectionConfig, RequestDraft } from "./types.js";
import { sanitizeFieldValue, type TouchedFields, validateDraft, type ValidationErrors } from "./util/validation.js";
import { formatPhoneNumber, formatZipCode, isValidPhoneNumberInput, removePreviousPhoneDigit, sanitizePhoneNumber, sanitizeZip } from "../../lib/validation/form";
import type { Route } from "./+types/details.js";

const fieldSections: FieldSection[] = [
    {
        id: "primary-contact",
        name: "Primary Contact",
        icon: User,
        fields: [
            [
                {
                    label: "First Name",
                    id: "first-name",
                    name: "firstName",
                    type: "text",
                    required: true
                },
                {
                    label: "Last Name",
                    id: "last-name",
                    name: "lastName",
                    type: "text",
                    required: true
                }
            ],
            [
                {
                    label: "Phone Number",
                    id: "phone-number",
                    name: "phoneNumber",
                    type: "tel",
                    required: true

                },
                {
                    label: "Email Address",
                    id: "email",
                    name: "email",
                    type: "email",
                    required: true
                }
            ]
        ]
    },
    {
        id: "rental-address",
        name: "Rental Address",
        icon: MapPin,
        fields: [
            {
                label: "Street Address",
                id: "street",
                name: "street",
                type: "text",
                required: true
            },
            [
                {
                    label: "City",
                    id: "city",
                    name: "city",
                    type: "text",
                    required: true
                },
                {
                    label: "State",
                    id: "state",
                    name: "state",
                    type: "text",
                    required: true
                },
                {
                    label: "Zip",
                    id: "zip",
                    name: "zip",
                    type: "text",
                    required: true
                }
            ]
        ]
    },
    {
        id: "event-info",
        name: "Event Information",
        icon: CalendarDays,
        fields: [
            [
                {
                    label: "Rental Date",
                    id: "date",
                    name: "date",
                    type: "date",
                    required: true
                },
                {
                    label: "Setup Time",
                    id: "time",
                    name: "time",
                    type: "time",
                    required: true
                }
            ],
            [
                {
                    label: "Event Type",
                    id: "event-type",
                    name: "eventType",
                    type: "text",
                    required: false
                },
                {
                    label: "Surface Type for Setup",
                    id: "surface-type",
                    name: "surfaceType",
                    type: "select",
                    required: true,
                    options: [
                        {
                            value: "",
                            displayText: "Choose a Surface Type",
                            disabled: true
                        },
                        {
                            value: "grass",
                            displayText: "grass"
                        }
                    ]
                }
            ],
            {
                label: "Special Instructions/Important Information",
                id: "notes",
                name: "notes",
                type: "text-area",
                required: false,
                rows: 6
            }
        ]
    }
]
export { fieldSections as detailsFieldSections }

const allFieldNames = fieldSections.flatMap(section =>
    section.fields.flatMap(row => {
        const fields = Array.isArray(row) ? row : [row];
        return fields.map(field => field.name);
    })
);

export function loader() {
    return { draft: {} };
}

export default function DetailsSection({ loaderData }: Route.ComponentProps) {
    const [ errors, setErrors ] = useState<ValidationErrors>(validateDraft(loaderData.draft));
    const [ canReviewRequest, setCanReviewRequest ] = useState(true);
    console.log("errors: ", errors);

    const validateField = (fieldName: FieldName, draft: RequestDraft): string => {
        if (canReviewRequest) {
            return "";
        };

        setErrors(validateDraft(draft));
        if (Object.keys(errors).length === 0) {
            setCanReviewRequest(true);
        }
        return errors[fieldName] !== undefined ? errors[fieldName] : "";
    }

    const handleReviewRequest = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (!canReviewRequest) {
            event.preventDefault();
            return;
        }

        if (Object.keys(errors).length !== 0) {
            event.preventDefault();
            setCanReviewRequest(false);
            return;
        }
    };

    return (
        <div className="max-w-4xl m-4 sm:mx-8 lg:mx-auto py-4 sm:py-8 space-y-8">
            <Link
                to="/cart"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
                <ArrowLeft className="w-4 h-4" /> Back To Cart
            </Link>
            <div className='text-center space-y-2'>
                <h1 className='text-4xl sm:text-5xl font-bold'>Request <span className="text-primar">Details</span></h1>
                <p className='text-lg text-muted-foreground'>This will help us prepare an accurate quote & schedule</p>
            </div>
            <div className='text-foreground bg-card border border-border p-4 sm:p-6 space-y-8'>
                {fieldSections.map(section => (
                    <div
                        key={section.id}
                        className="space-y-6 sm:space-y-8"
                    >
                        <h1 className="text-xl md:text-2xl font-semibold bg-primary p-4 rounded-lg text-primary-foreground flex items-center gap-3">
                            <div className="border-2 border-secondary bg-secondary/30 w-10 h-10 flex justify-center items-center rounded-xl">
                                <section.icon className="h-5 w-5 text-secondary" />
                            </div>
                            {section.name}
                        </h1>
                        <div className="space-y-2">
                            {section.fields.map((field, idx) => Array.isArray(field)
                                ? (
                                    <div key={`field-row-${section.id}-${idx}`} className="flex flex-col md:flex-row gap-x-4 gap-y-1 sm:gap-x-8">
                                        {
                                            field.map(f => (
                                                <Field
                                                    key={f.id}
                                                    field={f}
                                                    error={errors[f.name] ?? ""}
                                                    canReviewRequest={canReviewRequest}
                                                    validateField={validateField}
                                                />
                                            ))
                                        }
                                    </div>
                                )
                                : (
                                    <Field
                                        key={field.id}
                                        field={field}
                                        error={errors[field.name] ?? ""}
                                        canReviewRequest={canReviewRequest}
                                        validateField={validateField}
                                    />
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <Link
                to="/cart/review"
                onClick={handleReviewRequest}
                
                aria-disabled={!canReviewRequest}
                className={`w-full py-3 rounded-xl font-semibold flex justify-center items-center gap-2 ${
                    canReviewRequest
                        ? "bg-accent text-accent-foreground hover:bg-accent/90 cursor-pointer"
                        : "bg-muted text-muted-foreground cursor-not-allowed pointer-events-auto"
                }`}
            >
                Review Request <ArrowRight className="w-4 h-4"/>
            </Link>
        </div>
    )
}

function Field({ field, error, canReviewRequest, validateField }: { 
    field: FieldConfig, 
    error: string,
    canReviewRequest: boolean, 
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
        if (!canReviewRequest) {
            validateField(field.name, newDraft);
        }
    }

    return (
        <div 
            className="min-w-0 flex flex-1 basis-0 flex-col space-y-1"
            style={{flexGrow: field?.grow}}
        >
            <label 
                htmlFor={field.id}
                className="font-semibold"
            >
                { `${field.label}${field.required ? " *" : ""}` }
            </label>
            {
                field.type === "text-area"
                    ? (
                        <textarea
                            id={field.id}
                            name={field.name}
                            className={`w-full bg-background p-2 rounded-sm border ${!canReviewRequest && checkError && error ? "border-destructive" : "border-border"}`}
                            required={field.required}
                            rows={field.rows}
                            value={draft[field.name]}
                            onChange={e => handleFieldChange(e.target.value)}
                            onFocus={() => setCheckError(false)}
                            onBlur={() => setCheckError(true)}
                            aria-invalid={Boolean(!canReviewRequest  && error)}
                            aria-describedby={!canReviewRequest && checkError && error ? `${field.id}-error` : undefined}
                        />
                    ) 
                    : field.type === "select"
                        ? (
                            <select
                                id={field.id}
                                name={field.name}
                                className={`w-full bg-background p-2 rounded-sm border ${!canReviewRequest && checkError && error ? "border-destructive" : "border-border"}`}
                                required={field.required}
                                value={draft[field.name]}
                                onFocus={() => setCheckError(false)}
                                onBlur={() => setCheckError(true)}
                                onChange={e => handleFieldChange(e.target.value)}
                                aria-invalid={Boolean(error)}
                                aria-describedby={error ? `${field.id}-error` : undefined}
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
                        ) 
                        : (
                            <input
                                type={field.type}
                                id={field.id}
                                name={field.name}
                                className={`w-full bg-background p-2 rounded-sm border ${!canReviewRequest && checkError && error ? "border-destructive" : "border-border"}`}
                                required={field.required}
                                value={draft[field.name]}
                                onChange={e => handleFieldChange(e.target.value)}
                                onFocus={() => setCheckError(false)}
                                onBlur={() => setCheckError(true)}
                                aria-invalid={Boolean(!canReviewRequest && checkError  && error)}
                                aria-describedby={!canReviewRequest && checkError  && error ? `${field.id}-error` : undefined}
                                inputMode={field.name === "phoneNumber" || field.name === "zip" ? "numeric" : undefined}
                                maxLength={field.name === "phoneNumber" ? 14 : field.name === "state" ? 2 : field.name === "zip" ? 10 : undefined}
                            />
                        )
            }
            <p
                id={`${field.id}-error`}
                className={`min-h-5 text-sm font-medium leading-5 text-destructive ${!canReviewRequest && checkError  && error ? "visible" : "invisible"}`}
            >
                {error ?? "No validation error"}
            </p>
        </div>
    )
}
