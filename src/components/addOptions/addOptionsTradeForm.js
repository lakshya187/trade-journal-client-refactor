import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { createOptionsTrade } from "../../actions";
import Leg from "./leg";
import "./addOptionsTradeForm.css";

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
class AddOptionsForm extends Component {
  state = {
    ticker: "",
    underlying: "",
    strategyName: "",
    date: "",
    currentView: "genDetails",
    leg: [],
    updated: false,
  };
  onFormSubmit = () => {
    console.log(this.state);
    this.props.createOptionsTrade(this.state);
    this.setState({ currentView: "leg" });
  };
  updateView = () => {
    this.setState({ currentView: "genDetails" });
  };
  handleBackAction = () => {
    if (this.props.previousData && !this.state.updated) {
      this.setState({
        updated: true,
        ticker: this.props.previousData.ticker,
        underlying: this.props.previousData.underlying,
        strategyName: this.props.previousData.strategyName,
        date: this.props.previousData.date,
      });
    }
  };
  handleRender = () => {
    if (this.state.currentView === "genDetails") {
      this.handleBackAction();
      return (
        <form>
          <div className="formField">
            <label className="formFieldLabel">Underlying</label>
            <input
              type="text"
              align="right"
              required
              onChange={(e) => this.setState({ underlying: e.target.value })}
              value={this.state.underlying}
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel">Strategy name</label>
            <Select
              required
              options={optionStrats}
              onChange={(e) => this.setState({ strategyName: e.value })}
              // value={this.state.strategyName}
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel">Stock Ticker</label>
            <input
              required
              type="text"
              onChange={(e) => this.setState({ ticker: e.target.value })}
              align="right"
              value={this.state.ticker}
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel"> Date</label>
            <input
              required
              type="datetime-local"
              onChange={(e) => this.setState({ date: e.target.value })}
              align="right"
              value={this.state.date}
            />
          </div>
          <div
            className="submitBtnContainer
          "
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                this.onFormSubmit();
              }}
              className={"primaryBtn btn"}
            >
              Add a leg
            </button>
          </div>
        </form>
      );
    } else if (this.state.currentView === "leg") {
      return <Leg goBack={this.updateView} />;
    }
  };
  render() {
    return (
      <div className="OptionsTradeForm">
        <div className="addOptionsTradeContainer">
          <div className="addOptionsTradeForm">{this.handleRender()}</div>
        </div>
      </div>
    );
  }
}

const mapPropsToState = (state) => {
  return {
    previousData: state.newOptionTrade,
  };
};
export default connect(mapPropsToState, { createOptionsTrade })(AddOptionsForm);
