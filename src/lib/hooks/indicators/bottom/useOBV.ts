import { useEffect, useState } from "react";
import { Price } from "../../../types/Price";

export interface IPrice extends Price {
  volume: number;
}

export interface IArgs {
  data: IPrice[];
  signal: number; // signal 기간
}

export interface IData {
  obv: number[];
  obvSignal: number[]; // 과거 N일 obv 평균
}

export const getOBV = ({ data, signal }: IArgs) => {
  const obvValues: number[] = [0];
  const obvSignalValues: number[] = [0];

  for (let i = 1; i < data.length; i++) {
    const close = data[i].close;
    const prevClose = data[i - 1].close;
    const volume = data[i].volume;

    let obv = obvValues[i - 1];

    if (close > prevClose) {
      obv += volume;
    } else if (close < prevClose) {
      obv -= volume;
    }

    obvValues.push(obv);

    if (i >= signal - 1) {
      const obvSum = obvValues
        .slice(i - signal + 1, i + 1)
        .reduce((acc, value) => acc + value, 0);
      const obvAvg = obvSum / signal;
      obvSignalValues.push(obvAvg);
    }
  }

  return { obv: obvValues, obvSignal: obvSignalValues };
};

export const useOBV = ({ data, signal }: IArgs) => {
  const [dataSource, setDataSource] = useState<IData>({
    obv: [],
    obvSignal: [],
  });

  useEffect(() => {
    setDataSource(
      getOBV({
        data,
        signal,
      })
    );
  }, [data, signal]);

  return {
    obv: dataSource.obv,
    obvSignal: dataSource.obvSignal,
  };
};
