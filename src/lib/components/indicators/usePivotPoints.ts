import { useEffect, useState } from "react";
import { Price } from "../../types/Price";

export type TypePivotType = "standard" | "fibonacci" | "camarilla";

export interface IArgs {
  data: Price[];
  pivotType: TypePivotType;
}

export interface IData {
  pivotPoints: number[]; // 피봇
  resistances1: number[]; // 저항1
  resistances2: number[]; // 저항2
  supports1: number[]; // 지지1
  supports2: number[]; // 지지1
}

const getPivotPoint = ({
  pivotType = "standard",
  price,
}: {
  pivotType: TypePivotType;
  price: Price;
}): {
  pivotPoint: number;
  resistance1: number;
  resistance2: number;
  support1: number;
  support2: number;
} => {
  const high = price.high;
  const low = price.low;
  const close = price.close;
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

const getPivotPoints = ({ data, pivotType }: IArgs) => {
  const pivotPoints: number[] = [];
  const resistances1: number[] = [];
  const resistances2: number[] = [];
  const supports1: number[] = [];
  const supports2: number[] = [];

  for (const price of data) {
    const { pivotPoint, resistance1, resistance2, support1, support2 } =
      getPivotPoint({ pivotType, price });

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

export const usePivotPoints = ({ data, pivotType }: IArgs) => {
  const [dataSource, setDataSource] = useState<IData>({
    pivotPoints: [],
    resistances1: [],
    resistances2: [],
    supports1: [],
    supports2: [],
  });

  useEffect(() => {
    setDataSource(getPivotPoints({ data, pivotType }));
  }, [data, pivotType]);

  return {
    pivotPoints: dataSource.pivotPoints,
    resistances1: dataSource.resistances1,
    resistances2: dataSource.resistances2,
    supports1: dataSource.supports1,
    supports2: dataSource.supports2,
  };
};
