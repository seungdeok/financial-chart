import { useEffect, useState } from "react";
import { Price } from "../../../types/Price";

export interface IPrice extends Price {
  volume: number;
}

export interface IArgs {
  data: IPrice[];
  shortPeriod: number;
  longPeriod: number;
}

export interface IData {
  volumeOSC: number[];
}

export const calculateSMA = ({
  data,
  period,
}: {
  data: number[];
  period: number;
}) => {
  const smaValues = [];

  for (let i = period - 1; i < data.length; i++) {
    const slice = data.slice(i - period + 1, i + 1);
    const sma = slice.reduce((acc, value) => acc + value, 0) / period;
    smaValues.push(sma);
  }

  return smaValues;
};

export const getVolumeOSC = ({ data, shortPeriod, longPeriod }: IArgs) => {
  const volumes = data.map((item) => item.volume);

  const shortMA = calculateSMA({ data: volumes, period: shortPeriod });
  const longMA = calculateSMA({ data: volumes, period: longPeriod });

  const volumeOSC = shortMA.map((shortAvg, index) => {
    const longAvg = longMA[index];
    return (shortAvg / longAvg - 1) * 100;
  });

  return { volumeOSC };
};

export const useVolumeOSC = ({ data, shortPeriod, longPeriod }: IArgs) => {
  const [dataSource, setDataSource] = useState<IData>({
    volumeOSC: [],
  });

  useEffect(() => {
    setDataSource(
      getVolumeOSC({
        data,
        shortPeriod,
        longPeriod,
      })
    );
  }, [data, shortPeriod, longPeriod]);

  return {
    volumeOSC: dataSource.volumeOSC,
  };
};
