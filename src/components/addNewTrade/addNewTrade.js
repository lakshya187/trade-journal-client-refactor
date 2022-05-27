import React from "react";
import { Link } from "react-router-dom";

import "./addNewTrade.css";
import AddManually from "./../../assets/icons/AddNewTrade/addManually.svg";
import ImportBroker from "./../../assets/icons/AddNewTrade/importBroker.svg";
import ImportExcel from "./../../assets/icons/AddNewTrade/importExcel.svg";
const AddNewTrade = () => {
  return (
    <div className="dashboardAddNewTrades">
      <Link
        className="dashboardAddNewTradesItem"
        style={{ backgroundColor: "#E4C0CD" }}
        to="/add-manually"
      >
        <img src={AddManually} />
        <p>Add Manually</p>
      </Link>
      <Link
        to="/add-excel"
        className="dashboardAddNewTradesItem"
        style={{ backgroundColor: "#E0E7EA" }}
      >
        <img src={ImportExcel} />
        <p>Import an excel file</p>
      </Link>
      <Link
        to="/add-broker"
        className="dashboardAddNewTradesItem"
        style={{ backgroundColor: "#CED1F4" }}
      >
        <img src={ImportBroker} />
        <p>Integrate with broker</p>
      </Link>
    </div>
  );
};

export default AddNewTrade;
