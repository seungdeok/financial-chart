import { ChartData } from "../ChartUtil";

export interface MovingAvgLineArgs {
  data: ChartData[];
  standard: "sma" | "wma" | "ema";
  standardValue: number;
}

export const getSMA = ({
  standardValue,
  data,
}: {
  standardValue: number;
  data: ChartData[];
}) => {
  // 단순 이동평균 (Simple Moving Average, SMA)
  const list: number[] = [];
  for (let i = 0; i < standardValue - 1; i++) {
    list.push(NaN);
  }

  for (let i = standardValue - 1; i < data.length; i++) {
    const sum = data
      .slice(i - standardValue + 1, i + 1)
      .reduce((acc, value) => acc + value.close, 0);
    list.push(sum / standardValue);
  }
  return {
    movingAvg: list,
  };
};

export const getWMA = ({
  standardValue,
  data,
}: {
  standardValue: number;
  data: ChartData[];
}) => {
  // 가중 이동평균 (Weighted Moving Average, WMA)
  const list: number[] = [];
  let denominator = 0;
  for (let i = 1; i <= standardValue; i++) {
    denominator = denominator + i;
  }

  for (let i = 0; i < standardValue - 1; i++) {
    list.push(NaN);
  }

  for (let i = standardValue - 1; i < data.length; i++) {
    const sum = data
      .slice(i - standardValue + 1, i + 1)
      .reduce((acc, value) => acc + value.close, 0);
    list.push(sum / denominator);
  }
  return {
    movingAvg: list,
  };
};

export const getEMA = ({
  standardValue,
  data,
}: {
  standardValue: number;
  data: ChartData[];
}) => {
  // 지수 이동평균 (Exponential Moving Average, EMA)
  const list: number[] = [data[0].close];
  const multiplier = 2 / (standardValue + 1);

  for (let i = 1; i < data.length; i++) {
    const ema = (data[i].close - list[i - 1]) * multiplier + list[i - 1];
    list.push(ema);
  }
  return {
    movingAvg: list,
  };
};

export const getMovingAvgLine = ({
  data,
  standard,
  standardValue,
}: MovingAvgLineArgs) => {
  if (standard === "wma") {
    return getWMA({ standardValue, data });
  } else if (standard === "ema") {
    return getEMA({ standardValue, data });
  }
  return getSMA({ standardValue, data });
};
