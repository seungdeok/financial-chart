import { useEffect, useState } from "react";
import { Price } from "../../../types/Price";

export interface IArgs {
  data: Price[];
  period: number;
  kPeriod: number;
  dPeriod: number;
}

export interface IData {
  k: number[];
  d: number[];
}

function calculateRSI({ data, period }: { data: number[]; period: number }) {
  const changes = [];

  for (let i = 1; i < data.length; i++) {
    const change = data[i] - data[i - 1];
    changes.push(change);
  }

  const avgGain = calculateAverageGainLoss({
    data: changes,
    period,
    isGain: true,
  });
  const avgLoss = calculateAverageGainLoss({
    data: changes,
    period,
    isGain: false,
  });

  const rsiValues = [];

  for (let i = period; i < data.length; i++) {
    const relativeStrength = avgGain[i - period] / avgLoss[i - period];
    const rsi = 100 - 100 / (1 + relativeStrength);
    rsiValues.push(rsi);
  }

  return rsiValues;
}

function calculateAverageGainLoss({
  data: changes,
  period,
  isGain,
}: {
  data: number[];
  period: number;
  isGain: boolean;
}) {
  const avgValues = [];

  let sum = 0;
  for (let i = 0; i < period; i++) {
    if ((isGain && changes[i] > 0) || (!isGain && changes[i] < 0)) {
      sum += Math.abs(changes[i]);
    }
  }

  avgValues.push(isGain ? sum / period : sum / period);

  for (let i = period; i < changes.length; i++) {
    if ((isGain && changes[i] > 0) || (!isGain && changes[i] < 0)) {
      sum += Math.abs(changes[i]);
    }
    if (
      (isGain && changes[i - period] > 0) ||
      (!isGain && changes[i - period] < 0)
    ) {
      sum -= Math.abs(changes[i - period]);
    }
    avgValues.push(isGain ? sum / period : sum / period);
  }

  return avgValues;
}

export const getStochasticRSI = ({ data, period, kPeriod, dPeriod }: IArgs) => {
  const closePrices = data.map((item) => item.close);
  const rsiValues = calculateRSI({ data: closePrices, period });

  const kValues = [];
  const dValues = [];

  for (let i = period + kPeriod - 1; i < data.length; i++) {
    const rsiSlice = rsiValues.slice(i - kPeriod + 1, i + 1);

    const highestRSI = Math.max(...rsiSlice);
    const lowestRSI = Math.min(...rsiSlice);

    const currentRSI = rsiValues[i];
    const kValue = ((currentRSI - lowestRSI) / (highestRSI - lowestRSI)) * 100;
    kValues.push(kValue);

    if (kValues.length >= dPeriod) {
      const dValue =
        kValues.slice(-dPeriod).reduce((acc, value) => acc + value, 0) /
        dPeriod;
      dValues.push(dValue);
    }
  }

  return { k: kValues, d: dValues };
};

export const useStochasticRSI = ({ data, period, kPeriod, dPeriod }: IArgs) => {
  const [dataSource, setDataSource] = useState<IData>({
    k: [],
    d: [],
  });

  useEffect(() => {
    setDataSource(
      getStochasticRSI({
        data,
        period,
        kPeriod,
        dPeriod,
      })
    );
  }, [dPeriod, data, kPeriod, period]);

  return {
    k: dataSource.k,
    d: dataSource.d,
  };
};
