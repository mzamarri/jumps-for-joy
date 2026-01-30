import Accordion from 'components/ui_features/Accordion'
import Carousel from 'components/ui_features/Carousel'

const categories = [
    {id: 0},
    {id: 1},
    {id: 2},
    {id: 3}
]

export default function HomeCategories() {
    return (
        <div className='relative w-full h-full overflow-hidden'>
            <h1 className='text-center mt-8 text-5xl'>Rental Categories</h1>
            <div className='carousel-container absolute h-2/3 bottom-8 left-8 right-8'>
                <Carousel data={categories}/>
            </div>
        </div>
    )
}
