import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { BaseCartItem, CartItem, MultiCartItem, SingleCartItem } from "../routes/cart/types.js";

type CartContext = {
    cart: CartItem[];
    addItem: (item:  BaseCartItem) => void;
    removeItem: (id: CartItem["id"]) => void;
    updateItem: (updatedItem: (
        Partial<Omit<MultiCartItem, "id" | "singleItem">>
        & Pick<MultiCartItem, "id">
    ) | (
        Partial<Omit<SingleCartItem, "id" | "singleItem">>
        & Pick<SingleCartItem, "id" | "singleItem">
    )) => void;
    updateQuantity: (id: CartItem["id"], quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
};

type StoredCartPayload = {
    items: CartItem[];
};

const CART_STORAGE_KEY = "jump-for-joy-cart";

const CartContext = createContext<CartContext | null>(null);

// Thinking of returning SingleCartItem and MultiCartItem types instead of just CartItem types.
// It will make it easier to implement cart items that way I believe.
const isCartItem = (value: unknown): value is CartItem => {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const item = value as Record<string, unknown>;


    if (
        typeof item.id !== "string"
        && typeof item.name !== "string"
        && typeof item.cost !== "number"
        && !Number.isFinite(item.cost)
        && typeof item.description !== "string"
        && typeof item.image !== "string"
        && typeof item.singleItem !== "boolean"
    ) {
        return false
    }

    if (item.singleItem === true) {
        return true
    }

    return (
        typeof item.quantity === "number"
        && Number.isFinite(item.quantity)
        && item.quantity > 0
    )
};

const readStoredCart = (): CartItem[] => {
    if (typeof window === "undefined") {
        return [];
    }

    try {
        const rawCart = window.localStorage.getItem(CART_STORAGE_KEY);

        if (!rawCart) {
            return [];
        }

        const parsedCart = JSON.parse(rawCart);

        return parsedCart.items.filter(isCartItem);
    } catch {
        return [];
    }
};

const writeStoredCart = (cart: CartItem[]) => {
    if (typeof window === "undefined") {
        return;
    }

    const payload: StoredCartPayload = {
        items: cart
    };

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(payload));
};

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [hasHydratedCart, setHasHydratedCart] = useState(false);

    useEffect(() => {
        setCart(readStoredCart());
        setHasHydratedCart(true);
    }, []);

    useEffect(() => {
        if (!hasHydratedCart) {
            return;
        }

        writeStoredCart(cart);
    }, [cart, hasHydratedCart]);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        const syncCartFromStorage = (event: StorageEvent) => {
            if (event.key !== CART_STORAGE_KEY) {
                return;
            }

            setCart(readStoredCart());
        };

        window.addEventListener("storage", syncCartFromStorage); 
    }, []);

    const addItem: CartContext["addItem"] = (item) => {
        setCart(prev => {
            const prevItem: CartItem | undefined = prev.find(i => i.id === item.id);
            if (prevItem) {
                if (prevItem.singleItem) {
                    return prev
                }
                const updatedItem = { ...prevItem, quantity: prevItem.quantity + 1 }
                return prev.map(i => i.id === prevItem.id ? updatedItem : i);
            }

            const newItem: CartItem = item.singleItem 
                ? {
                    ...item,
                    singleItem: true
                } : {
                    ...item,
                    singleItem: false,
                    quantity: 1
                }
            return [...prev, newItem]
        });
    };

    const removeItem = (id: CartItem["id"]) => {
        setCart(prev => prev.filter(i => i.id !== id));
    };

    const updateItem: CartContext["updateItem"] = (
        updatedItem
    ) => {
        setCart(prev => prev.map(i => {
            if (i.id !== updatedItem.id) return i;

            return { 
                ...i,
                ...Object.fromEntries(
                    Object.entries(updatedItem).filter(([,value]) => value !== undefined)
                )
             }
        }));
    };

    const updateQuantity = (id: CartItem["id"], quantity: number) => {
        if (quantity <= 0) {
            removeItem(id);
        } else {
            updateItem({id, quantity});
        }
    };

    const clearCart = () => setCart([]);

    const totalItems = useMemo(() => cart.reduce((sum, item) => sum + (item.singleItem === false ? item.quantity : 1), 0), [cart]);

    return (
        <CartContext value={{ cart, addItem, removeItem, updateItem, updateQuantity, clearCart, totalItems }}>
            {children}
        </CartContext>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within a CartProvider");
    return ctx;
}
