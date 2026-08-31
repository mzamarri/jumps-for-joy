import * as z from "zod";
import { normalizeValue } from "./utils";

export type Errors<E extends Record<string, string>> = Partial<Record<keyof E, string>>

export type NormalizationPattern<T extends Record<string, unknown>> = {
    [K in keyof T]: RegExp;
}

export type Validator<T extends Record<string, string>> = {
    validate(value: unknown): Errors<T>;
    normalizeField<K extends keyof T>(fieldName: K, value: string): string;
}

export function createValidator<T extends Record<string, string>>(
    schema: z.ZodType<T>,
    normalizationPattern: NormalizationPattern<T>
): Validator<T> {
    return {
        validate(value: unknown) {
            const errors: Errors<T> = {};
            const result = schema.safeParse(typeof value === "string" ? value.trim() : value);

            if (result.success) {
                return errors;
            }

            for (const issue of result.error.issues) {
                const fieldName = issue.path[0] as keyof T;
                
                if (errors[fieldName] === undefined) {
                    errors[issue.path[0] as keyof T] = issue.message;
                }
            }

            return errors;
        },
        normalizeField(fieldName: keyof T, value: string) {
            if (!normalizationPattern[fieldName]) {
                return value;
            }

            return normalizeValue(normalizationPattern[fieldName], value);
        }
    }
}

export function requiredString(fieldName: string) {
    const errorMessage = `${fieldName} is required.`;
    return z
        .string(errorMessage)
        .trim()
        .min(1, errorMessage);
}