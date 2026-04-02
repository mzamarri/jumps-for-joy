import { Link, useOutletContext } from "react-router"
import { useState, useRef } from "react"
import { useCart } from 'context/CartContext'
import { useBooking } from 'context/BookingContext';
import { ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
// import Item from './Item'

const deliveryFee = 25;

export default function CartSection({ nextStep }) {
    const { cart, setCart } = useCart();
    const { booking } = useBooking();
    const location = booking.address;

    const updateQuantity = (id, newQuantity) => {
        setCart(cart.map(item => 
            item.id === id ? {...item, quantity: Math.max(1, newQuantity)} : item
        ))
    }

    const removeItem = (id) => {
        setCart(cart.filter(item => item.id !== id)) 
    }

    const calcSubTotal = () => cart.reduce((subTotal, item) => subTotal + (item.cost * item.quantity), 0)

    return (
        <div
            className="px-16 py-8 space-y-8"
        >
            <div className='text-center space-y-2'>
                <h1 className='text-6xl text-foreground font-bold'>Your <span className="text-primary">Cart</span></h1>
                <p className='text-lg text-muted-foreground'>Make sure to check you have the correct items</p>
            </div>
            <div className='relative flex justify-end space-x-8' style={{"--cs-container-width": "calc(130 * var(--spacing))"}}> 
                <ul className='items flex-1 flex flex-col gap-4'>
                    {
                        cart.map(cartItem => {
                            return (
                                <Item 
                                    key={cartItem.id}
                                    item={cartItem}
                                    updateItem={updateQuantity}
                                    removeItem={removeItem}
                                />
                            )
                        })
                    }

                </ul>
                <div 
                    className='cart-summary h-fit sticky top-(--h-nav) w-96 shadow-md' 
                    style={{
                        top: "calc(var(--h-nav) + 16 * var(--spacing))"
                    }}
                >
                    <div className='cost-summar bg-card border border-border p-8 space-y-3 rounded-lg'>
                        <h2 className='text-2xl text-foreground font-bold pb-4'>Order Summary</h2>
                        <h3 className='flex justify-between text-muted-foreground'>
                            <span>SubTotal: </span>
                            <span>{`$${calcSubTotal()}`}</span>
                        </h3>
                        <h1 className='flex justify-between text-muted-foreground'>
                            <span>Delivery Fee: </span>
                            <span>{`$${deliveryFee}`}</span>
                        </h1>
                        <h3 className='flex justify-between text-lg py-4 border-t border-border'>
                            <span className="font-semibold">Total: </span>
                            <span className="text-primary font-bold">{`$${deliveryFee + calcSubTotal()}`}</span>
                        </h3>
                        <Link 
                            to="/details"
                            className='bg-accent text-accent-foreground font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:cursor-pointer hover:bg-accent/90'
                        >
                            Details and Service Info <ArrowRight className="w-4 h-4"/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Item({item, updateItem, removeItem}) {
    const [ value, setValue ] = useState(item.quantity)
    const lastPositive = useRef(item.quantity <= 0 ? -1 : item.quantity)

    const updateCartValue = val => {
        if (val > 0) lastPositive.current = val
        updateItem(item.id, lastPositive.current);
        setValue(lastPositive.current);
    }

    return (
        <li className='bg-card border border-border p-4 rounded-xl flex gap-4 shadow-md'>
            <div className='image h-40 w-40 bg-muted'/>
            <div className='info flex justify-between items-center flex-1'>
                <div className="">
                    <h2 className='text-2xl text-foreground font-semibold'>Item Name</h2>
                    <p className="text-muted-foreground font-semibold">${item.cost}/day</p>
                </div>
                <div className='flex justify-around items-center space-x-8'>
                    <div className='flex items-center gap-2'>
                        <button 
                            type='button'
                            className='w-10 h-10 rounded-full font-bold bg-muted text-foreground flex justify-center items-center hover:cursor-pointer'
                            onClick={() => updateCartValue(item.quantity - 1)}
                        >
                            <Minus className="w-5 h-5"/>
                        </button>
                        <input
                            min='1'
                            className='w-8 text-foreground font-semibold focus:outline-none text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none'
                            type='number'
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === "Enter") {
                                    updateCartValue(e.target.value);
                                    e.target.blur();
                                }
                            }}
                            onBlur={() => setValue(lastPositive.current)}
                        />
                        <button
                            type='button'
                            className='w-10 h-10 rounded-full font-bold bg-muted text-foreground flex justify-center items-center hover:cursor-pointer'
                            onClick={() => updateCartValue(item.quantity + 1)}
                        >
                            <Plus className="w-5 h-5"/>
                        </button>
                    </div>
                    <h2 className='text-xl text-primary font-semibold'>${item.cost * item.quantity}</h2>
                    <button 
                        className='text-destructive flex items-center gap-1 hover:cursor-pointer' 
                        onClick={() => removeItem(item.id)}
                    >
                        <Trash2 className="w-4 h-4"/> Remove
                    </button>
                </div>
            </div>
        </li>
    )
}