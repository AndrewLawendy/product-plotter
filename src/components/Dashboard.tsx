import React from "react";
import { css } from "@emotion/css";
import { Header, Loader, Button } from "semantic-ui-react";

import DimensionColumnCard from "./DimensionColumnCard";
import MeasureColumnCard from "./MeasureColumnCard";

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
                <DimensionColumnCard key={column.name} column={column} />
              ))}
              {groupedColumns.measures.map((column) => (
                <MeasureColumnCard key={column.name} column={column} />
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
        <div
          className={css`
            display: flex;
            align-items: stretch;
          `}
        >
          <Header
            as="h4"
            className={css`
              margin-bottom: 0 !important;
              margin-top: 0 !important;
              margin-right: 35px !important;
              line-height: 37px !important;
            `}
          >
            Dimension
          </Header>

          <div
            className={css`
              border: 1px solid rgba(34, 36, 38, 0.15);
              border-right: none;
              border-top-left-radius: 4px;
              border-bottom-left-radius: 4px;
              flex-grow: 1;
              display: flex;
              padding: 5px 10px;
            `}
          >
            <div
              className={css`
                background-color: #2185d0;
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

        <div
          className={css`
            display: flex;
            align-items: stretch;
            margin-top: 20px;
          `}
        >
          <Header
            as="h4"
            className={css`
              margin-bottom: 0 !important;
              margin-top: 0 !important;
              margin-right: 35px !important;
              line-height: 37px !important;
            `}
          >
            Measures
          </Header>

          <div
            className={css`
              border: 1px solid rgba(34, 36, 38, 0.15);
              border-right: none;
              border-top-left-radius: 4px;
              border-bottom-left-radius: 4px;
              flex-grow: 1;
              display: flex;
              padding: 5px 10px;
            `}
          >
            <div
              className={css`
                background-color: #00b5ad;
                color: #fff;
                padding: 1px 20px;
                border-radius: 4px;
                font-weight: bold;
              `}
            >
              Cost
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
      </main>
    </div>
  );
};

export default Dashboard;
