import { Link, NavLink, useLoaderData, useParams } from "react-router"
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
            <div className='space-y-8 pb-8'>
                <CategoryTabs/>
                <div className='space-y-6 px-4 sm:px-8 lg:px-16'>
                    <Link
                        to="/rentals"
                        className='inline-flex items-center gap-2 text-primary font-semibold hover:underline'
                    >
                        <ArrowLeft className="w-4 h-4"/> Back to Rental Categories
                    </Link>
                    <div className='flex flex-col-reverse items-center gap-8 lg:flex-row lg:justify-center lg:items-center lg:gap-16'>
                        <div className='max-w-2xl flex-1 space-y-4 text-center'>
                            <h1 className='text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl'>{category.name}</h1>
                            <p className='text-sm font-semibold uppercase tracking-widest text-primary sm:text-base'>
                                {category.tagline}
                            </p>
                            <p className='text-base leading-7 text-muted-foreground sm:text-lg'>
                                {category.longDescription}
                            </p>
                        </div>
                        <div className='w-full self-center rounded-full bg-muted p-6 max-w-40 sm:max-w-48 md:max-w-64 lg:max-w-80'>
                            <img
                                src={category.image}
                                alt={`${category.name} category`}
                                className='w-full object-contain'
                            />
                        </div>
                    </div>
                    <ul className='grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6'>
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
    const params = useParams();
    const currentCategory = categories.find(category => category.id === params.categoryId);
    const panelId = 'catalog-category-list';

    return (
        <div className="sticky top-(--h-nav) z-10">
            <div className='backdrop-blur pt-2 px-4 sm:px-8'>
                <div
                    className='bg-primary text-primary-foreground mx-auto max-w-6xl px-4 rounded-2xl shadow-sm'
                >
                    <div
                        onClick={() => setOpen(current => !current)}
                        aria-expanded={open}
                        aria-controls={panelId} 
                        className='group flex flex-col justify-between gap-4 py-4 hover:cursor-pointer transition-[border-color,background-color,box-shadow]'
                    >
                        <div className="flex justify-between gap-6">
                            <div className='min-w-0'>
                                <div className='flex items-center gap-2 overflow-hidden'>
                                    <span className='text-l font-medium text-primary-foreground sm:text-primary-foreground/60 group-hover:text-primary-foreground '>Category: </span>
                                    <span className='text-l text-secondary bg-secondary/20 border border-secondary px-3 py-1 font-semibold rounded-full'>
                                        {currentCategory?.name ? `${currentCategory?.name}` : 'Choose a category'}
                                    </span>
                                </div>
                            </div>
                            <div className='flex items-center gap-2'>
                                <span className='hidden text-xs font-semibold uppercase tracking-widest text-primary-foreground/60 group-hover:text-primary-foreground sm:inline'>
                                    {open ? 'Hide list' : 'Open list'}
                                </span>
                                <span className='h-8 w-8 flex items-center justify-center rounded-full sm:bg-primary-foreground/10 sm:border border-primary-foreground/30 sm:text-primary-foreground/60 transition-[transform,border-color] group-hover:border-primary-foreground/60 group-hover:bg-primary-foreground/20 group-hover:text-primary-foreground'>
                                    {open ? (
                                        <ChevronUp className="sm:w-4 sm:h-4" />
                                    ) : (
                                        <ChevronDown className="sm:w-4 sm:h-4" />
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                    {open && (
                        <ul
                            id={panelId}
                            className='grid grid-cols-1 gap-2 border-t border-primary-foreground/30 py-4 sm:grid-cols-2 lg:grid-cols-3'
                        >
                            {
                                categories.map(category => {
                                    return (
                                        <NavLink
                                            key={category.id}
                                            to={`/rentals/${category.id}`}
                                            className={({ isActive }) => `rounded-xl px-4 py-2.5 text-left text-sm sm:text-base font-semibold transition-colors
                                                ${isActive
                                                    ? 'bg-secondary text-secondary-foreground'
                                                    : 'border border-primary-foreground bg-primary-foreground/10 text-primary-foreground hover:border-secondary hover:bg-secondary/20 hover:text-secondary'
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
                    )}
                </div>
            </div>
        </div>
    )
}
