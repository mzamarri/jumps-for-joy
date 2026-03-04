import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export function BookingProvider({ children }) {
    const [ booking, setBooking] = useState({
        address: {
            street: "4321 first ave",
            unit: "apt 123",
            zip: "98765"
        },
        date: "January 1st 2026",
        time: '1:30 pm',
        duration: '3 days'
    });

    return (
        <BookingContext value={{ booking, setBooking }}>{children}</BookingContext>
    )
}

export function useBooking() {
    return useContext(BookingContext)
}