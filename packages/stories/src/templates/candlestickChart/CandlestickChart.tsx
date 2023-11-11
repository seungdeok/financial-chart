import React from "react";
import {
  CandlestickChart,
  CandlestickChartProps,
} from "@financial-charts/templates";
import { withAxis, PriceData } from "../../data/withAxis";
import { DATA_SET } from "../../data/dummy";

interface ChartProps extends Partial<CandlestickChartProps> {
  data?: PriceData[];
  height?: string | number;
  width?: string | number;
  options?: any;
}

export const CandlestickChartTemplate = ({
  data = withAxis(DATA_SET).map((v) => v.slice(0, 5)),
  width,
  height,
  options,
}: ChartProps) => {
  return (
    <CandlestickChart
      data={data}
      height={width}
      width={height}
      options={options}
    />
  );
};
