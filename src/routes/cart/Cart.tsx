import { useCart } from 'context/CartContext'
import { useBooking } from 'context/BookingContext';
import Item from './Item'

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
        <>
            <div className='text-center space-y-2'>
                <h1 className='text-6xl font-semibold'>Your Cart</h1>
                <p className='text-gray-500'>Make sure to check you have the correct items</p>
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
                    className='cart-summary h-fit sticky top-0 w-96 shadow-lg' 
                    style={{
                        top: "calc(var(--h-nav) + var(--h-stepper))"
                    }}
                >
                    <div className='cost-summary bg-white border border-gray-400 p-8 space-y-3 rounded-lg'>
                        <h2 className='text-xl text-brand-blue-dark pb-4'>Order Summary</h2>
                        <h3 className='flex justify-between text-gray-500'>
                            <span>SubTotal: </span>
                            <span>{`$${calcSubTotal()}`}</span>
                        </h3>
                        <h1 className='flex justify-between text-gray-500'>
                            <span>Delivery Fee: </span>
                            <span>{`$${deliveryFee}`}</span>
                        </h1>
                        <h3 className='flex justify-between text-lg py-4 border-t border-gray-400'>
                            <span>Total: </span>
                            <span>{`$${deliveryFee + calcSubTotal()}`}</span>
                        </h3>
                        <button 
                            type="button"
                            className='w-full bg-brand-blue text-white py-4 rounded-3xl hover:cursor-pointer hover:bg-brand-blue-dark'
                            onClick={nextStep}
                        >
                            Details and Service Info
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}