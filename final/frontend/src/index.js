import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.css";
import { UserProvider } from "./hook/useUser";
import Cookies from "js-cookie";
import { setContext } from "apollo-link-context";
const generateLink = () => {
  const url = document.location;
  let webSocketLinkPrefix = "";
  if (url.protocol === "https:") {
    webSocketLinkPrefix = "wss://";
  } else webSocketLinkPrefix = "ws://";
  return [url.origin + "/graphql", webSocketLinkPrefix + url.host];
};

//Creawte an http link:
const httpLink = new HttpLink({
  uri: generateLink()[0],
  credentials: "include",
});

//Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: generateLink()[1],
  options: { reconnect: true },
});

//Create an authLink
const authLink = setContext((_, { headers }) => {
  const token = Cookies.get("jwt");
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink,
  authLink
);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache().restore({}),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <UserProvider>
      <App />
    </UserProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
