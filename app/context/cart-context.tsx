import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem } from "../routes/cart/types.js";

type CartContextValue = {
    cart: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: CartItem["id"]) => void;
    updateItem: (id: CartItem["id"], changes: Partial<CartItem>) => void;
    updateQuantity: (id: CartItem["id"], quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const CART_STORAGE_KEY = "jump-for-joy-cart";
const CART_STORAGE_VERSION = 1;

type StoredCartPayload = {
    version: typeof CART_STORAGE_VERSION;
    items: CartItem[];
};

const isCartItem = (value: unknown): value is CartItem => {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const item = value as Record<string, unknown>;

    return (
        (typeof item.id === "string" || typeof item.id === "number")
        && typeof item.cost === "number"
        && Number.isFinite(item.cost)
        && typeof item.quantity === "number"
        && Number.isFinite(item.quantity)
        && item.quantity > 0
    );
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

        const parsedCart = JSON.parse(rawCart) as StoredCartPayload;

        if (parsedCart.version !== CART_STORAGE_VERSION || !Array.isArray(parsedCart.items)) {
            return [];
        }

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
        version: CART_STORAGE_VERSION,
        items: cart,
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

        return () => window.removeEventListener("storage", syncCartFromStorage);
    }, []);

    const addItem = (item: CartItem) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
            }
            return [...prev, item];
        });
    };

    const removeItem = (id: CartItem["id"]) => {
        setCart(prev => prev.filter(i => i.id !== id));
    };

    const updateItem = (id: CartItem["id"], changes: Partial<CartItem>) => {
        setCart(prev => prev.map(i => i.id === id ? { ...i, ...changes } : i));
    };

    const updateQuantity = (id: CartItem["id"], quantity: number) => {
        if (quantity <= 0) {
            removeItem(id);
        } else {
            updateItem(id, { quantity });
        }
    };

    const clearCart = () => setCart([]);

    const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

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
