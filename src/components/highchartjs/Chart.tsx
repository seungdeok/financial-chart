import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Chart = () => {
  const options = {
    title: {
      text: "financial-chart",
    },
    series: [
      {
        data: [1, 2, 3],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Chart;
