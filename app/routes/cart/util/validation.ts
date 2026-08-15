import type { FieldName, RequestDraft } from "../types.js";
import {
    formatPhoneNumber,
    formatZipCode,
    isValidCity,
    isValidEmail,
    isValidName,
    isValidPhoneNumber,
    isValidState,
    isValidZipCode,
    removePreviousPhoneDigit,
    sanitizeCity,
    sanitizeEmail,
    sanitizeName,
    sanitizeState
} from "../../../lib/validation/form";

export type ValidationErrors = Partial<Record<FieldName, string>>;
export type TouchedFields = Partial<Record<FieldName, boolean>>;

export const fieldLabels: Partial<Record<FieldName, string>> = {
    firstName: "First Name",
    lastName: "Last Name",
    phoneNumber: "Phone Number",
    email: "Email Address",
    street: "Street Address",
    unit: "Unit",
    city: "City",
    state: "State",
    zip: "Zip",
    date: "Rental Date",
    time: "Setup Time",
    duration: "Duration",
    eventType: "Event Type",
    surfaceType: "Surface Type for Setup",
    notes: "Special Instructions/Important Information",
};

export const requiredFieldNames: FieldName[] = [
    "firstName",
    "lastName",
    "phoneNumber",
    "email",
    "street",
    "city",
    "state",
    "zip",
    "date",
    "time",
    "surfaceType",
];

export function sanitizeFieldValue(name: FieldName, value: string) {
    switch (name) {
        case "firstName":
        case "lastName":
            return sanitizeName(value);
        case "phoneNumber":
            return formatPhoneNumber(value);
        case "email":
            return sanitizeEmail(value);
        case "city":
            return sanitizeCity(value);
        case "state":
            return sanitizeState(value);
        case "zip":
            return formatZipCode(value);
        default:
            return value;
    }
}

export function validateDraft(draft: Partial<RequestDraft>): ValidationErrors {
    const errors: ValidationErrors = {};
    const nameError = "Only letters, spaces, or ( ' ) ( - ).";

    for (const fieldName of requiredFieldNames) {
        if (draft[fieldName] === undefined || !draft[fieldName].trim()) {
            errors[fieldName] = `${fieldLabels[fieldName] ?? "This field"} is required.`;
        }
    }


    if (draft.firstName !== undefined && draft.firstName.trim() && !isValidName(draft.firstName)) {
        errors.firstName = nameError;
    }

    if (draft.lastName !== undefined && draft.lastName.trim() && !isValidName(draft.lastName)) {
        errors.lastName = nameError;
    }

    if (draft.phoneNumber !== undefined && draft.phoneNumber.trim() && !isValidPhoneNumber(draft.phoneNumber)) {
        errors.phoneNumber = "Enter a 10-digit number, like (555) 123-4567";
    }

    if (draft.email !== undefined && draft.email.trim() && !isValidEmail(draft.email)) {
        errors.email = "Enter valid email, like name@example.com.";
    }

    if (draft.street !== undefined && draft.street.trim() && draft.street.trim().length < 5) {
        errors.street = "Enter a valid street address.";
    }

    if (draft.city !== undefined && draft.city.trim() && !isValidCity(draft.city)) {
        errors.city = "Only letters, spaces, or ( . ) ( - ) ( ' ).";
    }

    if (draft.state !== undefined && draft.state.trim() && !isValidState(draft.state)) {
        errors.state = "Enter a valid 2-letter state abbreviation, like \"CA\".";
    }

    if (draft.zip !== undefined && draft.zip.trim() && !isValidZipCode(draft.zip)) {
        errors.zip = "Enter valid ZIP code, like 90210 or 90210-1234.";
    }

    if (draft.date !== undefined && draft.date.trim() && Number.isNaN(Date.parse(`${draft.date}T00:00:00`))) {
        errors.date = "Select a valid rental date.";
    }

    if (draft.time !== undefined && draft.time.trim() && !/^([01]\d|2[0-3]):[0-5]\d$/.test(draft.time.trim())) {
        errors.time = "Select a valid setup time.";
    }

    // if (![-1, 1, 2, 3].some(val => val === Number(draft.duration))) {
    //     errors.duration = "Select a valid rental duration.";
    // }

    if (draft.surfaceType && draft.surfaceType.trim() && draft.surfaceType.trim().length < 3) {
        errors.surfaceType = "Enter a valid setup surface, like grass, concrete, or turf.";
    }

    return errors;
}

export function validateField(name: FieldName, value: string): string | undefined {
    return validateDraft({ [name]: value })[name];
}
