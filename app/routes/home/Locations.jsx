import { useState } from 'react';
import { InfoOverlay } from 'components/ui';
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
		<div className='flex h-full w-full flex-col space-y-8 px-4 py-12 sm:px-6 lg:px-24'>
			<div className='space-y-3 text-center'>
				<span className='inline-flex gap-2 items-center text-sm font-semibold bg-secondary text-secondary-foreground rounded-full py-2 px-4'>
					<MapPin className='w-4 h-4'/>
					Service Area
				</span>
				<h1 className='text-4xl font-bold sm:text-5xl lg:text-6xl'>Where We Deliver</h1>
				<p className='text-sm font-semibold uppercase tracking-widest text-primary sm:text-lg'>
					On-time delivery and setup, right to your event location
				</p>
				<p className='mx-auto max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg'>
					We deliver and set up bounce houses throughout Chandler, AZ and surrounding communities, 
					bringing the fun right to your home, park, school, or event venue.
				</p>

			</div>
			<div className='grid gap-6 xl:grid-cols-12 xl:gap-8'>
				<div className='bg-card border border-border text-foreground rounded-2xl px-4 py-6 shadow-lg sm:px-6 sm:py-8 xl:col-span-7'>
					<h1 className='text-2xl font-bold text-foreground flex items-center gap-2 mb-2'>
						<MapPin className='text-accent' />
						Areas We Service
					</h1>
					<p className='text-muted-foreground mb-4'>
						Our delivery area includes many nearby communities, and we’re often able 
						to accommodate locations just outside our standard service range.
					</p>
					<ul className='grid grid-cols-2 gap-2 sm:grid-cols-3'>
						{[
							"Ahwatukee",       "Gold Canyon",      "Phoenix",
							"Apache Junction", "Guadalupe",        "Power Ranch",
							"Arcadia",         "Higley",           "Queen Creek",
							"Avondale",        "Johnson Ranch",    "Red Mountain Ranch",
							"Chandler Heights","Laveen",           "San Tan Valley",
							"Corona del Sol",  "McCormick Ranch",  "Scottsdale",
							"Dobson Ranch",    "Mesa",             "Seville",
							"Eastmark",        "Morrison Ranch",   "Sun Lakes",
							"Fountain Hills",  "Ocotillo",         "Superstition Springs",
							"Gilbert",         "Paradise Valley",  "Tempe",
						].map((city) => (
							<li
								key={city}
								className='rounded-xl bg-primary/10 px-3 py-2 text-sm text-foreground sm:px-4'
							>
								{city}
							</li>
						))}
					</ul>
				</div>
				<div className='grid gap-4 md:grid-cols-2 xl:col-span-5 xl:grid-cols-1'>
					{areaCards.map(card => (
						<div
							key={card.id}
							className='group rounded-xl border border-border bg-card p-5 text-left shadow-sm hover:cursor-pointer hover:border-primary/30 hover:shadow-md'
							onClick={() => setSelectedCard(card)}
						>
							<div className='mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-secondary/30'>
								<card.icon className='w-5 h-5 text-primary group-hover:text-secondary-foreground'/>
							</div>
							<h1 className='font-bold text-foreground mb-1'>{card.title}</h1>
							<p className='text-muted-foreground text-sm mb-3'>{card.summary}</p>
							<span className='inline-flex items-center gap-1 group-hover:gap-2 text-xs text-primary font-semibold transition-all'>Learn More <ChevronRight className='w-3 h-3' /></span>
						</div>
					))}
				</div>
			</div>
			<div className='rounded-2xl bg-primary p-6 text-primary-foreground sm:p-8'>
				<div className='flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
					<div className='space-y-2'>
						<h1 className='text-2xl text-primary-foreground font-bold mb-2'>Not sure if we deliver to your location?</h1>
						<p className='text-primary-foreground/90 max-w-lg'>
							Give us a call, send a text, or use our contact form to send an email. We're happy
							to answer questions about delivery, service areas, and availability.
						</p>
					</div>
					<div className='flex w-full flex-col gap-3 text-accent-foreground sm:flex-row lg:w-auto lg:shrink-0'>
						<button className='flex items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-3 font-bold hover:cursor-pointer hover:bg-accent/90'>
							<Mail className='w-5 h-5'/>Contact Us
						</button>
						<button className='flex items-center justify-center gap-2 rounded-2xl border-2 border-primary-foreground/30 px-6 py-3 font-bold hover:cursor-pointer hover:border-primary-foreground/50 hover:bg-primary-foreground/10'>
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
