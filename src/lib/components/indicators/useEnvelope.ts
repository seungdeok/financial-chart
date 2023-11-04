import { useEffect, useState } from "react";
import { Price } from "../../types/Price";

export interface IArgs {
  data: Price[];
  period: number; // 기간
  riseRate: number; // 상승률
  fallRate: number; // 하락률
}

export interface IData {
  envelopeUpper: number[];
  envelopeMiddle: number[];
  envelopeLower: number[];
}

export const getEnvelope = ({ data, period, riseRate, fallRate }: IArgs) => {
  const envelopeUpper: number[] = [];
  const envelopeLower: number[] = [];
  const envelopeMiddle: number[] = [];

  for (let i = 0; i < data.length; i++) {
    if (i < period) {
      envelopeUpper.push(NaN);
      envelopeLower.push(NaN);
      continue;
    }

    const close = data[i].close;

    const upperLine = close + (close * riseRate) / 100;
    const lowerLine = close - (close * fallRate) / 100;
    const middleLine = (upperLine + lowerLine) / 2;

    envelopeUpper.push(upperLine);
    envelopeLower.push(lowerLine);
    envelopeMiddle.push(middleLine);
  }

  return { envelopeUpper, envelopeMiddle, envelopeLower };
};

export const useEnvelope = ({ data, period, riseRate, fallRate }: IArgs) => {
  const [dataSource, setDataSource] = useState<IData>({
    envelopeUpper: [],
    envelopeMiddle: [],
    envelopeLower: [],
  });

  useEffect(() => {
    setDataSource(
      getEnvelope({
        data,
        period,
        riseRate,
        fallRate,
      })
    );
  }, [data, fallRate, period, riseRate]);

  return {
    envelopeUpper: dataSource.envelopeUpper,
    envelopeMiddle: dataSource.envelopeMiddle,
    envelopeLower: dataSource.envelopeLower,
  };
};
