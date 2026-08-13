import type { FieldName, RequestDraft } from "./types.js";
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
    sanitizeState,
    PHONE_NUMBER_ERROR_MESSAGE,
} from "../../lib/validation/form";

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
    "duration",
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

export function validateDraft(draft: RequestDraft): ValidationErrors {
    const errors: ValidationErrors = {};

    for (const fieldName of requiredFieldNames) {
        if (!draft[fieldName].trim()) {
            errors[fieldName] = `${fieldLabels[fieldName] ?? "This field"} is required.`;
        }
    }

    if (draft.firstName.trim() && !isValidName(draft.firstName)) {
        errors.firstName = "Enter a valid first name using letters, spaces, apostrophes, or hyphens.";
    }

    if (draft.lastName.trim() && !isValidName(draft.lastName)) {
        errors.lastName = "Enter a valid last name using letters, spaces, apostrophes, or hyphens.";
    }

    if (draft.phoneNumber.trim() && !isValidPhoneNumber(draft.phoneNumber)) {
        errors.phoneNumber = PHONE_NUMBER_ERROR_MESSAGE;
    }

    if (draft.email.trim() && !isValidEmail(draft.email)) {
        errors.email = "Enter a valid email address, like name@example.com.";
    }

    if (draft.street.trim() && draft.street.trim().length < 5) {
        errors.street = "Enter a valid street address.";
    }

    if (draft.city.trim() && !isValidCity(draft.city)) {
        errors.city = "Enter a valid city using letters, spaces, periods, apostrophes, or hyphens.";
    }

    if (draft.state.trim() && !isValidState(draft.state)) {
        errors.state = "Enter a valid 2-letter state abbreviation, like CA.";
    }

    if (draft.zip.trim() && !isValidZipCode(draft.zip)) {
        errors.zip = "Enter a valid ZIP code, like 90210 or 90210-1234.";
    }

    if (draft.date.trim() && Number.isNaN(Date.parse(`${draft.date}T00:00:00`))) {
        errors.date = "Select a valid rental date.";
    }

    if (draft.time.trim() && !/^([01]\d|2[0-3]):[0-5]\d$/.test(draft.time.trim())) {
        errors.time = "Select a valid setup time.";
    }

    if (![-1, 1, 2, 3].some(val => val === Number(draft.duration))) {
        errors.duration = "Select a valid rental duration.";
    }

    if (draft.surfaceType.trim() && draft.surfaceType.trim().length < 3) {
        errors.surfaceType = "Enter a valid setup surface, like grass, concrete, or turf.";
    }

    return errors;
}

export function validateField(name: FieldName, value: string, draft: RequestDraft): string | undefined {
    const nextDraft = {
        ...draft,
        [name]: value,
    };

    return validateDraft(nextDraft)[name];
}
