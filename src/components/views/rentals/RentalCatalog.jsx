export default function RentalCatalog({ rentals, categories, currentTab, selectTab, viewRental }) {
    return (
            <div className='bg-yellow-500'>
                <CategoryTabs 
                    containerClassName={'sticky top-(--h-nav) w-6/7 mx-auto h-(--subbar-height) '}
                    currentTab={currentTab}
                    selectTab={selectTab}
                    categories={categories}
                />
                <div className=''>
                    <h1 className='mt-6 text-center text-3xl '>{currentTab}</h1>
                    <p className='my-6 text-center text-lg'>Some text about this type of rental</p>
                </div>
                <div className='p-4 gap-4 bg-red-500 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:p-6 lg:gap-6'>
                    <Catalog rentals={rentals} viewRental={viewRental} />
                </div>
            </div>
        )
}


const subBarStyle = {
    boxShadow: '0 1px 4px black'
};

function CategoryTabs({ categories, containerClassName, currentTab, selectTab }) {

    return (
        <div className={containerClassName}>
            <ul className='w-full h-full flex justify-around items-center rounded-b-full' style={subBarStyle}>
                {
                    categories.map(category => {
                        return (
                            <li 
                                key={category} 
                                className={`w-full h-full flex justify-center items-center text-gray-200 bg-gray-500 first:rounded-bl-full last:rounded-br-full ${
                                    currentTab === category 
                                       ? 'bg-gray-900 pb-4 border-black'
                                       : 'bg-gray-500 hover:bg-gray-700'
                                }`}
                                onClick={() => selectTab(category)}
                            >
                                {category}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

function Catalog({ rentals, viewRental }) {
    return (
        <>
            {
                rentals.map((item, idx) => {
                    return (
                        <div 
                            key={idx} 
                            className='min-h-100 text-center bg-green-500 p-4'
                            onClick={() => viewRental(item)}
                        >
                            <div className='bg-gray-200 h-60'></div>
                            <h1 className='text-3xl mt-6'>Product</h1>
                            <p className='mt-2'>Other very brief information</p>
                            <h3 className='mt-2 text-xl'>$100</h3>
                            <button className='mt-2 p-4 w-full rounded-full bg-blue-400'>Add to Cart</button>
                        </div>
                    )
                })
            }
        </>
    )
}