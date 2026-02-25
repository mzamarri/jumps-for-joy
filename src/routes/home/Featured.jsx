import { Carousel } from "components/ui_features";

export default function Featured() {
    return (
        <div className='relative w-full h-full overflow-hidden px-24 py-12'>
            <div className='h-full flex flex-col justify-center space-y-8'>
                <div className='flex justify-center'>
                    <div className='w-fit space-y-2 rounded-lg text-center'>
                        <h1 className='text-5xl font-semibold'> Featured Rentals</h1>
                        <p className=''>To get a better idea of our rentals, here are a few of our most popular selection</p>
                    </div>
                </div>
                <div className='carousel-container relative w-full h-2/3'>
                    <div className='grid grid-cols-3 grid-rows-2 gap-4'>
                        {[<Card/>, <Card/>, <Card/>, <Card/>, <Card/>, <Card/>]}
                    </div>
                </div>
            </div>
        </div>
    )
}

function Card() {
    return (
        <div className='group flex flex-col p-4 space-y-4 bg-white border border-gray-300 rounded-lg'>
            <div className='h-48 bg-gray-400'/>
            <div className='flex-1 flex flex-col text-center space-y-2'>
                <div className=''>
                    <h1 className='text-lg'>Item Name</h1>
                    <p className='text-gray-500'>description</p>
                </div>
                <p className='text-lg'>$100</p>
                <button className='w-full py-4 rounded-lgw bg-brand-red text-white group-hover:bg-brand-red group-hover:text-whi'>
                    Add to Card
                </button>
            </div>
        </div>
    )
}
