import type { Dispatch, SetStateAction } from "react";

export type FieldName =
    | "firstName"
    | "lastName"
    | "phoneNumber"
    | "email"
    | "street"
    | "unit"
    | "city"
    | "state"
    | "zip"
    | "date"
    | "time"
    | "duration"
    | "eventType"
    | "surfaceType"
    | "notes";

export type RequestDraft = Record<FieldName, string>;

export type CartOutletContext = {
    draft: RequestDraft;
    setDraft: Dispatch<SetStateAction<RequestDraft>>;
};

export type SelectOption = {
    value: string;
    disabled?: boolean;
    displayText: string;
};

export type InputConfig = {
    id: string;
    name: FieldName;
    type: "text" | "date" | "time" | "text-area" | "select";
    required: boolean;
    rows?: number;
    options?: SelectOption[];
};

export type FieldConfig = {
    label: string;
    input: InputConfig;
    grow?: number;
};

export type SectionConfig = {
    id: string;
    name: string;
    fields: Array<FieldConfig | FieldConfig[]>;
};

export type SectionId = "primaryContact" | "rentalAddress" | "eventInfo";

export type ReviewField = {
    id: FieldName;
    type: string;
    label: string;
};

export type ReviewSection = {
    id: SectionId;
    title: string;
    fields: ReviewField[];
};

export const initialRequestDraft: RequestDraft = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    street: "",
    unit: "",
    city: "",
    state: "",
    zip: "",
    date: "",
    time: "",
    duration: "",
    eventType: "",
    surfaceType: "",
    notes: "",
};
