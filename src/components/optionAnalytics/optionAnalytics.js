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
import { months } from "../../utils/staticData";
import DateRangeModal from "./dateRangeModal/dateRangeModal";
class OptionAnalytics extends Component {
  state = {
    overView: null,
    profitLossTypeofTradeStart: null,
    chartData: null,
    currentChart: "week",
    daysToExpire: null,
    optionType: null,
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
    this.daysToExpire();
    this.typeOfOptionData();
  }
  setCustomData = (data, c) => {
    this.setState({ chartData: data });
    this.setState({ currentChart: c });
  };
  typeOfOptionData = async () => {
    try {
      const { data } = await axios.post(
        `${server_url}/options/getProfitLossOptionType`,
        null,
        {
          headers: {
            Authorization: `Bearer ${getLocalStorage()}`,
          },
        }
      );

      this.setState({ optionType: data.data });
      console.log(this.state.optionType);
    } catch (e) {
      console.log(e);
    }
  };
  daysToExpire = async () => {
    try {
      const { data } = await axios.get(
        `${server_url}/options/getProfitLossExpire`,

        {
          headers: {
            Authorization: `Bearer ${getLocalStorage()}`,
          },
        }
      );
      this.setState({ daysToExpire: data.data });
    } catch (e) {
      console.log(e);
    }
  };
  renderTable = () => {
    if (!this.state.daysToExpire) return <CircularProgress />;
    return (
      <table className="optionLegTable " style={{ width: "80%" }}>
        <div className="marginTop marginBottom optionAnalyticsHeadingContainer">
          <div className="dashboardStatsBullet"></div>
          <div className="dashboardStatsDescription">
            Holding period between the expire date and the day trade was opened
          </div>
        </div>
        <tr>
          <th className="optionsTableHeading">Days to expire</th>
          <th className="optionsTableHeading">Profit Loss</th>
        </tr>
        {this.state.daysToExpire.map((el) => {
          return (
            <tr className="optionsTableRowContainer">
              <td>{el._id}</td>
              <td>${el.profitLoss}</td>
            </tr>
          );
        })}
      </table>
    );
  };
  renderStats = () => {
    if (!this.state.overView) return <CircularProgress />;
    return (
      <div className="optionsAnalyticsStatsContainer">
        <div className="dashboardStatsItem">
          <div className="headerMarker"></div>
          <div className="dashboardStatsDescription">Total Trades: </div>
          <div className="dashboardStatsValue">
            {this.state.overView.totalTrades}
          </div>
        </div>
        <div className="dashboardStatsItem">
          <div className="headerMarker"></div>
          <div className="dashboardStatsDescription">Daily Returns:</div>
          <div className="dashboardStatsValue ">
            ${formatCash(this.state.overView.profitLossDay)}
          </div>
        </div>
        <div className="dashboardStatsItem">
          <div className="headerMarker"></div>
          <div className="dashboardStatsDescription"> Weekly Returns:</div>
          <div className="dashboardStatsValue">
            ${formatCash(Math.abs(this.state.overView.profitLossWeek))}
          </div>
        </div>
        <div className="dashboardStatsItem">
          <div className="headerMarker"></div>
          <div className="dashboardStatsDescription"> Monthly Returns :</div>
          <div className="dashboardStatsValue">
            ${formatCash(Math.abs(this.state.overView.netPLMonth))}
          </div>
        </div>
        <div className="dashboardStatsItem">
          <div className="headerMarker"></div>
          <div className="dashboardStatsDescription">
            {" "}
            Half Yearly Returns :
          </div>
          <div className="dashboardStatsValue">
            ${formatCash(Math.abs(this.state.overView.netPLSixMonths))}
          </div>
        </div>

        {!this.state.profitLossTypeofTradeStart ? (
          "Loading"
        ) : (
          <div className="dashboardStatsItem">
            <div className="headerMarker"></div>
            <div className="dashboardStatsDescription">
              Returns on Long Trades:
            </div>
            <div className="dashboardStatsValue">
              ${formatCash(this.state.profitLossTypeofTradeStart[0].profitLoss)}
            </div>
          </div>
        )}
        {!this.state.profitLossTypeofTradeStart ? (
          "Loading"
        ) : (
          <div className="dashboardStatsItem">
            <div className="headerMarker"></div>
            <div className="dashboardStatsDescription">
              Returns on Short Trades:
            </div>
            <div className="dashboardStatsValue">
              ${formatCash(this.state.profitLossTypeofTradeStart[1].profitLoss)}{" "}
            </div>
          </div>
        )}
        {!this.state.optionType ? (
          "Loading"
        ) : (
          <div className="dashboardStatsItem">
            <div className="headerMarker"></div>
            <div className="dashboardStatsDescription">Returns on Call:</div>
            <div className="dashboardStatsValue">
              ${formatCash(this.state.optionType[0].profitLoss)}{" "}
            </div>
          </div>
        )}
        {!this.state.optionType ? (
          "Loading"
        ) : (
          <div className="dashboardStatsItem">
            <div className="headerMarker"></div>
            <div className="dashboardStatsDescription">Returns on Put:</div>
            <div className="dashboardStatsValue">
              ${formatCash(this.state.optionType[1].profitLoss)}{" "}
            </div>
          </div>
        )}
      </div>
    );
  };
  renderFields = () => {
    return (
      <div>
        <AnalyticsField
          url={`${server_url}/options/getProfitLossPremiumStrat`}
          label={"Returns based on premium"}
        />
        <hr className="divider" />
      </div>
    );
  };

  getMonthData = async () => {
    this.setState({ currentChart: "month" });

    try {
      const { data } = await axios.get(
        `${server_url}/options/getDataDayOfMonth`,
        {
          headers: {
            Authorization: `Bearer ${getLocalStorage()}`,
          },
        }
      );
      this.setState({ chartData: data.modData });
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
      this.setState({ currentChart: "week" });
      // this.renderChart(res.data.modData);
    } catch (e) {
      console.log(e);
    }
  };
  getMonthlyData = async () => {
    try {
      const { data } = await axios.post(
        `${server_url}/options/getDataMonthly`,
        null,
        {
          headers: {
            Authorization: `Bearer ${getLocalStorage()}`,
          },
        }
      );

      this.setState({ currentChart: "monthly" });
      this.setState({ chartData: data.modData });
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

      return <LineChart labels={labels} data={data} />;
    }
    if (this.state.currentChart === "month") {
      const labels = this.state.chartData.map((el) => {
        return (el.day = el._id.day);
      });
      const data = this.state.chartData.map((el) => el.netProfitLoss);

      return <LineChart labels={labels} data={data} />;
    }
    if (this.state.currentChart === "monthly") {
      const labels = this.state.chartData.map((el) => {
        return (el.month = months[el._id - 1]);
      });
      const data = this.state.chartData.map((el) => el.netProfitLoss);

      return <LineChart labels={labels} data={data} />;
    }
    if (this.state.currentChart === "custom") {
      const labels = this.state.chartData.map((el) => {
        return (el.date = new Date(el._id).toISOString().substring(0, 10));
      });
      const data = this.state.chartData.map((el) => el.netProfitLoss);

      return <LineChart labels={labels} data={data} />;
    }
  };
  render() {
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
                <button
                  className="btn secondryBtn"
                  onClick={(e) => this.getMonthlyData(e)}
                >
                  Month wise
                </button>
                <DateRangeModal setCustomData={this.setCustomData} />
              </div>
              <div className="renderChartContainer">
                {!this.state.chartData ? "Loading" : this.handleRenderChart()}
              </div>
              <hr className="divider " />
            </div>

            <div>{this.renderFields()}</div>
            <div>{this.renderTable()}</div>
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
