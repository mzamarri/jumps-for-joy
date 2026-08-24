type Validator<T> = (value: unknown) => T

export type ValidatorType<V> = V extends Validator<infer T>
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

export function validateType<T>(validator: Validator<T>): Validator<T> {
    return validator
}

export function union<T extends readonly Validator<unknown>[]>(...validators: T): ReturnType<Validator<T[number]>> {
    return value => {
        for (const validator of validators) {
            try {
                return validator(value);
            } catch {
             console.log("Validator did not work.");
            }
        }

        throw new Error("None of the validators worked.");
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

            throw new Error(`Key ${key} not in object.`);
        }

        return value as ObjectOutput<S>;
    }
}

export function arrayValidator<T>(validator: Validator<T>): Validator<T[]> {
    return (value: unknown): T[] => {
        if (Array.isArray(value)) {
            value.forEach(item => validator(item));
            return value as T[];
        }
        throw new Error(`${value} not an array`)
    }
}

export function stringValidator(compare?: string): Validator<string> {
    return (value: unknown): string => {
        if (typeof value === "string" && (!compare || value === compare)) {
            return value;
        }
        throw Error(`${value} not a string.`);
    }
}
export function numberValidator(compare?: number): Validator<number> {
    return (value: unknown): number => {
        if (typeof value === "number" && (!compare || value === compare)) {
            return value;
        }
        throw Error(`${value} not a number.`);
    }
}
export function booleanValidator(compare?: boolean): Validator<boolean> {
    return (value: unknown): boolean => {
        if (typeof value === "boolean" && (!compare || value === compare)) {
            return value;
        }
        throw Error(`${value} not a boolean.`);
    }
}
