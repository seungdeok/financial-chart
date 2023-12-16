import { ChartData } from "../ChartUtil";

export interface OBVArgs {
  data: ChartData[];
}

export const getOBV = ({ data }: OBVArgs) => {
  const obv = [0];

  for (let i = 1; i < data.length; i++) {
    const closePriceToday = data[i].close;
    const closePriceYesterday = data[i - 1].close;
    const volumeToday = data[i].volume;

    if (closePriceToday > closePriceYesterday) {
      obv.push(obv[i - 1] + volumeToday);
    } else if (closePriceToday < closePriceYesterday) {
      obv.push(obv[i - 1] - volumeToday);
    } else {
      obv.push(obv[i - 1]);
    }
  }

  return {
    obv,
  };
};
