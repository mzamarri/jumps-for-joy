import { useState, useRef } from 'react'

export default function Item({item, updateItem, removeItem}) {
    const [ value, setValue ] = useState(item.quantity)
    const lastPositive = useRef(item.quantity <= 0 ? -1 : item.quantity)

    const updateCartValue = val => {
        if (val > 0) lastPositive.current = val
        updateItem(item.id, lastPositive.current);
        setValue(lastPositive.current);
    }

    return (
        <li className='bg-blue-700 p-4 rounded-xl flex gap-4'>
            <div className='image h-40 w-40 bg-gray-400'/>
            <div className='info flex flex-col bg-yellow-200 flex-1'>
                <h2 className='text-lg py-2 text-center'>Item Name</h2>
                <div className='flex-1 flex bg-orange-300 justify-around items-center'>
                    <div className='flex items-center bg-red-300'>
                        <button 
                            type='button'
                            className='bg-gray-400 py-4 px-6 rounded-2xl'
                            onClick={() => updateCartValue(item.quantity - 1)}
                        >
                            -
                        </button>
                        <input
                            min='1'
                            className='mx-4 w-12 bg-white text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none'
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
                            className='bg-gray-400 py-4 px-6 rounded-2xl'
                            onClick={() => updateCartValue(item.quantity + 1)}
                        >
                            +
                        </button>
                    </div>
                    <h2 className='text-lg'>Cost: {item.cost * item.quantity}</h2>
                    <button className='p-4 bg-red-500 text-white rounded-2xl' onClick={() => removeItem(item.id)}>Remove</button>
                </div>
            </div>
        </li>
    )
}