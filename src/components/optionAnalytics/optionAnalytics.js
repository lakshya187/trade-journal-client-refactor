import React, { Component } from "react";
// import  from 'react';
import "./optionAnalytics.css";
import axios from "axios";
import { server_url } from "../../config";
import { getLocalStorage } from "../../helperFunctions/localstorage";
import Sidebar from "../sidebar/sidebar";
import { CircularProgress } from "@mui/material";
class OptionAnalytics extends Component {
  state = {
    overView: null,
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
    } catch (e) {
      console.log(e);
    }
  };
  componentDidMount() {
    this.fetchData();
  }
  renderStats = () => {
    if (!this.state.overView) return <CircularProgress />;
    return (
      <div className="dashboardStatisticsContainer">
        <div className="dashboardStatsItem">
          <div className="dashboardStatsBullet"></div>
          <div className="dashboardStatsDescription">Total Trades: </div>
          <div className="dashboardStatsValue">
            {this.props.stats.totalTrades}
          </div>
        </div>
        <div className="dashboardStatsItem">
          <div className="dashboardStatsBullet"></div>
          <div className="dashboardStatsDescription">Total Profit: </div>
          <div className="dashboardStatsValue colorGreen">
            {" "}
            ${this.formatCash(this.props.stats.totalProfit)}
          </div>
        </div>
        <div className="dashboardStatsItem">
          <div className="dashboardStatsBullet"></div>
          <div className="dashboardStatsDescription">Total Loss: </div>
          <div className="dashboardStatsValue colorRed">
            ${this.formatCash(Math.abs(this.props.stats.totolLoss))}
          </div>
        </div>
        <div className="dashboardStatsItem">
          <div className="dashboardStatsBullet"></div>
          <div className="dashboardStatsDescription">Total Invested:</div>
          <div className="dashboardStatsValue">
            ${this.formatCash(this.props.stats.totalAmountInvested)}
          </div>
        </div>
        <div className="dashboardStatsItem">
          <div className="dashboardStatsBullet"></div>
          <div className="dashboardStatsDescription">Profit Trades: </div>
          <div className="dashboardStatsValue">
            {this.props.stats.profitTrades}
          </div>
        </div>
        <div className="dashboardStatsItem">
          <div className="dashboardStatsBullet"></div>
          <div className="dashboardStatsDescription">Loss Trades: </div>
          <div className="dashboardStatsValue">
            {this.props.stats.lossTrades}
          </div>
        </div>
      </div>
    );
  };
  render() {
    console.log(this.state.overView);
    return (
      <div className="optionAnalytics">
        <div className="optionAnalyticsContainer">
          <div className="optionAnalyticsLeft">
            <Sidebar />
          </div>
          <div className="optionAnalyticsRight">
            <div className="optionAnalyticsHeading heading">Analytics</div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}
export default OptionAnalytics;
