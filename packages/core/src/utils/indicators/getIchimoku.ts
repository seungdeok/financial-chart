import { ChartData } from "../ChartUtil";

// 일목균형표
export interface IchimokuArgs {
  data: ChartData[];
  basePeriod: number; // 기준선 기간
  conversionPeriod: number; // 전환선 기간
  spanBPeriod: number; // 선행스팬 B 기간
  displacement: number; // 후행스팬 이동값
}

export const getIchimoku = ({
  basePeriod,
  conversionPeriod,
  spanBPeriod,
  displacement,
  data,
}: IchimokuArgs) => {
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
