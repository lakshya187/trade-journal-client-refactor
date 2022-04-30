import React from "react";
import { Link } from "react-router-dom";

import "./addNewTrade.css";
import AddManually from "./../../assets/icons/AddNewTrade/addManually.svg";
import ImportBroker from "./../../assets/icons/AddNewTrade/importBroker.svg";
import ImportExcel from "./../../assets/icons/AddNewTrade/importExcel.svg";
const AddNewTrade = () => {
  return (
    <div>
      <h2 className="addNewTradeHeading">
        How do you want to add a new trade?
      </h2>
      <div className="addNewTrade">
        <div className="addNewTradeContainer">
          <Link to="/add-manually">
            <img src={AddManually} className="addNewTradeIcon" />
            <div className="addNewTradeDescription">Add Manually</div>
          </Link>
        </div>
        <div className="addNewTradeContainer">
          <Link to="/add-broker">
            <img src={ImportBroker} className="addNewTradeIcon" />
            <div className="addNewTradeDescription">
              Import from your broker
            </div>
          </Link>
        </div>
        <div className="addNewTradeContainer">
          <Link to="/add-excel">
            <img src={ImportExcel} className="addNewTradeIcon" />
            <div className="addNewTradeDescription">
              Import from an excel sheet
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddNewTrade;
