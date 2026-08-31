import type { KeyboardEvent } from "react";
import { normalizeValue } from "./utils";

export function handlePhoneKeyDown(
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
) {
    const input = event.currentTarget;
    const value = input.value;

    const start = input.selectionStart;
    const end = input.selectionEnd;

    if (start === null || end === null) return;

    const hasSelection = start !== end;
    const hasModifier =
        event.shiftKey ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey;

    if (hasModifier || hasSelection) return;

    let position = start;

    switch (event.key) {
        case "Backspace": {
            while (
                position > 0 &&
                !/\d/.test(value[position - 1])
            ) {
                position--;
            }

            input.setSelectionRange(position, position);

            // Don't preventDefault:
            // browser deletes, then onChange runs
            break;
        }

        case "Delete": {
            while (
                position < value.length &&
                !/\d/.test(value[position])
            ) {
                position++;
            }

            input.setSelectionRange(position, position);

            // Don't preventDefault
            break;
        }

        case "ArrowLeft": {
            event.preventDefault();

            position = Math.max(position - 1, 0);

            while (
                position > 0 &&
                !/\d/.test(value[position - 1])
            ) {
                position--;
            }

            input.setSelectionRange(position, position);
            break;
        }

        case "ArrowRight": {
            event.preventDefault();

            position = Math.min(position + 1, value.length);

            while (
                position < value.length &&
                !/\d/.test(value[position])
            ) {
                position++;
            }

            input.setSelectionRange(position, position);
            break;
        }

        default: {
            const normalizedValue = normalizeValue(/\D+/g, value);
            if (/^\d{10}$/.test(normalizedValue) && /^.$/.test(event.key)) {
                event.preventDefault();
            }
        }
    }
};
