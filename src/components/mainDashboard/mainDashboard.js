import React, { useState, useEffect } from "react";
import "./mainDashboard.css";
import Sidebar from "../sidebar/sidebar";
import StackedLineChart from "./stackedBarChart";
import { getDashboardStats } from "../../actions";
import { connect } from "react-redux";
import formatCash from "../../utils/formatCash";
import { getChartDataOptions } from "../../actions";
import { getChartDataEquity } from "../../actions";
import { months } from "../../utils/staticData";
import { getMainDashboardStats } from "../../actions";
import { getRiskRewardRatio } from "../../actions";
const MainDashboard = ({
  returns,
  getDashboardStats,
  getChartDataOptions,
  optionsReturns,
  getChartDataEquity,
  equityReturns,
  combinedStats,
  getMainDashboardStats,
  getRiskRewardRatio
}) => {
  useEffect(() => {
    getDashboardStats();
    getChartDataOptions();
    getChartDataEquity();
    getMainDashboardStats();
    getRiskRewardRatio()
  }, []);
  const renderOptionsChart = () => {
    if (optionsReturns) {
      const labels = optionsReturns.map((el) => {
        return (el.month = months[el._id - 1]);
      });

      const options = optionsReturns.map((el) => {
        return el.netProfitLoss;
      });

      const data = {
        labels: labels,
        datasets: [
          {
            label: "Options",
            data: options,
            fill: false,

            borderColor: "#FF6F1E",
          },
        ],
      };
      // return <div>Chart</div>;
      return <StackedLineChart labels={labels} datasets={data} />;
    }
    return <div className="noDataFound">No data Found</div>;
  };
  const renderStats = () => {
    if (!combinedStats) return <div className="noDataFound">No data Found</div>;
    return (
      <div className="optionsAnalyticsStatsContainer ">
        <div className="dashboardStatsItem">
          <div className="headerMarker"></div>
          <div className="dashboardStatsDescription">Total Trades: </div>
          <div className="dashboardStatsValue">{combinedStats.totalTrades}</div>
        </div>
        <div className="dashboardStatsItem">
          <div className="headerMarker"></div>
          <div className="dashboardStatsDescription">Net Returns:</div>
          <div
            className={`dashboardStatsValue ${
              combinedStats.netReturns > 0 ? "colorGreen" : "colorRed"
            }`}
          >
            ${formatCash(Math.abs(combinedStats.netReturns.toFixed(2)))}
          </div>
        </div>
        <div className="dashboardStatsItem">
          <div className="headerMarker"></div>
          <div className="dashboardStatsDescription">Net Options Returns:</div>
          <div
            className={`dashboardStatsValue ${
              combinedStats.returnsOptions > 0 ? "colorGreen" : "colorRed"
            }`}
          >
            ${formatCash(Math.abs(combinedStats.returnsOptions.toFixed(2)))}
          </div>
        </div>
        <div className="dashboardStatsItem">
          <div className="headerMarker"></div>
          <div className="dashboardStatsDescription">Net Equity Returns:</div>
          <div
            className={`dashboardStatsValue ${
              combinedStats.returnsEquity > 0 ? "colorGreen" : "colorRed"
            }`}
          >
            ${formatCash(Math.abs(combinedStats.returnsEquity.toFixed(2)))}
          </div>
        </div>
        <div className="dashboardStatsItem">
          <div className="headerMarker"></div>
          <div className="dashboardStatsDescription">Options Trades:</div>
          <div className={`dashboardStatsValue `}>
            {formatCash(combinedStats.totalOptionsTrades)}
          </div>
        </div>
        <div className="dashboardStatsItem">
          <div className="headerMarker"></div>
          <div className="dashboardStatsDescription">Equity Trades:</div>
          <div className={`dashboardStatsValue `}>
            {formatCash(combinedStats.totalEquityTrades)}
          </div>
        </div>
      </div>
    );
  };
  const renderEquityChart = () => {
    if (equityReturns) {
      const labels = equityReturns.map((el) => {
        return (el.month = months[el._id - 1]);
      });
      const equity = equityReturns.map((el) => {
        return el.netProfitLoss;
      });
      const data = {
        labels: labels,
        datasets: [
          {
            label: "Equity",
            data: equity,
            fill: false,

            borderColor: "#42E6FF",
          },
        ],
      };
      return <StackedLineChart datasets={data} />;
    }
  };
  const renderReturns = () => {
    if (!returns) return <div>Loading</div>;
    return (
      <div className="maindashboardAggregateReturnsContainer">
        <div className="maindashboardAggItemContainer">
          <div className="bodyCopy">Daily returns</div>
          <div
            className={`returnsValue ${
              returns.daily > 0 ? "colorGreen" : "colorRed"
            } `}
          >
            ${formatCash(Math.abs(returns.daily).toFixed(2))}
          </div>
        </div>
        <div className="maindashboardAggItemContainer">
          <div className="bodyCopy">Weekly returns</div>
          <div
            className={`returnsValue ${
              returns.weekly > 0 ? "colorGreen" : "colorRed"
            } `}
          >
            ${formatCash(Math.abs(returns.weekly).toFixed(2))}
          </div>
        </div>
        <div className="maindashboardAggItemContainer">
          <div className="bodyCopy">Monthly returns</div>
          <div
            className={`returnsValue ${
              returns.monthly > 0 ? "colorGreen" : "colorRed"
            } `}
          >
            ${formatCash(Math.abs(returns.monthly).toFixed(2))}
          </div>
        </div>
        <div className="maindashboardAggItemContainer">
          <div className="bodyCopy">Yearly returns</div>
          <div
            className={`returnsValue ${
              returns.yearly > 0 ? "colorGreen" : "colorRed"
            } `}
          >
            ${formatCash(Math.abs(returns.yearly).toFixed(2))}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="mainDashboard">
      <div className="mainDashboardContainer">
        <div className="mainDashboardLeft">
          <Sidebar />
        </div>
        <div className="mainDashboardCenter">
          <div className="mainDashboardHeading">
            <div className="headerMarker"></div>
            <div className="bodyCopy">Overall returns</div>
          </div>
          {renderReturns()}
          <div className="mainDashboardHeading marginTop">
            <div className="headerMarker"></div>
            <div className="bodyCopy">Overall returns</div>
          </div>
          <div className="stackedBarChartContainer">{renderOptionsChart()}</div>
          <div className="stackedBarChartContainer">{renderEquityChart()}</div>
        </div>
        <div className="mainDashboardRight">
          <div className="mainDashboardHeading marginBottom  ">
            <div className="headerMarker "></div>
            <div className="bodyCopy ">Statistics</div>
          </div>
          <div>{renderStats()}</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    returns: state.dashboardReturns,
    optionsReturns: state.optionsReturns,
    equityReturns: state.equityReturns,
    combinedStats: state.combinedStats,
    riskReward : state.riskReward
  };
};
export default connect(mapStateToProps, {
  getDashboardStats,
  getChartDataOptions,
  getChartDataEquity,
  getMainDashboardStats,
  getRiskRewardRatio
})(MainDashboard);
