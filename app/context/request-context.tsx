import { createContext, useContext, useRef } from "react";

type RequestInput = {
    primaryContact: {
        firstName: string;
        lastName: string;
        phoneNumber: string;
        emailAddress: string;
    };
    serviceLocation: {
        streetAddress: string;
        unit: string;
        city: string;
        state: string;
        zip: string;
    };
    schedule: {
        date: string;
        time: string;
        duration: string;
    };
    notes: string;
};

type RequestContextValue = {
    userInputRef: React.RefObject<RequestInput>;
};

const RequestContext = createContext<RequestContextValue | null>(null);

export function RequestProvider({ children }: { children: React.ReactNode }) {
    const userInputRef = useRef<RequestInput>({
        primaryContact: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            emailAddress: ""
        },
        serviceLocation: {
            streetAddress: "",
            unit: "",
            city: "",
            state: "AZ",
            zip: ""
        },
        schedule: {
            date: "",
            time: "",
            duration: ""
        },
        notes: ""
    })

    return (
        <RequestContext value={{ userInputRef }}>{ children }</RequestContext>
    )
}

export function useRequest() {
    const ctx = useContext(RequestContext);
    if (!ctx) throw new Error("useRequest must be used within a RequestProvider");
    return ctx;
}
