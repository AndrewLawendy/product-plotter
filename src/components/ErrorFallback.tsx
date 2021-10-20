import React from "react";
import { css } from "@emotion/css";
import { Header, Button } from "semantic-ui-react";

import ErrorFallbackImg from "../assets/error-fallback.jpg";

const ErrorFallback = ({ resetErrorBoundary }) => {
  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <img
        alt="Error"
        src={ErrorFallbackImg}
        className={css`
          max-height: 60vh;
        `}
      />
      <a
        href="https://www.freepik.com/vectors/people"
        className={css`
          margin-bottom: 45px;
        `}
      >
        People vector created by pch.vector - www.freepik.com
      </a>
      <Header>
        Oops an error occurred, please click reset to restart the app!
      </Header>
      <Button color="red" onClick={resetErrorBoundary}>
        Reset
      </Button>
    </div>
  );
};

export default ErrorFallback;
