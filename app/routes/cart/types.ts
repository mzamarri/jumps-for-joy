import type { Dispatch, FormEvent, SetStateAction } from "react";
import type { LucideIcon } from "lucide-react";

export interface BaseCartItem {
    readonly id: string,
    name: string,
    cost: number,
    description: string,
    image: string,
    singleItem: boolean
}

export interface SingleCartItem extends BaseCartItem {
    singleItem: true
}

export interface MultiCartItem extends BaseCartItem {
    singleItem: false,
    quantity: number
}

export type CartItem = SingleCartItem | MultiCartItem;

export type KeyOfUnion<T> = T extends unknown ? keyof T : never
export type DistributivePick<T, K extends KeyOfUnion<T>> = T extends unknown 
    ? Pick<T, Extract<keyof T, K>> 
    : never

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
    actionError?: string;
    setFormSubmitValidator?: Dispatch<SetStateAction<((event: FormEvent<HTMLFormElement>) => void) | null>>;
};

export type SelectOption = {
    value: string;
    disabled?: boolean;
    displayText: string;
};

export type InputConfig = {
    id: string;
    name: FieldName;
    type: "text" | "email" | "tel" | "date" | "time" | "text-area" | "select";
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
    icon: LucideIcon;
    fields: Array<FieldConfig | FieldConfig[]>;
};

export type SectionId = "primaryContact" | "rentalAddress" | "eventInfo";

export type ReviewField = {
    id: FieldName;
    type: InputConfig["type"];
    label: string;
    options?: SelectOption[];
};

export type ReviewSection = {
    id: SectionId;
    title: string;
    icon: LucideIcon;
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
