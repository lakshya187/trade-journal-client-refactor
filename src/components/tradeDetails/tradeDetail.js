import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import formatCash from "../../utils/formatCash";
import { LinearProgress } from "@mui/material";
import { getLocalStorage } from "../../helperFunctions/localstorage";
import { server_url } from "../../config";
import "./tradeDetail.css";
import entryAnalysisFallBack from "../../assets/icons/analysis/entryAnalysis.svg";
import exitAnalysisFallBack from "../../assets/icons/analysis/exitAnalysis.svg";

import history from "../../utils/history";

import CloseTradeModal from "./closeTradeModal";

const TradeDetails = (props) => {
  const [trade, setTrade] = useState(null);

  useEffect(() => {
    getData();
  }, []);
  const renderTable = () => {
    return trade.closingEntries.map((en) => {
      return (
        <tr>
          <td className="tableTD">{en.price}</td>
          <td className="tableTD">{new Date(en.date).toDateString()}</td>
          <td className="tableTD"> {en.quantity}</td>
        </tr>
      );
    });
  };
  const renderAnalysis = (fallback, img) => {
    return (
      <div className="tradeAnalysisContainer marginTop">
        <img
          className={`tradeAnalysis ${
            !img ? "tradeDetailAnalysisFallback" : ""
          } `}
          src={!img ? fallback : img}
          alt={`analysis`}
        />
        {img ? (
          ""
        ) : (
          <button className="btn secondryBtn marginTop">Upload</button>
        )}
      </div>
    );
  };
  const getData = async () => {
    const response = await axios.get(
      `${server_url}/trades/${props.match.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${getLocalStorage()}`,
        },
      }
    );

    setTrade(response.data.data.trade);
  };
  const goBack = () => {
    history.push("/equity-dashboard");
  };
  console.log(props);
  if (!trade) {
    return <LinearProgress />;
  }
  console.log(trade);

  return (
    <div className="optionDetail">
      <div className="optionDetailContainer">
        <div className="optionDetailContainerBackground">
          <div className="optionDetailGoBack" onClick={(e) => goBack()}>
            Go back
          </div>
          <div className={`optionDetailStratName`}>
            <div
              className={`${trade.profitLoss > 0 ? "winTrade" : "loseTrade"}`}
            >
              {trade.stockName}
            </div>
          </div>
          <div className="editBtnContainer">
            {/* <Link to={`/${trade._id}/close-trade`} className="btn primaryBtn ">
              Close Trade
            </Link> */}
            <CloseTradeModal
              openPrice={trade.openPrice}
              currentHoldings={trade.currentHoldings}
              id={trade._id}
              updateCurrentTrade={setTrade}
            />
            <Link className="btn secondryBtn marginleft">Edit Trade</Link>

            {/* <DeleteModal id={trade._id} /> */}
          </div>
        </div>

        <div className="optionsDEtailsGen">
          <div className="optionsDetailGeneralInfoContainer">
            <div className="tradeDetailsTextContainerLeft">
              <p className="  cardField">
                <span className="textDescription">Ticker :</span> $
                {formatCash(trade.openPrice)}
              </p>
              <p className="  cardField">
                <span className="textDescription">Ticker :</span>{" "}
                {trade.stockTicker}
              </p>
              <p className="  cardField">
                <span className={`textDescription `}>Stock Name :</span>{" "}
                {trade.stockName}
              </p>
              <p className="  cardField">
                <span className={`textDescription `}>Open Date :</span>{" "}
                {new Date(trade.openDate).toDateString()}
              </p>
              <p className="  cardField">
                <span className={`textDescription `}>Trade created on</span>{" "}
                {new Date(trade.tradeCreatedOn).toDateString()}
              </p>
            </div>
            <div className="tradeDetailsTextContainerRight">
              <p className="  cardField">
                <span className={`textDescription `}>Current Holdings:</span>
                {trade.currentHoldings}
              </p>

              <p className="  cardField">
                <span className={`textDescription `}>Type of trade:</span>{" "}
                {trade.typeOfTrade}
              </p>
              <p
                className={`${
                  trade.netProfitLoss > 0 ? "colorGreen" : "colorRed"
                } cardFieldtextValue textMain cardField`}
              >
                <span className={`textDescription  `}>MTM :</span> $
                {formatCash(trade.profitLoss)}
              </p>
              <p className="  cardField">
                <span className={`textDescription `}>Quantity :</span>{" "}
                {trade.tradeQuantity}
              </p>
            </div>
          </div>
        </div>
        {/* <div className={"tagsContainer"}>Tags : {renderTags()}</div> */}
      </div>
      <div className="headerContainer">
        <div className="headerMarker"></div>
        <div className="subHeading">Closing entries</div>
      </div>

      <div className="equityTable">
        <table className="optionLegTable">
          <tr>
            <th className="optionsTableHeading">Price</th>
            <th className="optionsTableHeading">Date</th>
            <th className="optionsTableHeading">Quantity</th>
          </tr>
          {renderTable()}
        </table>
      </div>

      <div className="headerContainer">
        <div className="headerMarker"></div>
        <div className="subHeading">Notes</div>
      </div>
      <div className="optionDetailNotesContainer marginTop marginBottom">
        <div className="tradeDetailsTextContainer">{trade.notes}</div>
      </div>
    </div>
  );
};

export default TradeDetails;
