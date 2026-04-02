import { Carousel } from "components/ui_features";
import { Star, ShoppingCart } from "lucide-react"

export default function Featured() {
    return (
        <div className='relative w-full h-full overflow-hidden px-24 py-12 bg-muted'>
            <div className='h-full flex flex-col justify-center space-y-8'>
                <div className='flex justify-center'>
                    <div className='w-fit space-y-2 rounded-lg text-center'>
                        <span className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground rounded-full px-4 py-2 text-sm font-semibold">
                            <Star className='w-4 h-4 fill-current'/> 
                            Most Popular
                        </span>
                        <h1 className='text-6xl font-bold'> Featured <span className='text-primary'>Rentals</span></h1>
                        <p className='max-w-2xl text-lg text-muted-foreground'>To get a better idea of our rentals, here are a few of our most popular selection</p>
                    </div>
                </div>
                <div className='carousel-container relative w-full h-2/3'>
                    <div className='grid grid-cols-3 gap-9'>
                        {[<Card/>, <Card/>, <Card/>, <Card/>, <Card/>, <Card/>]}
                    </div>
                </div>
            </div>
        </div>
    )
}

function Card() {
    return (
        <div className='bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer'>
            <div className='h-48 bg-gray-400'/>
            <div className='space-y-2 p-5'>
                <div className='flex justify-between'>
                    <h1 className='text-lg text-foreground font-bold'>Item Name</h1>
                    <span className='text-lg text-primary font-bold'>$100</span>
                </div>
                <p className='text-sm text-muted-foreground mb-4'>Description of the Item goes here</p>
                <button className='w-full py-2 rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground cursor-pointer flex gap-3 justify-center items-center'>
                    <ShoppingCart 
                        className='w-4 h-4'
                    />
                    Add to Card
                </button>
            </div>
        </div>
    )
}
