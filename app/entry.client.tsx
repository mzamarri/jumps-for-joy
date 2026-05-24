import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { HydratedRouter } from "react-router/dom"
import './index.css'
import { makeClient } from "./apollo";
import { ApolloProvider } from "@apollo/client/react";

const client = makeClient();

ReactDOM.hydrateRoot(
  document, 
  <StrictMode>
    <ApolloProvider client={client}>
      <HydratedRouter />
    </ApolloProvider>
  </StrictMode>,
)
