import React, { useState } from "react";
import { css } from "@emotion/css";
import { Header, Loader } from "semantic-ui-react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import ColumnCard from "./ColumnCard";
import ColumnDropTarget from "./ColumnDropTarget";
import DataChart from "./DataChart";

import { dragTypes } from "../utils/constants";
import { Column } from "../types";

import useGetAllColumns from "../resources/dashboard/useGetAllColumns";
import useGetColumnsData from "../resources/dashboard/useGetColumnData";

const Dashboard = (): JSX.Element => {
  const [selectedDimension, setSelectedDimension] = useState<string[]>([]);
  const [selectedMeasures, setSelectedMeasures] = useState<string[]>([]);

  const {
    data: columnsData,
    isLoading: isColumnsDataLoading,
  } = useGetColumnsData({
    dimension: selectedDimension[0] || "",
    measures: selectedMeasures,
  });
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

  function updateDimension(dimension: Column) {
    setSelectedDimension([dimension.name]);
  }

  function updateMeasures(measure: Column) {
    setSelectedMeasures((measures) => [...measures, measure.name]);
  }

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
                    disabled={selectedDimension.includes(column.name)}
                  />
                ))}
                {groupedColumns.measures.map((column) => (
                  <ColumnCard
                    key={column.name}
                    column={column}
                    type={dragTypes.measure}
                    disabled={selectedMeasures.includes(column.name)}
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
            cards={selectedDimension}
            onDrop={updateDimension}
            onClear={setSelectedDimension}
          />
          <ColumnDropTarget
            title="Measures"
            type={dragTypes.measure}
            cardColor="#00b5ad"
            cards={selectedMeasures}
            onDrop={updateMeasures}
            onClear={setSelectedMeasures}
          />

          <DataChart data={columnsData} />
        </main>
      </div>
    </DndProvider>
  );
};

export default Dashboard;
