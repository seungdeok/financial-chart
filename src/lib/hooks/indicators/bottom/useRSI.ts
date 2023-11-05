import { useEffect, useState } from "react";
import { Price } from "../../../types/Price";

export interface IArgs {
  data: Price[];
  period: number; // 기간
  // 급등(70), 급락(30)
}

export interface IData {
  rsi: number[];
}

export const getRSI = ({ data, period }: IArgs) => {
  const rsiValues: number[] = [];

  for (let i = 0; i < data.length; i++) {
    if (i < period) {
      rsiValues.push(NaN);
      continue;
    }

    const priceChanges = [];
    for (let j = i; j > i - period; j--) {
      const closeToday = data[j].close;
      const closeYesterday = data[j - 1].close;
      priceChanges.push(closeToday - closeYesterday);
    }

    const gains = priceChanges.filter((change) => change > 0);
    const losses = priceChanges.filter((change) => change < 0);

    const averageGain = gains.reduce((acc, gain) => acc + gain, 0) / period;
    const averageLoss = Math.abs(
      losses.reduce((acc, loss) => acc + loss, 0) / period
    );

    const relativeStrength = averageGain / averageLoss;
    const rsi = 100 - 100 / (1 + relativeStrength);

    rsiValues.push(rsi);
  }

  return { rsi: rsiValues };
};

export const useRSI = ({ period, data }: IArgs) => {
  const [dataSource, setDataSource] = useState<IData>({
    rsi: [],
  });

  useEffect(() => {
    setDataSource(
      getRSI({
        period,
        data,
      })
    );
  }, [data, period]);

  return {
    rsi: dataSource.rsi,
  };
};
