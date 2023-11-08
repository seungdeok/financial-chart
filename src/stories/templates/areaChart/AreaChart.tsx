import React from "react";
import { AreaChart, AreaChartProps } from "../../../lib/components/AreaChart";
import { withAxis, PriceData } from "../../data/withAxis";
import { DATA_SET } from "../../data/dummy";

interface ChartProps extends Partial<AreaChartProps> {
  data?: PriceData[];
  height?: string | number;
  width?: string | number;
  options?: any;
}

export const AreaChartTemplate = ({
  data = withAxis(DATA_SET),
  width,
  height,
  options,
}: ChartProps) => {
  return (
    <AreaChart data={data} height={width} width={height} options={options} />
  );
};
