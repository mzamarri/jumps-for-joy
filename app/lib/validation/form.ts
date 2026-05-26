export const NAME_PATTERN = /^[a-zA-Z][a-zA-Z '-]*$/;
export const CITY_PATTERN = /^[a-zA-Z][a-zA-Z .'-]*$/;
export const STATE_PATTERN = /^[a-zA-Z]{2}$/;
export const ZIP_PATTERN = /^\d{5}(?:-\d{4})?$/;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_NUMBER_PATTERN = /^\(\d{3}\) \d{3}-\d{4}$/;

export const PHONE_NUMBER_ERROR_MESSAGE = "Enter a 10-digit phone number in the format (555) 123-4567.";

export function formatPhoneNumber(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 10);

    if (digits.length === 0) {
        return "";
    }

    if (digits.length <= 2) {
        return `(${digits}`;
    }

    if (digits.length === 3) {
        return `(${digits})`;
    }

    if (digits.length <= 6) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    }

    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function removePreviousPhoneDigit(value: string, selectionStart: number, selectionEnd: number) {
    const digits = value.replace(/\D/g, "");
    const digitsBeforeCursor = value.slice(0, selectionStart).replace(/\D/g, "").length;

    if (selectionStart !== selectionEnd) {
        const selectedDigits = value.slice(selectionStart, selectionEnd).replace(/\D/g, "").length;
        return formatPhoneNumber(`${digits.slice(0, digitsBeforeCursor)}${digits.slice(digitsBeforeCursor + selectedDigits)}`);
    }

    if (digitsBeforeCursor === 0) {
        return value;
    }

    return formatPhoneNumber(`${digits.slice(0, digitsBeforeCursor - 1)}${digits.slice(digitsBeforeCursor)}`);
}

export function isValidPhoneNumber(value: string) {
    return PHONE_NUMBER_PATTERN.test(value.trim());
}

export function formatZipCode(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 9);

    if (digits.length <= 5) {
        return digits;
    }

    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

export function sanitizeName(value: string) {
    return value.replace(/[^a-zA-Z '-]/g, "");
}

export function sanitizeEmail(value: string) {
    return value.replace(/\s/g, "");
}

export function sanitizeCity(value: string) {
    return value.replace(/[^a-zA-Z .'-]/g, "");
}

export function sanitizeState(value: string) {
    return value.replace(/[^a-zA-Z]/g, "").slice(0, 2).toUpperCase();
}

export function isValidName(value: string) {
    return NAME_PATTERN.test(value.trim());
}

export function isValidEmail(value: string) {
    return EMAIL_PATTERN.test(value.trim());
}

export function isValidCity(value: string) {
    return CITY_PATTERN.test(value.trim());
}

export function isValidState(value: string) {
    return STATE_PATTERN.test(value.trim());
}

export function isValidZipCode(value: string) {
    return ZIP_PATTERN.test(value.trim());
}
