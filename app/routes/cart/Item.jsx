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
        <li className='bg-white border border-gray-400 p-4 rounded-xl flex gap-4 shadow-lg'>
            <div className='image h-40 w-40 bg-gray-400'/>
            <div className='info flex justify-between items-center flex-1'>
                <div className="">
                    <h2 className='text-lg'>Item Name</h2>
                    <p className="text-gray-500">${item.cost} each</p>
                </div>
                <div className='flex justify-around items-center space-x-8'>
                    <div className='flex items-center rounded-2xl  border border-gray-400 bg-brand-blue'>
                        <button 
                            type='button'
                            className='p-4 text-white hover:cursor-pointer'
                            onClick={() => updateCartValue(item.quantity - 1)}
                        >
                            -
                        </button>
                        <input
                            min='1'
                            className='w-8 text-white focus:outline-none text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none'
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
                            className='p-4 text-white hover:cursor-pointer'
                            onClick={() => updateCartValue(item.quantity + 1)}
                        >
                            +
                        </button>
                    </div>
                    <h2 className='text-lg font-semibold'>${item.cost * item.quantity}</h2>
                    <button className='text-brand-red hover:cursor-pointer rounded-2xl' onClick={() => removeItem(item.id)}>Remove</button>
                </div>
            </div>
        </li>
    )
}