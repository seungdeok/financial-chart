// 단순이동평균(SMA)

export const calcSMA = ({
  data,
  period,
}: {
  data: number[];
  period: number;
}) => {
  const sum = data.slice(0, period).reduce((acc, value) => acc + value, 0);
  return sum / period;
};
