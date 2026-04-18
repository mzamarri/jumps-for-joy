import { Link } from "react-router"
import { Search } from 'lucide-react'
import categories from "data/rentalCategories";

export default function Rentals() {
    return (
        <div className='px-4 py-8 space-y-4 sm:px-6 lg:px-24'>
            <div className='text-center space-y-3'>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground font-semibold text-sm rounded-full">
                    <Search className="w-4 h-4" /> Browse Our Collection
                </span>
                <h1 className='text-foreground text-4xl font-bold sm:text-5xl lg:text-6xl'>Rental Categories</h1>
                <p className="text-muted-foreground text-base sm:text-lg">Choose a category to browse our selection of rental items</p>
            </div>
            <ul className='grid grid-cols-2 gap-4 p-4 lg:grid-cols-3'>
                {
                    categories.map((category) => {
                        return ( 
                            <Link
                                key={category.id}
                                to={`${category.id}`}
                                className='bg-card overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-border' 
                            >
                                <div className='flex h-32 items-center justify-center bg-muted md:h-64'>
                                    <img
                                        src={category.image}
                                        alt={`${category.title} category`}
                                        className='w-full h-full object-contain p-3 md:p-4'
                                    />
                                </div>
                                <div className='space-y-1.5 p-3 text-center md:space-y-2 md:p-5'>
                                    <h2 className='text-base font-semibold text-foreground md:text-3xl'>{category.title}</h2>
                                    <p className='text-xs leading-5 text-muted-foreground md:text-sm'>{category.description}</p>
                                </div>
                            </Link>
                        )
                    })
                }
            </ul>
        </div>
    )
}
