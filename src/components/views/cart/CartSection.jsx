import Item from './Item'

const deliveryFee = 25;

export default function CartSection({ cart, booking, updateQuantity, removeItem, subTotal }) {
    const location = booking.address;
    return (
        <section className='bg-pink-500' style={{"--h-title": "calc(20 * var(--spacing))"}}>
            <h1 className='text-4xl h-(--h-title) flex justify-center items-center'>Cart</h1>
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
                    className='cart-summary sticky top-(--h-nav) w-120 bg-yellow-500 p-4' 
                    style={{
                        height: "calc(100vh - var(--h-title) - var(--h-nav))",
                        "--top-displacement": "calc(var(--h-nav) + var(--h-title))"
                    }}
                >
                    <div className='reservatin-details bg-gray-400 px-16 py-8 space-y-3 text-center rounded-lg'>
                        <h2 className='text-lg pb-4'>Time and Location Details</h2>
                        <div className=''>
                            <div className='flex justify-between'>
                                <h3>Location: </h3>
                                <div>
                                    <h3>{location.street}, {location.unit}</h3>
                                    <h3>{location.zip} Pheonix, AZ</h3>
                                </div>
                            </div>
                        </div>
                        <h3 className='flex justify-between'>
                            <span>Date: </span>
                            <span>{booking.date}</span>
                        </h3>
                        <h3 className='flex justify-between'>
                            <span>Time: </span>
                            <span>{booking.time}</span>
                        </h3>
                        <h3 className='flex justify-between'>
                            <span>Duration: </span>
                            <span>{booking.duration}</span>
                        </h3>
                    </div>
                    <div className='cost-summary mt-8 bg-gray-500 px-16 py-4 space-y-3 text-center rounded-lg'>
                        <h2 className='text-lg py-4'>Order Summary</h2>
                        <h3 className='flex justify-between'>
                            <span>Subtotal: </span>
                            <span>{`$${subTotal}`}</span>
                        </h3>
                        <h1 className='flex justify-between'>
                            <span>Delivery Fee: </span>
                            <span>{`$${deliveryFee}`}</span>
                        </h1>
                        <h3 className='flex justify-between text-lg py-4 border-t'>
                            <span>Total: </span>
                            <span>{`$${deliveryFee + subTotal}`}</span>
                        </h3>
                        <button className='w-full bg-green-400 py-4 rounded-3xl'>
                            Details and Service Info
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}