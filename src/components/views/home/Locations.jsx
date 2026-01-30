export default function Locations() {
	return (
		<div className='w-full h-full flex'>
			<div className='w-3/5 h-full text-center py-8'>
				<h1 className='text-4xl'>Proudly Serving Our Local Communities</h1>
				<p>Text you on where we serve</p>

				<h1 className='text-4xl'>What Delivery Looks Like</h1>
				<p>Information on delivery process</p>
			</div>
			<div className='w-2/5 h-full p-4'>
				<h1 className='text-4xl'>List Of Areas We Service</h1>
				<ul className='list-disc bg-gray-300 columns-2 px-4 my-4'>
					{new Array(12).fill().map((_, idx) => {
						return (
							<>
								<li key={idx}>Item {idx}</li>
							</>
						)
					})

					}
				</ul>
				<h2 className=''>
					Our delivery area includes many nearby communities, and we’re often able 
					to accommodate locations just outside our standard service range. Give us a 
					call to confirm availability and see if we can serve your event.
				</h2>
				<div className='my-4'>
					<h2 className=''>Note: Delivery Fees may apply to some areas.</h2>
				</div>
			</div>
		</div>
	)
}