import { ChartData } from "../ChartUtil";

export type TypePivotType = "standard" | "fibonacci" | "camarilla";

export interface PivotPointArgs {
  data: ChartData[];
  pivotType: TypePivotType;
}

const getPivotPoint = ({
  pivotType = "standard",
  data,
}: {
  pivotType: TypePivotType;
  data: ChartData;
}): {
  pivotPoint: number;
  resistance1: number;
  resistance2: number;
  support1: number;
  support2: number;
} => {
  const high = data.high;
  const low = data.low;
  const close = data.close;
  if (pivotType === "fibonacci") {
    const pivotPoint = (high + low + close) / 3;
    const resistance1 = pivotPoint + (high - low) * 0.382;
    const resistance2 = pivotPoint + (high - low) * 0.618;
    const support1 = pivotPoint - (high - low) * 0.382;
    const support2 = pivotPoint - (high - low) * 0.618;

    return {
      pivotPoint,
      resistance1,
      resistance2,
      support1,
      support2,
    };
  } else if (pivotType === "camarilla") {
    const pivotPoint = close;
    const resistance1 = close + ((high - low) * 1.1) / 12;
    const resistance2 = close + ((high - low) * 1.1) / 6;
    const support1 = close - ((high - low) * 1.1) / 12;
    const support2 = close - ((high - low) * 1.1) / 6;

    return {
      pivotPoint,
      resistance1,
      resistance2,
      support1,
      support2,
    };
  }

  const pivotPoint = (high + low + close) / 3;
  const resistance1 = 2 * pivotPoint - low;
  const resistance2 = pivotPoint + (high - low);
  const support1 = 2 * pivotPoint - high;
  const support2 = pivotPoint - (high - low);

  return {
    pivotPoint,
    resistance1,
    resistance2,
    support1,
    support2,
  };
};

export const getPivotPoints = ({ data, pivotType }: PivotPointArgs) => {
  const pivotPoints: number[] = [];
  const resistances1: number[] = [];
  const resistances2: number[] = [];
  const supports1: number[] = [];
  const supports2: number[] = [];

  for (const price of data) {
    const { pivotPoint, resistance1, resistance2, support1, support2 } =
      getPivotPoint({ pivotType, data: price });

    pivotPoints.push(pivotPoint);
    resistances1.push(resistance1);
    resistances2.push(resistance2);
    supports1.push(support1);
    supports2.push(support2);
  }

  return {
    pivotPoints,
    resistances1,
    resistances2,
    supports1,
    supports2,
  };
};
