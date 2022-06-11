import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import axios from "axios";

import { getLocalStorage } from "../../helperFunctions/localstorage";
import { server_url } from "../../config";

import history from "../../utils/history";
import PreviewOptionsItem from "./previewOptionItem";

const optionStrats = [
  { value: "Bull Call Spread", label: "Bull Call Spread" },
  { value: "Orientation", label: "Orientation" },
  { value: "Bull Put Spread", label: "Bull Put Spread" },
  { value: "Call Ratio Back Spread", label: "Call Ratio Back Spread" },
  { value: "Bear Call Ladder", label: "Bear Call Ladder" },
  { value: "Synthetic Long & Arbitrage", label: "Synthetic Long & Arbitrage" },
  { value: "Bear Put Spread", label: "Bear Put Spread" },
  { value: "Bear Call Spread", label: "Bear Call Spread" },
  { value: "Put Ratio Back spread", label: "Put Ratio Back spread" },
  { value: "The Long Straddle", label: "The Long Straddle" },
  { value: "The Short Straddle", label: "The Short Straddle" },
  { value: "The Long & Short Strangle", label: "The Long & Short Strangle" },
  { value: "Max Pain & PCR Ratio", label: "Max Pain & PCR Ratio" },
  { value: "Iron Condor", label: "Iron Condor" },
];
class PreviewTrade extends Component {
  renderLeg = () => {
    if (!this.props.trade) {
      history.push("/add-option");
    }
    return this.props.trade.leg.map((l, i) => {
      return <PreviewOptionsItem l={l} i={i} />;
    });
  };
  // componentDidMount() {}
  handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${server_url}/options`, this.props.trade, {
        headers: {
          Authorization: `Bearer ${getLocalStorage()}`,
        },
      });
      console.log(res);
      history.push("/options-dashboard");
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    if (!this.props.trade) {
      history.push("/add-option");
    }
    console.log(this.props.trade);

    return (
      <div className="previewOptionsTrade">
        <div className="previewOptionsTradeContainer">
          <form>
            <h1 className="subHeading marginBottom">Preview Your Trade</h1>
            <div className="formField">
              <label className="formFieldLabel">Underlying</label>
              <input
                type="text"
                onChange={(e) => (this.props.trade.underlying = e.target.value)}
                align="right"
                defaultValue={this.props.trade.underlying}
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel">Ticker</label>
              <input
                type="text"
                onChange={(e) => (this.props.trade.ticker = e.target.value)}
                align="right"
                defaultValue={this.props.trade.ticker}
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel">Date</label>
              <input
                type="datetime-local"
                onChange={(e) => (this.props.trade.date = e.target.value)}
                align="right"
                defaultValue={this.props.trade.date}
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel">Strategy name</label>
              <Select
                required
                options={optionStrats}
                onChange={(e) => (this.props.trade.strategyName = e.value)}
                // value={this.state.strategyName}
                // value={this.props.trade.strategyName}
                placeholder={this.props.trade.strategyName}
              />
            </div>
            <div className="previewOptionsLegContainer marginTop">
              <div>{this.renderLeg()}</div>
            </div>
            <button
              className={"btn primaryBtn marginTop"}
              onClick={this.handleFormSubmit}
            >
              Submit
            </button>
          </form>
        </div>
        <div className="previewTradeDirections"></div>
      </div>
    );
  }
}
const mapPropsToState = (state) => {
  return {
    trade: state.newOptionTrade,
  };
};
export default connect(mapPropsToState)(PreviewTrade);
