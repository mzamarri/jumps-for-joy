import type { Dispatch, FormEvent, SetStateAction } from "react";
import type { LucideIcon } from "lucide-react";

export type KeyOfUnion<T> = T extends unknown ? keyof T : never
export type DistributivePick<T, K extends KeyOfUnion<T>> = T extends unknown 
    ? Pick<T, Extract<keyof T, K>> 
    : never

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

export interface UserInputProps {
    type: "select" | "textarea" | "input",

}

export interface FieldConfig {
    label: string,
    id: string,
    name: FieldName,
    type: "text" | "email" | "tel" | "date" | "time" | "text-area" | "select",
    required: boolean,
    options?: SelectOption[],
    rows?: number,
    grow?: number,
}

export interface FieldSection {
    id: "primary-contact" | "rental-address" | "event-info",
    name: "Primary Contact" | "Rental Address" | "Event Information",
    icon: LucideIcon,
    fields: FieldConfig[] | FieldConfig[][]
}

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

export type SectionConfig = {
    id: string;
    name: string;
    icon: LucideIcon;
    fields: Array<FieldConfig | FieldConfig[]>;
};

export type SectionId = "primary-contact" | "rental-address" | "event-info";

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
