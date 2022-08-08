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
    <tr className="optionsTableRowContainer">
      <td>
        <div
          className={`tradeCardTypeStrategy ${
            trade.profitLoss > 0 ? "backgroundColorGreen" : "backgroundColorRed"
          }  `}
        >
          {trade.typeOfTrade.toUpperCase()}
        </div>
      </td>
      <td>{trade.stockName}</td>
      <td>{trade.openPrice}</td>
      <td>{trade.closingPriceCalculated}</td>
      <td>{trade.currentHoldings}</td>

      <td>
        <div
          className={`${
            trade.profitLoss > 0 ? "colorGreen" : "colorRed"
          } cardFieldtextValue textMain`}
        >
          {!trade.profitLoss ? 0 : `$${formatCash(Math.abs(trade.profitLoss))}`}
          <br />
        </div>
      </td>
      <td>
        <Link to={`/trade/${trade._id}`} className="btn secondryBtn">
          View Trade
        </Link>
      </td>
    </tr>
  );
};
export default TradeItem;
