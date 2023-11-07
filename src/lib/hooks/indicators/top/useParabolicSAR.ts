import { useEffect, useState } from "react";
import { Price } from "../../../types/Price";

export interface IArgs {
  data: Price[];
  acceleration: number; // 가속변수
  max: number; // 최대값
}

export interface IData {
  sar: number[];
}

export const getParabolicSAR = ({ data, acceleration, max }: IArgs) => {
  const sarValues = [];
  let trend: "uptrend" | "downtrend" = "uptrend";
  let accelerationFactor = acceleration;
  let extremePoint = data[0].high;
  let sar = data[0].low;

  for (let i = 1; i < data.length; i++) {
    const prevSAR = sar;
    const prevExtremePoint = extremePoint;
    const high = data[i].high;
    const low = data[i].low;

    if (trend === "uptrend") {
      if (high > prevExtremePoint) {
        extremePoint = high;
        accelerationFactor = Math.min(accelerationFactor + acceleration, max);
      }

      sar = prevSAR + accelerationFactor * (extremePoint - prevSAR);
      if (low < sar) {
        trend = "downtrend";
        sar = prevExtremePoint;
        extremePoint = low;
        accelerationFactor = acceleration;
      }
    } else {
      if (low < prevExtremePoint) {
        extremePoint = low;
        accelerationFactor = Math.min(accelerationFactor + acceleration, max);
      }

      sar = prevSAR - accelerationFactor * (prevSAR - extremePoint);
      if (high > sar) {
        trend = "uptrend";
        sar = prevExtremePoint;
        extremePoint = high;
        accelerationFactor = acceleration;
      }
    }

    sarValues.push(sar);
  }

  return {
    sar: sarValues,
  };
};

export const useParabolicSAR = ({ acceleration, max, data }: IArgs) => {
  const [dataSource, setDataSource] = useState<IData>({
    sar: [],
  });

  useEffect(() => {
    setDataSource(
      getParabolicSAR({
        acceleration,
        max,
        data,
      })
    );
  }, [acceleration, data, max]);

  return {
    sar: dataSource.sar,
  };
};
