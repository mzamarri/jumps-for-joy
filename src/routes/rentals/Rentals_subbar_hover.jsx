import { useState } from "react";

const categoryTabs = [
    "Bounce House",
    "Inflatable Combos",
    "Water Slides",
    "Dry Slides",
    "Tables and Chairs",
    "Tents",
    "Generators"
];
const rentals = [...Array(12)];

export default function Rentals() {
    const [ activeTab, setActiveTab ] = useState(null);

    const handleClick = (category) => {
        if (categoryTabs.includes(category)) {
            setActiveTab(category);
        } else {
            console.log("Not a category tab");
        }
    };

    if (activeTab === null) {
        return (
            <>
                <h1 className='text-center text-5xl py-8'>Select a Rental Category to Browse Selection</h1>
                <ul className='p-4 grid grid-cols-3 gap-4'>
                    {
                        categoryTabs.map((category, idx) => {
                            return (
                                <li
                                    key={idx}
                                    className='h-120 p-4 bg-gray-500'
                                    onClick={() => handleClick(category)}
                                >
                                    <div className='h-80 bg-white'/>
                                    <h2 className='text-center text-4xl mt-8'>{category}</h2>
                                </li>
                            );
                        })
                    }
                </ul>
            </>
        );
    }

    return (
        <div className='bg-yellow-500'>
            <CategoryTabs
                containerClassName='sticky top-(--h-nav) w-6/7 mx-auto z-20'
                currentTab={activeTab}
                selectTab={handleClick}
            />
            <div className=''>
                <h1 className='mt-6 text-center text-3xl '>{activeTab}</h1>
                <p className='my-6 text-center text-lg'>Some text about this type of rental</p>
            </div>
            <div className='p-4 gap-4 bg-red-500 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:p-6 lg:gap-6'>
                {
                    rentals.map((item, idx) => {
                        return (
                            <div key={idx} className='min-h-100 text-center bg-green-500 p-4'>
                                <div className='bg-gray-200 h-60'></div>
                                <h1 className='text-3xl mt-6'>Product</h1>
                                <p className='mt-2'>Other very brief information</p>
                                <h3 className='mt-2 text-xl'>$100</h3>
                                <button className='mt-2 p-4 w-full rounded-full bg-blue-400'>Add to Cart</button>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

const subBarStyle = {
    boxShadow: "0 1px 6px rgba(0, 0, 0, 0.35)"
};

function CategoryTabs({ containerClassName, currentTab, selectTab }) {
    const [ isExpanded, setIsExpanded ] = useState(false);

    const handleMouseEnter = () => setIsExpanded(true);
    const handleMouseLeave = () => setIsExpanded(false);
    const handleToggle = () => setIsExpanded(prev => !prev);

    return (
        <div
            className={containerClassName}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className='overflow-hidden rounded-b-3xl bg-gray-800 text-gray-100 transition-all duration-300'
                style={subBarStyle}
            >
                <div className={`flex items-center justify-between px-6 ${isExpanded ? "py-4" : "py-2"}`}>
                    <div className='flex flex-col'>
                        <span className='text-xs uppercase tracking-wide text-gray-300'>Currently viewing</span>
                        <span className='text-lg font-semibold'>{currentTab}</span>
                    </div>
                    <button
                        type='button'
                        className='text-sm text-gray-200 hover:text-white'
                        onClick={handleToggle}
                        aria-expanded={isExpanded}
                    >
                        {isExpanded ? "Hide categories" : "Hover or tap to see categories v"}
                    </button>
                </div>
                <div
                    className={`grid grid-cols-2 md:grid-cols-3 gap-2 px-4 transition-all duration-300 ${
                        isExpanded
                            ? "max-h-60 opacity-100 pb-4"
                            : "max-h-0 opacity-0 pb-0 pointer-events-none"
                    }`}
                >
                    {
                        categoryTabs.map(category => {
                            return (
                                <button
                                    key={category}
                                    type='button'
                                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                        currentTab === category
                                            ? "bg-gray-900"
                                            : "bg-gray-600 hover:bg-gray-500"
                                    }`}
                                    onClick={() => selectTab(category)}
                                >
                                    {category}
                                </button>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}

function RentalItems({ rentalItems }) {
    return (
        <div className='grid grid-cols-3 gap-4'>

        </div>
    );
}
