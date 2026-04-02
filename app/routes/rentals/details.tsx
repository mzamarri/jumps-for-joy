import { ArrowLeft, Ruler, ShoppingCart,  } from "lucide-react"
import { Link } from "react-router"
// import "cate"

export function clientLoader() {
    console.log("loading item details...")
    return 
}

export default function RentalDetails() {
    return (
        <>
            <div className='px-24 py-8 space-y-4'>
                <Link 
                    to=".."
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                >
                    <ArrowLeft className="w-4 h-4"/> Back To Category
                </Link>
                <div className='rental-item space-y-4'>
                    <div className='flex gap-8'>
                        <div className='image w-150 h-96 bg-gray-600 rounded-xl'/>
                        <div className='flex-1 space-y-3'>
                            <h1 className='text-4xl text-foreground font-bold'>Rental Name</h1>
                            <span className="text-2xl font-bold text-primary block">
                                $100 <span className="text-sm text-muted-foreground font-normal">/ day</span>
                            </span>
                            <p className="text-muted-foreground text-lg">
                                Some short description of the rental item
                            </p>
                            <div
                                className="grid grid-cols-2 gap-4"
                            >
                                <div className="flex items-center gap-2 text-foreground">
                                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex justify-center items-center">
                                        <Ruler className="w-5 h-5 text-primary"/>
                                    </div>
                                    <div className="">
                                        <p className="text-xs text-muted-foreground">
                                            Dimensions
                                        </p>
                                        <p className="text-sm font-semibold">
                                            30' L x 24' W x 64' H
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <button className='text-lg font-semibold py-2 w-full bg-accent text-white rounded-xl flex items-center justify-center gap-2 '>
                                <ShoppingCart className="w-5 h-5"/> Add To Cart
                            </button>
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