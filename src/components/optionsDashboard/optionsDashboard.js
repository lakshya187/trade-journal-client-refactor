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
  const [underlying, setUnderlying] = useState(null);
  const [strategy, setStrategy] = useState(null);

  useEffect(() => {
    props.getAllOptions();
    getStratFilters();
  }, []);
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
            <h1 className="dashboardGreeting heading">{renderGreeting()}</h1>
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
                className="btn  marginleft"
                onChange={(e) => handleChangeStrat(e.value)}
                options={strategy}
                placeholder={"Filter with Strategy"}
              />

              <Link className="btn primaryBtn marginleft" to="/add-option">
                Add new Trade +
              </Link>
            </div>

            <div className="dashboardInsight" style={{ padding: "30px 0px" }}>
              Chart
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
              {renderOptionsTrades()}
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
