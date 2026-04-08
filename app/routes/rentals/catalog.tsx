import { Link, NavLink, useLoaderData } from "react-router"
import { useState } from "react"
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react"
import { RentalItemCard } from "components/ui";
import categories from 'data/rentalCategories'
import { getItemsForCategory } from "data/rentalItems";

export function clientLoader() {
    console.log("loading data...");
    return categories;
}

export default function RentalCatalog({ loaderData, params }) {
    const category = loaderData.find(category => category.id == params.categoryId);
    const rentals = getItemsForCategory(params.categoryId);

    if (!category) {
        return (
            <div className='space-y-8'>
                <CategoryTabs />
                <div className='px-16 py-8'>
                    <p className='text-muted-foreground'>Category not found.</p>
                </div>
            </div>
        );
    }

    return (
            <div className='space-y-8'>
                <CategoryTabs/>
                <div className='space-y-4 px-16'>
                    <Link
                        to="/rentals"
                        className='inline-flex items-center gap-2 text-primary font-semibold hover:underline'
                    >
                        <ArrowLeft className="w-4 h-4"/> Back to Rental Categories
                    </Link>
                    <div className='text-foreground flex flex-col items-center gap-4 pb-8 rounded-2xl'>
                        <div className="p-4 bg-muted rounded-full">
                            <img
                                src={category.image}
                                alt={`${category.name} category`}
                                className='w-32 h-32 object-contain'
                            />
                        </div>
                        <h1 className='text-5xl text-secondar font-bold '>{category.name}</h1>
                        <p className='text-lg text-muted-foreground'>{category.description}</p>
                    </div>
                    <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6'>
                        {
                            rentals.map(item => {
                                return (
                                    <li key={item.id}>
                                        <RentalItemCard categoryId={params.categoryId} item={item} />
                                    </li>
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
                className={`bg-muted text-muted-foreground border-border text-center shadow-md`}
            >
                {
                    open ? (
                        <>
                            <span 
                                className='py-3 inline-flex items-center gap-2 cursor-pointer font-semibold'
                                onClick={() => setOpen(false)}
                            >
                                Choose a Category <ChevronUp className="w-4 h-4" />
                            </span>
                            <ul className='px-8 pt-4 pb-8 grid grid-cols-2 gap-4'>
                                {
                                    categories.map(category => {
                                        return (
                                            <NavLink
                                                key={category.id}
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
                            className='flex items-center justify-center gap-2 font-semibold cursor-pointer'
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
