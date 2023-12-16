import { ChartData } from "../ChartUtil";

export interface VolumeOSCArgs {
  data: ChartData[];
  shortPeriod: number;
  longPeriod: number;
}

const calcSMA = ({ data, period }: { data: number[]; period: number }) => {
  const smaValues = [];

  for (let i = period - 1; i < data.length; i++) {
    const slice = data.slice(i - period + 1, i + 1);
    const sma = slice.reduce((acc, value) => acc + value, 0) / period;
    smaValues.push(sma);
  }

  return smaValues;
};

export const getVolumeOSC = ({
  data,
  shortPeriod,
  longPeriod,
}: VolumeOSCArgs) => {
  const volumes = data.map((item) => item.volume);

  const shortMA = calcSMA({ data: volumes, period: shortPeriod });
  const longMA = calcSMA({ data: volumes, period: longPeriod });

  const volumeOSC = shortMA.map((shortAvg, index) => {
    const longAvg = longMA[index];
    return (shortAvg / longAvg - 1) * 100;
  });

  return { volumeOSC };
};
