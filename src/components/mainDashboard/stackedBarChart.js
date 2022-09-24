import React from "react";
// import "./styles.css";

import { Line } from "react-chartjs-2";

// const data = {
//   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//   datasets: [
//     {
//       label: "Options",
//       data: [33, 53, 85, 41, 44, 65],
//       fill: true,
//       backgroundColor: "transparent",
//       borderColor: "#FF6F1E",
//     },
//     {
//       label: "Equity",
//       data: [33, 25, 35, 51, 54, 76],
//       fill: false,
//       borderColor: "#42E6FF",
//     },
//   ],
// };

const StackedLineChart = ({ datasets }) => {
  return (
    <div className="App">
      <Line data={datasets} />
    </div>
  );
};

export default StackedLineChart;
