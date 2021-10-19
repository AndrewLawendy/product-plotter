import React from "react";
import { css } from "@emotion/css";
import { Header, Button } from "semantic-ui-react";
import { useDrop } from "react-dnd";

type Props = {
  title: "Dimension" | "Measures";
  type: string;
  cardColor: string;
};

const ColumnDropTarget = ({ title, type, cardColor }: Props): JSX.Element => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: type,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  function onDrop(item) {
    console.log(item);
  }

  const isActive = isOver && canDrop;
  let backgroundColor = "transparent";
  if (isActive) {
    backgroundColor = "#e5f9e7";
  } else if (canDrop) {
    backgroundColor = "#fff8db";
  }

  return (
    <div
      className={css`
        display: flex;
        align-items: stretch;
        margin-bottom: 20px;
      `}
    >
      <Header
        as="h4"
        className={css`
          width: 150px;
          margin-bottom: 0 !important;
          margin-top: 0 !important;
          line-height: 37px !important;
        `}
      >
        {title}
      </Header>

      <div
        ref={drop}
        className={css`
          border: 1px solid rgba(34, 36, 38, 0.15);
          border-right: none;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          flex-grow: 1;
          display: flex;
          padding: 5px 10px;
          transition: background-color 0.3s;
        `}
        style={{ backgroundColor }}
      >
        <div
          className={css`
            background-color: ${cardColor};
            color: #fff;
            padding: 1px 20px;
            border-radius: 4px;
            font-weight: bold;
          `}
        >
          Product
        </div>
      </div>
      <Button
        basic
        className={css`
          margin-right: 0 !important;
          border-top-left-radius: 0 !important;
          border-bottom-left-radius: 0 !important;
        `}
      >
        Clear
      </Button>
    </div>
  );
};

export default ColumnDropTarget;
