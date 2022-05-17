/* jshint ignore:start */
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { server_url } from "../../config";

import authorizeUser from "../../helperFunctions/authorizeUser";
import { getLocalStorage } from "../../helperFunctions/localstorage";
import history from "../../utils/history";
import Modal from "../../modal/modal";
import { getTrades, authorizedUser } from "../../actions";
import "./main-dashboard.css";
import { LinearProgress } from "@mui/material";
class MainDashboard extends React.Component {
  state = {
    trades: null,
  };

  componentDidMount() {
    this.props.getTrades();
  }
  getData = async () => {
    const response = await axios.get(`${server_url}/trades`, {
      headers: {
        Authorization: `Bearer ${getLocalStorage()}`,
      },
    });
    this.setState({ trades: response.data.data.trades });
  };
  renderModal = () => {
    return <Modal title={"Add a new Trade"} content={"This is a modal"} />;
  };

  renderTradeCards() {
    return this.props.trades.map((el) => {
      return (
        <Link to={`/trade/${el._id}`} key={el._id}>
          <div className="tradeCard">
            <div className="tradeCardLeft">
              <div
                className={`tradeCardType ${
                  el.typeOfTrade === "Long" ? "green" : "red"
                }`}
              >
                {el.typeOfTrade.toUpperCase()}
              </div>
              <div className="tradeCardLeftTextContainer">
                <p className=" textMain cardField">
                  <span className="textDescription ">Open price :</span>{" "}
                  {!el.openPrice ? "Not defined" : ` $${el.openPrice}`}
                </p>
                <p className=" textMain cardField">
                  <span className={`textDescription `}>Closing price :</span>{" "}
                  {`$${
                    !el.closingPriceCalculated ? " " : el.closingPriceCalculated
                  }`}
                </p>
                <p className=" textMain cardField">
                  <span className={`textDescription `}>Trade quantity :</span>{" "}
                  {!el.tradeQuantity ? "not defined" : `${el.tradeQuantity}`}
                </p>
                <p className=" textMain cardField">
                  <span className={`textDescription `}>Current holdings :</span>{" "}
                  {el.currentHoldings}
                </p>
                <p
                  className={`${
                    el.profitLoss > 0 ? "colorGreen" : "colorRed"
                  } cardField textMain`}
                >
                  <span className="textDescription textMain">P/L:</span>{" "}
                  {!el.profitLoss ? 0 : `$${el.profitLoss.toFixed(2)}`}
                </p>
              </div>
            </div>
            <div className="tradeCardRight">
              <p className=" textMain cardField">
                <span className={`textDescription `}>
                  Name of the security :
                </span>{" "}
                {`${el.stockName}`}
              </p>
              <p className=" textMain cardField">
                <span className={`textDescription `}>
                  Ticker of the security :
                </span>{" "}
                {`$${el.stockTicker}`}
              </p>
              <p className=" textMain cardField">
                <span className={`textDescription `}>Entry Date :</span>{" "}
                {`${new Date(el.openDate).toDateString()}`}
              </p>
              <p className=" textMain cardField">
                <span className={`textDescription `}>Closing Date :</span>{" "}
                {`${!el.closeDate ? " - " : el.closeDate}`}
              </p>
              <p className=" textMain cardField">
                <span className={`textDescription `}>Entry Date :</span>{" "}
                {`${new Date(el.tradeCreatedOn).toDateString()}`}
              </p>
            </div>
          </div>
        </Link>
      );
    });
  }
  render() {
    if (!this.props.trades) {
      return <LinearProgress color="inherit" />;
    }

    return (
      <div>
        <div className="createNewTradeContainer">
          <Link
            to={"/add-new-trade"}
            className="createANewTradeBtn"
            onClick={(e) => {
              return this.renderModal();
            }}
          >
            Create a new Trade +
          </Link>
          <div className="allTradesContainer">
            <div className="tradeCardContainer">{this.renderTradeCards()}</div>
            <div className="tradeAnalyticsContainer"></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.currentUser,
    trades: state.getAllTrades,
  };
};
export default connect(mapStateToProps, { getTrades, authorizedUser })(
  MainDashboard
);
