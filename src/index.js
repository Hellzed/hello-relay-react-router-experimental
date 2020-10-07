import React from "react";
import ReactDOM from "react-dom";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { Environment, Network, RecordSource, Store } from "relay-runtime";

import App from "./App";

const fetchGraphQL = async (text, variables) => {
  const response = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: text, variables }),
  });

  return await response.json();
};

const fetchRelay = async (params, variables) => {
  return fetchGraphQL(params.text, variables);
};

const environment = new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
});

ReactDOM.unstable_createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RelayEnvironmentProvider environment={environment}>
      <App />
    </RelayEnvironmentProvider>
  </React.StrictMode>
);
