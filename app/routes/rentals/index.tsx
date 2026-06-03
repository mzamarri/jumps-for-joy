import { Link, useOutletContext } from "react-router"
import { Search } from 'lucide-react'
import { useReadQuery } from "@apollo/client/react";
import type { RootOutletContext } from "../../root";
import { useContentfulInspectorMode, useContentfulLiveUpdates } from "@contentful/live-preview/react";
import RentalCategoryCard from "components/contentful/ctf-rental-category-card";

export default function Rentals() {
    const { rentalCategoriesRef } = useOutletContext<RootOutletContext>();
    const { data } = useReadQuery(rentalCategoriesRef);
    const liveData = useContentfulLiveUpdates(data);
    const categoryItems = liveData?.rentalCategoryCollection?.items.filter(item => item !== null) ?? [];

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
                    categoryItems.map(category => <RentalCategoryCard rentalCategory={category} />)
                }
            </ul>
        </div>
    )
}
