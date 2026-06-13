import { startTransition } from "react";
import type { MouseEvent, KeyboardEvent } from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router";
import { useCart } from "context/cart-context";
import { useToast } from "context/toast-context";
import { graphql, useFragment, type FragmentType } from "app/lib/gql/client";
import { useContentfulInspectorMode } from "@contentful/live-preview/react";

const RentalItemCardFragment = graphql(`
    fragment RentalItemCard on RentalItemDetails {
        __typename
        sys {
            id
        }
        name
        cost
        smallDescription
        singleItem
        slug
        thumbnailImage {
            contentType
            url
        }
        linkedFrom {
            rentalCategoryCollection(limit: 1) {
                items {
                    slug
                }
            }
        }
    }   
`)


export type RentalItemCardProps = {
    categorySlug: string | undefined | null,
    rentalItem: FragmentType<typeof RentalItemCardFragment>
}

export default function RentalItemCard({ categorySlug, rentalItem }: RentalItemCardProps) {
    const data = useFragment(RentalItemCardFragment, rentalItem);
    const {
        sys,
        name,
        cost,
        smallDescription: description,
        singleItem,
        slug: rentalItemSlug,
        thumbnailImage
    } = data;

    const navigate = useNavigate();
    const { addItem } = useCart();
    const { showToast } = useToast();
    const inspectorProps = useContentfulInspectorMode({ entryId: sys?.id });

    const handleNavigate = () => {
        startTransition(() => {
            navigate(`/rentals/${categorySlug || data?.linkedFrom?.rentalCategoryCollection?.items[0]?.slug}/${rentalItemSlug}`);
        });
    };

    const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        addItem({
            id: rentalItemSlug ?? "",
            name: name ?? "",
            cost: cost ?? 0,
            description: description ?? "",
            singleItem: singleItem ?? false,
            quantity: 1,
            image: thumbnailImage?.url || ""
        });
        showToast(`${name} successfully added`);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleNavigate();
        }
    };

    return (
        <article
            role="link"
            tabIndex={0}
            onClick={handleNavigate}
            onKeyDown={handleKeyDown}
            className="group flex h-full flex-col overflow-hidden rounded-xl cursor-pointer border border-border bg-card shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary md:rounded-2xl"
        >
            <div className="h-32 bg-muted md:h-56 lg:h-64">
                {thumbnailImage?.url ? (
                    <img
                        src={thumbnailImage?.url}
                        alt={name ?? ""}
                        className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-[1.03] md:p-5"
                        {...(inspectorProps({ fieldId: "thumbnailImage" }) ?? {})}
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                        No image available
                    </div>
                )}
            </div>
            <div className="flex flex-1 flex-col space-y-2 p-3 md:space-y-3 md:p-5">
                <div className="flex flex-1 flex-col gap-2 justify-between md:flex-row md:items-start md:justify-between md:gap-4">
                    <div className="w-full space-y-2">
                        <div className="flex justify-between gap-4">
                            <h2
                                className="flex-1 text-sm font-bold leading-5 text-foreground md:text-lg md:leading-6"
                                {...(inspectorProps({ fieldId: "name" }) ?? {})}
                            >
                                {name}
                            </h2>
                            <span
                                className="shrink-0 text-sm font-bold text-primary md:text-lg"
                                {...(inspectorProps({ fieldId: "cost" }) ?? {})}
                            >
                                ${cost}
                            </span>
                        </div>
                        <p
                            className="text-xs leading-5 text-muted-foreground md:text-sm"
                            {...(inspectorProps({ fieldId: "smallDescription" }) ?? {})}
                        >
                            {description}
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={handleAddToCart}
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-accent py-2 text-sm font-semibold text-accent-foreground transition-colors hover:cursor-pointer hover:bg-accent/90 md:gap-2 md:py-2.5 md:text-base"
                >
                    <ShoppingCart className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    Add to Cart
                </button>
            </div>
        </article>
    );
}
