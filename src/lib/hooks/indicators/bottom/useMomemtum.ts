import { useEffect, useState } from "react";
import { Price } from "../../../types/Price";

export interface IArgs {
  data: Price[];
  period: number;
}

export interface IData {
  momentum: number[];
}

export const getMomemtum = ({ data, period }: IArgs) => {
  const closePrices = data.map((item) => item.close);

  const momentums: number[] = [];

  for (let i = period; i < data.length; i++) {
    const currentClose = closePrices[i];
    const pastClose = closePrices[i - period];
    const momentum = currentClose - pastClose;

    momentums.push(momentum);
  }

  return { momentum: momentums };
};

export const useMomemtum = ({ data, period }: IArgs) => {
  const [dataSource, setDataSource] = useState<IData>({
    momentum: [],
  });

  useEffect(() => {
    setDataSource(
      getMomemtum({
        data,
        period,
      })
    );
  }, [data, period]);

  return {
    momentum: dataSource.momentum,
  };
};
