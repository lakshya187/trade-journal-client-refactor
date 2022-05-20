/* jshint ignore:start */
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { LinearProgress } from "@mui/material";

import PieChart from "../charts/piechart";
import AddManually from "./../../assets/icons/AddNewTrade/addManually.svg";
import ImportBroker from "./../../assets/icons/AddNewTrade/importBroker.svg";
import ImportExcel from "./../../assets/icons/AddNewTrade/importExcel.svg";
import Sidebar from "../sidebar/sidebar";
import { server_url } from "../../config";
import authorizeUser from "../../helperFunctions/authorizeUser";
import { getLocalStorage } from "../../helperFunctions/localstorage";
import history from "../../utils/history";
import { getTrades, authorizedUser } from "../../actions";
import "./main-dashboard.css";
import { getStats } from "../../actions";
const labels = ["a", "b", "c", "d", "e", "f"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "My First Dataset",
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(201, 203, 207, 0.2)",
      ],
      borderColor: [
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
        "rgb(201, 203, 207)",
      ],
      borderWidth: 1,
    },
  ],
};
class MainDashboard extends React.Component {
  componentDidMount() {
    this.props.getTrades();
    // this.getStats();
    this.props.getStats();
  }

  renderTradeCards() {
    return this.props.trades.map((el) => {
      return (
        <Link to={`/trade/${el._id}`} key={el._id}>
          <div className="tradeCard">
            <div className="tradeCardContainer">
              <div
                className={`tradeCardType ${
                  el.typeOfTrade === "Long" ? "black" : "grey"
                }`}
              >
                {el.typeOfTrade.toUpperCase()}
              </div>
              <div className="dashboardCardText">
                <p className=" textMain cardField tickerName">
                  <span className={`textValue `}>
                    {`${el.stockTicker}`}
                    <br />
                  </span>{" "}
                  Stock Ticker
                </p>

                <p className=" textMain cardField">
                  <span className="textValue ">
                    {!el.openPrice ? "Not defined" : ` $${el.openPrice}`}
                  </span>
                  <br /> Open price
                </p>
                <p className=" textMain cardField">
                  <span className={`textValue `}>
                    {`$${
                      !el.closingPriceCalculated
                        ? " "
                        : el.closingPriceCalculated
                    }`}{" "}
                    <br />
                  </span>{" "}
                  Closing price
                </p>
                <p className=" textMain cardField">
                  <span className={`textValue `}>
                    {el.currentHoldings} <br />
                  </span>{" "}
                  Current holdings
                </p>
                <p className={`textMain`}>
                  <span
                    className={`${
                      el.profitLoss > 0 ? "colorGreen" : "colorRed"
                    } cardFieldtextValue textMain`}
                  >
                    {!el.profitLoss ? 0 : `$${el.profitLoss.toFixed(2)}`}
                    <br />
                  </span>{" "}
                  P/L
                </p>
              </div>
            </div>
          </div>
        </Link>
      );
    });
  }
  render() {
    console.log(this.props.stats);
    if (!this.props.trades) {
      return <LinearProgress color="inherit" />;
    }
    return (
      <div className="dashboard">
        <div className="dashboardContainer">
          <div className="dashboardLeft">
            <Sidebar />
          </div>
          <div className="dashboardCenter">
            <div className="dashboardMainContainer">
              <h1 className="dashboardGreeting heading">Hello,</h1>
              <div className="dashboardFiltersContainer">
                <input
                  className="input"
                  type="text"
                  placeholder="Search for trades"
                />
                <button className="btn secondryBtn marginleft">Sort by</button>
              </div>
              <div className="dashboardInsight">
                {/* <PieChart chartData={data} /> */}
              </div>
              <div className="dashboardAddNewTrades">
                <div
                  className="dashboardAddNewTradesItem"
                  style={{ backgroundColor: "#E4C0CD" }}
                >
                  <img src={AddManually} />
                  <p>Add Manually</p>
                </div>
                <div
                  className="dashboardAddNewTradesItem"
                  style={{ backgroundColor: "#E0E7EA" }}
                >
                  <img src={ImportExcel} />
                  <p>Import an excel file</p>
                </div>
                <div
                  className="dashboardAddNewTradesItem"
                  style={{ backgroundColor: "#CED1F4" }}
                >
                  <img src={ImportBroker} />
                  <p>Integrate with broker</p>
                </div>
              </div>
              <div className="dashboardTradesEquityContainer">
                <h1 className="heading">Equity Trades</h1>
                {this.renderTradeCards()}
              </div>
            </div>
          </div>
          <div className="dashboardRight">
            <h1 className="heading">Statistics</h1>
            <div className="dashboardStatisticsContainer">
              <div className="dashboardStatsItem">
                <div className="dashboardStatsBullet"></div>
                <div className="dashboardStatsDescription">Total Trades: </div>
                <div className="dashboardStatsValue">0</div>
              </div>
              <div className="dashboardStatsItem">
                <div className="dashboardStatsBullet"></div>
                <div className="dashboardStatsDescription">Total Profit: </div>
                <div className="dashboardStatsValue">0</div>
              </div>
              <div className="dashboardStatsItem">
                <div className="dashboardStatsBullet"></div>
                <div className="dashboardStatsDescription">Total Loss: </div>
                <div className="dashboardStatsValue">0</div>
              </div>
              <div className="dashboardStatsItem">
                <div className="dashboardStatsBullet"></div>
                <div className="dashboardStatsDescription">Total Invested:</div>
                <div className="dashboardStatsValue">0</div>
              </div>
              <div className="dashboardStatsItem">
                <div className="dashboardStatsBullet"></div>
                <div className="dashboardStatsDescription">Profit Trades: </div>
                <div className="dashboardStatsValue">0</div>
              </div>
              <div className="dashboardStatsItem">
                <div className="dashboardStatsBullet"></div>
                <div className="dashboardStatsDescription">Loss Trades: </div>
                <div className="dashboardStatsValue">0</div>
              </div>
            </div>
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
