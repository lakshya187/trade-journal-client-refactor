import React from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
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
        <Link to={"/option-analytics"} className="sidebarItem ">
          <img src={reports} />
          <p>Analytics</p>
        </Link>
        <Link className="sidebarItem " to={"/user-profile"}>
          <PersonOutlineIcon /> Profile{" "}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
