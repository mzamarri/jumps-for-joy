import { createContext, useContext, useState, useRef } from "react";

const CartContext = createContext([]);

export function CartProvider({ children }) {
    const [ cart, setCart ] = useState([...Array(20)].map((_, idx) => {
        return {
            id: idx,
            cost: (idx * 12) + 10,
            quantity: 1
        }
    }));
    const formData = useRef({
            primaryContact: {
                firstName: "",
                lastName: "",
                phoneNumber: "",
                email: ""
            },
            rentalAddress: {
                street: "",
                unit: "",
                city: "",
                state: "",
                zip: ""
            },
            schedule: {
                date: "",
                time: "",
                duration: ""
            },
            notes: ""
    });

    const saveFormData = (section, field, value) => {
        const data = formData.current;
        formData.current = {
            ...data,
            [section]: {
                ...data[section],
                [field]: value
            }
        }
    }

    return <CartContext value={{ cart, setCart, formData, saveFormData } }>{ children }</CartContext>
}

export function useCart() {
    return useContext(CartContext)
}