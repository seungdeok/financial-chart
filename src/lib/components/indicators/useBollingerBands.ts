import { useEffect, useState } from "react";
import { Price } from "../../types/Price";

export interface IArgs {
  data: Price[];
  period: number; // 기간
  deviation: number; // 승수
}

export interface IData {
  upperBands: number[];
  middleBands: number[];
  lowerBands: number[];
}

export const getBollingerBands = ({ data, period, deviation }: IArgs) => {
  const upperBands: number[] = [];
  const middleBands: number[] = [];
  const lowerBands: number[] = [];

  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      upperBands.push(NaN);
      middleBands.push(NaN);
      lowerBands.push(NaN);
    } else {
      const prices = data.slice(i - period + 1, i + 1);
      const average =
        prices.reduce((sum, price) => sum + price.close, 0) / period;
      const squaredDifferences = prices.map((price) =>
        Math.pow(price.close - average, 2)
      );
      const variance =
        squaredDifferences.reduce((sum, squaredDiff) => sum + squaredDiff, 0) /
        period;
      const standardDev = Math.sqrt(variance);

      upperBands.push(average + deviation * standardDev);
      middleBands.push(average);
      lowerBands.push(average - deviation * standardDev);
    }
  }

  return {
    upperBands,
    middleBands,
    lowerBands,
  };
};

export const useBollingerBands = ({ period, deviation, data }: IArgs) => {
  const [dataSource, setDataSource] = useState<IData>({
    upperBands: [],
    middleBands: [],
    lowerBands: [],
  });

  useEffect(() => {
    setDataSource(
      getBollingerBands({
        period,
        deviation,
        data,
      })
    );
  }, [data, deviation, period]);

  return {
    upperBands: dataSource.upperBands,
    middleBands: dataSource.middleBands,
    lowerBands: dataSource.lowerBands,
  };
};
