export default function RentalCategories({ categories, selectCategory }) {
    const handleClick = (category) => {
            if (categories.includes(category)) {
                selectCategory(category);
            } else {
                console.log("Not a category tab");
            }
        }

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
                            <li
                                key={idx} 
                                className='p-4 space-y-4 bg-white border border-gray-300 rounded-lg shadow-lg hover:cursor-pointer'
                                onClick={() => handleClick(category)}
                            >
                                <div className='h-80 bg-gray-500'/>
                                <h2 className='text-center text-3xl pb-4'>{category}</h2>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}