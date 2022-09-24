import React, { useState } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { motion } from "framer-motion";
import "./sidebar.css";

const Sidebar = () => {
  const [curretView, setCurrentView] = useState("main");
  const handleRender = () => {
    if (curretView === "main") {
      return (
        <motion.div className="sidebarContainer ">
          <Link
            to={"/"}
            className={`sidebarItem ${
              window.location.pathname === "/" ? "sideBarActive" : null
            } `}
          >
            <DashboardIcon />

            <p>Dashboad</p>
          </Link>
          <div
            onClick={() => setCurrentView("equity")}
            className={`sidebarItem ${
              window.location.pathname === "/equity-dashboard"
                ? "sideBarActive"
                : null
            } `}
          >
            <SummarizeIcon />

            <p>Equity</p>
          </div>
          <div
            onClick={() => setCurrentView("options")}
            className={`sidebarItem ${
              window.location.pathname === "/options-dashboard"
                ? "sideBarActive"
                : null
            }  ${
              window.location.pathname === "/option-analytics"
                ? "sideBarActive"
                : null
            }`}
          >
            <AssessmentIcon />

            <p>Options</p>
          </div>
        </motion.div>
      );
    }
    if (curretView === "options") {
      return (
        <div className="sidebarContainer sideBarItemsContainer  ">
          <div className="sideBarContainerItems ">
            <ArrowBackIcon
              onClick={() => setCurrentView("main")}
              style={{ color: "#fff" }}
            />
          </div>
          <Link to={"/add-option"} className="sidebarItem ">
            <AddIcon />

            <p>Add new </p>
          </Link>
          <Link to={"/options-dashboard"} className="sidebarItem ">
            <DashboardIcon />

            <p>Dashboard</p>
          </Link>
          <Link to="/option-analytics" className="sidebarItem ">
            <AssessmentIcon />

            <p>Analytics</p>
          </Link>
        </div>
      );
    }
    if (curretView === "equity") {
      return (
        <div className="sidebarContainer sideBarItemsContainer  ">
          <div className="sideBarContainerItems ">
            <ArrowBackIcon
              onClick={() => setCurrentView("main")}
              style={{ color: "#fff" }}
            />
          </div>
          <Link to={"/add-new-equity-trade"} className="sidebarItem ">
            <AddIcon />

            <p>Add new </p>
          </Link>
          <Link to={"/equity-dashboard"} className="sidebarItem ">
            <DashboardIcon />

            <p>Dashboard</p>
          </Link>
        </div>
      );
    }
  };

  return <div>{handleRender()}</div>;
};

export default Sidebar;
