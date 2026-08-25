import { graphql, type FragmentType, useFragment } from "lib/gql/client";
import { useContentfulInspectorMode } from "@contentful/live-preview/react";
import { Link } from "react-router";
import { type MouseEvent, type RefObject } from "react";
import { fa } from "zod/v4/locales";

const RentalCategoryCardFieldsFragment = graphql(`
    fragment RentalCategoryCardFields on RentalCategory {
        __typename
        sys {
            id
        }
        categoryName
        shortDescription
        categoryImage {
            contentType
            url
        }
        slug
    }
`);

export default function RentalCategoryCard({ rentalCategory, hasDragged }: { 
    rentalCategory: FragmentType<typeof RentalCategoryCardFieldsFragment>,
    hasDragged: RefObject<boolean>

}) {
    const category = useFragment(RentalCategoryCardFieldsFragment, rentalCategory);
    const inspectorProps = useContentfulInspectorMode({ entryId: category?.sys?.id });
    const handleClick = (event: MouseEvent<HTMLAnchorElement>): void => {
        if (hasDragged.current) {
            hasDragged.current = false;
            event.preventDefault();
        }
    }

    return (
        <Link
            to={`/rentals/${category?.slug}`}
            className='block overflow-hidden rounded-xl w-full border border-border bg-card shadow-md transition-transform hover:cursor-pointer hover:-translate-y-1'
            draggable={false}
            onClick={handleClick}
        >
            <div 
                className='flex aspect-square items-center justify-center bg-muted md:h-64 md:aspect-auto'
                {...(inspectorProps({ fieldId: "categoryImage" }) ?? {})}
            >
                <img
                    src={category?.categoryImage?.url || ""}
                    alt={`${category?.categoryName} category`}
                    className='w-full h-full object-contain p-3 select-none pointer-events-none md:p-4'
                    draggable={false}
                />
            </div>
            <div className='min-h-28 space-y-2 p-3 md:min-h-32 md:space-y-3 md:p-4'>
                <h1
                    className='text-lg font-semibold text-foreground md:text-xl'
                    {...(inspectorProps({ fieldId: "categoryName" }) ?? {})}
                >
                    {category?.categoryName}
                </h1>
                <p
                    className='text-xs leading-5 text-muted-foreground md:text-base'
                    {...(inspectorProps({ fieldId: "shortDescription" }) ?? {})}
                >
                    {category?.shortDescription}
                </p>
            </div>
        </Link>
    )

}