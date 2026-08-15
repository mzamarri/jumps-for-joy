import { type ReactNode, useState } from "react";

export default function UserInput({ children }: { children: ReactNode }) {
    const isEditing = name === editingField;
    const error = null; //add error validation. Most likely will be done everytime a value changes.

    useEffect(() => {
        if (!isEditing) {
            setNextValue(value);
            setHasInteracted(false);
        }
    }, [isEditing, value]);

    const handleEdit = () => {
        setNextValue(value);
        setHasInteracted(false);
        edit(name);
    };

    const handleFieldChange = (value: string) => {
        const sanitizedValue = sanitizeFieldValue(name, value);
        const error = validateField(name, sanitizedValue, draft);

        setNextValue(sanitizedValue);
        setHasInteracted(true);
        onValidationMessage(error ?? "");
    };

    const handleSave = () => {
        setHasInteracted(true);

        if (saveError) {
            return;
        }

        save(name, nextValue);
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
        handleFieldChange(removePreviousPhoneDigit(nextValue, selectionStart, selectionEnd));
    };
    const handleFieldChange = (nextValue: string) => {

    };

    const handlePhoneKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        // if (event.key !== "Backspace") {
        //     return;
        // }

        // const { selectionStart, selectionEnd } = event.currentTarget;

        // if (selectionStart === null || selectionEnd === null) {
        //     return;
        // }

        // event.preventDefault();
        // handleFieldChange(removePreviousPhoneDigit(value, selectionStart, selectionEnd));
    };

    return <>
        { children }
    </>
}