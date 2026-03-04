import { Link } from "react-router"

const categoryTabs = [
    "Bounce House",
    "Inflatable Combos",
    "Water Slides",
    "Dry Slides",
    "Tables and Chairs",
    "Tents",
    "Generators"
]
const rentals = [...Array(12)].map((item, idx) => {
    return {
        name: `Rental name ${idx}`,
        cost: `$${100 * idx}`,
        imageSrc: `imageSrc ${idx}`
    }
});

const categories = [
    {
        id: "bounce-house",
        name: "Bounce House",
    },
    {
        id: "combos",
        name: "Inflatable Combos"
    },
    {
        id: "water-slides",
        name: "Water Slides"
    },
    {
        id: "dry-slides",
        name: "Dry Slides"
    },
    {
        id: "tables-chairs",
        name: "Tables and Chairs"
    },
    {
        id: "tents",
        name: "Tents"
    },
    {
        id: "generators",
        name: "Generators"
    }
]

export default function Rentals() {
    return (
        <div className='py-8 px-24 space-y-4'>
            <div className='text-center space-y-2'>
                <h1 className='text-5xl'>Rental Category</h1>
                <p>Choose a category to browser our selection of rental items</p>
            </div>
            <ul className='p-4 grid grid-cols-3 gap-4'>
                {
                    categories.map((category, idx) => {
                        return (
                            <Link
                                key={idx}
                                to={`${category.id}`}
                                className='p-4 space-y-4 bg-white border border-gray-300 rounded-lg shadow-lg hover:cursor-pointer' 
                            >
                                <div className='h-80 bg-gray-500'/>
                                <h2 className='text-center text-3xl pb-4'>{category.name}</h2>
                            </Link>
                        )
                    })
                }
            </ul>
        </div>
    )
}