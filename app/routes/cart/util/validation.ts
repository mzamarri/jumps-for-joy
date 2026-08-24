import * as z from "zod";
import type { FieldName, RequestDraft, CartItem } from "../types.js";

export type FieldPatterns =  Partial<Record<FieldName, RegExp>>
export type FieldValidation = { 
    name: FieldName,
    label: string,
    errorMessage?: string,
    normalizationPattern?: RegExp,
    allowedInputPattern?: RegExp,
    validationPattern?: RegExp
}
export type FieldValidationOptions = Omit<FieldValidation, "name" | "label">
export type ValidationErrors = Partial<Record<FieldName, string>>;

const nameValidation: FieldValidationOptions = {
    errorMessage: "Only letters, spaces, or ( ' ) ( - ).",
    validationPattern: /^[a-zA-Z][a-zA-Z '\-]*$/,
    allowedInputPattern: /^[a-zA-Z '\-]*$/,
    normalizationPattern: /[^a-zA-Z '\-]/g
}
export const validateFields: FieldValidation[] = [
    {
        name: "firstName",
        label: "First Name",
        ...nameValidation
    },
    {
        name: "lastName",
        label: "Last Name",
        ...nameValidation
    },
    {
        name: "phoneNumber",
        label: "Phone Number",
        errorMessage: "Enter a 10-digit number, like (555) 123-4567",
        validationPattern: /^\(\d{3}\) \d{3}-\d{4}$/,
        allowedInputPattern: /^\d{0,10}$/,
        normalizationPattern: /\D+/g,
    },
    {
        name: "email",
        label: "Email",
        errorMessage: "Enter valid email, like name@example.com.",
        validationPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        allowedInputPattern: /^\S*@?\S*$/,
        normalizationPattern: /\s+/g,
    },
    {
        name: "street",
        label: "Address"
    },
    {
        name: "city",
        label: "City",
        errorMessage: "Only letters, spaces, or ( . ) ( - ) ( ' ).",
        validationPattern: /^[a-zA-Z][a-zA-Z .'\-]*$/,
        allowedInputPattern: /^[a-zA-Z .'\-]*$/,
        normalizationPattern: /[^a-zA-Z .'\-]/g,
    },
    {
        name: "state",
        label: "State",
        errorMessage: "Enter a valid 2-letter state abbreviation, like \"CA\".",
        validationPattern: /^[A-Z]{2}$/,
        allowedInputPattern: /^[A-Z]{0,2}/,
        normalizationPattern: /[^a-zA-Z]/g,
    },
    {
        name: "zip",
        label: "Zip",
        errorMessage: "Enter valid ZIP code, like 90210 or 90210-1234.",
        validationPattern: /^\d{5}(?:-\d{4})?$/,
        allowedInputPattern: /^\d{0,9}$/,
        normalizationPattern: /\D+/g,
    },
    {
        name: "date",
        label: "Date"
    },
    {
        name: "time",
        label: "Time"
    },
    {
        name: "surfaceType",
        label: "Surface Type"
    },
];

export function validateDraft(draft: Partial<RequestDraft>): ValidationErrors {
    const errors: ValidationErrors = {};

    for (const fieldValidation of validateFields) {
        const value = draft[fieldValidation.name];

        if (value === undefined || !value.trim()) {
            errors[fieldValidation.name] = `${fieldValidation.label ?? "This fieldValidation"} is required.`;
            continue;
        } 

        else if (!isValidField(fieldValidation.name, value)) {
            errors[fieldValidation.name] = fieldValidation.errorMessage;
            continue;
        }
    }

    return errors;
}

export function normalizeField(name: FieldName, value: string): string {
    const fieldValidation = validateFields.find(f => f.name === name);
    const regex = fieldValidation?.normalizationPattern;

    if (!regex) {
        return String(value ?? "");
    }

    const normalizedValue = String(value).replace(regex, "");

    if (name === "phoneNumber") {
        return normalizedValue.slice(0,10);
    }

    if (name === "zip") {
        return normalizedValue.slice(0,9);
    }

    if (name === "state") {
        return normalizedValue.slice(0,2);
    }

    return normalizedValue
}

export function isValidField(name: FieldName, value: string): boolean {
    const formattedValue = formatField(name, normalizeField(name, value));
    if (!formattedValue) {
        return false;
    }

    const fieldValidation = validateFields.find(f => f.name === name);
    const regex = fieldValidation?.validationPattern;
    return regex ? regex.test(String(formattedValue)) : true;
}

export function allowInput(name: FieldName, normalizedValue: string): boolean {
    const fieldValidation = validateFields.find(f => f.name === name);
    const regex = fieldValidation?.allowedInputPattern;
    return regex ? regex.test(String(normalizedValue)) : true;
}

export function formatField(name: FieldName, value: string) {
    const normalizedValue = normalizeField(name, value);
    if (name === "phoneNumber") {
        if (normalizedValue.length === 0) {
            return "";
        }

        if (normalizedValue.length <= 2) {
            return `(${normalizedValue}`;
        }

        if (normalizedValue.length === 3) {
            return `(${normalizedValue})`;
        }

        if (normalizedValue.length <= 6) {
            return `(${normalizedValue.slice(0, 3)}) ${normalizedValue.slice(3)}`;
        }

        return `(${normalizedValue.slice(0, 3)}) ${normalizedValue.slice(3, 6)}-${normalizedValue.slice(6)}`;
    }

    if (name === "zip") {
        if (normalizedValue.length <= 5) {
            return normalizedValue;
        }

        return `${normalizedValue.slice(0, 5)}-${normalizedValue.slice(5)}`;
    }

    if (name === "state") {
        return normalizedValue.toUpperCase();
    }

    return normalizedValue;
}

export const validateCart = z.array(z.discriminatedUnion("singleItem", [
    z.object({
        id: z.string(),
        name: z.string(),
        cost: z.number(),
        description: z.string(),
        image: z.string(),
        singleItem: z.literal(true)
    }),
    z.object({
        id: z.string(),
        name: z.string(),
        cost: z.number(),
        description: z.string(),
        image: z.string(),
        singleItem: z.literal(false),
        quantity: z.number()
    })
])) satisfies z.ZodType<CartItem[]>