type Validator<T> = (value: unknown) => T

type ValidatorType<V> = V extends Validator<infer T>
    ? T
    : never

type ObjectOutput<T extends Record<string, unknown>> = {
    [key in keyof T]: ValidatorType<T[key]>
}

// Validator object
export const v = {
    object: objectValidator,
    array: arrayValidator,
    string: stringValidator,
    number: numberValidator,
    boolean: booleanValidator,
    validateType
} as const

export function validateType<T>() {
    return (validator: Validator<T>): Validator<T> => {
        return validator
    }
}

export function objectValidator<S extends Record<string, Validator<any>>>(
    schema: S
): Validator<ObjectOutput<S>> {
    const schemaKeys = Object.keys(schema);

    function isRecord(value: unknown): value is Record<string, unknown> {
        return (
            typeof value === "object" &&
            value !== null &&
            !Array.isArray(value)
        )
    }

    return (value: unknown): ObjectOutput<S> => {
        if (!isRecord(value)) {
            throw new Error("Not a valid object.");
        }

        for (const key of schemaKeys) {
            if (key in value) {
                schema[key](value[key]);
                continue;
            }

            throw new Error("Key not in object.");
        }

        return value as ObjectOutput<S>;
    }
}

export function arrayValidator(validator: Validator<unknown>): Validator<unknown[]> {
    return <T>(value: unknown): T => {
        if (Array.isArray(value)) {
            for (const item of value) {
                validator(item);
            }
            return value as T;
        }
        throw new Error("Not an array")
    }
}

export function stringValidator(): Validator<string> {
    return (value: unknown): string => {
        if (typeof value === "string") {
            return value;
        }
        throw Error("Not a \"string\" type.");
    }
}
export function numberValidator(): Validator<number> {
    return (value: unknown): number => {
        if (typeof value === "number") {
            return value;
        }
        throw Error("Not a \"number\" type.");
    }
}
export function booleanValidator(): Validator<boolean> {
    return (value: unknown): boolean => {
        if (typeof value === "boolean") {
            return value;
        }
        throw Error("Not a \"boolean\" type.");
    }
}
