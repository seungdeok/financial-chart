import { ChartData } from "../ChartUtil";

export interface EnvelopeArgs {
  data: ChartData[];
  period: number; // 기간
  riseRate: number; // 상승률
  fallRate: number; // 하락률
}

export const getEnvelope = ({
  data,
  period,
  riseRate,
  fallRate,
}: EnvelopeArgs) => {
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
