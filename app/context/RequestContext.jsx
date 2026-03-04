import { createContext, useContext, useRef } from "react";

const RequestContext = createContext();

export function RequestProvider({ children }) {
    const userInputRef = useRef({
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
    return useContext(RequestContext);
}