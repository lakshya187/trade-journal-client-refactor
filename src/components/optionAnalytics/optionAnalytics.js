import React, { Component } from "react";
// import  from 'react';
import "./optionAnalytics.css";
import axios from "axios";
import { server_url } from "../../config";
import { getLocalStorage } from "../../helperFunctions/localstorage";
import Sidebar from "../sidebar/sidebar";
import { CircularProgress } from "@mui/material";
import formatCash from "../../utils/formatCash";
import LineChart from "./lineChart/lineChart";
import AnalyticsField from "./fields/field";
import { weekDays } from "../../utils/staticData";
class OptionAnalytics extends Component {
  state = {
    overView: null,
    profitLossTypeofTradeStart: null,
    chartData: null,
    currentChart: "week",
  };
  fetchData = async () => {
    try {
      const { data } = await axios.post(
        `${server_url}/options/getAnalytics`,
        null,
        {
          headers: {
            Authorization: `Bearer ${getLocalStorage()}`,
          },
        }
      );
      // console.log(data.data[0].overView[0]);
      this.setState({ overView: data.data[0].overView[0] });
      const plStart = await axios.get(
        `${server_url}/options/getProfitLossTypeOfTradeStrat`,
        {
          headers: {
            Authorization: `Bearer ${getLocalStorage()}`,
          },
        }
      );
      this.setState({
        profitLossTypeofTradeStart: plStart.data.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
  componentDidMount() {
    this.fetchData();
    this.getWeeklyData();
  }
  renderStats = () => {
    if (!this.state.overView) return <CircularProgress />;
    return (
      <div className="dashboardStatisticsContainer">
        <div className="dashboardStatsItem">
          <div className="dashboardStatsBullet"></div>
          <div className="dashboardStatsDescription">Total Trades: </div>
          <div className="dashboardStatsValue">
            {this.state.overView.totalTrades}
          </div>
        </div>
        <div className="dashboardStatsItem">
          <div className="dashboardStatsBullet"></div>
          <div className="dashboardStatsDescription">
            Net Profit or Loss Daily:{" "}
          </div>
          <div className="dashboardStatsValue ">
            ${formatCash(this.state.overView.profitLossDay)}
          </div>
        </div>
        <div className="dashboardStatsItem">
          <div className="dashboardStatsBullet"></div>
          <div className="dashboardStatsDescription">
            {" "}
            Net Profit or Loss Weekly :{" "}
          </div>
          <div className="dashboardStatsValue">
            ${formatCash(Math.abs(this.state.overView.profitLossWeek))}
          </div>
        </div>
        <div className="dashboardStatsItem">
          <div className="dashboardStatsBullet"></div>
          <div className="dashboardStatsDescription">
            {" "}
            Net Profit or Loss Monthly:
          </div>
          <div className="dashboardStatsValue">
            ${formatCash(Math.abs(this.state.overView.netPLMonth))}
          </div>
        </div>
        <div className="dashboardStatsItem">
          <div className="dashboardStatsBullet"></div>
          <div className="dashboardStatsDescription">
            {" "}
            Net Profit or Loss Half Yearly:{" "}
          </div>
          <div className="dashboardStatsValue">
            ${formatCash(Math.abs(this.state.overView.netPLSixMonths))}
          </div>
        </div>
      </div>
    );
  };
  renderFields = () => {
    return (
      <AnalyticsField label={"Net Profit Loss based on entered Premium"} />
    );
  };
  renderStaticData = () => {
    if (!this.state.profitLossTypeofTradeStart)
      return <div>couldnt fetch data</div>;
    return (
      <div>
        <div className="dashboardStatsItem">
          <div className="dashboardStatsBullet"></div>
          <div className="dashboardStatsDescription">
            {" "}
            Net Profit or Loss of Long Trades:
          </div>
          <div className="dashboardStatsValue">
            ${formatCash(this.state.profitLossTypeofTradeStart[0].profitLoss)}
          </div>
        </div>
        <div className="dashboardStatsItem">
          <div className="dashboardStatsBullet"></div>
          <div className="dashboardStatsDescription">
            {" "}
            Net Profit or Loss of Short Trades:
          </div>
          <div className="dashboardStatsValue">
            ${formatCash(this.state.profitLossTypeofTradeStart[1].profitLoss)}
          </div>
        </div>
      </div>
    );
  };
  getMonthData = async () => {
    try {
      const { data } = await axios.get(
        `${server_url}/options/getDataDayOfMonth`,
        {
          headers: {
            Authorization: `Bearer ${getLocalStorage()}`,
          },
        }
      );
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  getWeeklyData = async () => {
    try {
      const res = await axios.post(
        `${server_url}/options/getDataWeekly`,
        null,
        {
          headers: {
            Authorization: `Bearer ${getLocalStorage()}`,
          },
        }
      );
      // console.log(res.data.modData);
      this.setState({ chartData: res.data.modData });
      // this.renderChart(res.data.modData);
    } catch (e) {
      console.log(e);
    }
  };

  handleRenderChart = () => {
    if (this.state.currentChart === "week") {
      const labels = this.state.chartData.map((el) => {
        return (el.day = weekDays[el._id - 1]);
      });
      const data = this.state.chartData.map((el) => el.netProfitLoss);
      console.log(data);
      console.log(labels);
      return <LineChart labels={labels} data={data} />;
    }
  };
  render() {
    console.log(this.state.chartData);
    return (
      <div className="optionAnalytics">
        <div className="optionAnalyticsContainer">
          <div className="optionAnalyticsLeft">
            <Sidebar />
          </div>
          <div className="optionAnalyticsCenter">
            <div className="optionAnalyticsHeading heading">Analytics</div>
            <div>
              <div className="chartButtonContainer">
                <button
                  className="btn secondryBtn"
                  onClick={(e) => this.getWeeklyData(e)}
                >
                  Weekly
                </button>
                <button
                  className="btn secondryBtn"
                  onClick={(e) => this.getMonthData(e)}
                >
                  Monthly
                </button>
                <button className="btn secondryBtn">Month wise</button>
                <button
                  className="btn secondryBtn"
                  // sonClick={(e) => this.getWeeklyData(e)}
                >
                  Custom
                </button>
              </div>
              <div className="renderChartContainer">
                {!this.state.chartData ? "Loading" : this.handleRenderChart()}
              </div>
            </div>
            <div>{this.renderStaticData()}</div>

            <div>{this.renderFields()}</div>
          </div>
          <div className="optionAnalyticsRight">
            <div className="heading">Statistics</div>
            <div>{this.renderStats()}</div>
          </div>
        </div>
      </div>
    );
  }
}
export default OptionAnalytics;
