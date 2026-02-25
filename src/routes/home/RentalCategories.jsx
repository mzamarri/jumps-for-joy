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
        <div className='relative w-full h-full bg-brand-blue-light overflow-hidden py-12 px-24'>
            <div className='flex flex-col space-y-8'>
                <div className='space-y-4'>
                    <h1 className='text-center text-5xl font-semibold'>Rental Categories</h1>
                    <p className='text-center max-w-2xl mx-auto'>
                        Explore our different rental categories—from classic bounce houses and combo units
                        to water slides, obstacle courses, and party add-ons—so you can build the perfect
                        setup for your next event.
                    </p>
                </div>
                <div className='h-fit'>
                    <Carousel cards={[<Card/>, <Card/>, <Card/>, <Card/>]}/>
                </div>
            </div>
        </div>
    )
}

function Card() {
    return (
        <div className='flex flex-col text-center p-4 space-y-4'>
            <div className='h-96 bg-gray-500' />
            <h1 className='text-xl pb-4'>Category Name</h1>
        </div>
    )
}