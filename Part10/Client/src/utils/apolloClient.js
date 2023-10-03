import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import Constants from "expo-constants";

const httpLink = createHttpLink({
  uri: Constants.expoConfig.extra.apollo_uri,
});

function createApolloClient() {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
}

export default createApolloClient;
