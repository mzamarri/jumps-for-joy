export default function RentalCategories({ categories, selectCategory }) {
    const handleClick = (category) => {
            if (categories.includes(category)) {
                selectCategory(category);
            } else {
                console.log("Not a category tab");
            }
        }

    return (
        <>
            <h1 className='text-center text-5xl py-8'>Select a Rental Category to Browse Selection</h1>
            <ul className='p-4 grid grid-cols-3 gap-4'>
                {
                    categories.map((category, idx) => {
                        return (
                            <li 
                                key={idx} 
                                className='h-120 p-4 bg-gray-500'
                                onClick={() => handleClick(category)}
                            >
                                <div className='h-80 bg-white'/>
                                <h2 className='text-center text-4xl mt-8'>{category}</h2>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}