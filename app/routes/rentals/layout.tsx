import { Link,  Outlet } from "react-router"
import categories from "data/categories.json"

export default function RentalCategories({ params }) {
    const category = categories.find(currentCategory => currentCategory.id === params.categoryId);
    return (
        <div>
            <div className='breadcrumbs sticky top-(--h-nav) bg-gray-200 py-2 px-4'>
                <Link
                    to="/rentals"
                    className="hover:text-accent"
                >
                    Rentals
                </Link>
                {params.categoryId && (
                    <>
                        <span>/</span>
                        <Link
                            to={`/rentals/${params.categoryId}`}
                            className="hover:text-accent "
                        >
                            {category.name}
                        </Link>
                    </>
                )}
                {params.itemId && (
                    <>
                        <span>/{params.itemId}</span>
                    </>
                )}
            </div>
            <Outlet/>
        </div>
    )
}
