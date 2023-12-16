import { ChartData } from "../ChartUtil";

export interface ADXArgs {
  data: ChartData[];
  period: number; // 기간
}

const calcSMA = ({ data, period }: { data: number[]; period: number }) => {
  const sum = data.slice(0, period).reduce((acc, value) => acc + value, 0);
  return sum / period;
};

export const calcATR = ({
  data,
  period,
}: {
  data: number[];
  period: number;
}) => {
  return data.slice(0, period).reduce((acc, value) => acc + value, 0) / period;
};

export const getADX = ({ data, period }: ADXArgs) => {
  const trValues: number[] = [];
  const dmPlusValues: number[] = [];
  const dmMinusValues: number[] = [];
  const diPlusValues: number[] = [];
  const diMinusValues: number[] = [];
  const dxValues: number[] = [];
  const adxValues: number[] = [];

  for (let i = 0; i < data.length; i++) {
    if (i < 1) {
      trValues.push(NaN);
      dmPlusValues.push(NaN);
      dmMinusValues.push(NaN);
      diPlusValues.push(NaN);
      diMinusValues.push(NaN);
      dxValues.push(NaN);
      adxValues.push(NaN);
      continue;
    }

    const high = data[i].high;
    const low = data[i].low;
    const prevHigh = data[i - 1].high;
    const prevLow = data[i - 1].low;
    const close = data[i].close;

    const tr = Math.max(
      high - low,
      Math.abs(high - close),
      Math.abs(low - close)
    );
    const dmPlus =
      high - prevHigh > prevLow - low ? Math.max(high - prevHigh, 0) : 0;
    const dmMinus =
      prevLow - low > high - prevHigh ? Math.max(prevLow - low, 0) : 0;

    trValues.push(tr);
    dmPlusValues.push(dmPlus);
    dmMinusValues.push(dmMinus);

    if (i >= period) {
      const atr = calcATR({ data: trValues.slice(i - period, i), period });
      const diPlus =
        (100 * calcSMA({ data: dmPlusValues.slice(i - period, i), period })) /
        atr;
      const diMinus =
        (100 * calcSMA({ data: dmMinusValues.slice(i - period, i), period })) /
        atr;
      const dx = (100 * Math.abs(diPlus - diMinus)) / (diPlus + diMinus);
      dxValues.push(dx);

      if (i >= period * 2 - 1) {
        const adx = calcSMA({
          data: dxValues.slice(i - period + 1, i + 1),
          period,
        });
        adxValues.push(adx);
      } else {
        adxValues.push(NaN);
      }
    }
  }

  return { adx: adxValues };
};
