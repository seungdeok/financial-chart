import React from "react";
import { LineChart, LineChartProps } from "@financial-charts/templates";
import { withAxis, PriceData } from "../../data/withAxis";
import { DATA_SET } from "../../data/dummy";

interface ChartProps extends Partial<LineChartProps> {
  data?: PriceData[];
  height?: string | number;
  width?: string | number;
  options?: any;
}

export const LineChartTemplate = ({
  data = withAxis(DATA_SET),
  width,
  height,
  options,
}: ChartProps) => {
  return (
    <LineChart data={data} height={width} width={height} options={options} />
  );
};
