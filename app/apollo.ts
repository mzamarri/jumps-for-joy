import { HttpLink, InMemoryCache } from "@apollo/client";
import {
  createApolloLoaderHandler,
  ApolloClient,
} from "@apollo/client-integration-react-router";

function isBrowserPreviewRequest() {
  if (typeof window === "undefined") return false;

  return new URLSearchParams(window.location.search).get("preview") === "true";
}

// `request` will be available on the server during SSR or in loaders, but not in the browser
export const makeClient = (request?: Request) => {
  const isPreview = isBrowserPreviewRequest();

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: `/api/contentful${isPreview ? "?preview=true" : ""}`,
      headers: {
        "Content-Type": "application/json",
      },
    }),
  });
};

export const apolloLoader = createApolloLoaderHandler(makeClient);
