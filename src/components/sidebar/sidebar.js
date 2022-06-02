import React from "react";

import { Link } from "react-router-dom";
import "./sidebar.css";
import reports from "./../../assets/icons/sidebar/reports.svg";
import options from "./../../assets/icons/sidebar/options.svg";
import equity from "./../../assets/icons/sidebar/equity.svg";
const Sidebar = () => {
  return (
    <div>
      {" "}
      <div className="sidebarContainer">
        <Link to={"/"} className="sidebarItem ">
          <img src={equity} />
          <p>Equity</p>
        </Link>
        <Link to="/options-dashboard" className="sidebarItem ">
          <img src={options} />
          <p>Options</p>
        </Link>
        <div className="sidebarItem ">
          <img src={reports} />
          <p>Reports</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
