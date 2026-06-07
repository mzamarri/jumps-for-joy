import { redirect, type LoaderFunctionArgs } from "react-router";
import { makeClient, isPreview } from "app/apollo.server";
import { graphql } from "lib/gql/client";

const EntryQuery = graphql(`
    query Entry($preview: Boolean!, $entryId: String!) {
        entryCollection(where: { sys: {id: $entryId }}, preview: $preview) {
            items {
                __typename
                ... on RentalCategory {
                    slug
                }
                ... on RentalItemDetails {
                    slug
                    linkedFrom {
                        rentalCategoryCollection(limit: 1) {
                            items {
                                slug
                            }
                        }
                    }
                }
                ... on GroupedContent {
                    groupType
                }
            }
        }
    }    
`)

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request?.url);
    const entryId = url.searchParams.get("entryId");
    const secret = url.searchParams.get("secret");

    if (!entryId) return new Response("Missing entryId", { status: 400 });
    if (!secret || secret !== process.env.CONTENTFUL_PREVIEW_SECRET)
        return new Response("Unauthorized. Secret not correct...", { status: 401 })

    const client = makeClient();
    const result = await client.query({
        query: EntryQuery, 
        variables: {
            entryId,
            preview: isPreview
        },
        fetchPolicy: "no-cache"
    })

    const entry = result?.data?.entryCollection?.items[0];
    const target = resolveEntryPath(entry);

    return redirect(target);
}

function resolveEntryPath(entry: any): string {
    if (!entry) return "/"
    
    switch (entry.__typename) {
        case "RentalItemDetails": 
            const itemSlug = entry?.slug;
            const catSlug = entry?.linkedFrom?.rentalCategoryCollection?.items[0]?.slug;
            if (itemSlug && catSlug) return `/rentals/${catSlug}/${itemSlug}`
        case "RentalCategory":
            if (entry?.slug) return `/rentals/${entry?.slug}`
        case "GroupedContent":
            if (entry?.groupType === "rental-categories") return "/rentals"
            if (entry?.groupType === "hero") return "/#hero"
            if (entry?.groupType === "featured") return "/#featured"
        default:
            return "/"
    }
}