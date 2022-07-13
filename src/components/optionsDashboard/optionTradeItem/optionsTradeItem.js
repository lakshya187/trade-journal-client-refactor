import React, { useState } from "react";
import { Link } from "react-router-dom";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";

import { Redirect } from "react-router-dom";
import { server_url } from "../../../config";
import axios from "axios";
import "./optionsTradeItem.css";
import formatCash from "../../../utils/formatCash";
const OptionsTradeItem = ({ trade }) => {
  const [showLegs, setShowLegs] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");
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
  const handleOauthGetToken = async () => {
    try {
      const { data } = await axios.post(
        `${server_url}/oAuth/generateSignature`,
        null
      );
      console.log(data);
      // return <Redirect push to={data.oauthString} />;
      setRedirectUrl(data.oauthString);
      setRedirect(true);
    } catch (e) {
      console.log(e);
    }
  };
  const redirectUser = () => {
    console.log(redirectUrl);
  };

  return (
    <div key={trade._id}>
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
            <div onClick={() => handleOauthGetToken()}>Twitter</div>
          </div>
        </div>

        <div className="marginBottom">{!showLegs ? "" : renderLegs()}</div>
      </div>
      {redirect ? redirectUser() : null}
    </div>
  );
};
export default OptionsTradeItem;
