import { ChartData } from "../ChartUtil";

export interface RSIArgs {
  data: ChartData[];
  period: number; // 기간
  // 급등(70), 급락(30)
}

export const getRSI = ({ data, period }: RSIArgs) => {
  const rsiValues: number[] = [];

  for (let i = 0; i < data.length; i++) {
    if (i < period) {
      rsiValues.push(NaN);
      continue;
    }

    const priceChanges = [];
    for (let j = i; j > i - period; j--) {
      const closeToday = data[j].close;
      const closeYesterday = data[j - 1].close;
      priceChanges.push(closeToday - closeYesterday);
    }

    const gains = priceChanges.filter((change) => change > 0);
    const losses = priceChanges.filter((change) => change < 0);

    const averageGain = gains.reduce((acc, gain) => acc + gain, 0) / period;
    const averageLoss = Math.abs(
      losses.reduce((acc, loss) => acc + loss, 0) / period
    );

    const relativeStrength = averageGain / averageLoss;
    const rsi = 100 - 100 / (1 + relativeStrength);

    rsiValues.push(rsi);
  }

  return { rsi: rsiValues };
};
