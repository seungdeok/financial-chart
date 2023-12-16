import { ChartData } from "../ChartUtil";

export interface ATRArgs {
  data: ChartData[];
  period: number;
}

export const getATR = ({ data, period }: ATRArgs) => {
  const atrValues: number[] = [];
  const trueRanges: number[] = [];

  for (let i = 0; i < data.length; i++) {
    if (i < 1) {
      trueRanges.push(NaN);
      atrValues.push(NaN);
      continue;
    }

    const high = data[i].high;
    const low = data[i].low;
    const prevClose = data[i - 1].close;

    const trueRange = Math.max(
      high - low,
      Math.abs(high - prevClose),
      Math.abs(low - prevClose)
    );
    trueRanges.push(trueRange);

    if (i === period) {
      const atr =
        trueRanges.slice(0, period).reduce((acc, value) => acc + value, 0) /
        period;
      atrValues.push(atr);
    } else if (i > period) {
      const atr = (atrValues[i - 1] * (period - 1) + trueRange) / period;
      atrValues.push(atr);
    } else {
      atrValues.push(NaN);
    }
  }
  return { atr: atrValues };
};
