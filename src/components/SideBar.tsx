import React from "react";
import { css } from "@emotion/css";
import { Header } from "semantic-ui-react";

const SideBar = (): JSX.Element => {
  return (
    <div
      className={css`
        position: sticky;
        top: 64px;
        height: 100%;
        background-color: #000;
        padding: 25px 20px;
      `}
    >
      <Header
        as="h2"
        className={css`
          color: #fff !important;
        `}
      >
        Columns
      </Header>
    </div>
  );
};

export default SideBar;
