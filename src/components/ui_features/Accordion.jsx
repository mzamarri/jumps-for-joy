import { useState } from 'react'

export default function Accordion() {
    return (
        <div className='w-3/4 border-2 rounded'>
            <Item/>
            <Item/>
            <Item/>
        </div>
    )
}

function Item() {
    const [isOpen, setisOpen] = useState(false);

    const handleClick = () => {
        console.log("Clicked")
        setisOpen(!isOpen);
    }

    return (
        <div className='cursor-pointer border-b-2 last:border-none'>
            <div onClick={handleClick} className='p-4'>
                Question
            </div>
            <div className={`point overflow-hidden ${isOpen ? 'h-auto' : 'h-0'}`}>
                <div className='border-t-2 p-4'>
                    This text goes under
                </div>
            </div>
        </div>
    )
}
