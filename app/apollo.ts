import { HttpLink, InMemoryCache } from "@apollo/client";
import {
  createApolloLoaderHandler,
  ApolloClient,
} from "@apollo/client-integration-react-router";

// `request` will be available on the server during SSR or in loaders, but not in the browser
export const makeClient = (request?: Request) => {
  const uri = request
    ? new URL("/api/contentful", request.url).toString()
    : "/api/contentful"
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: uri,
      headers: {
        "Content-Type": "application/json",
      },
    }),
  });
};

export const apolloLoader = createApolloLoaderHandler(makeClient);
