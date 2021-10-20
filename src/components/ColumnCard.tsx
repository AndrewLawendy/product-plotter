import React from "react";
import { css } from "@emotion/css";
import { Popup, Button } from "semantic-ui-react";
import { useDrag } from "react-dnd";

import { Column } from "../types";
import { dragTypes } from "../utils/constants";

type Props = {
  column: Column;
  type: string;
  disabled: boolean;
};

const ColumnCard = ({ column, type, disabled }: Props): JSX.Element => {
  const [, drag] = useDrag(() => ({
    type,
    item: column,
  }));

  return (
    <Popup
      trigger={
        <div
          ref={drag}
          className={css`
            pointer-events: ${disabled && "none"};
          `}
        >
          <Button
            fluid
            color={type === dragTypes.dimension ? "blue" : "teal"}
            className={css`
              margin-bottom: 10px !important;
            `}
            disabled={disabled}
          >
            {column.name}
          </Button>
        </div>
      }
      content={`Drag ${
        type === dragTypes.dimension ? "Dimension" : "Measure"
      } card and drop it in the correspondent field to see the relevant data`}
      position="right center"
      disabled={disabled}
    />
  );
};

export default ColumnCard;
