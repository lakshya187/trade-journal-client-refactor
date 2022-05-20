import React from "react";

import "./sidebar.css";
import reports from "./../../assets/icons/sidebar/reports.svg";
import options from "./../../assets/icons/sidebar/options.svg";
import equity from "./../../assets/icons/sidebar/equity.svg";
const Sidebar = () => {
  return (
    <div>
      {" "}
      <div className="sidebarContainer">
        <div className="sidebarItem ">
          <img src={equity} />
          <p>Equity</p>
        </div>
        <div className="sidebarItem ">
          <img src={options} />
          <p>Options</p>
        </div>
        <div className="sidebarItem ">
          <img src={reports} />
          <p>Reports</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
