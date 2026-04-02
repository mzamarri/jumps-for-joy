import { Link, NavLink, useLoaderData } from "react-router"
import { useState } from "react"
import catalog from "data/categories.json"
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react"

export function clientLoader() {
    console.log("loading data...");
    return catalog;
}

const rentals = [...Array(12)].map((__, idx) => {
    return {
        id: `item-${idx}`,
        name: `Rental name ${idx}`,
        cost: `$${100 * idx}`,
        imageSrc: `imageSrc ${idx}`
    }
});

export default function RentalCatalog({ loaderData, params }) {
    const category = loaderData.find(category => category.id == params.categoryId);

    return (
            <div className='px-16 space-y-8'>
                <CategoryTabs/>
                <div className='space-y-4'>
                    <Link
                        to="/rentals"
                        className='inline-flex items-center gap-2 text-primary font-semibold hover:underline'
                    >
                        <ArrowLeft className="w-4 h-4"/> Back to Rental Categories
                    </Link>
                    <div className='text-center'>
                        <h1 className='text-4xl font-bold '>{category.name}</h1>
                        <p className='text-lg text-muted-foreground font-semibold'>Some text about this type of rental</p>
                    </div>
                    <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6'>
                        {
                            rentals.map((item, idx) => {
                                return (
                                    <Link 
                                        key={idx} 
                                        to={item.id}
                                        className='bg-card overflow-hidden rounded-lg shadow-lg hover:shadow-xl cursor-pointer'
                                    >
                                        <div className='bg-gray-500 h-64'></div>
                                        <div className='p-5 space-y-2'>
                                            <div className='flex justify-between'>
                                                <h1 className='text-lg text-foreground font-bold'>Product</h1>
                                                <span className='text-lg text-primary font-bold'>$100</span>
                                            </div>
                                            <p className='text-sm text-muted-foreground mb-4'>Other very brief information</p>
                                            <button
                                                className='py-2 w-full rounded-lg bg-accent cursor-pointer hover:bg-accent/90 text-accent-foreground'
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
}

function CategoryTabs() {
    const categories = useLoaderData();
    const [open, setOpen] = useState(false);

    return (
        <div className="sticky top-(--h-nav)">
            <div 
                className={`bg-background border-x border-b border-gray-300 text-center shadow-lg  ${
                    open ? "rounded-b-xl" : "rounded-b-full"     
                }`}
            >
                {
                    open ? (
                        <>
                            <span 
                                className='py-3 inline-flex items-center gap-2 cursor-pointer text-foreground font-semibold'
                                onClick={() => setOpen(false)}
                            >
                                Choose a Category <ChevronUp className="w-4 h-4" />
                            </span>
                            <ul className='px-8 pt-4 pb-8 grid grid-cols-2 gap-4'>
                                {
                                    categories.map(category => {
                                        return (
                                            <NavLink
                                                key={category}
                                                to={`/rentals/${category.id}`}
                                                className={({ isActive }) => `py-2 rounded-full
                                                    ${isActive 
                                                        ? 'bg-primary text-primary-foreground'
                                                        : "bg-card text-foreground border border-border hover:bg-secondary/30 hover:border-secondary"
                                                    }
                                                `}
                                                onClick={() => setOpen(false)}
                                            >
                                                {category.name}
                                            </NavLink>
                                        )
                                    })
                                }
                            </ul> 
                        </>
                    ) : (
                        <div 
                            className='flex items-center justify-center gap-2 text-foreground font-semibold cursor-pointer'
                            onClick={() => setOpen(true)}
                        >
                            <span className='py-3 flex justify-center items-center gap-2'>
                                Current Category: <span className="text-primary">Category Goes Here</span> 
                                <ChevronDown 
                                    className="w-4 h-4"
                                />
                            </span>                   
                        </div>
                    )
                }
            </div>
        </div>
    )
}
