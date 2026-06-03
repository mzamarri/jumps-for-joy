import { Link, NavLink, useOutletContext } from "react-router"
import { useState } from "react"
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react"
import { RentalItemCard } from "components/ui";
import type { CatalogOutletContext } from "./catalog-provider";
import { useContentfulInspectorMode } from "@contentful/live-preview/react";

export default function RentalCatalog() {
    const { category, categories } = useOutletContext<CatalogOutletContext>();
    const rentals = category?.rentalItemsCollection?.items || [];
    const inspectorProps = useContentfulInspectorMode({ entryId: category?.sys?.id });

    if (!category) {
        return (
            <div className='space-y-8'>
                <CategoryTabs categories={categories} currentCategory={category} />
                <div className='px-16 py-8'>
                    <p className='text-muted-foreground'>Category not found.</p>
                </div>
            </div>
        );
    }

    return (
            <div className='space-y-8 pb-8'>
                <CategoryTabs categories={categories} currentCategory={category}/>
                <div className='space-y-6 px-4 sm:px-8 lg:px-16'>
                    <Link
                        to="/rentals"
                        className='inline-flex items-center gap-2 text-primary font-semibold hover:underline'
                    >
                        <ArrowLeft className="w-4 h-4"/> Back to Rental Categories
                    </Link>
                    <div className='flex flex-col-reverse items-center gap-8 lg:flex-row lg:justify-center lg:items-center lg:gap-16'>
                        <div className='max-w-2xl flex-1 space-y-4 text-center'>
                            <h1 
                                className='text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl'
                                {...inspectorProps({ fieldId: "categoryName" })}
                            >
                                {category.categoryName}
                            </h1>
                            <p 
                                className='text-sm font-semibold uppercase tracking-widest text-primary sm:text-base'
                                {...inspectorProps({ fieldId: "subHeader"})}
                            >
                                {category.subHeader}
                            </p>
                            <p 
                                className='text-base leading-7 text-muted-foreground sm:text-lg'
                                {...inspectorProps({ fieldId: "longDescription"})}
                            >
                                {category.longDescription}
                            </p>
                        </div>
                        <div className='w-full self-center rounded-full bg-muted p-6 max-w-40 sm:max-w-48 md:max-w-64 lg:max-w-80'>
                            <img
                                {...inspectorProps({ fieldId: "categoryImage"})}
                                src={category?.categoryImage?.url || ""}
                                alt={`${category.categoryName} category`}
                                className='w-full object-contain'
                            />
                        </div>
                    </div>
                    <ul className='grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6'>
                        {
                            rentals.map(item => {
                                return (
                                    <li key={item?.slug}>
                                        <RentalItemCard categorySlug={category.slug} content={item} />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
}

function CategoryTabs({
    categories,
    currentCategory
}: {
    categories: CatalogOutletContext["categories"];
    currentCategory: CatalogOutletContext["category"];
}) {
    const [open, setOpen] = useState(false);
    const panelId = 'catalog-category-list';
    const inspectorProps = useContentfulInspectorMode();

    return (
        <div className="sticky top-(--h-nav) z-10">
            <div className='backdrop-blur pt-2 px-4 sm:px-8'>
                <div
                    className='bg-card border border-border mx-auto max-w-6xl px-4 rounded-2xl shadow-sm'
                >
                    <div
                        onClick={() => setOpen(current => !current)}
                        aria-expanded={open}
                        aria-controls={panelId} 
                        className='group flex flex-col justify-between gap-4 py-4 hover:cursor-pointer'
                    >
                        <div className="flex justify-between gap-6">
                            <div className='min-w-0'>
                                <div className='flex items-center gap-2 overflow-hidden'>
                                    <span className='font-medium '>Category: </span>
                                    <span 
                                        className='text-primary-foreground bg-primary px-3 py-1 font-semibold rounded-full'
                                        {...inspectorProps({ entryId: currentCategory?.sys?.id, fieldId: "categoryName"})}
                                    >
                                        {currentCategory?.categoryName ? `${currentCategory.categoryName}` : 'Choose a category'}
                                    </span>
                                </div>
                            </div>
                            <div className='flex items-center gap-2'>
                                <span className='hidden text-xs font-semibold uppercase tracking-widest sm:inline'>
                                    {open ? 'Hide list' : 'Open list'}
                                </span>
                                <span className='h-8 w-8 flex items-center justify-center rounded-full'>
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
                            className='grid grid-cols-1 gap-2 border-t border-border py-4 sm:grid-cols-2 lg:grid-cols-3'
                        >
                            {
                                categories.map(category => {
                                    if (!category.slug) return null;

                                    return (
                                        <NavLink
                                            key={category.slug}
                                            to={`/rentals/${category.slug}`}
                                            className={({ isActive }) => `rounded-xl px-4 py-2.5 text-left text-sm sm:text-base font-semibold transition-colors
                                                ${isActive
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-muted text-muted-foreground hover:bg-primary/20 hover:text-primary'
                                                }
                                            `}
                                            onClick={() => setOpen(false)}
                                            {...inspectorProps({ entryId: category?.sys?.id, fieldId: "categoryName"})}
                                        >
                                            {category.categoryName}
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
