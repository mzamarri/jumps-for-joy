

export default function RentalDetails() {
    return (
        <>
            <div className='breadcrumbs'>
                BreadCrumbs
            </div>
            <div className='rental-item p-4'>
                <div className='flex pb-4'>
                    <div className='image w-150 h-140 bg-white'>

                    </div>
                    <div className='short-description ml-4 flex-1'>
                        <h1 className='text-center py-4 text-4xl'>Rental Name</h1>
                        <div className='flex flex-col bg-gray-300'>
                            <h2 className='text-center pt-4 text-4xl'>$100</h2>
                            <button className='w-fit mx-auto text-3xl py-4 px-24 my-4 bg-blue-400 rounded-2xl'>
                                Add To Cart
                            </button>
                        </div>
                        <table className='w-full bg-gray-400 mt-4'>
                            <thead>
                                <tr>
                                    <th>Specs</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Required Space: size</td>
                                </tr>
                                <tr>
                                    <td>Actual Size: size</td>
                                </tr>
                                <tr>
                                    <td>Power Required</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='description h-100'>
                    <h2 className='text-3xl'>Description</h2>
                    <p>
                        
                    </p>
                </div>
                <div className='important-information h-100'>
                    <h2 className='text-3xl'>Setup</h2>
                </div>
            </div>
            <div className='related-rentals h-120 bg-gray-400'>
                <h2 className='text-3xl text-center py-4'>Related Rentals</h2>

            </div>
        </>
    )
}