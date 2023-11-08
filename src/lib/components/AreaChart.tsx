import React from "react";
import Chart from "react-google-charts";

export interface AreaChartProps {
  data: (string | number)[][];
  width?: string | number;
  height?: string | number;
  options?: any;
}

export const AreaChart = ({
  width = "100%",
  height = "100%",
  data,
  options = {},
}: AreaChartProps) => {
  return (
    <Chart
      chartType="AreaChart"
      data={data}
      width={width}
      height={height}
      options={options}
    />
  );
};
