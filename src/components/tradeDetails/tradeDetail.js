import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getSingleTrade } from "../../actions";
import "./tradeDetail.css";
import history from "../../utils/history";

class TradeDetails extends Component {
  componentDidMount() {
    this.props.getSingleTrade(this.props.match.params.id);
  }

  render() {
    if (!this.props.trade) {
      console.log("loading");
    }

    return (
      <div className="tradeDetail">
        <div className="tradeDetailsHeader">
          <div className=" goBackButton" onClick={() => history.push("/")}>
            Go back
          </div>
        </div>
        <div className="tradeDetailBadge">
          <div
            className={`tradeCardType ${
              this.props.trade.typeOfTrade === "Long" ? "green" : "red"
            } `}
          >
            {this.props.trade.typeOfTrade}
          </div>
        </div>
        <div className="editBtnContainer">
          <Link
            to={`/${this.props.trade._id}/close-trade`}
            className="btn primaryBtn "
          >
            Close Trade
          </Link>
          <Link
            to={`/${this.props.trade._id}/edit-trade`}
            className="btn secondryBtn marginleft"
          >
            Edit Trade
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <div className="tradeDetailsTextContainer">
            <div className="tradeDetailsTextContainerLeft">
              <p className=" textMain cardField">
                <span className="textDescription">Enrty price :</span>{" "}
                {!this.props.trade.openPrice
                  ? "Not defined"
                  : ` $${this.props.trade.openPrice}`}
              </p>
              <p className=" textMain cardField">
                <span className={`textDescription `}>Closing price :</span>{" "}
                {`${
                  !this.props.trade.closingPriceCalculated
                    ? "-"
                    : `$${this.props.trade.closingPriceCalculated}`
                }`}
              </p>
              <p className=" textMain cardField">
                <span className={`textDescription `}>Trade Quantity :</span>{" "}
                {!this.props.trade.tradeQuantity
                  ? "not defined"
                  : `${this.props.trade.tradeQuantity}`}
              </p>
              <p className=" textMain cardField">
                <span className={`textDescription `}>Current holding :</span>{" "}
                {this.props.trade.currentHoldings}
              </p>
              <p
                className={`${
                  this.props.trade.profitLoss > 0 ? "colorGreen" : "colorRed"
                } cardField`}
              >
                <span className="textDescription">P/L:</span>{" "}
                {!this.props.trade.profitLoss
                  ? 0
                  : `$${this.props.trade.profitLoss.toFixed(2)}`}
              </p>
            </div>
            <div className="tradeDetailsTextContainerRight">
              <p className=" textMain cardField">
                <span className={`textDescription `}>
                  Name of the security :
                </span>{" "}
                {`${this.props.trade.stockName}`}
              </p>
              <p className=" textMain cardField">
                <span className={`textDescription `}>
                  Ticker of the security :
                </span>{" "}
                {`$${this.props.trade.stockTicker}`}
              </p>
              <p className=" textMain cardField">
                <span className={`textDescription `}>Open Date :</span>{" "}
                {`${new Date(this.props.trade.openDate).toDateString()}`}
              </p>
              <p className=" textMain cardField">
                <span className={`textDescription `}>Close Date :</span>{" "}
                {`${
                  !this.props.trade.openTrade
                    ? " - "
                    : new Date(this.props.trade.closeDate).toDateString()
                }`}
              </p>
              <p className=" textMain cardField">
                <span className={`textDescription `}>Entry Date :</span>{" "}
                {`${new Date(this.props.trade.tradeCreatedOn).toDateString()}`}
              </p>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <div className="tradeDetailsTextContainer">
            {this.props.trade.notes}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    trade: state.singleTrade,
  };
};
export default connect(mapStateToProps, {
  getSingleTrade,
})(TradeDetails);
