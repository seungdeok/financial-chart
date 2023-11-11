import React from "react";
import Chart from "react-google-charts";

export interface LineChartProps {
  data: (string | number)[][];
  width?: string | number;
  height?: string | number;
  options?: any;
}

export const LineChart = ({
  width = "100%",
  height = "100%",
  data,
  options = {},
}: LineChartProps) => {
  return (
    <Chart
      chartType="LineChart"
      data={data}
      width={width}
      height={height}
      options={options}
    />
  );
};
