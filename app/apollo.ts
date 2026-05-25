import { HttpLink, InMemoryCache } from "@apollo/client";
import {
  createApolloLoaderHandler,
  ApolloClient,
} from "@apollo/client-integration-react-router";

const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID || "h6lueo8xvk4p";
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN || "40P0KY3Ds-gGxxJIvM3RYX0k1Ja3h6AFFk_1Wn1cEo8";

// `request` will be available on the server during SSR or in loaders, but not in the browser
export const makeClient = (request?: Request) => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: `https://graphql.contentful.com/content/v1/spaces/${spaceId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    }),
  });
};

export const apolloLoader = createApolloLoaderHandler(makeClient);