// lib/apolloClient.js
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
export const strApi = "https://cms.grey-to-green.com";
// Load the API key from environment variables
const API_KEY =
  process.env.GRAPHQL_KEY ||
  "52532a015f85d899866b18d8c883d75aaeff795483d85b45595db9b0691abe889a41034c9a0acd6d102ff2f4e58d461ed29f768cef2bdc1448c4a9923049429af7bb80b5516a389bc02308532cab7a451999bb2c2cc03096d054384fb3a3155d577b85890d002f9ce571a7bc78b8188be6a01d1dfdb67acff3d8eaf9ab6c16af"; // Make sure to define this in .env.local

// Create an HTTP link to your GraphQL endpoint
const httpLink = new HttpLink({
  uri: strApi + "/graphql", // Replace with your GraphQL endpoint
});

// Add the API key to the request headers using setContext
const authLink = setContext((_, { headers }) => {
  return {
    next: { revalidate: 0 },
    headers: {
      ...headers,
      Authorization: `Bearer ${API_KEY}`, // Or 'x-api-key' depending on the API requirement
      fetchPolicy: "no-cache",
    },
  };
});

// Combine authLink and httpLink
const graphqlClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});

export default graphqlClient;
