import { useState } from "react";
import { Link, useOutletContext } from "react-router"
import { ArrowLeft, ArrowRight, CalendarDays, MapPin, User } from "lucide-react";
import type { CartOutletContext, InputConfig, SectionConfig } from "./types.js";

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
                        type: "text",
                        required: true
                    }

                },
                {
                    label: "Email Address",
                    input: {
                        id: "email",
                        name: "email",
                        type: "text",
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

export default function DetailsSection() {
    const { draft, setDraft } = useOutletContext<CartOutletContext>();

    return (
        <div
            className="max-w-4xl m-4 sm:mx-8 lg:mx-auto py-4 sm:py-8 space-y-8"
        >
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
            <div className='text-foreground bg-card border border-border p-4 sm:p-6 space-y-16'>
                {formSections.map(section => (
                    <div
                        key={section.id}
                        className="space-y-6 sm:space-y-8"
                    >
                        <h1 className="text-xl md:text-2xl font-semibold bg-muted p-4 rounded-lg text-primar flex items-center gap-3">
                            <div className="bg-primary/10 w-10 h-10 flex justify-center items-center rounded-xl">
                                <section.icon className="h-5 w-5 text-primary" />
                            </div>
                            {section.name}
                        </h1>
                        <div className="space-y-4">
                            {section.fields.map((field, idx) => Array.isArray(field)
                                ? (
                                    <div key={`field-row-${section.id}-${idx}`} className="flex flex-col md:flex-row gap-4 sm:gap-8">
                                        {
                                            field.map(({ label, input, grow }) => (
                                                <UserInput
                                                    key={input.id}
                                                    label={label}
                                                    input={input}
                                                    grow={grow}
                                                    initialValue={draft[input.name]}
                                                    setDraft={setDraft}
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
                                        initialValue={draft[field.input.name]}
                                        setDraft={setDraft}
                                    />
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <Link 
                to="/review"
                className="py-3 rounded-xl bg-accent text-accent-foreground font-semibold hover:bg-accent/90 cursor-pointer flex justify-center items-center gap-2"
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
    initialValue: string;
    setDraft: CartOutletContext["setDraft"];
};

function UserInput({ label, input, grow=1, initialValue, setDraft }: UserInputProps) {
    const { id, name, type, required } = input;
    const [value, setValue] = useState(initialValue);

    const handleFieldChange = (nextValue: string) => {
        setValue(nextValue);
        setDraft(prev => ({
            ...prev,
            [name]: nextValue
        }));
    };

    return (
        <div 
            className="min-w-0 flex flex-col space-y-2"
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
                            className="bg-background p-2 rounded-sm border border-border"
                            required={required}
                            rows={input.rows}
                            value={value}
                            onChange={e => handleFieldChange(e.target.value)}
                        />
                    ) 
                    : type === "select"
                        ? (
                            <select
                                id={id}
                                name={name}
                                className="bg-background p-2 rounded-sm border border-border"
                                required={required}
                                value={value}
                                onChange={e => handleFieldChange(e.target.value)}
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
                                className="bg-background p-2 rounded-sm border border-border"
                                required={required}
                                value={value}
                                onChange={e => handleFieldChange(e.target.value)}
                            />
                        )
            }
        </div>
    )
}
