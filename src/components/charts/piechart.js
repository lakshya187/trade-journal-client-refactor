import React from "react";
import { Pie, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

class PieChart extends React.Component {
  render() {
    return (
      <div>
        <Doughnut
          data={this.props.data}
          options={{
            title: {
              display: true,
              text: "Average Rainfall per month",
              fontSize: 16,
            },
            legend: {
              display: true,
              position: "center",
            },
          }}
        />
      </div>
    );
  }
}
export default PieChart;
