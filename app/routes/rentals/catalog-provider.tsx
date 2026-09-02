import { Outlet } from "react-router"
import { useReadQuery } from "@apollo/client/react";
import { graphql } from "app/lib/gql/client";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { apolloLoader } from "app/apollo";
import { isPreview } from "../api/contentful.server";
import type { Route } from "./+types/catalog-provider";

const groupedRentalCategoriesQuery = graphql(`
    query GroupedRentalCategories($preview: Boolean) {
        groupedContentCollection(limit: 25, where: { groupType: "rental-categories" }, preview: $preview) {
            items {
                __typename
                sys {
                    id
                }
                rentalCategoriesCollection(limit: 25) {
                    items {
                        __typename
                        sys {
                            id
                        }
                    }
                }
            }
        }
    }
`);

export const loader = apolloLoader<Route.LoaderArgs>()(({ preloadQuery }) => {
    const variables = { preview: isPreview };
    const groupedRentalCategoriesRef = preloadQuery(groupedRentalCategoriesQuery, { variables });

    return { groupedRentalCategoriesRef }
});

export type CatalogOutletContext = {
    orderCategories: <T extends { sys: { id: string }}>(rentalCategories: T[]) => T[];
}

export default function RentalCategories({ loaderData }: Route.ComponentProps) {
    const { data } = useReadQuery(loaderData.groupedRentalCategoriesRef);
    const orderedRentalCategoryIds = data?.groupedContentCollection
        ?.items[0]?.rentalCategoriesCollection
        ?.items.filter(item => item !== null)
        ?.map(item => item.sys.id) ?? [];

    const orderCategories = <T extends { sys: { id: string } }>(rentalCategories: T[]): T[] => {
        return [
            ...orderedRentalCategoryIds
                .map(id => rentalCategories?.find(item => item.sys.id === id))
                .filter(item => item !== undefined),
            ...rentalCategories
                .filter(item => !orderedRentalCategoryIds.includes(item.sys.id) && item !== undefined)
        ]
    }

    return (
        <Outlet context={{ orderCategories }} />
    )
}
