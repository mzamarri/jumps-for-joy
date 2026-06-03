import { HttpLink, InMemoryCache } from "@apollo/client";
import {
    createApolloLoaderHandler,
    ApolloClient,
} from "@apollo/client-integration-react-router";

export const isPreview = process.env.CONTENTFUL_PREVIEW === "true"

export const makeClient = () => {
    const spaceId = process.env.CONTENTFUL_SPACE_ID;
    const accessToken = isPreview
        ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
        : process.env.CONTENTFUL_ACCESS_TOKEN;

    return new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
            uri: `https://graphql.contentful.com/content/v1/spaces/${spaceId}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        }),
    });
};

export const apolloLoader = createApolloLoaderHandler(makeClient);
