import React, { useState } from "react";
import { Link } from "react-router-dom";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import "./tradeItem.css";
import formatCash from "../../../utils/formatCash";

const TradeItem = ({ trade }) => {
  const [showCloseEntires, setCloseEntries] = useState(false);
  const renderCloseEntries = () => {
    return trade.closingEntries.map((en) => {
      return (
        <div className="closeEntries">
          <div className="closeEntriesContainer">
            <p className=" textMain cardField">
              <span className="textValue ">
                {!en.price ? "Not defined" : ` $${formatCash(en.price)}`}
              </span>
              <br /> Closing price
            </p>

            <p className=" textMain cardField">
              <span className="textValue ">
                {!en.quantity ? "Not defined" : `${en.quantity}`}
              </span>
              <br /> Close quantity
            </p>
            <p className=" textMain cardField">
              <span className="textValue ">
                {!en.date
                  ? "Not defined"
                  : `${new Date(en.date).toDateString()}`}
              </span>
              <br /> Date
            </p>
          </div>
        </div>
      );
    });
  };
  return (
    <div key={trade._id}>
      <div className="tradeCard">
        <div className="tradeCardContainer">
          <div
            className={`tradeCardType ${
              trade.typeOfTrade === "Long" ? "black" : "grey"
            }`}
          >
            {trade.typeOfTrade.toUpperCase()}
          </div>
          <div className="dashboardCardText">
            <p className=" textMain cardField tickerName">
              <span className={`textValue `}>
                {`${trade.stockTicker}`}
                <br />
              </span>{" "}
              Stock Ticker
            </p>

            <p className=" textMain cardField">
              <span className="textValue ">
                {!trade.openPrice ? "Not defined" : ` $${trade.openPrice}`}
              </span>
              <br /> Open price
            </p>
            <p className=" textMain cardField">
              <span className={`textValue `}>
                {`$${
                  !trade.closingPriceCalculated
                    ? " "
                    : trade.closingPriceCalculated
                }`}{" "}
                <br />
              </span>{" "}
              Net Closing price
            </p>
            <p className=" textMain cardField">
              <span className={`textValue `}>
                {trade.currentHoldings} <br />
              </span>{" "}
              Current holdings
            </p>
            <p className="textMain">
              <span
                className={`${
                  trade.profitLoss > 0 ? "colorGreen" : "colorRed"
                } cardFieldtextValue textMain`}
              >
                {!trade.profitLoss
                  ? 0
                  : `$${formatCash(Math.abs(trade.profitLoss))}`}
                <br />
              </span>{" "}
              P/L
            </p>
          </div>
          <div className="tradeItemBtnContainer">
            <Link to={`/trade/${trade._id}`} className="btn primaryBtn">
              View Trade
            </Link>
            <div
              className="tradeItemCloseEntriesContainer btn secondryBtn"
              onClick={() => setCloseEntries(!showCloseEntires)}
            >
              <div>Closing Entries</div>
              <ArrowDropDownCircleIcon
                className={`closeEntriesShow ${
                  !showCloseEntires ? "arrowDropDownRight" : ""
                }`}
              />
            </div>
          </div>
        </div>
        <div className="tradeItemCloseEntriesShow"></div>

        <div>{showCloseEntires ? renderCloseEntries() : ""}</div>
      </div>
    </div>
  );
};
export default TradeItem;
