import { Carousel } from "components/ui_features";

export default function Featured() {
    return (
        <div className='relative w-full h-full flex flex-col justify-center'>
            <h1 className='text-center text-5xl mb-16'> Featured Rentals</h1>
            <div className='carousel-container relative w-full h-2/3'>
                <div className='absolute h-full left-8 right-8'>
                    <Carousel />
                </div>
            </div>
        </div>
    )
}
