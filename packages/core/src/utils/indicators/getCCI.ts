import { ChartData } from "../ChartUtil";

export interface CCIArgs {
  data: ChartData[];
  period: 100 | -100;
  // 과매수(100), 과매도(-100)
}

export interface IData {
  cci: number[];
}

export const getCCI = ({ data, period }: CCIArgs) => {
  const cciValues: number[] = [];

  const tpValues: number[] = [];
  const smaTPValues: number[] = [];
  const meanDeviationValues: number[] = [];

  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      tpValues.push(NaN);
      smaTPValues.push(NaN);
      meanDeviationValues.push(NaN);
      cciValues.push(NaN);
      continue;
    }

    const high = data[i].high;
    const low = data[i].low;
    const close = data[i].close;

    const typicalPrice = (high + low + close) / 3;
    tpValues.push(typicalPrice);

    if (i === period - 1) {
      smaTPValues.push(
        tpValues.slice(0, period).reduce((acc, value) => acc + value, 0) /
          period
      );
    } else {
      const smaTP =
        smaTPValues[i - 1] -
        tpValues[i - period] / period +
        tpValues[i] / period;
      smaTPValues.push(smaTP);
    }

    let meanDeviation = 0;
    for (let j = i; j > i - period; j--) {
      meanDeviation += Math.abs(tpValues[j] - smaTPValues[i]);
    }
    meanDeviation /= period;
    meanDeviationValues.push(meanDeviation);

    if (i >= period * 2 - 1) {
      const cci = (typicalPrice - smaTPValues[i]) / (0.015 * meanDeviation);
      cciValues.push(cci);
    } else {
      cciValues.push(NaN);
    }
  }

  return { cci: cciValues };
};
