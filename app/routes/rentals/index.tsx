import { Link } from "react-router"
import categories from "data/rentalCategories";

export default function Rentals() {
    return (
        <div className='py-8 px-24 space-y-4'>
            <div className='text-center space-y-2'>
                <h1 className='text-foreground text-6xl font-bold'>Rental <span className='text-primary'>Categories</span></h1>
                <p className="text-muted-foreground text-lg">Choose a category to browser our selection of rental items</p>
            </div>
            <ul className='p-4 grid grid-cols-3 gap-4'>
                {
                    categories.map((category) => {
                        return ( 
                            <Link
                                key={category.id}
                                to={`${category.id}`}
                                className='bg-card overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-border' 
                            >
                                <div className='h-64 bg-muted flex items-center justify-center'>
                                    <img
                                        src={category.image}
                                        alt={`${category.title} category`}
                                        className='w-full h-full object-contain p-4'
                                    />
                                </div>
                                <div className='p-5 text-center space-y-2'>
                                    <h2 className='text-3xl text-foreground font-semibold'>{category.title}</h2>
                                    <p className='text-sm text-muted-foreground'>{category.description}</p>
                                </div>
                            </Link>
                        )
                    })
                }
            </ul>
        </div>
    )
}
