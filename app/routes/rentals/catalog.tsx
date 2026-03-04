import { Link, NavLink, useLoaderData } from "react-router"
import catalog from "data/catalog.json"

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
                <div className=''>
                    <div className='text-center'>
                        <h1 className='text-3xl'>{category.name}</h1>
                        <p className='text-lg'>Some text about this type of rental</p>
                    </div>
                    <ul className='p-4 gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:p-6 lg:gap-6'>
                        {
                            rentals.map((item, idx) => {
                                return (
                                    <Link 
                                        key={idx} 
                                        to={item.id}
                                        className='text-center p-4 bg-gray-200 rounded-lg border border-gray-300 shadow-lg cursor-pointer'
                                    >
                                        <div className='bg-gray-600 h-64'></div>
                                        <h1 className='text-3xl'>Product</h1>
                                        <p className=''>Other very brief information</p>
                                        <h3 className='text-xl'>$100</h3>
                                        <button
                                            className='p-4 w-full rounded-lg bg-brand-red cursor-pointer hover:bg-brand-blue-dark text-white'
                                        >
                                            Add to Cart
                                        </button>
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

    return (
        <div className="sticky top-(--h-nav) group">
            <div className='bg-brand-yellow border border-gray-300 rounded-b-full text-center'>
                <h1 className='py-2'>
                    Hover to choose other category
                </h1>
            </div>
            <div className='absolute left-0 right-0 top-0 group-hover:h-auto h-0 overflow-hidden bg-brand-yellow'>
                <h1 className='text-center py-2'>
                    Choose a Category
                </h1>
                <ul className='px-8 pt-4 pb-8 grid grid-cols-2 gap-4'>
                    {
                        categories.map(category => {
                            return (
                                <NavLink
                                    key={category}
                                    to={`../${category.id}`}
                                    className={({ isActive }) => {
                                        isActive 
                                            ? 'bg-brand-red '
                                            : 'bg-brand-blue hover:bg-brand-red/50'
                                    }}
                                >
                                    {category.name}
                                </NavLink>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}