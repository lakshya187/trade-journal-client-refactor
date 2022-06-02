import React, { useEffect } from "react";
import { connect } from "react-redux";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

import PieChart from "../charts/piechart";
import OptionsTradeItem from "./optionTradeItem/optionsTradeItem";
import { getAllOptions } from "../../actions/index";
import Sidebar from "../sidebar/sidebar";
import "./optionsDashboard.css";

const OptionsDashboard = (props) => {
  useEffect(() => {
    props.getAllOptions();
  }, []);
  const renderOptionsTrades = () => {
    if (!props.options) {
      return (
        <div>
          <CircularProgress />
        </div>
      );
    }
    return props.options.map((t) => {
      return <OptionsTradeItem trade={t} key={t._id} />;
    });
  };
  const renderGreeting = () => {
    if (!props.user) {
      return <CircularProgress />;
    }
    return <h1 className="heading">Hello, {props.user.name}</h1>;
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
              <input
                className="input"
                type="text"
                placeholder="Search for trades"
              />
              <button className="btn secondryBtn marginleft">Sort by</button>
              <Link className="btn primaryBtn marginleft" to="/add-option">
                Add new Trade +
              </Link>
            </div>
            <div className="dashboardInsight" style={{ padding: "30px 0px" }}>
              Chart
            </div>
            {/* ------- */}
            <div className="optionsDashboardOptionsContainer">
              <h1 className="heading">Options Trades</h1>
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
export default connect(mapStateToProps, { getAllOptions })(OptionsDashboard);
