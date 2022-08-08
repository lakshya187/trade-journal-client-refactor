import React from "react";
// import "./styles.css";

import { Line } from "react-chartjs-2";

const LineChart = ({ labels, data }) => {
  const renderChartData = () => {
    return {
      labels: labels,
      datasets: [
        {
          label: "Profit or Loss",
          data,
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          // borderColor: "rgba(75,192,192,1)",
          borderColor: "#42E6FF",
        },
      ],
    };
  };
  return (
    <div className="App">
      <Line data={renderChartData()} />
    </div>
  );
};

export default LineChart;
