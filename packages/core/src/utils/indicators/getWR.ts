import { ChartData } from "../ChartUtil";

// Williams %R
export interface WRArgs {
  data: ChartData[];
  period: number;
}

export const getWR = ({ data, period }: WRArgs) => {
  const highPrices = data.map((item) => item.high);
  const lowPrices = data.map((item) => item.low);
  const closePrices = data.map((item) => item.close);

  const williamsRs: number[] = [];

  for (let i = period - 1; i < data.length; i++) {
    const highSlice = highPrices.slice(i - period + 1, i + 1);
    const lowSlice = lowPrices.slice(i - period + 1, i + 1);

    const highestHigh = Math.max(...highSlice);
    const lowestLow = Math.min(...lowSlice);

    const currentClose = closePrices[i];
    const williamsR =
      ((highestHigh - currentClose) / (highestHigh - lowestLow)) * -100;

    williamsRs.push(williamsR);
  }

  return { WR: williamsRs };
};
