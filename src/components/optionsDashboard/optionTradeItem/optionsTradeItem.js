import React, { useState } from "react";
import { Link } from "react-router-dom";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";

import "./optionsTradeItem.css";
import formatCash from "../../../utils/formatCash";
const OptionsTradeItem = ({ trade }) => {
  console.log(trade);
  const [showLegs, setShowLegs] = useState(false);
  const renderLegs = () => {
    return trade.leg.map((en) => {
      console.log(en);
      return (
        <div>
          {" "}
          <div className="closeEntries">
            <div className="closeEntriesContainer">
              <p className=" textMain cardField">
                <span className="textValue ">
                  {!en.premium ? "Not defined" : ` $${formatCash(en.premium)}`}
                </span>
                <br /> Premium
              </p>

              <p className=" textMain cardField">
                <span className="textValue ">
                  {!en.quantity ? "Not defined" : `${en.quantity}`}
                </span>
                <br /> Quantity
              </p>
              <p className=" textMain cardField">
                <span className="textValue ">
                  {!en.closingPremium
                    ? "Not Closed"
                    : `${en.closingPremium.toFixed(2)}`}
                </span>
                <br /> Close Premium
              </p>
              <p className=" textMain cardField">
                <span className="textValue ">
                  {!en.optionType ? "-" : `${en.optionType.toUpperCase()}`}
                </span>
                <br />
                Option Type
              </p>
              <p className=" textMain cardField">
                <span className="textValue ">
                  {!en.strike ? "-" : `${en.strike}`}
                </span>
                <br />
                Strike
              </p>
              <p className=" textMain cardField">
                <span className="textValue ">
                  {!en.typeOfTrade ? "-" : `${en.typeOfTrade.toUpperCase()}`}
                </span>
                <br />
                Type of Trade
              </p>
              <p className=" textMain cardField">
                <span className="textValue ">
                  {!en.lotSize ? "-" : `${en.lotSize}`}
                </span>
                <br />
                Lot Size
              </p>
              <p className=" textMain cardField">
                <span className="textValue ">
                  {!en.expireDate
                    ? "Not defined"
                    : `${new Date(en.expireDate).toDateString()}`}
                </span>
                <br /> Expire Date
              </p>
              <p className=" textMain cardField">
                <span className="textValue ">
                  {!en.closeDate
                    ? "Not closed"
                    : `${new Date(en.closeDate).toDateString()}`}
                </span>
                <br />
                Close Date
              </p>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div key={trade._id}>
      <div className="tradeCard">
        <div className="tradeCardContainer">
          <div className={`tradeCardTypeStrategy `}>
            {trade.strategyName.toUpperCase()}
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
                {`${!trade.underlying ? " " : trade.underlying}`} <br />
              </span>{" "}
              Underlying security
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
                  : `$${formatCash(Math.abs(trade.netProfitLoss)).toFixed()}`}
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
        <div className="tradeItemCloseEntriesShow"></div>

        <div>{!showLegs ? "" : renderLegs()}</div>
      </div>
    </div>
  );
};
export default OptionsTradeItem;
