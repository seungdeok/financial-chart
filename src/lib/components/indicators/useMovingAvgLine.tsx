import { useEffect, useState } from "react";

export interface Args {
  data: number[];
  standard: "sma" | "wma" | "ema";
  standardValue: number;
}

export interface ICalc {
  standardValue: number;
  data: number[];
}

export const getSMA = ({ standardValue, data }: ICalc) => {
  // 단순 이동평균 (Simple Moving Average, SMA)
  const list = [];
  for (let i = 0; i < standardValue - 1; i++) {
    list.push(0);
  }

  for (let i = standardValue - 1; i < data.length; i++) {
    const sum = data
      .slice(i - standardValue + 1, i + 1)
      .reduce((acc, value) => acc + value, 0);
    list.push(sum / standardValue);
  }
  return list;
};

export const getWMA = ({ standardValue, data }: ICalc) => {
  // 가중 이동평균 (Weighted Moving Average, WMA)
  const list = [];
  let denominator = 0;
  for (let i = 1; i <= standardValue; i++) {
    denominator = denominator + i;
  }

  for (let i = 0; i < standardValue - 1; i++) {
    list.push(0);
  }

  for (let i = standardValue - 1; i < data.length; i++) {
    const sum = data
      .slice(i - standardValue + 1, i + 1)
      .reduce((acc, value) => acc + value, 0);
    list.push(sum / denominator);
  }
  return list;
};

export const getEMA = ({ standardValue, data }: ICalc) => {
  // 지수 이동평균 (Exponential Moving Average, EMA)
  const list = [data[0]];
  const multiplier = 2 / (standardValue + 1);

  for (let i = 1; i < data.length; i++) {
    const ema = (data[i] - list[i - 1]) * multiplier + list[i - 1];
    list.push(ema);
  }
  return list;
};

export const useMovingAvgLine = ({
  data,
  standard = "sma",
  standardValue,
}: Args) => {
  const [dataSource, setDataSource] = useState<number[]>([]);

  useEffect(() => {
    if (standard === "sma") {
      setDataSource(getSMA({ standardValue, data }));
    } else if (standard === "wma") {
      setDataSource(getWMA({ standardValue, data }));
    } else if (standard === "ema") {
      setDataSource(getEMA({ standardValue, data }));
    }
  }, [data, standard, standardValue]);

  return { dataSource };
};
