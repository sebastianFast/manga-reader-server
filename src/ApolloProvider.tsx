import React from "react";
import App from "./App";
import { createHttpLink } from "apollo-link-http";
import { ApolloLink, ApolloProvider } from "@apollo/react-hooks";
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
  uri: "http://localhost:5000",
});

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return{
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient<NormalizedCacheObject>({
  link: authLink.concat(httpLink) as unknown as ApolloLink,
  cache: new InMemoryCache(),
});



const ApolloProviderWrapper = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

export default ApolloProviderWrapper;
