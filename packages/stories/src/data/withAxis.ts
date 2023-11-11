export type PriceData = (number | string)[];

export const withAxis = (data: PriceData[]) => {
  const headerRow = ["Date", "Open", "Close", "High", "Low", "Volume"];

  const result: PriceData[] = [headerRow];

  for (const price of data) {
    result.push(price.map(Number));
  }

  return result;
};
