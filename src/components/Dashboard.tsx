import React from "react";
import { css } from "@emotion/css";

const Dashboard = (): JSX.Element => {
  return (
    <div
      className={css`
        display: grid;
        grid-template-columns: 250px 1fr;
        padding: 25px 20px;
      `}
    >
      Dashboard
    </div>
  );
};

export default Dashboard;
