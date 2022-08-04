import React, { useState } from "react";
import { Link } from "react-router-dom";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";

import TweetTrade from "./tweetModal";

import "./optionsTradeItem.css";
import formatCash from "../../../utils/formatCash";
const OptionsTradeItem = ({ trade }) => {
  const [showLegs, setShowLegs] = useState(false);

  const renderLegs = () => {
    return trade.leg.map((en) => {
      return (
        <div>
          {" "}
          <div className="closeEntries">
            <div className="closeEntriesContainer">
              <p className=" textMain cardField">
                <span className="textValue ">
                  {`${
                    en.strike
                  }  ${en.typeOfTrade.toUpperCase()} ${en.optionType.toUpperCase()} `}
                </span>
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <tr className="optionsTableRowContainer">
      <td>
        <div
          className={`tradeCardTypeStrategy ${
            trade.netProfitLoss > 0
              ? "backgroundColorGreen"
              : "backgroundColorRed"
          }  `}
        >
          {trade.typeOfTrade.toUpperCase()}
        </div>
      </td>
      <td>{trade.ticker}</td>
      <td>{trade.strategyName}</td>
      <td>{new Date(trade.expireDate).toDateString()}</td>
      <td>${formatCash(trade.netPremium)}</td>
      <td>{trade.leg.length}</td>
      <td>
        <div
          className={`${
            trade.netProfitLoss > 0 ? "colorGreen" : "colorRed"
          } cardFieldtextValue textMain`}
        >
          {!trade.netProfitLoss
            ? 0
            : `$${formatCash(Math.abs(trade.netProfitLoss))}`}
          <br />
        </div>
      </td>
      <td>
        <Link to={`/option/${trade._id}`} className="btn secondryBtn">
          View Trade
        </Link>
      </td>
    </tr>
  );
};
export default OptionsTradeItem;

{
  /* <div key={trade._id}>
<div className="tradeCard">
  <div className="tradeCardContainer">
    <div className={`tradeCardTypeStrategy `}>
      {trade.typeOfTrade.toUpperCase()}
    </div>
    <div className="dashboardCardText">
      <p className=" textMain cardField tickerName">
        <span className={`textValue `}>
          {`$${trade.ticker}`}
          <br />
        </span>{" "}
        Stock Ticker
      </p>
      <p className=" textMain cardField">
        <span className={`textValue `}>
          {`${!trade.strategyName ? " " : trade.strategyName}`} <br />
        </span>{" "}
        Strategy Name
      </p>
      <p className=" textMain cardField">
        <span className={`textValue `}>
          {`${
            !trade.expireDate
              ? " "
              : new Date(trade.expireDate).toDateString()
          }`}{" "}
          <br />
        </span>{" "}
        Expire Date
      </p>
      <p className=" textMain cardField">
        <span className={`textValue `}>
          {`${!trade.netPremium ? " " : trade.netPremium}`} <br />
        </span>{" "}
        Premium
      </p>

      <p className=" textMain cardField">
        <span className="textValue ">{trade.leg.length}</span>
        <br /> Number of legs
      </p>
      <p className="textMain">
        <span
          className={`${
            trade.netProfitLoss > 0 ? "colorGreen" : "colorRed"
          } cardFieldtextValue textMain`}
        >
          {!trade.netProfitLoss
            ? 0
            : `$${formatCash(Math.abs(trade.netProfitLoss))}`}
          <br />
        </span>{" "}
        M - M
      </p>
    </div>
    <div className="tradeItemBtnContainer">
      <Link to={`/option/${trade._id}`} className="btn primaryBtn">
        View Trade
      </Link>
      <div
        className="tradeItemCloseEntriesContainer btn secondryBtn"
        onClick={() => setShowLegs(!showLegs)}
      >
        <div>Legs</div>
        <ArrowDropDownCircleIcon className={`closeEntriesShow `} />
      </div>
    </div>
  </div>
  <div className="textMain">Share this trade!</div>
  <TweetTrade trade={trade} />

  <div className="marginBottom">{!showLegs ? "" : renderLegs()}</div>
</div>
</div> */
}
