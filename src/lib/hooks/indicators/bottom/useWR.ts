// Williams %R

import { useEffect, useState } from "react";
import { Price } from "../../../types/Price";

export interface IArgs {
  data: Price[];
  period: number;
}

export interface IData {
  WR: number[];
}

export const getWR = ({ data, period }: IArgs) => {
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

export const useDMI = ({ data, period }: IArgs) => {
  const [dataSource, setDataSource] = useState<IData>({
    WR: [],
  });

  useEffect(() => {
    setDataSource(
      getWR({
        data,
        period,
      })
    );
  }, [data, period]);

  return {
    WR: dataSource.WR,
  };
};
