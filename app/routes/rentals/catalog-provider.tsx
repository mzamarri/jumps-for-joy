import { Outlet, useOutletContext, useParams } from "react-router"
import { useReadQuery } from "@apollo/client/react";
import type { RootOutletContext } from "app/root";
import { graphql, useFragment, type FragmentType } from "app/lib/gql/client";
import type { CategoryCatalogFragment } from "app/lib/gql/client/graphql";

const RentalCatalogFieldsFragment = graphql(`
    fragment CategoryCatalog on RentalCategory {
        categoryName
        subHeader
        longDescription
        categoryImage {
            contentType
            url
        }
        rentalItemsCollection(limit: 15) {
            items {
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
    const rentalCategoryCollection = data?.rentalCategoryCollection?.items.filter(item => item !== null) ?? [];
    const categories = useFragment(RentalCatalogFieldsFragment, rentalCategoryCollection);
    const category = categories.find(category => category.slug === categoryId);

    return (
        <Outlet context={{ category, categories }} />
    )
}
