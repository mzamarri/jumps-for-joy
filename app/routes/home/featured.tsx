import { RentalItemCard } from "components/ui";
import { Star } from "lucide-react"
import { graphql, useFragment } from "app/lib/gql/client"
import type { SectionProps } from ".";

const FeaturedCardFieldsFragment = graphql(`
    fragment FeaturedCards on RentalItemDetails {
        __typename
        sys {
            id
        }
        slug
    }
`)

export default function Featured({ queryData }: SectionProps) {
    const featuredData = queryData?.featuredItems?.items[0]?.featuredCardsCollection?.items || [];

    return (
        <div id="featured" className='relative w-full overflow-hidden px-4 py-8 sm:px-6 lg:px-24 scroll-mt-(--h-nav)'>
            <div className='flex h-full flex-col justify-center space-y-8 md:space-y-10'>
                <div className='flex justify-center'>
                    <div className='max-w-3xl space-y-4 rounded-lg text-center'>
                        <span className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground rounded-full px-4 py-2 text-sm font-semibold">
                            <Star className='w-4 h-4 fill-current'/> 
                            Most Popular
                        </span>
                        <h1 className='text-4xl font-bold sm:text-5xl lg:text-6xl'>Featured Rentals</h1>
                        <p className='mx-auto max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg'>
                            Explore a few of our most requested rentals to get a quick feel for the inflatable
                            options and event favorites families choose most often.
                        </p>
                    </div>
                </div>
                <div className='carousel-container relative w-full'>
                    <div className='grid grid-cols-2 gap-4 sm:gap-6 xl:grid-cols-3 xl:gap-8'>
                        {featuredData.map((item, idx) => (
                            <RentalItemCard key={idx} rentalItem={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
