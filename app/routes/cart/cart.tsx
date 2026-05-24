import { Link } from "react-router"
import { useState, useRef } from "react"
import { useCart } from 'context/cart-context'
import { ArrowRight, Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import type { CartItem } from "./types.js";
// import Item from './Item'

const deliveryFee = 25;

export default function CartSection() {
    const { cart, removeItem, updateQuantity } = useCart();
    const subtotal = cart.reduce((subTotal, item) => subTotal + (item.cost * item.quantity), 0);

    return (
        <div className="space-y-8 py-8">
            <div className='text-center space-y-2'>
                <h1 className='text-4xl sm:text-5xl text-foreground font-bold'>Your <span className="text-primar">Cart</span></h1>
                <p className='text-muted-foreground'>Make sure to check you have the correct items</p>
            </div>
            {
                cart.length > 0
                    ? (
                        <div className="mx-4 sm:mx-8 flex-1 flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8">
                            <ul className='max-w-3xl w-full flex-1 flex flex-col items-center gap-4'>
                                {
                                    cart.map(cartItem => {
                                        return (
                                            <Item 
                                                key={cartItem.id}
                                                item={cartItem}
                                                updateItemQuantity={updateQuantity}
                                                removeItem={removeItem}
                                            />
                                        )
                                    })
                                }
                            </ul>
                            <div 
                                className='max-w-3xl w-full lg:max-w-xs flex-1 h-fit sticky' 
                                style={{
                                    top: "calc(var(--h-nav) + 16 * var(--spacing))"
                                }}
                            >
                                <div className='bg-card border border-border rounded-lg overflow-hidden shadow-md'>
                                    <div className="px-6">
                                        <h1 className='text-2xl border- border-border py-6 font-semibold'>Order Summary</h1>
                                        <div className="py-3 border-t border-border">
                                            <h3 className='flex justify-between text-muted-foreground'>
                                                <span>SubTotal: </span>
                                                <span>{`$${subtotal}`}</span>
                                            </h3>
                                            <h1 className='flex justify-between text-muted-foreground'>
                                                <span>Delivery Fee: </span>
                                                <span>{`$${deliveryFee}`}</span>
                                            </h1>
                                        </div>
                                        <div className='flex justify-between items-center text-xl pt-4 border-t border-border'>
                                            <h2 className="font-semibold">Total: </h2>
                                            <span className="text-primary font-bold">{`$${deliveryFee + subtotal}`}</span>
                                        </div>
                                        <Link 
                                            to="/details"
                                            className='bg-accent text-accent-foreground sm:text-sm font-semibold py-3 my-6 rounded-lg flex items-center justify-center gap-2 hover:cursor-pointer hover:bg-accent/90'
                                        >
                                            Continue to Details <ArrowRight className="w-4 h-4"/>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="py-24 flex justify-center items-center">
                            <div className="flex flex-col items-center gap-2">
                                <ShoppingCart className="w-16 h-16 text-muted-foreground/40"/>
                                <div className="text-center">
                                    <h1 className="text-xl text-foreground font-bold">
                                        Your cart is empty
                                    </h1>
                                    <p className="text-muted-foreground">
                                        Browse our rentals to add items.
                                    </p>
                                </div>
                                <Link
                                    className="py-3 px-9 mt-4 bg-accent hover:bg-accent/90 rounded-xl text-accent-foreground font-bold cursor-pointer flex gap-2 items-center"
                                    to="/rentals"
                                >
                                    Browse Rentals
                                    <ArrowRight className="w-4 h-4"/>
                                </Link>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

function Item({
    item,
    updateItemQuantity,
    removeItem,
}: {
    item: CartItem;
    updateItemQuantity: (id: CartItem["id"], quantity: number) => void;
    removeItem: (id: CartItem["id"]) => void;
}) {
    const [ value, setValue ] = useState(item.quantity)
    const lastPositive = useRef(item.quantity <= 0 ? -1 : item.quantity)

    const updateCartValue = (nextValue: number | string) => {
        const parsedValue = typeof nextValue === "number" ? nextValue : Number(nextValue);
        if (Number.isFinite(parsedValue) && parsedValue > 0) {
            lastPositive.current = parsedValue;
        }
        updateItemQuantity(item.id, lastPositive.current);
        setValue(lastPositive.current);
    }

    return (
        <li className='w-full bg-card border border-border rounded-xl shadow-md overflow-hidden'>
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 p-4">
                <div className='h-40 w-full sm:w-32 sm:h-32 bg-muted rounded-lg overflow-hidden flex items-center justify-center shrink-0'>
                    <img src={item?.image} alt={String(item.name ?? "Rental item")} className="h-full w-full object-contain p-3" />
                </div>
                <div className="max-h-32 flex-1 flex items-start justify-between gap-4">
                    <div className="flex flex-col">
                        <h2 className='sm:text-xl text-foreground font-semibold'>{String(item.name ?? "Rental Item")}</h2>
                        <p className="text-primary sm:text-lg font-bold">${item.cost}/day</p>
                        <p className="max-w-3xs text-xs sm:text-sm text-muted-foreground">
                            {item.description}
                        </p>
                    </div>
                    <button 
                        className='text-destructive sm:text-muted-foreground hover:text-destructive flex items-center gap-1 hover:cursor-pointer' 
                        onClick={() => removeItem(item.id)}
                    >
                        <Trash2 className="w-5 h-5 sm:w-4 sm:h-4 m-2 sm:m-auto"/> <span className="hidden sm:inline">Remove</span>
                    </button>
                </div>
            </div>
            <div className="flex justify-between items-center gap-4 bg-background border-t border-border p-4">
                <div className='flex items-center gap-8'>
                    <div className='flex items-center gap-2'>
                        <button 
                            type='button'
                            className='w-10 h-10 rounded-full font-bold bg-muted sm:bg-background hover:bg-muted border border-border text-foreground flex justify-center items-center hover:cursor-pointer'
                            onClick={() => updateCartValue(item.quantity - 1)}
                        >
                            <Minus className="w-5 h-5"/>
                        </button>
                        <input
                            min='1'
                            className='w-8 text-foreground font-semibold focus:outline-none text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none'
                            type='number'
                            value={value}
                            onChange={e => setValue(Number(e.target.value))}
                            onKeyDown={e => {
                                if (e.key === "Enter") {
                                    updateCartValue((e.target as HTMLInputElement).value);
                                    e.target.blur();
                                }
                            }}
                            onBlur={() => setValue(lastPositive.current)}
                        />
                        <button
                            type='button'
                            className='w-10 h-10 rounded-full font-bold bg-muted sm:bg-background hover:bg-muted border border-border text-foreground flex justify-center items-center hover:cursor-pointer'
                            onClick={() => updateCartValue(item.quantity + 1)}
                        >
                            <Plus className="w-5 h-5"/>
                        </button>
                    </div>
                    
                    
                </div>
                <span className="text-lg font-bold">${item.cost * item.quantity}</span>
            </div>
        </li>
    )
}
