import { useEffect, useState } from "react";
import { Price } from "../../types/Price";

interface IPrice extends Price {
  volumn: number;
}

export interface IArgs {
  data: IPrice[];
}

export interface IData {
  obv: number[];
}

export const getOBV = ({ data }: IArgs) => {
  const obv = [0];

  for (let i = 1; i < data.length; i++) {
    const closePriceToday = data[i].close;
    const closePriceYesterday = data[i - 1].close;
    const volumeToday = data[i].volumn;

    if (closePriceToday > closePriceYesterday) {
      obv.push(obv[i - 1] + volumeToday);
    } else if (closePriceToday < closePriceYesterday) {
      obv.push(obv[i - 1] - volumeToday);
    } else {
      obv.push(obv[i - 1]);
    }
  }

  return {
    obv,
  };
};

export const useOBV = ({ data }: IArgs) => {
  const [dataSource, setDataSource] = useState<IData>({
    obv: [],
  });

  useEffect(() => {
    setDataSource(getOBV({ data }));
  }, [data]);

  return {
    obv: dataSource.obv,
  };
};
