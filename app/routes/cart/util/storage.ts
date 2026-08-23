// Cart-specific helpers for draft persistence
import { type RequestDraft, type CartItem, type DistributivePick, type FieldName, fields, initialRequestDraft } from "../types";

export const CLIENT_DRAFT_STORAGE_KEY = "jump-for-joy-client-draft";
export const persistedFields: FieldName[] = [
    "firstName",
    "lastName",
    "phoneNumber",
    "email",
    "street",
    "city",
    "state",
    "zip"
] as const;

export type StoredDraft = {
    hasSubmitted: boolean,
    draft: RequestDraft
}

/* 
Needs to:
    1. Convert json to js
    2. Normalize the data, make sure the fields are a valid fields
       otherwise return ""
*/
export function normalizeData(data: unknown): RequestDraft {
    if (
        typeof data !== "object" ||
        data === null || 
        !("hasSubmitted" in data) ||
        typeof data.hasSubmitted !== "boolean" ||
        !("draft" in data) || 
        typeof data.draft !== "object" ||
        data.draft === null
    ) {
        console.log("Value is not proper type.");
        return initialRequestDraft;
    }

    console.log("Normalizing Data.");
    const draft: RequestDraft = { ...initialRequestDraft }
    const fieldsToPersist: readonly FieldName[] = data.hasSubmitted ? persistedFields : fields;
    
    for (const [key, value] of Object.entries(data.draft)) {
        const fieldName = fieldsToPersist.find(name => key === name);

        if (fieldName === undefined) {
            continue;
        }

        const storedValue: string = typeof value === "string" ? value : "";
        draft[fieldName] = storedValue;
    }

    return draft;
}

export function readStorageDraft(): RequestDraft {
    if (typeof window === "undefined") return initialRequestDraft;
    try {
        const rawValue = window.localStorage.getItem(CLIENT_DRAFT_STORAGE_KEY);
        if (!rawValue) {
            return initialRequestDraft
        };

        const data = JSON.parse(rawValue);
        return normalizeData(data);
    } catch {
        return initialRequestDraft;
    }
}

export function writeStorageDraft(hasSubmitted: boolean, draft: RequestDraft) {
    const storeDraft: StoredDraft = {
        hasSubmitted,
        draft
    }
    localStorage.setItem(CLIENT_DRAFT_STORAGE_KEY, JSON.stringify(storeDraft));
    console.log("Draft Saved Successfully");
}

export function getCost(item: DistributivePick<CartItem, "singleItem" | "quantity" | "cost">) {
    return item.singleItem ? item.cost : item.quantity * item.cost;
}
