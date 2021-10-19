import React from "react";
import ReactDOM from "react-dom";
import { css } from "@emotion/css";
import "semantic-ui-css/semantic.min.css";

import AppHeader from "./components/AppHeader";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
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
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
