import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";

import { Column } from "../../types";

type Response = Column[];

function getColumns() {
  return axios
    .get<Response>("https://plotter-task.herokuapp.com/columns")
    .then(({ data }) => data);
}

function useGetColumns(): UseQueryResult<Response> {
  return useQuery("allColumns", getColumns, {
    refetchOnWindowFocus: false,
  });
}

export default useGetColumns;
