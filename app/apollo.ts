import { HttpLink, InMemoryCache } from "@apollo/client";
import {
  createApolloLoaderHandler,
  ApolloClient,
} from "@apollo/client-integration-react-router";
import { appConfig } from "./config";

const { spaceId, accessToken } = appConfig.contentful;

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
