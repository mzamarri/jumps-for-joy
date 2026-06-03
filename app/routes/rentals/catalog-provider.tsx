import { Outlet, useOutletContext, useParams } from "react-router"
import { useReadQuery } from "@apollo/client/react";
import type { RootOutletContext } from "app/root";
import { graphql, useFragment } from "app/lib/gql/client";
import type { CategoryCatalogFragment, RentalCategoriesQuery } from "app/lib/gql/client/graphql";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";

const RentalCatalogFieldsFragment = graphql(`
    fragment CategoryCatalog on RentalCategory {
        __typename
        sys {
            id
        }
        categoryName
        subHeader
        longDescription
        categoryImage {
            contentType
            url
        }
        rentalItemsCollection(limit: 15) {
            items {
                __typename
                sys {
                    id
                }
                name
                cost
                smallDescription
                thumbnailImage {
                    contentType
                    url
                }
                slug
                ...ItemDetails
            }
        }
        slug
    }
`)

export type CatalogOutletContext = {
    category: CategoryCatalogFragment | undefined;
    categories: CategoryCatalogFragment[];
}

export default function RentalCategories() {
    const { categoryId } = useParams();
    const { rentalCategoriesRef } = useOutletContext<RootOutletContext>();
    const { data } = useReadQuery(rentalCategoriesRef);
    const liveData = useContentfulLiveUpdates(data as RentalCategoriesQuery | undefined);
    const rentalCategoryCollection = liveData?.rentalCategoryCollection?.items.filter(item => item !== null) ?? [];
    const categories = useFragment(RentalCatalogFieldsFragment, rentalCategoryCollection);
    const category = categories.find(category => category.slug === categoryId);

    return (
        <Outlet context={{ category, categories }} />
    )
}
