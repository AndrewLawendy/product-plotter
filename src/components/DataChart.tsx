import React, { useLayoutEffect } from "react";
import { css } from "@emotion/css";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

type Props = {
  data: { name: string; values: number[] | string[] }[];
};

const DataChart = ({ data }: Props): JSX.Element => {
  const [dimension, ...measures] = data;
  const chartData = dimension?.values.map((value, index) => {
    const xAxis = { [dimension.name]: value };
    const yAxises = measures.reduce((acc, { name, values }) => {
      acc[name] = values[index];

      return acc;
    }, {});

    return { ...xAxis, ...yAxises };
  });

  useLayoutEffect(() => {
    const chart = am4core.create("columnsDataChart", am4charts.XYChart);

    // Increase contrast by taking evey second color
    chart.colors.step = 2;

    // Add data
    chart.data = chartData;

    // Create axes
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = dimension?.name;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.rotation = -90;

    // Create series
    function createAxisAndSeries(name) {
      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      if (chart.yAxes.indexOf(valueAxis) != 0) {
        valueAxis.syncWithAxis = chart.yAxes.getIndex(0);
      }

      const series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = name;
      series.dataFields.categoryX = dimension.name;
      series.strokeWidth = 2;
      series.yAxis = valueAxis;
      series.name = name;
      series.tooltipText = "{name}: [bold]{valueY}[/]";
      series.tensionX = 0.8;
      series.showOnInit = true;

      const interfaceColors = new am4core.InterfaceColorSet();

      const bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.stroke = interfaceColors.getFor("background");
      bullet.circle.strokeWidth = 2;

      valueAxis.renderer.line.strokeOpacity = 1;
      valueAxis.renderer.line.strokeWidth = 2;
      valueAxis.renderer.line.stroke = series.stroke;
      valueAxis.renderer.labels.template.fill = series.stroke;
      valueAxis.renderer.opposite = true;
    }

    measures?.forEach(({ name }) => createAxisAndSeries(name));
    // createAxisAndSeries("Cost");

    // Add legend
    chart.legend = new am4charts.Legend();

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
  }, [data]);

  return (
    <div
      id="columnsDataChart"
      className={css`
        width: 100%;
        height: 635px;
      `}
    ></div>
  );
};

export default DataChart;
