// Cart-specific helpers for draft persistence
import type { RequestDraft } from "./types";

export const CLIENT_DRAFT_STORAGE_KEY = "jump-for-joy-client-draft";
export const persistedClientFields = [
    "firstName",
    "lastName",
    "phoneNumber",
    "email",
    "street",
    "unit",
    "city",
    "state",
    "zip",
] as const;

export function readPersistedClientDraft(): Partial<RequestDraft> {
    if (typeof window === "undefined") return {};
    try {
        const rawValue = window.localStorage.getItem(CLIENT_DRAFT_STORAGE_KEY);
        if (!rawValue) return {};
        const parsed = JSON.parse(rawValue) as Partial<RequestDraft>;
        return parsed ?? {};
    } catch {
        return {};
    }
}

export function pickPersistedClientDraft(draft: RequestDraft): Partial<RequestDraft> {
    return persistedClientFields.reduce((acc, fieldName) => {
        acc[fieldName] = draft[fieldName];
        return acc;
    }, {} as Partial<RequestDraft>);
}
