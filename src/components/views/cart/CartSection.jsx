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
            <h1 className='text-4xl py-4 flex justify-center items-center'>Cart</h1>
            <div className='relative flex justify-end bg-blue-200' style={{"--cs-container-width": "calc(130 * var(--spacing))"}}> 
                <ul className='items flex-1 flex flex-col gap-4 p-4 bg-green-400'>
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
                    className='cart-summary h-fit sticky top-0 w-120 bg-yellow-500 p-4' 
                    style={{
                        top: "calc(var(--h-nav) + var(--h-stepper))"
                    }}
                >
                    <div className='cost-summary bg-gray-500 px-16 py-12 space-y-3 text-center rounded-lg'>
                        <h2 className='text-xl pb-4'>Order Summary</h2>
                        <h3 className='flex justify-between'>
                            <span>SubTotal: </span>
                            <span>{`$${calcSubTotal()}`}</span>
                        </h3>
                        <h1 className='flex justify-between'>
                            <span>Delivery Fee: </span>
                            <span>{`$${deliveryFee}`}</span>
                        </h1>
                        <h3 className='flex justify-between text-lg py-4 border-t'>
                            <span>Total: </span>
                            <span>{`$${deliveryFee + calcSubTotal()}`}</span>
                        </h3>
                        <button 
                            type="button"
                            className='w-full bg-green-400 py-4 rounded-3xl'
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