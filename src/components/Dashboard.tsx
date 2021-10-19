import React from "react";
import { css } from "@emotion/css";

import SideBar from "./SideBar";

const Dashboard = (): JSX.Element => {
  return (
    <div
      className={css`
        display: grid;
        grid-template-columns: 250px 1fr;
      `}
    >
      <div>
        <SideBar />
      </div>
      <div></div>
    </div>
  );
};

export default Dashboard;
