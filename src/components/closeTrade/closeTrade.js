import React, { Component } from "react";
import { Form, Field } from "redux-form";
import { connect } from "react-redux";
import axios from "axios";

import history from "../../utils/history";
import { getSingleTrade } from "../../actions";
import "./closeTrade.css";
import { server_url } from "../../config";
class CloseTrade extends Component {
  state = {
    price: this.props.trade.openPrice,
    quantity: this.props.trade.currentHoldings,
  };
  componentDidMount() {
    this.props.getSingleTrade(this.props.match.params.id);
  }
  onFormSubmit = async () => {
    try {
      const updatedTrade = await axios.patch(
        `${server_url}/trades/updateClosing/${this.props.trade._id}`,
        {
          data: { ...this.state },
        }
      );
      console.log(updatedTrade);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    if (!this.props.trade) {
      return;
    }
    return (
      <div className="closeTradeForm">
        {!this.props.trade.typeOfTrade ? (
          <div></div>
        ) : (
          <div
            className={`tradeCardType ${
              this.props.trade.typeOfTrade === "Long" ? "green" : "red"
            }`}
          >
            {this.props.trade.typeOfTrade.toUpperCase()}
          </div>
        )}
        <div className="closeTradeFields">
          <div className=" textMain cardField">
            Current Holdings :{" "}
            <span className="mainValue">
              {" "}
              {this.props.trade.currentHoldings}
            </span>
          </div>
          <div className=" textMain cardField">
            Opening Quatity :{" "}
            <span className="mainValue">{this.props.trade.tradeQuantity}</span>
          </div>
          <div style={{ textAlign: "left" }} className=" textMain cardField">
            Opening Price :{" "}
            <span className="mainValue">{this.props.trade.openPrice}</span>
          </div>
        </div>
        <form className="">
          <div className="formField">
            <label className="formFieldLabel">Price</label>
            <input
              type="number"
              align="right"
              onChange={(e) => this.setState({ price: +e.target.value })}
              value={this.state.price}
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel">Quantity</label>
            <input
              type="number"
              align="right"
              onChange={(e) => this.setState({ quantity: +e.target.value })}
              value={this.state.quantity}
            />
          </div>
          <div className={"closeTradeBtnContainer"}>
            <button
              className={`btn primaryBtn closeTradeSubmit`}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                this.onFormSubmit();
              }}
            >
              Submit
            </button>
            <button
              className="btn secondryBtn closeTradeSubmit"
              onClick={(e) => {
                e.preventDefault();
                history.push(`/trade/${this.props.trade._id}`);
              }}
            >
              Go back
            </button>
          </div>
        </form>
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
})(CloseTrade);
