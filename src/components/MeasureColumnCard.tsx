import React from "react";
import { css } from "@emotion/css";
import { Popup, Button } from "semantic-ui-react";

import { Column } from "../types";

type Props = {
  column: Column;
};

const MeasureColumnCard = ({ column }: Props): JSX.Element => {
  return (
    <Popup
      trigger={
        <Button
          fluid
          color="teal"
          className={css`
            margin-bottom: 10px !important;
          `}
        >
          {column.name}
        </Button>
      }
      content="Drag Measure card and drop it in the field to see the relevant data"
      position="right center"
    />
  );
};

export default MeasureColumnCard;
