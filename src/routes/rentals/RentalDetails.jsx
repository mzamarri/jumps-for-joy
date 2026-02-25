

export default function RentalDetails() {
    return (
        <>
            <div className='breadcrumbs sticky top-(--h-nav) bg-brand-yellow py-2 px-4'>
                Categories &gt; Bounce Houses &gt; Rental Item
            </div>
            <div className='px-24 py-8'> 
                <div className='rental-item space-y-4'>
                    <div className='flex gap-4'>
                        <div className='image w-150 h-140 bg-gray-600'/>
                        <div className='text-center flex-1'>
                            <h1 className='text-5xl border-b-2 pb-8 border-gray-300'>Rental Name</h1>
                            <div className='py-8 space-y-8'>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-3xl'>$100</h2>
                                    <button className='text-xl py-4 bg-brand-red text-white rounded-2xl'>
                                        Add To Cart
                                    </button>
                                </div>
                                <table className='w-full bg-gray-400'>
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
                    </div>
                    <div className='description'>
                        <h2 className='text-3xl'>Description</h2>
                        <p>
                            Description of Product goes here
                        </p>
                    </div>
                    <div className='important-information'>
                        <h1 className='text-3xl'>NOTE</h1>
                        <p>These notes should be </p>
                    </div>
                </div>
            </div>
        </>
    )
}