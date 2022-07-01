import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import CloseLegModal from "../closeOptions/closeLegModal";
import history from "../../utils/history";
import { getSingleOptionsTrade } from "../../actions";
import formatCash from "../../utils/formatCash";
import "./optionDetail.css";
const OptionDetail = ({ trade, match, getSingleOptionsTrade }) => {
  useEffect(() => {
    getSingleOptionsTrade(match.params.id);
  }, []);
  const [updatedTrade, setUpdatedTrade] = useState(null);
  const goBack = () => {
    history.push("/options-dashboard");
  };
  const renderTags = () => {
    console.log(trade.tags);
    return trade.tags.map((el) => {
      return <div className="tagsItem">{el.text}</div>;
    });
  };

  const renderLegs = () => {
    return trade.leg.map((en) => {
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
                  {!en.expireDate
                    ? "Not defined"
                    : `${new Date(en.expireDate).toDateString()}`}
                </span>
                <br /> Expire Date
              </p>
              <p className=" textMain cardField">
                <span className="textValue ">
                  {!en.closingPremium
                    ? "Not Closed"
                    : `$${en.closingPremium.toFixed(2)}`}
                </span>
                <br /> Close Premium
              </p>
              <p className=" textMain cardField">
                <span className="textValue ">
                  {!en.closeDate
                    ? "Not closed"
                    : `${new Date(en.closeDate).toDateString()}`}
                </span>
                <br /> Close Date
              </p>
              <p className=" textMain cardField">
                <span className="textValue ">
                  {!en.openDate
                    ? "-"
                    : `${new Date(en.openDate).toDateString()}`}
                </span>
                <br /> Open Date
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
                <span
                  className={`${
                    en.profitLoss > 0 ? "colorGreen" : "colorRed"
                  } cardFieldtextValue textMain cardField`}
                >
                  ${!en.profitLoss ? "-" : `${en.profitLoss}`}
                </span>
                <br />
                MTM
              </p>
              <CloseLegModal
                updatedTrade={setUpdatedTrade}
                leg={en}
                trade={trade._id}
              />
            </div>
          </div>
        </div>
      );
    });
  };
  if (!trade) return <div>Loading</div>;
  return (
    <div className="optionDetail">
      <div className="optionDetailContainer">
        <div className="optionDetailContainerBackground">
          <div className="optionDetailGoBack" onClick={(e) => goBack()}>
            Go back
          </div>
          <div className="optionDetailStratName">
            <div>{trade.strategyName}</div>
          </div>
        </div>
        <div className="editBtnContainer">
          <Link
            to={`/option/close-strat/${trade._id}`}
            className="btn primaryBtn "
          >
            Close Trade
          </Link>
          <Link className="btn secondryBtn marginleft">Edit Trade</Link>
        </div>
        <div className="optionsDEtailsGen">
          <div className="optionsDetailGeneralInfoContainer">
            <div className="tradeDetailsTextContainerLeft">
              <p className="  cardField">
                <span className="textDescription">Ticker :</span> {trade.ticker}
              </p>
              <p className="  cardField">
                <span className={`textDescription `}>Underlying :</span>{" "}
                {trade.underlying}
              </p>
              <p className="  cardField">
                <span className={`textDescription `}>Open Date :</span>{" "}
                {new Date(trade.openDate).toDateString()}
              </p>
              <p className="  cardField">
                <span className={`textDescription `}>Expire Date :</span>{" "}
                {new Date(trade.expireDate).toDateString()}
              </p>
            </div>
            <div className="tradeDetailsTextContainerRight">
              <p className="  cardField">
                <span className={`textDescription `}>Net Premium :</span> $
                {trade.netPremium}
              </p>
              <p className="  cardField">
                <span className={`textDescription `}>Type of :</span>{" "}
                {trade.typeOfTrade}
              </p>
              <p
                className={`${
                  trade.netProfitLoss > 0 ? "colorGreen" : "colorRed"
                } cardFieldtextValue textMain cardField`}
              >
                <span className={`textDescription  `}>MTM :</span> $
                {trade.netProfitLoss}
              </p>
              <p className="  cardField">
                <span className={`textDescription `}>Total Legs :</span>{" "}
                {trade.leg.length}
              </p>
            </div>
          </div>
        </div>
        <div className={"tagsContainer"}>Tags : {renderTags()}</div>
      </div>

      <div className="subHeading " style={{ textAlign: "center" }}>
        All the legs
        <div>{renderLegs()}</div>
      </div>
      <div className="optionDetailNotesContainer marginTop marginBottom">
        <div>{trade.notes}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    trade: state.singleOptiontrade,
  };
};
export default connect(mapStateToProps, { getSingleOptionsTrade })(
  OptionDetail
);
