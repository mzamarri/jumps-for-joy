import { ArrowLeft, CircleAlert, Droplets, Ruler, ShieldCheck, ShoppingCart, Truck, Users, FileText } from "lucide-react"
import { Link, useOutletContext, useParams } from "react-router"
import { useCart } from "context/cart-context";
import { graphql, useFragment } from "app/lib/gql/client";
import type { CatalogOutletContext } from "./catalog-provider";
import CtfIconTextComponent from "components/contentful/ctf-icon-text-component";
import { RentalImageGallery } from "components/ui";
import type { RentalGalleryImage } from "components/ui/rental-image-gallery";
import { useContentfulInspectorMode } from "@contentful/live-preview/react";

const ItemDetailsFragment = graphql(`
    fragment ItemDetails on RentalItemDetails {
        __typename
        sys {
            id
        }
        name
        cost
        smallDescription
        longDescription
        specificationsCollection {
            items {
                __typename
                sys {
                    id
                }
                ...IconTextComponentFields
            }
        }
        features
        thumbnailImage {
            __typename
            sys {
                id
            }
            contentType
            url
        }
        galleryImagesCollection {
            items {
                __typename
                sys {
                    id
                }
                contentType
                url
            }
        }
        bookingInformationCollection {
            items {
                __typename
                sys {
                    id
                }
                ...IconTextComponentFields
            }
        }
        slug
    } 
`)

function normalizeImageUrl(url?: string | null) {
    if (!url) return "";
    return url.startsWith("//") ? `https:${url}` : url;
}

export default function RentalDetails() {
    const { categoryId, itemId } = useParams();
    const { addItem } = useCart();
    const { category } = useOutletContext<CatalogOutletContext>();
    const rentalItemRef = category?.rentalItemsCollection?.items.find(item => item?.slug === itemId);
    const rentalItem = useFragment(ItemDetailsFragment, rentalItemRef);
    const inspectorProps = useContentfulInspectorMode({ entryId: rentalItem?.sys?.id });

    if (!category || !rentalItem) {
        return (
            <div className='px-4 py-8 space-y-4 sm:px-6 lg:px-24'>
                <Link 
                    to=".."
                    relative="path"
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                >
                    <ArrowLeft className="w-4 h-4"/> Back to {category?.categoryName}
                </Link>
                <div className="rounded-2xl border border-border bg-card p-8 text-muted-foreground shadow-md">
                    Rental item not found.
                </div>
            </div>
        )
    }

    const thumbnailImageId = rentalItem?.thumbnailImage?.sys?.id;
    const galleryImageIds = rentalItem?.galleryImagesCollection?.items.map(image => image?.sys?.id);

    const galleryImages: RentalGalleryImage[] = [
        {
            id: rentalItem?.thumbnailImage?.sys?.id || `${rentalItem.slug ?? rentalItem.name}-thumbnail`,
            url: normalizeImageUrl(rentalItem.thumbnailImage?.url),
            alt: rentalItem.name ?? "Rental item"
        },
        ...(rentalItem.galleryImagesCollection?.items.flatMap((image, index) => {
            const url = normalizeImageUrl(image?.url);

            if (!url) return [];

            return [{
                id: image?.sys?.id || `${rentalItem.slug ?? rentalItem.name}-gallery-${index}`,
                url,
                alt: `${rentalItem.name ?? "Rental item"} image ${index + 1}`
            }];
        }) ?? [])
    ].filter(image => image.url);
    
    const cartItem = {
        id: rentalItem.slug ?? rentalItem.name ?? "rental-item",
        name: rentalItem.name,
        cost: rentalItem.cost ?? 0,
        image: normalizeImageUrl(rentalItem.thumbnailImage?.url),
        summary: rentalItem.smallDescription ?? "",
        categoryId,
        quantity: 1
    };

    return (
        <>
            <div className='px-4 py-8 space-y-4 sm:px-6 lg:px-24'>
                <Link 
                    to=".."
                    relative="path"
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                >
                    <ArrowLeft className="w-4 h-4"/> Back to {category.categoryName}
                </Link>
                <div className='rental-item space-y-8'>
                    <div className='flex flex-col gap-8 lg:flex-row'>
                        <RentalImageGallery thumbnailImageId={thumbnailImageId || ""} galleryImageIds={galleryImageIds || []} images={galleryImages} title={rentalItem.name ?? "Rental item"} inspectorProps={inspectorProps} />
                        <div className='flex-1 space-y-6'>
                            <div className="space-y-3">
                                <h1 
                                    className='text-4xl text-foreground font-bold'
                                    {...inspectorProps({ fieldId: "name" })}
                                >
                                    {rentalItem?.name}
                                </h1>
                                <span 
                                    className="text-2xl font-bold text-primary block"
                                    {...inspectorProps({ fieldId: "cost" })}
                                >
                                    ${rentalItem?.cost} <span className="text-sm text-muted-foreground font-normal">/ day</span>
                                </span>
                                <p 
                                    className="text-muted-foreground text-lg"
                                    {...inspectorProps({ fieldId: "smallDescription" })}
                                >
                                    {rentalItem?.smallDescription}
                                </p>
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {
                                    rentalItem?.specificationsCollection?.items?.map(item => item !== null 
                                        ? (
                                            <div {...inspectorProps({ entryId: item?.sys?.id, fieldId: "specifications" })}>
                                                <CtfIconTextComponent 
                                                    content={item} 
                                                    containerClassName="flex gap-2 text-foreground"
                                                    displayTextClassName="text-xs text-muted-foreground"
                                                    descriptionClassName="text-sm font-semibold"
                                                />
                                            </div>
                                        ) : null)
                                }
                            </div>
                            <div>
                                <h1 className="text-lg font-bold">Features</h1>
                                <ul
                                    className="grid grid-cols-1 gap-2 sm:grid-cols-2"
                                    {...inspectorProps({ fieldId: "features" })}
                                >
                                    {
                                        (rentalItem?.features || []).map(feature => feature !== null ? (
                                            <li key={feature} className="text-muted-foreground flex items-start gap-2">
                                                <span className="relative top-1.75 w-2 h-2 rounded-full bg-secondary inline-block" />
                                                {feature}
                                            </li>
                                        ) : null)
                                    }
                                </ul>
                            </div>
                            <button
                                type="button"
                                onClick={() => addItem(cartItem)}
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
                                    <p
                                        key={rentalItem.slug}
                                        className='text-base leading-7 text-muted-foreground lg:text-lg'
                                        {...inspectorProps({ fieldId: "longDescription" })}
                                    >
                                        {rentalItem.longDescription}
                                    </p>
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
                                {
                                    rentalItem?.bookingInformationCollection?.items.map(item => item !== null 
                                        ? (
                                            <div {...inspectorProps({ entryId: item?.sys?.id, fieldId: "bookingInformation" })}>
                                                <CtfIconTextComponent 
                                                    content={item}
                                                    containerClassName="flex gap-4 rounded-xl bg-muted p-4 text-foreground"
                                                    textContainerClassName="space-y-1"
                                                    displayTextClassName="text-lg font-semibold"
                                                    descriptionClassName="text-muted-foreground leading-6 text-sm"
                                                /> 
                                            </div>
                                        ) : null
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
