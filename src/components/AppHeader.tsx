import React from "react";
import { css } from "@emotion/css";
import { Header } from "semantic-ui-react";

import Logo from "../assets/logo.png";

const AppHeader = (): JSX.Element => {
  return (
    <div
      className={css`
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(245, 245, 245);
        box-shadow: 0 0 1px 1px rgb(0 0 0 / 14%), 0 0 2px 2px rgb(0 0 0 / 10%),
          0 0 5px 1px rgb(0 0 0 / 8%);
        padding: 10px 25px;
      `}
    >
      <img
        alt="Logo"
        src={Logo}
        className={css`
          height: 100%;
          margin-right: 10px;
        `}
      />
      <Header
        as="h1"
        className={css`
          margin-top: 0 !important;
        `}
      >
        Plotter
      </Header>
    </div>
  );
};

export default AppHeader;
