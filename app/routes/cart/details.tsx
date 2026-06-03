import { useState, type KeyboardEvent } from "react";
import { Link, useOutletContext } from "react-router"
import { ArrowLeft, ArrowRight, CalendarDays, MapPin, User } from "lucide-react";
import type { CartOutletContext, FieldName, InputConfig, SectionConfig } from "./types.js";
import { sanitizeFieldValue, type TouchedFields, validateDraft } from "./validation.js";
import { removePreviousPhoneDigit } from "../../lib/validation/form";

const formSections: SectionConfig[] = [
    {
        id: "user-details",
        name: "User Details",
        icon: User,
        fields: [
            [
                {
                    label: "First Name",
                    input: {
                        id: "first-name",
                        name: "firstName",
                        type: "text",
                        required: true
                    }
                },
                {
                    label: "Last Name",
                    input: {
                        id: "last-name",
                        name: "lastName",
                        type: "text",
                        required: true
                    }
                }
            ],
            [
                {
                    label: "Phone Number",
                    input: {
                        id: "phone-number",
                        name: "phoneNumber",
                        type: "tel",
                        required: true
                    }

                },
                {
                    label: "Email Address",
                    input: {
                        id: "email",
                        name: "email",
                        type: "email",
                        required: true
                    }
                }
            ]
        ]
    },
    {
        id: "setup-location",
        name: "Setup Location",
        icon: MapPin,
        fields: [
            {
                label: "Street Address",
                input: {
                    id: "street",
                    name: "street",
                    type: "text",
                    required: true
                }
            },
            [
                {
                    label: "City",
                    input: {
                        id: "city",
                        name: "city",
                        type: "text",
                        required: true
                    }
                },
                {
                    label: "State",
                    input: {
                        id: "state",
                        name: "state",
                        type: "text",
                        required: true
                    }
                },
                {
                    label: "Zip",
                    input: {
                        id: "zip",
                        name: "zip",
                        type: "text",
                        required: true
                    }
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
                    input: {
                        id: "date",
                        name: "date",
                        type: "date",
                        required: true
                    }
                },
                {
                    label: "Setup Time",
                    input: {
                        id: "time",
                        name: "time",
                        type: "time",
                        required: true
                    }
                },
                {
                    label: "Duration",
                    input: {
                        id: "duration",
                        name: "duration",
                        type: "select",
                        required: true,
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
                    }
                }
            ],
            [
                {
                    label: "Event Type",
                    input: {
                        id: "event-type",
                        name: "eventType",
                        type: "text",
                        required: false,
                    }
                },
                {
                    label: "Surface Type for Setup",
                    input: {
                        id: "surface-type",
                        name: "surfaceType",
                        type: "text",
                        required: true
                    }
                }
            ],
            {
                label: "Special Instructions/Important Information",
                input: {
                    id: "notes",
                    name: "notes",
                    type: "text-area",
                    required: false,
                    rows: 6
                }
            }
        ]
    }
]

const allFieldNames = formSections.flatMap(section =>
    section.fields.flatMap(row => {
        const fields = Array.isArray(row) ? row : [row];
        return fields.map(field => field.input.name);
    })
);

export default function DetailsSection() {
    const { draft, setDraft } = useOutletContext<CartOutletContext>();
    const [touched, setTouched] = useState<TouchedFields>({});
    const errors = validateDraft(draft);
    const canReviewRequest = Object.keys(errors).length === 0;

    const markAllFieldsTouched = () => {
        setTouched(Object.fromEntries(allFieldNames.map(fieldName => [fieldName, true])) as TouchedFields);
    };

    const handleFieldChange = (name: FieldName, value: string) => {
        const nextValue = sanitizeFieldValue(name, value);

        setTouched(prev => ({
            ...prev,
            [name]: true,
        }));
        setDraft(prev => ({
            ...prev,
            [name]: nextValue,
        }));
    };

    const handleReviewRequest = (event: React.MouseEvent<HTMLAnchorElement>) => {
        markAllFieldsTouched();

        if (!canReviewRequest) {
            event.preventDefault();
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
                {formSections.map(section => (
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
                                            field.map(({ label, input, grow }) => (
                                                <UserInput
                                                    key={input.id}
                                                    label={label}
                                                    input={input}
                                                    grow={grow}
                                                    value={draft[input.name]}
                                                    onChange={handleFieldChange}
                                                    error={touched[input.name] ? errors[input.name] : undefined}
                                                />
                                            ))
                                        }
                                    </div>
                                )
                                : (
                                    <UserInput
                                        key={field.input.id}
                                        label={field.label}
                                        input={field.input}
                                        grow={field.grow}
                                        value={draft[field.input.name]}
                                        onChange={handleFieldChange}
                                        error={touched[field.input.name] ? errors[field.input.name] : undefined}
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

type UserInputProps = {
    label: string;
    input: InputConfig;
    grow?: number | undefined;
    value: string;
    onChange: (name: FieldName, value: string) => void;
    error?: string;
};

function UserInput({ label, input, grow=1, value, onChange, error }: UserInputProps) {
    const { id, name, type, required } = input;

    const handleFieldChange = (nextValue: string) => {
        onChange(name, nextValue);
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
        handleFieldChange(removePreviousPhoneDigit(value, selectionStart, selectionEnd));
    };

    return (
        <div 
            className="min-w-0 flex flex-1 basis-0 flex-col space-y-1"
            style={{flexGrow: grow}}
        >
            <label 
                htmlFor={id}
                className="font-semibold"
            >
                { `${label}${required ? " *" : ""}` }
            </label>
            {
                type === "text-area"
                    ? (
                        <textarea
                            id={id}
                            name={name}
                            className={`w-full bg-background p-2 rounded-sm border ${error ? "border-destructive" : "border-border"}`}
                            required={required}
                            rows={input.rows}
                            value={value}
                            onChange={e => handleFieldChange(e.target.value)}
                            onBlur={() => handleFieldChange(value)}
                            aria-invalid={Boolean(error)}
                            aria-describedby={error ? `${id}-error` : undefined}
                        />
                    ) 
                    : type === "select"
                        ? (
                            <select
                                id={id}
                                name={name}
                                className={`w-full bg-background p-2 rounded-sm border ${error ? "border-destructive" : "border-border"}`}
                                required={required}
                                value={value}
                                onChange={e => handleFieldChange(e.target.value)}
                                onBlur={() => handleFieldChange(value)}
                                aria-invalid={Boolean(error)}
                                aria-describedby={error ? `${id}-error` : undefined}
                            >
                                {input.options?.map((option, idx) => (
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
                                type={type}
                                id={id}
                                name={name}
                                className={`w-full bg-background p-2 rounded-sm border ${error ? "border-destructive" : "border-border"}`}
                                required={required}
                                value={value}
                                onChange={e => handleFieldChange(e.target.value)}
                                onKeyDown={name === "phoneNumber" ? handlePhoneKeyDown : undefined}
                                onBlur={() => handleFieldChange(value)}
                                aria-invalid={Boolean(error)}
                                aria-describedby={error ? `${id}-error` : undefined}
                                inputMode={name === "phoneNumber" || name === "zip" ? "numeric" : undefined}
                                maxLength={name === "phoneNumber" ? 14 : name === "state" ? 2 : name === "zip" ? 10 : undefined}
                            />
                        )
            }
            <p
                id={`${id}-error`}
                className={`min-h-5 text-sm font-medium leading-5 text-destructive ${error ? "visible" : "invisible"}`}
            >
                {error ?? "No validation error"}
            </p>
        </div>
    )
}
