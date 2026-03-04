export default function Locations() {
	return (
		<div className='w-full h-full flex flex-col px-24 py-12 space-y-8'>
			<div className='text-center space-y-2'>
				<h1 className='text-4xl'>Proudly Serving Our Local Communities</h1>
				<p>
					We deliver and set up bounce houses across the greater area, 
					bringing the fun right to your home, park, school, or event venue.
				</p>

				{/* <h1 className='text-4xl'>What Delivery Looks Like</h1>
				<p>Information on delivery process</p> */}
			</div>
			<div className='bg-white border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden'>
				<div className='bg-brand-blue text-white px-4 py-8'>
					<h1 className='text-4xl'>List of Areas We Service</h1>
				</div>
				<div className='px-4 py-8 space-y-4'>
					<ul className='columns-3 list-none'>
						{new Array(21).fill().map((_, idx) => {
							return (
									<li 
										key={idx}
										className=''
									>
										Item {idx}
									</li>
							)
						})}
					</ul>
					<h2 className='text-brand-red'>
						Our delivery area includes many nearby communities, and we’re often able 
						to accommodate locations just outside our standard service range. Give us a 
						call to confirm availability and see if we can serve your event.
					</h2>
					<div className='flex items-center space-x-4 bg-warning border border-gray-400 px-4 py-8'>
						<div className='h-4 w-4 bg-gray-500' />
						<h2 className=''>Note: Delivery Fees may apply to some areas.</h2>
					</div>
				</div>
			</div>
		</div>
	)
}