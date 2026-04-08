import { RentalItemCard } from "components/ui";
import { Star } from "lucide-react"
import { getRentalItem } from "data/rentalItems";

const featuredItems = [
    { categoryId: "bounce-house", item: getRentalItem("bounce-house", "rainbow-castle") },
    { categoryId: "bounce-house", item: getRentalItem("bounce-house", "party-palace") },
    { categoryId: "combos", item: getRentalItem("combos", "bounce-slide-combo") },
    { categoryId: "water-slides", item: getRentalItem("water-slides", "splash-rush") },
    { categoryId: "dry-slides", item: getRentalItem("dry-slides", "summit-slide") },
    { categoryId: "bounce-house", item: getRentalItem("bounce-house", "jumbo-fun-house") },
].filter(entry => entry.item);

export default function Featured() {
    return (
        <div className='relative w-full h-full overflow-hidden px-24 py-12 bg-muted'>
            <div className='h-full flex flex-col justify-center space-y-8'>
                <div className='flex justify-center'>
                    <div className='w-fit space-y-2 rounded-lg text-center'>
                        <span className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground rounded-full px-4 py-2 text-sm font-semibold">
                            <Star className='w-4 h-4 fill-current'/> 
                            Most Popular
                        </span>
                        <h1 className='text-6xl font-bold'> Featured <span className='text-primary'>Rentals</span></h1>
                        <p className='max-w-2xl text-lg text-muted-foreground'>To get a better idea of our rentals, here are a few of our most popular selection</p>
                    </div>
                </div>
                <div className='carousel-container relative w-full h-2/3'>
                    <div className='grid grid-cols-3 gap-9'>
                        {featuredItems.map(({ categoryId, item }) => (
                            <RentalItemCard key={`${categoryId}-${item.id}`} categoryId={categoryId} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
