import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { css } from "@emotion/css";
import "semantic-ui-css/semantic.min.css";

import AppHeader from "./components/AppHeader";
import Dashboard from "./components/Dashboard";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div
        className={css`
          min-height: 100vh;
          display: grid;
          grid-template-rows: 64px 1fr;
        `}
      >
        <AppHeader />
        <Dashboard />
      </div>
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
