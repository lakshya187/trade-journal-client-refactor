import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getSingleOptionsTrade } from "../../actions";
import { Link } from "react-router-dom";

import formatCash from "../../utils/formatCash";
import "./optionDetail.css";
const OptionDetail = ({ trade, match, getSingleOptionsTrade }) => {
  useEffect(() => {
    getSingleOptionsTrade(match.params.id);
  }, []);
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
            </div>
          </div>
        </div>
      );
    });
  };
  console.log(trade);
  if (!trade) return <div>Loading</div>;
  return (
    <div className="optionDetail">
      <div className="optionDetailContainer">
        <div className="optionDetailStratName">
          <div>{trade.strategyName}</div>
        </div>
        <div className="editBtnContainer">
          <Link to={`/option/close/${trade._id}`} className="btn primaryBtn ">
            Close Trade
          </Link>
          <Link
            //   to={`/${this.props.trade._id}/edit-trade`}
            className="btn secondryBtn marginleft"
          >
            Edit Trade
          </Link>
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
                <span className={`textDescription `}>Date :</span>{" "}
                {new Date(trade.date).toDateString()}
              </p>
              <p className="  cardField">
                <span className={`textDescription `}>Total Legs :</span>{" "}
                {trade.leg.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="subHeading marginTop " style={{ textAlign: "center" }}>
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
