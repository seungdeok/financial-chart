import { useEffect, useState } from "react";

// 일목균형표
export interface ICalc {
  data: {
    high: number; // 고가
    low: number; // 저가
    close: number; // 종가
  }[];
  basePeriod: number; // 기준선 기간
  conversionPeriod: number; // 전환선 기간
  spanBPeriod: number; // 선행스팬 B 기간
  displacement: number; // 후행스팬 이동값
}

export interface IData {
  conversionLine: number[];
  baseLine: number[];
  leadingSpanA: number[];
  leadingSpanB: number[];
  laggingSpan: number[];
}

export const getIchimoku = ({
  basePeriod,
  conversionPeriod,
  spanBPeriod,
  displacement,
  data,
}: ICalc) => {
  const baseLine: number[] = [];
  const conversionLine: number[] = [];
  const leadingSpanA: number[] = [];
  const leadingSpanB: number[] = [];
  const laggingSpan: number[] = [];

  for (let i = 0; i < data.length; i++) {
    const close = data[i].close;

    // 기준선
    if (i >= basePeriod - 1) {
      const sum = data
        .slice(i - basePeriod + 1, i + 1)
        .reduce((acc, val) => acc + val.high + val.low, 0);
      baseLine.push(sum / (2 * basePeriod));
    } else {
      baseLine.push(NaN);
    }

    // 전환선
    if (i >= conversionPeriod - 1) {
      const sum = data
        .slice(i - conversionPeriod + 1, i + 1)
        .reduce((acc, val) => acc + val.high + val.low, 0);
      conversionLine.push(sum / (2 * conversionPeriod));
    } else {
      conversionLine.push(NaN);
    }

    // 선행스팬 A
    leadingSpanA.push((conversionLine[i] + baseLine[i]) / 2);

    // 선행스팬 B
    if (i >= spanBPeriod - 1) {
      const sum = data
        .slice(i - spanBPeriod + 1, i + 1)
        .reduce((acc, val) => acc + val.high + val.low, 0);
      leadingSpanB.push(sum / (2 * spanBPeriod));
    } else {
      leadingSpanB.push(NaN);
    }

    // 후행스팬
    if (i >= displacement) {
      laggingSpan.push(close);
    } else {
      laggingSpan.push(NaN);
    }
  }

  return {
    conversionLine,
    baseLine,
    leadingSpanA,
    leadingSpanB,
    laggingSpan,
  };
};

export const useIchimoku = ({
  basePeriod,
  conversionPeriod,
  spanBPeriod,
  displacement,
  data,
}: ICalc) => {
  const [dataSource, setDataSource] = useState<IData>({
    conversionLine: [],
    baseLine: [],
    leadingSpanA: [],
    leadingSpanB: [],
    laggingSpan: [],
  });

  useEffect(() => {
    setDataSource(
      getIchimoku({
        basePeriod,
        conversionPeriod,
        spanBPeriod,
        displacement,
        data,
      })
    );
  }, [basePeriod, conversionPeriod, data, displacement, spanBPeriod]);

  return {
    baseLine: dataSource.baseLine,
    conversionLine: dataSource.conversionLine,
    leadingSpanA: dataSource.leadingSpanA,
    leadingSpanB: dataSource.leadingSpanB,
    laggingSpan: dataSource.laggingSpan,
  };
};
