import { useState } from 'react';
import { InfoOverlay } from 'components/ui_features';
import { MapPin, Truck, Toolbox, CircleAlert, ChevronRight, Mail, Phone } from 'lucide-react'

const areaCards = [
	{
		id: "delivery",
		icon: Truck,
		title: "Delivery Information",
		summary: "A few details on delivery",
		details: [
			"Delivery windows are coordinated in advance so setup is complete before your event start time whenever possible.",
			"Please make sure access paths are clear and large enough for equipment transport from curb to setup area.",
			"If your location has access restrictions, gates, stairs, or timing limitations, sharing those details early helps avoid delays.",
			"After your event, pickup is scheduled to keep breakdown quick and safe without disrupting cleanup."
		]
	},
	{
		id: "setup",
		icon: Toolbox,
		title: "Setup Requirements",
		summary: "Rentals units require certain conditions for setup",
		details: [
			"Inflatables need a level setup area with enough clearance around sides and overhead for safe operation.",
			"Reliable power within practical cable distance is required for blower-based equipment.",
			"Surface type matters for anchoring, so let us know whether setup is on grass, concrete, turf, or another surface.",
			"Weather, wind, and moisture conditions can affect setup decisions, and safety requirements always come first."
		]
	},
	{
		id: "fees",
		icon: CircleAlert,
		title: "Delivery Distance & Fees",
		summary: "Depending on distance delivery fees may apply",
		details: [
			"Delivery fees are usually based on distance, travel time, and any special access or setup complexity.",
			"Events outside standard service zones may still be available with adjusted delivery pricing.",
			"We review location details up front so your quote reflects realistic logistics and avoids day-of surprises.",
			"If you are near the edge of our service area, contact us and we can confirm availability quickly."
		]
	}
]

export default function Locations() {
	const [selectedCard, setSelectedCard] = useState(null);

	return (
		<div className='w-full h-full flex flex-col px-24 py-12 space-y-8'>
			<div className='text-center space-y-2'>
				<span className='inline-flex gap-2 items-center text-sm font-semibold bg-secondary text-secondary-foreground rounded-full py-2 px-4'>
					<MapPin className='w-4 h-4'/>
					Service Area
				</span>
				<h1 className='text-6xl font-bold'>Where We <span className='text-primary'>Deliver</span></h1>
				<p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
					We deliver and set up bounce houses across the greater area, 
					bringing the fun right to your home, park, school, or event venue.
				</p>

			</div>
			<div className='grid grid-cols-5 gap-8'>
				<div className='col-span-3 bg-card border border-border text-foreground rounded-2xl px-4 py-8 shadow-lg'>
					<h1 className='text-2xl font-bold text-foreground flex items-center gap-2 mb-2'>
						<MapPin className='text-accent' />
						Areas We Service
					</h1>
					<p className='text-muted-foreground mb-4'>
						Our delivery area includes many nearby communities, and we’re often able 
						to accommodate locations just outside our standard service range.
					</p>
					<ul className='grid grid-cols-3 gap-2'>
						{new Array(30).fill().map((_, idx) => {
							return (
									<li 
										key={idx}
										className='bg-primary/10 text-foreground py-2 px-4 rounded-xl bg-card'
									>
										Item {idx}
									</li>
							)
						})}
					</ul>
				</div>
				<div className='col-span-2 space-y-4'>
					{areaCards.map(card => (
						<div
							key={card.id}
							className='group text-left bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md hover:border-primary/30 cursor-pointer'
							onClick={() => setSelectedCard(card)}
						>
							<div className='w-10 h-10 bg-primary/10 group-hover:bg-secondary/30 rounded-lg flex justify-center items-center rouned-lg mb-3'>
								<card.icon className='w-5 h-5 text-primary group-hover:text-secondary-foreground'/>
							</div>
							<h1 className='font-bold text-foreground mb-1'>{card.title}</h1>
							<p className='text-muted-foreground text-sm mb-3'>{card.summary}</p>
							<span className='inline-flex items-center gap-1 group-hover:gap-2 text-xs text-primary font-semibold transition-all'>Learn More <ChevronRight className='w-3 h-3' /></span>
						</div>
					))}
				</div>
			</div>
			<div className='bg-primary text-primary-foreground p-8 rounded-2xl'>
				<div className='flex items-center justify-between'>
					<div>
						<h1 className='text-2xl text-primary-foreground font-bold mb-2'>Not sure if we deliver to your location?</h1>
						<p className='text-primary-foreground/90 max-w-lg'>
							Give us a call, send a text, or use our contact form to send an email. We're happy
							to answer questions about delivery, service areas, and availability.
						</p>
					</div>
					<div className='flex gap-3 shrink-0 text-accent-foreground'>
						<button className='font-bold bg-accent hover:bg-accent/90 py-3 px-6 rounded-2xl cursor-pointer flex items-center gap-2'>
							<Mail className='w-5 h-5'/>Contact Us
						</button>
						<button className='font-bold border-2 border-primary-foreground/30 hover:border-primary-foreground/50 hover:bg-primary-foreground/10 py-3 px-6 rounded-2xl cursor-pointer flex items-center gap-2'>
							<Phone className='w-5 h-5'/> Call/Text
						</button>
					</div>
				</div>
			</div>
			<InfoOverlay
				open={!!selectedCard}
				onClose={() => setSelectedCard(null)}
				title={selectedCard?.title}
				summary={selectedCard?.summary}
				details={selectedCard?.details ?? []}
			/>
		</div>
	)
}
