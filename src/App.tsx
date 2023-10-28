import Chart from "./components/highchartjs/Chart";
import "./App.css";
import ToolBar from "./components/highchartjs/ToolBar";

function App() {
  return (
    <>
      <div className="container">
        <ToolBar />
        <Chart />
      </div>
    </>
  );
}

export default App;
