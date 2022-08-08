/* jshint ignore:start */
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { LinearProgress } from "@mui/material";

import TradeItem from "./tradeItem/tradeItem";
import PieChart from "../charts/piechart";
import AddManually from "./../../assets/icons/AddNewTrade/addManually.svg";
import ImportBroker from "./../../assets/icons/AddNewTrade/importBroker.svg";
import ImportExcel from "./../../assets/icons/AddNewTrade/importExcel.svg";
import Sidebar from "../sidebar/sidebar";
import { getTrades } from "../../actions";
import "./main-dashboard.css";
import { getStats } from "../../actions";
import { CircularProgress } from "@mui/material";

class MainDashboard extends React.Component {
  state = {};
  componentDidMount() {
    this.props.getTrades();
    // this.getStats();
    this.props.getStats();
  }
  formatCash = (n) => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
  };

  renderTradeCards = () => {
    return this.props.trades.map((el) => {
      return <TradeItem trade={el} key={el._id} />;
    });
  };
  renderStats = () => {
    if (!this.props.stats) {
      return <CircularProgress />;
    }

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
  renderChart = () => {
    if (!this.props.stats) {
      return <CircularProgress className="insightChart" />;
    }
    const profit = this.props.stats.totalProfit;
    const loss = this.props.stats.totolLoss;
    const profitLoss = [profit, loss];
    const chart = {
      labels: ["Profit", "Loss"],
      datasets: [
        {
          label: "Profit and loss",
          backgroundColor: ["#00DF8D", "#FA447F"],
          // hoverBackgroundColor: ["#0A0A0A", "#E2E2E2"],
          data: profitLoss,
          borderWidth: 0,
          cutout: 80,
        },
      ],
    };

    return <PieChart data={chart} />;
  };
  renderGreeting = () => {
    if (!this.props.user) {
      return `Hello human, couldnt fetch your name`;
    }
    const str = `Hello, ${this.props.user.name}`;
    return str;
  };
  render() {
    if (!this.props.trades) {
      return <LinearProgress color="inherit" />;
    }
    console.log(this.props.trades);
    return (
      <div className="dashboard">
        <div className="dashboardContainer">
          <div className="dashboardLeft">
            <Sidebar />
          </div>
          <div className="dashboardCenter">
            <div className="dashboardMainContainer">
              <h1 className="dashboardGreeting heading">
                {this.renderGreeting()}
              </h1>
              <div className="dashboardFiltersContainer">
                <input
                  className="input"
                  type="text"
                  placeholder="Search for trades"
                />
                <button className="btn secondryBtn marginleft">Sort by</button>
                {/* <Link className="btn primaryBtn marginleft" to="/add-new-trade">
                  Add new Trade +
                </Link> */}
              </div>
              <div className="dashboardInsight" style={{ padding: "30px 0px" }}>
                {this.renderChart()}
              </div>

              <div
                className="dashboardTradesEquityContainer"
                style={{ marginTop: "50px" }}
              >
                <h1 className="heading">Trades</h1>
                <div className="optionsTableContainer">
                  <table className="optionsTable">
                    <thead>
                      <tr className="optionsTableRowContainer">
                        <th className="optionsTableHeading">Type of Trade</th>
                        <th className="optionsTableHeading">Stock Ticker</th>
                        <th className="optionsTableHeading">Open Price</th>
                        <th className="optionsTableHeading">Close Price</th>
                        <th className="optionsTableHeading">
                          Currently Holding
                        </th>
                        <th className="optionsTableHeading">MTM</th>
                        <th className="optionsTableHeading">Actions</th>
                      </tr>
                    </thead>
                    <tbody> {this.renderTradeCards()}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="dashboardRight">
            {/* <h1 className="heading">Statistics</h1> */}
            {/* {this.renderStats()} */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.currentUser,
    trades: state.getAllTrades,
    stats: state.stats,
  };
};
export default connect(mapStateToProps, { getTrades, getStats })(MainDashboard);
