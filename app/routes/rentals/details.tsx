import { ArrowLeft, CircleAlert, Droplets, Ruler, ShieldCheck, ShoppingCart, Truck, Users, FileText } from "lucide-react"
import { Link, useParams } from "react-router"
import categories from "data/rentalCategories";
import { useCart } from "context/CartContext";
import { getRentalItem } from "data/rentalItems";
// import "cate"

export function clientLoader() {
    console.log("loading item details...")
    return 
}

export default function RentalDetails() {
    const { categoryId, itemId } = useParams();
    const { addItem } = useCart();
    const matchedCategory = categories.find(category => category.id === categoryId);
    const categoryLabel = matchedCategory?.name ?? "Category";
    const item = getRentalItem(categoryId, itemId);
    const importantInfo = [
        {
            icon: ShieldCheck,
            title: "Supervision Required",
            description: "An adult should supervise at all times, and riders should be grouped by similar age and size.",
        },
        {
            icon: Truck,
            title: "Clear Setup Space",
            description: "Please have a flat setup area and a clear path so delivery and installation can be completed safely.",
        },
        {
            icon: Droplets,
            title: "Cleaned Before Delivery",
            description: "This inflatable is cleaned and inspected before each rental.",
        },
        {
            icon: CircleAlert,
            title: "Weather Matters",
            description: "This unit cannot be used in high winds, lightning, or heavy rain.",
        },
    ];

    if (!item) {
        return (
            <div className='px-4 py-8 space-y-4 sm:px-6 lg:px-24'>
                <Link 
                    to=".."
                    relative="path"
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                >
                    <ArrowLeft className="w-4 h-4"/> Back to {categoryLabel}
                </Link>
                <div className="rounded-2xl border border-border bg-card p-8 text-muted-foreground shadow-md">
                    Rental item not found.
                </div>
            </div>
        )
    }

    return (
        <>
            <div className='px-4 py-8 space-y-4 sm:px-6 lg:px-24'>
                <Link 
                    to=".."
                    relative="path"
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                >
                    <ArrowLeft className="w-4 h-4"/> Back to {categoryLabel}
                </Link>
                <div className='rental-item space-y-8'>
                    <div className='flex flex-col gap-8 lg:flex-row'>
                        <div className='image w-full h-72 bg-muted rounded-xl p-8 flex items-center justify-center sm:h-96 lg:w-[28rem] lg:shrink-0'>
                            <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                        </div>
                        <div className='flex-1 space-y-6'>
                            <div className="space-y-3">
                                <h1 className='text-4xl text-foreground font-bold'>{item.name}</h1>
                                <span className="text-2xl font-bold text-primary block">
                                    ${item.cost} <span className="text-sm text-muted-foreground font-normal">/ day</span>
                                </span>
                                <p className="text-muted-foreground text-lg">
                                    {item.summary}
                                </p>
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="flex items-center gap-2 text-foreground">
                                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex justify-center items-center">
                                        <Ruler className="w-5 h-5 text-primary"/>
                                    </div>
                                    <div className="">
                                        <p className="text-xs text-muted-foreground">
                                            Dimensions
                                        </p>
                                        <p className="text-sm font-semibold">
                                            {item.dimensions}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-foreground">
                                    <div className="w-10 h-10 bg-secondary/30 rounded-lg flex justify-center items-center">
                                        <Users className="w-5 h-5 text-secondary-foreground"/>
                                    </div>
                                    <div className="">
                                        <p className="text-xs text-muted-foreground">
                                            Max Capacity
                                        </p>
                                        <p className="text-sm font-semibold">
                                            {item.maxCapacity}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-lg font-bold">Features</h1>
                                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                    {item.features.map(feature => (
                                        <li key={feature} className="text-muted-foreground flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-secondary inline-block" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button
                                type="button"
                                onClick={() => addItem({ ...item, categoryId, quantity: 1 })}
                                className='text-lg font-semibold py-2 w-full bg-accent hover:bg-accent/90 text-white rounded-xl cursor-pointer flex items-center justify-center gap-2 '
                            >
                                <ShoppingCart className="w-5 h-5"/> Add To Cart
                            </button>
                        </div>
                    </div>
                    <div className='bg-card text-foreground rounded-xl border border-border shadow-md p-8 space-y-8'>
                        <div className="space-y-4">
                            <span className='inline-flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-4 py-1.5 text-sm font-semibold text-primary'>
                                <FileText className='h-4 w-4' />
                                Description
                            </span>
                            <h2 className='text-3xl font-bold lg:text-4xl'>About This Rental</h2>
                            <div className='space-y-2'>
                                {item.description.map(paragraph => (
                                    <p key={paragraph} className='text-base leading-7 text-muted-foreground lg:text-lg'>
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div className='space-y-4'>
                            <span className='inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground'>
                                <CircleAlert className='h-4 w-4' />
                                Important Information
                            </span>
                            <h2 className='text-3xl font-bold lg:text-4xl'>What to Know Before Booking</h2>
                            <p className='text-lg leading-6 text-muted-foreground'>
                                Quick item details to review before reserving this inflatable.
                            </p>
                            <div className='grid gap-3 md:grid-cols-2'>
                                {importantInfo.map(({ icon: Icon, title, description }) => (
                                    <div
                                        key={title}
                                        className='rounded-xl bg-muted p-4 text-foreground'
                                    >
                                        <div className='flex items-start gap-4'>
                                            <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-card text-primary shadow-lg overflow-hidden'>
                                                <div className="bg-primary/30 w-full h-full flex items-center justify-center">
                                                    <Icon className='h-5 w-5' />
                                                </div>
                                            </div>
                                            <div className='space-y-1'>
                                                <h3 className='text-lg font-bold'>{title}</h3>
                                                <p className='text-sm leading-6 text-muted-foreground'>{description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
