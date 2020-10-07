import React from "react";
import { useQueryLoader, usePreloadedQuery } from "react-relay/hooks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import graphql from "babel-plugin-relay/macro";

const query = graphql`
  query AppHelloQuery {
    hello
  }
`;

function Hello({ queryReference }) {
  const data = usePreloadedQuery(query, queryReference);
  return <p>{data.hello}</p>;
}

function App() {
  const [queryReference, loadQuery] = useQueryLoader(query);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          preload={() => loadQuery()}
          element={
            <React.Suspense fallback="Loading...">
              <Hello queryReference={queryReference} />
            </React.Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
