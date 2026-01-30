import { createContext, useContext, useState } from "react";

const CartContext = createContext([]);

export function CartProvider({ children }) {
    const [cart, setCart] = useState([...Array(20)].map((_, idx) => {
        return {
            id: idx,
            cost: (idx * 12) + 10,
            quantity: 1
        }
    }));

    return <CartContext value={{ cart, setCart }}>{ children }</CartContext>
}

export function useCart() {
    return useContext(CartContext)
}