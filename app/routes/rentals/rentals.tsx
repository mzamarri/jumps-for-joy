import { Outlet } from "react-router"

export default function RentalCategories() {
    return (
        <div>
            <div className='breadcrumbs sticky top-(--h-nav) bg-brand-yellow py-2 px-4'>
                Categories &gt; Bounce Houses &gt; Rental Item
            </div>
            <Outlet/>
        </div>
    )
}