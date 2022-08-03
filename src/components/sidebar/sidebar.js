import React from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Link } from "react-router-dom";

import "./sidebar.css";
import reports from "./../../assets/icons/sidebar/reports.svg";
import options from "./../../assets/icons/sidebar/options.svg";
import equity from "./../../assets/icons/sidebar/equity.svg";
import user from "../../assets/icons/sidebar/user.svg";
const Sidebar = () => {
  return (
    <div>
      {" "}
      <div className="sidebarContainer">
        <Link to={"/"} className="sidebarItem ">
          <svg
            className="sideBarIcon"
            xmlns="http://www.w3.org/2000/svg"
            width="12.102"
            height="13.964"
            viewBox="0 0 12.102 13.964"
          >
            <path
              id="Path_12239"
              data-name="Path 12239"
              d="M247.316,164.233a.463.463,0,0,1,.467-.465h4.652a.465.465,0,0,1,.467.465v3.26a.463.463,0,0,1-.467.464h-4.652a.466.466,0,0,1-.467-.464Zm0-9.776a.463.463,0,0,1,.467-.463h4.652a.466.466,0,0,1,.467.463v7.918a.463.463,0,0,1-.467.463h-4.652a.467.467,0,0,1-.467-.463Zm-6.516,5.12a.463.463,0,0,1,.467-.463h4.652a.467.467,0,0,1,.467.463v7.918a.463.463,0,0,1-.467.463h-4.652a.467.467,0,0,1-.467-.463Zm0-5.119a.463.463,0,0,1,.467-.464h4.652a.466.466,0,0,1,.467.464v3.26a.463.463,0,0,1-.467.465h-4.652a.465.465,0,0,1-.467-.465Z"
              transform="translate(-240.8 -153.994)"
              fill="silver"
              fill-rule="evenodd"
            />
          </svg>

          <p>Dashboard</p>
        </Link>
        <Link to={"/"} className="sidebarItem ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12.102"
            height="16.943"
            viewBox="0 0 12.102 16.943"
          >
            <path
              id="noun-contract-5019237"
              d="M185.287,35h-8.471A1.815,1.815,0,0,0,175,36.815V50.127a1.815,1.815,0,0,0,1.815,1.815h8.471a1.815,1.815,0,0,0,1.815-1.815V36.815A1.815,1.815,0,0,0,185.287,35Zm-7.261,3.025h2.42a.605.605,0,1,1,0,1.21h-2.42a.605.605,0,1,1,0-1.21Zm6.387,10.185-.778.518h0a1.484,1.484,0,0,1-2.263-.874.274.274,0,0,0-.418-.162l-.777.518h0A.605.605,0,1,1,179.5,47.2l.778-.518h0a1.484,1.484,0,0,1,2.263.874.274.274,0,0,0,.418.162l.777-.518h0a.605.605,0,1,1,.672,1.007Zm-.336-4.134h-6.051a.605.605,0,1,1,0-1.21h6.051a.605.605,0,1,1,0,1.21Zm0-2.42h-6.051a.605.605,0,1,1,0-1.21h6.051a.605.605,0,1,1,0,1.21Z"
              transform="translate(-175 -35)"
              fill="silver"
            />
          </svg>

          <p>Equity</p>
        </Link>
        <Link to="/options-dashboard" className="sidebarItem ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12.102"
            height="16.736"
            viewBox="0 0 12.102 16.736"
          >
            <path
              id="Union_7"
              data-name="Union 7"
              d="M1.169,16.736h0A1.185,1.185,0,0,1,0,15.538V3.249a1.185,1.185,0,0,1,1.169-1.2H3.042V2.89a.4.4,0,0,0,.39.4H8.67a.4.4,0,0,0,.39-.4V2.051h1.873a1.185,1.185,0,0,1,1.169,1.2V15.538a1.185,1.185,0,0,1-1.169,1.2ZM7.7,11.729a1.9,1.9,0,0,0-.544,1.345v.1A1.907,1.907,0,0,0,7.69,14.5a1.831,1.831,0,0,0,2.645-.015,1.875,1.875,0,0,0,.512-1.347v-.067h0a1.907,1.907,0,0,0-.532-1.333A1.824,1.824,0,0,0,7.7,11.729Zm-5.667-.4a.4.4,0,0,0,.39.4H5.232a.4.4,0,0,0,0-.8H2.425A.4.4,0,0,0,2.035,11.328Zm0-2.877a.4.4,0,0,0,.39.4H9.678a.4.4,0,0,0,0-.8H2.425A.4.4,0,0,0,2.035,8.451Zm0-2.877a.4.4,0,0,0,.39.4H9.678a.4.4,0,0,0,0-.8H2.425A.4.4,0,0,0,2.035,5.574Zm5.9,7.6v-.1a1.065,1.065,0,1,1,2.13,0v.072s0,.008,0,.011a1.071,1.071,0,0,1-.292.774,1.056,1.056,0,0,1-.774.33A1.067,1.067,0,0,1,7.938,13.17Zm0-.1h0ZM3.821,2.491V.8A.79.79,0,0,1,4.6,0H7.5a.79.79,0,0,1,.78.8V2.491Z"
              fill="silver"
            />
          </svg>

          <p>Options</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
