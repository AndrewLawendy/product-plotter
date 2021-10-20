import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";

type Response = { name: string; values: number[] | string[] }[];

type Params = {
  dimension: string;
  measures: string[];
};

function getColumnsData(params) {
  return axios
    .post<Response>("https://plotter-task.herokuapp.com/data", params)
    .then(({ data }) => data);
}

function useGetColumnsData(params: Params): UseQueryResult<Response> {
  const { dimension, measures } = params;
  return useQuery(
    ["columnsData", dimension, [...measures].sort()],
    () => getColumnsData(params),
    {
      refetchOnWindowFocus: false,
      enabled: params.dimension.length > 0 && params.measures.length > 0,
    }
  );
}

export default useGetColumnsData;
