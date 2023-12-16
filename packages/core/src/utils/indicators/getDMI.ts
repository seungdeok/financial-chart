import { ChartData } from "../ChartUtil";

export interface DMIArgs {
  data: ChartData[];
  period: number;
}

const calcSMA = ({ data, period }: { data: number[]; period: number }) => {
  const sum = data.slice(0, period).reduce((acc, value) => acc + value, 0);
  return sum / period;
};

export const getDMI = ({ data, period }: DMIArgs) => {
  const highPrices = data.map((item) => item.high);
  const lowPrices = data.map((item) => item.low);
  const closePrices = data.map((item) => item.close);

  const positiveDMs: number[] = [];
  const negativeDMs: number[] = [];
  const trueRanges: number[] = [];
  const plusDIs: number[] = [];
  const minusDIs: number[] = [];
  const DXs: number[] = [];
  const ADXs: number[] = [];

  for (let i = 1; i < data.length; i++) {
    const high1 = highPrices[i - 1];
    const low1 = lowPrices[i - 1];
    const high2 = highPrices[i];
    const low2 = lowPrices[i];

    const highDiff = high2 - high1;
    const lowDiff = low1 - low2;

    const positiveDM = highDiff > lowDiff && highDiff > 0 ? highDiff : 0;
    const negativeDM = lowDiff > highDiff && lowDiff > 0 ? lowDiff : 0;

    positiveDMs.push(positiveDM);
    negativeDMs.push(negativeDM);

    const trueRange = Math.max(
      high2 - low2,
      Math.abs(high2 - closePrices[i - 1]),
      Math.abs(low2 - closePrices[i - 1])
    );
    trueRanges.push(trueRange);

    if (i >= period) {
      const sumTrueRange = trueRanges
        .slice(i - period, i)
        .reduce((acc, value) => acc + value, 0);
      const sumPositiveDM = positiveDMs
        .slice(i - period, i)
        .reduce((acc, value) => acc + value, 0);
      const sumNegativeDM = negativeDMs
        .slice(i - period, i)
        .reduce((acc, value) => acc + value, 0);

      const plusDI = (sumPositiveDM / sumTrueRange) * 100;
      const minusDI = (sumNegativeDM / sumTrueRange) * 100;

      plusDIs.push(plusDI);
      minusDIs.push(minusDI);

      if (i >= period * 2 - 1) {
        const DX = Math.abs((plusDI - minusDI) / (plusDI + minusDI)) * 100;
        DXs.push(DX);
      }

      if (i >= period * 2) {
        const ADX = calcSMA({
          data: DXs.slice(i - period + 1, i + 1),
          period,
        });
        ADXs.push(ADX);
      }
    }
  }

  return { plusDI: plusDIs, minusDI: minusDIs, ADX: ADXs };
};
