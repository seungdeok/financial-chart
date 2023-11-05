import { useEffect, useState } from "react";
import { Price } from "../../../types/Price";

export interface IPrice extends Price {
  volume: number;
}

export interface IArgs {
  data: IPrice[];
  period: number;
  // 급등(80), 급락(20)
}

export interface IData {
  mfi: number[];
}

export const calculateSMA = ({
  data,
  period,
}: {
  data: number[];
  period: number;
}) => {
  const sum = data.slice(0, period).reduce((acc, value) => acc + value, 0);
  return sum / period;
};

export const getMFI = ({ data, period }: IArgs) => {
  const typicalPrices: number[] = [];
  const rawMoneyFlow: number[] = [];
  const positiveMoneyFlow: number[] = [];
  const negativeMoneyFlow: number[] = [];
  const moneyFlowRatio: number[] = [];
  const mfiValues: number[] = [];

  for (let i = 0; i < data.length; i++) {
    if (i < 1) {
      typicalPrices.push(NaN);
      rawMoneyFlow.push(NaN);
      positiveMoneyFlow.push(NaN);
      negativeMoneyFlow.push(NaN);
      moneyFlowRatio.push(NaN);
      mfiValues.push(NaN);
      continue;
    }

    const high = data[i].high;
    const low = data[i].low;
    const close = data[i].close;
    const volume = data[i].volume;

    const typicalPrice = (high + low + close) / 3;
    const prevTypicalPrice =
      (data[i - 1].high + data[i - 1].low + data[i - 1].close) / 3;

    const rawMoney = typicalPrice * volume;
    const moneyFlow = typicalPrice > prevTypicalPrice ? rawMoney : 0;
    const negativeMoney = typicalPrice < prevTypicalPrice ? rawMoney : 0;

    typicalPrices.push(typicalPrice);
    rawMoneyFlow.push(rawMoney);
    positiveMoneyFlow.push(moneyFlow);
    negativeMoneyFlow.push(negativeMoney);

    if (i >= period) {
      const sumPositiveMoneyFlow = positiveMoneyFlow
        .slice(i - period, i)
        .reduce((acc, value) => acc + value, 0);
      const sumNegativeMoneyFlow = negativeMoneyFlow
        .slice(i - period, i)
        .reduce((acc, value) => acc + value, 0);

      const moneyFlowRatioValue =
        sumNegativeMoneyFlow === 0
          ? 100
          : 100 - 100 / (1 + sumPositiveMoneyFlow / sumNegativeMoneyFlow);
      moneyFlowRatio.push(moneyFlowRatioValue);

      if (i >= period * 2 - 1) {
        const mfi =
          100 -
          100 /
            (1 +
              calculateSMA({
                data: moneyFlowRatio.slice(i - period + 1, i + 1),
                period,
              }));
        mfiValues.push(mfi);
      } else {
        mfiValues.push(NaN);
      }
    }
  }

  return { mfi: mfiValues };
};

export const useMFI = ({ data, period }: IArgs) => {
  const [dataSource, setDataSource] = useState<IData>({
    mfi: [],
  });

  useEffect(() => {
    setDataSource(
      getMFI({
        data,
        period,
      })
    );
  }, [data, period]);

  return {
    mfi: dataSource.mfi,
  };
};
