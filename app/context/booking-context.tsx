import { createContext, useContext, useState } from "react";

type Booking = {
    address: {
        street: string;
        unit: string;
        zip: string;
    };
    date: string;
    time: string;
    duration: string;
};

type BookingContextValue = {
    booking: Booking;
    setBooking: React.Dispatch<React.SetStateAction<Booking>>;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
    const [ booking, setBooking] = useState<Booking>({
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
    const ctx = useContext(BookingContext);
    if (!ctx) throw new Error("useBooking must be used within a BookingProvider");
    return ctx;
}
