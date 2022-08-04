import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

import PieChart from "../charts/piechart";
import OptionsTradeItem from "./optionTradeItem/optionsTradeItem";
import { getAllOptions } from "../../actions/index";
import Sidebar from "../sidebar/sidebar";
import "./optionsDashboard.css";
import { queryFilters } from "../../actions/index";
import Select from "react-select";
import axios from "axios";
import { getLocalStorage } from "../../helperFunctions/localstorage";
import { server_url } from "../../config";

const OptionsDashboard = (props) => {
  const [underlying, setUnderlying] = useState("");
  const [strategy, setStrategy] = useState("");
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    props.getAllOptions();
    getStratFilters();
    getChartData();
  }, []);
  const getChartData = async () => {
    const { data } = await axios.get(`${server_url}/options/profitLoss`, {
      headers: {
        Authorization: `Bearer ${getLocalStorage()}`,
      },
    });
    setChartData(data.data[0]);
    try {
    } catch (e) {
      console.log(e);
    }
  };
  const renderChart = () => {
    if (!chartData) return <div className="loader">No data found</div>;
    const profit = chartData.profit;
    const loss = chartData.loss;
    const profitLoss = [profit, loss];
    const chart = {
      labels: ["Profit", "Loss"],
      datasets: [
        {
          label: "Profit and loss",
          backgroundColor: ["#00DF8D", "#FA447F"],
          // hoverBackgroundColor: ["#0A0A0A", "#E2E2E2"],
          borderColor: "none",
          data: profitLoss,
          borderWidth: 0,
          cutout: 80,
        },
      ],
    };
    return <PieChart data={chart} />;
  };
  const renderOptionsTrades = () => {
    if (!props.options || props.options.length === 0) {
      return (
        <div className="marginTop marginBottom">
          <div>
            No results found for your query
            <br />{" "}
            <div
              className="marginTop btn secondryBtn"
              onClick={(e) => {
                e.preventDefault();
                props.getAllOptions();
              }}
            >
              Go back
            </div>
          </div>
        </div>
      );
    }
    const trades = props.options.map((t) => {
      return <OptionsTradeItem trade={t} key={t._id} />;
    });
    return trades;
  };
  const handleSearchQuery = async (e) => {
    e.preventDefault();
    try {
      if (!underlying) return;
      console.log(underlying);
      props.queryFilters("findTradesByUnderlying", { underlying });
      setUnderlying("");
    } catch (e) {
      console.log(e);
    }
  };
  const renderGreeting = () => {
    if (!props.user) {
      return <CircularProgress />;
    }
    return <h1 className="heading">Hello, {props.user.name}</h1>;
  };
  const getStratFilters = async () => {
    try {
      const { data } = await axios.get(
        `${server_url}/options/getOptionStrategies`,
        {
          headers: {
            Authorization: `Bearer ${getLocalStorage()}`,
          },
        }
      );
      setStrategy(data.data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(strategy);
  const handleChangeStrat = (query) => {
    props.queryFilters("strategyFilter", { query });
  };
  return (
    <div className="optionsDashboard">
      <div className="optionsDashboardContainer">
        <div className="optionsDashbardLeft">
          <Sidebar />
        </div>
        <div className="optionsDashbardCenter">
          <div className="dashboardMainContainer">
            {/* <h1 className="dashboardGreeting heading">{renderGreeting()}</h1> */}
            <div className="dashboardFiltersContainer">
              <form>
                <input
                  className="input"
                  type="text"
                  onChange={(e) => setUnderlying(e.target.value)}
                  value={underlying}
                  placeholder="Search by Underlying"
                  style={{ borderRadius: "5px 0px 0px 5px" }}
                />
                <button
                  className="searchBtn"
                  onClick={(e) => handleSearchQuery(e)}
                >
                  <SearchIcon />
                </button>
              </form>

              <Select
                // styles={{ minHeight: "250px" }}
                classNamePrefix="reactSelect"
                className="btn  marginleft"
                onChange={(e) => handleChangeStrat(e.value)}
                options={strategy}
                placeholder={"Filter with Strategy"}
              />

              {/* <Link className="btn primaryBtn marginleft" to="/add-option">
                Add new Trade +
              </Link> */}
            </div>

            <div
              className="dashboardInsight dashboardChartContainer"
              // style={{ padding: "30px 0px" }}
            >
              {renderChart()}
            </div>
            <div className="optionsDashboardOptionsContainer">
              <div className="optionsDashboardHeadingContainer">
                <h1 className="heading">Options Trades </h1>
                <button
                  className="btn secondryBtn"
                  onClick={(e) => {
                    e.preventDefault();
                    props.getAllOptions();
                  }}
                >
                  Show All Trades
                </button>
              </div>
              <div className="optionsTableContainer">
                <table className="optionsTable">
                  <thead>
                    <tr className="optionsTableRowContainer">
                      <th className="optionsTableHeading">Type of Trade</th>
                      <th className="optionsTableHeading">Stock Ticker</th>
                      <th className="optionsTableHeading">Strategy Name</th>
                      <th className="optionsTableHeading">Expire Date</th>
                      <th className="optionsTableHeading">Net Premium</th>
                      <th className="optionsTableHeading">Number of Legs</th>
                      <th className="optionsTableHeading">MTM</th>
                      <th className="optionsTableHeading">Actions</th>
                    </tr>
                  </thead>
                  <tbody>{renderOptionsTrades()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="optionsDashbardRight"></div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.currentUser,
    options: state.optionsTrades,
  };
};
export default connect(mapStateToProps, { getAllOptions, queryFilters })(
  OptionsDashboard
);
