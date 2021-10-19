import React from "react";
import { css } from "@emotion/css";
import { Header, Loader } from "semantic-ui-react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import ColumnCard from "./ColumnCard";
import ColumnDropTarget from "./ColumnDropTarget";

import { dragTypes } from "../utils/constants";
import useGetAllColumns from "../resources/dashboard/useGetAllColumns";

const Dashboard = (): JSX.Element => {
  const { data: allColumns, isLoading: isColumnsLoading } = useGetAllColumns();
  const groupedColumns = allColumns?.reduce(
    (grouped, column) => {
      switch (column.function) {
        case "dimension":
          grouped.dimensions.push(column);
          break;
        case "measure":
          grouped.measures.push(column);
          break;
      }

      return grouped;
    },
    {
      dimensions: [],
      measures: [],
    }
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={css`
          display: grid;
          grid-template-columns: 250px 1fr;
        `}
      >
        <aside>
          <div
            className={css`
              position: sticky;
              top: 64px;
              height: 100%;
              background-color: #000;
              color: #fff;
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
            {isColumnsLoading ? (
              <Loader active indeterminate>
                Preparing Columns
              </Loader>
            ) : (
              <>
                {groupedColumns.dimensions.map((column) => (
                  <ColumnCard
                    key={column.name}
                    column={column}
                    type={dragTypes.dimension}
                  />
                ))}
                {groupedColumns.measures.map((column) => (
                  <ColumnCard
                    key={column.name}
                    column={column}
                    type={dragTypes.measure}
                  />
                ))}
              </>
            )}
          </div>
        </aside>
        <main
          className={css`
            padding: 25px 20px;
          `}
        >
          <ColumnDropTarget
            title="Dimension"
            type={dragTypes.dimension}
            cardColor="#2185d0"
          />
          <ColumnDropTarget
            title="Measures"
            type={dragTypes.measure}
            cardColor="#00b5ad"
          />
        </main>
      </div>
    </DndProvider>
  );
};

export default Dashboard;
