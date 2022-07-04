import React, { Component } from "react";
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
import { getSingleTrade } from "../../actions";
import history from "../../utils/history";
import { async } from "@firebase/util";

class TradeDetails extends Component {
  state = {
    trade: null,
  };
  componentDidMount() {
    this.getData();
  }
  renderAnalysis = (fallback, img) => {
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
  getData = async () => {
    const response = await axios.get(
      `${server_url}/trades/${this.props.match.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${getLocalStorage()}`,
        },
      }
    );

    this.setState({ trade: response.data.data.trade });
  };
  render() {
    if (!this.state.trade) {
      return <LinearProgress />;
    }

    return (
      <div className="tradeDetail">
        <div className="tradeDetailsHeader">
          <div className=" goBackButton" onClick={() => history.push("/")}>
            Go back
          </div>
        </div>
        <div className="tradeDetailBadge">
          {!this.state.trade.typeOfTrade ? (
            <div></div>
          ) : (
            <div
              className={`tradeCardType ${
                this.state.trade.typeOfTrade === "Long" ? "black" : "grey"
              }`}
            >
              {this.state.trade.typeOfTrade.toUpperCase()}
            </div>
          )}
        </div>
        <div className="editBtnContainer">
          <Link
            to={`/${this.state.trade._id}/close-trade`}
            className="btn primaryBtn "
          >
            Close Trade
          </Link>
          <Link
            to={`/${this.state.trade._id}/edit-trade`}
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
              <p className="cardField">
                <span className="textDescription">Enrty price :</span>{" "}
                {!this.state.trade.openPrice
                  ? "Not defined"
                  : ` $${formatCash(this.state.trade.openPrice)}`}
              </p>
              <p className="cardField">
                <span className={`textDescription `}>Closing price :</span>{" "}
                {`${
                  !this.state.trade.closingPriceCalculated
                    ? "-"
                    : `$${formatCash(this.state.trade.closingPriceCalculated)}`
                }`}
              </p>
              <p className="cardField">
                <span className={`textDescription `}>Trade Quantity :</span>{" "}
                {!this.state.trade.tradeQuantity
                  ? "not defined"
                  : `${this.state.trade.tradeQuantity}`}
              </p>
              <p className="cardField">
                <span className={`textDescription `}>Current holding :</span>{" "}
                {this.state.trade.currentHoldings}
              </p>
              <p
                className={`${
                  this.state.trade.profitLoss > 0 ? "colorGreen" : "colorRed"
                } cardField`}
              >
                <span className="textDescription">P/L:</span>{" "}
                {!this.state.trade.profitLoss
                  ? 0
                  : `$${formatCash(this.state.trade.profitLoss.toFixed(2))}`}
              </p>
            </div>
            <div className="tradeDetailsTextContainerRight">
              <p className="cardField">
                <span className={`textDescription `}>
                  Name of the security :
                </span>{" "}
                {`${this.state.trade.stockName}`}
              </p>
              <p className="cardField">
                <span className={`textDescription `}>
                  Ticker of the security :
                </span>{" "}
                {`$${this.state.trade.stockTicker}`}
              </p>
              <p className="cardField">
                <span className={`textDescription `}>Open Date :</span>{" "}
                {`${new Date(this.state.trade.openDate).toDateString()}`}
              </p>
              <p className="cardField">
                <span className={`textDescription `}>Close Date :</span>{" "}
                {`${
                  !this.state.trade.openTrade
                    ? " - "
                    : new Date(this.state.trade.closeDate).toDateString()
                }`}
              </p>
              <p className="cardField">
                <span className={`textDescription `}>Entry Date :</span>{" "}
                {`${new Date(this.state.trade.tradeCreatedOn).toDateString()}`}
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
            {this.state.trade.notes}
          </div>
        </div>
        <div className="tradeDetailAnalysis marginTop">
          <div className="tradeDetailAnalysisHeading subHeading">Analysis</div>
          <div className="tradeDetailAnalysisContainer marginTop">
            <div className="tradeDetailAnalysisBuying">
              <div className="bodyCopy tradeDetailAnalysisSubHeading">
                Buying Analysis
              </div>
              {this.renderAnalysis(
                entryAnalysisFallBack,
                this.state.trade.entryAnalysis
              )}
            </div>
            <div className="tradeDetailAnalysisSelling tradeDetailAnalysisItem">
              <div className="bodyCopy tradeDetailAnalysisSubHeading ">
                Selling Analysis
              </div>

              {this.renderAnalysis(
                exitAnalysisFallBack,
                this.state.trade.exitAnalysis
              )}
            </div>
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
