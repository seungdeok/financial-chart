import { useEffect, useState } from "react";
import { Price } from "../../../types/Price";

export interface IArgs {
  data: Price[];
  shortPeriod: number; // 단기
  longPeriod: number; // 장기
  signalPeriod: number; // 시그널
}

export interface IData {
  macdLine: number[];
  signalLine: number[];
  histogram: number[];
}

export const calculateEMA = ({
  data,
  period,
}: {
  data: number[];
  period: number;
}) => {
  const smoothingFactor = 2 / (period + 1);
  let ema = data[0];

  for (let i = 1; i < data.length; i++) {
    ema = data[i] * smoothingFactor + ema * (1 - smoothingFactor);
  }

  return ema;
};

export const getMACD = ({
  data,
  shortPeriod,
  longPeriod,
  signalPeriod,
}: IArgs) => {
  const prices = data.map((price) => price.close);
  const macdLine: number[] = [];
  const signalLine: number[] = [];
  const histogram: number[] = [];

  for (let i = 0; i < prices.length; i++) {
    if (i < longPeriod - 1) {
      macdLine.push(NaN);
      signalLine.push(NaN);
      histogram.push(NaN);
      continue;
    }

    const shortRange = prices.slice(i - shortPeriod + 1, i + 1);
    const shortEMAValue = calculateEMA({
      data: shortRange,
      period: shortPeriod,
    });

    const longRange = prices.slice(i - longPeriod + 1, i + 1);
    const longEMAValue = calculateEMA({ data: longRange, period: longPeriod });

    const macdValue = shortEMAValue - longEMAValue;
    macdLine.push(macdValue);

    if (i >= longPeriod + signalPeriod - 2) {
      const signalRange = macdLine.slice(i - signalPeriod + 1, i + 1);
      const signalValue = calculateEMA({
        data: signalRange,
        period: signalPeriod,
      });
      signalLine.push(signalValue);

      const macdHistogram = macdValue - signalValue;
      histogram.push(macdHistogram);
    }
  }

  return { macdLine, signalLine, histogram };
};

export const useMACD = ({
  data,
  shortPeriod,
  longPeriod,
  signalPeriod,
}: IArgs) => {
  const [dataSource, setDataSource] = useState<IData>({
    macdLine: [],
    signalLine: [],
    histogram: [],
  });

  useEffect(() => {
    setDataSource(
      getMACD({
        data,
        shortPeriod,
        longPeriod,
        signalPeriod,
      })
    );
  }, [data, longPeriod, shortPeriod, signalPeriod]);

  return {
    macdLine: dataSource.macdLine,
    signalLine: dataSource.signalLine,
    histogram: dataSource.histogram,
  };
};
