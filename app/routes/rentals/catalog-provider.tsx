import { Outlet, useOutletContext, useParams } from "react-router"
import { useReadQuery } from "@apollo/client/react";
import { graphql, useFragment } from "app/lib/gql/client";
import type { RentalCatalogFieldsFragment, RentalCategoriesQuery } from "app/lib/gql/client/graphql";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { apolloLoader, isPreview } from "app/apollo.server";
import type { Route } from "./+types/catalog-provider";

const RentalCatalogQuery = graphql(`
    query CategoryCatalog($preview: Boolean) {
        rentalCategoryCollection(limit: 25, preview: $preview) {
            items {
                slug
                ...RentalCatalogFields
            }
        }
    }
`)

export const loader = apolloLoader<Route.LoaderArgs>()(({ preloadQuery }) => {
    const variables = { preview: isPreview };
    const rentalCategoriesRef = preloadQuery(RentalCatalogQuery, { variables });

    return {
        isPreview,
        rentalCategoriesRef
    }
});

export type CatalogOutletContext = {
    category: RentalCatalogFieldsFragment;
    categories: RentalCatalogFieldsFragment[];
}

export default function RentalCategories({ loaderData, params }: Route.ComponentProps) {
    const { data } = useReadQuery(loaderData.rentalCategoriesRef);
    const liveData = useContentfulLiveUpdates(data);
    const categories = liveData?.rentalCategoryCollection?.items.filter(item => item !== null) ?? [];
    const category = categories.find(category => category?.slug === params?.categoryId);

    return (
        <Outlet context={{ category, categories }} />
    )
}
