import { ChartData } from "../ChartUtil";

export interface MomemtumArgs {
  data: ChartData[];
  period: number;
}

export const getMomemtum = ({ data, period }: MomemtumArgs) => {
  const closePrices = data.map((item) => item.close);

  const momentums: number[] = [];

  for (let i = period; i < data.length; i++) {
    const currentClose = closePrices[i];
    const pastClose = closePrices[i - period];
    const momentum = currentClose - pastClose;

    momentums.push(momentum);
  }

  return { momentum: momentums };
};
