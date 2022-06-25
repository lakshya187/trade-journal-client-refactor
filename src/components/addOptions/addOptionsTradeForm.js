import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { createOptionsTrade } from "../../actions";
import Leg from "./leg";
import "./addOptionsTradeForm.css";
import { optionStrats } from "../../utils/staticData";
import AddTags from "../addTags/addTags";

class AddOptionsForm extends Component {
  state = {
    ticker: "",
    underlying: "",
    strategyName: "",
    openDate: "",
    currentView: "genDetails",
    leg: [],
    updated: false,
    tags: [],
    expireDate: "",
  };
  onFormSubmit = () => {
    // const tags = this.state.tags.map((el) => el.text);
    // console.log(this.state);
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
        openDate: this.props.previousData.date,
      });
    }
  };
  updateTags = (obj) => {
    this.setState({ tags: obj });
  };
  renderExpireDate = () => {
    return (
      <div className="formField">
        <label className="formFieldLabel"> Expire Date</label>
        <input
          required
          type="date"
          onChange={(e) => this.setState({ expireDate: e.target.value })}
          align="right"
          value={this.state.expireDate}
          // disabled={true}
        />
      </div>
    );
  };
  handleRender = () => {
    if (this.state.currentView === "genDetails") {
      this.handleBackAction();

      return (
        <form>
          <div className="subHeading marginBottom">Add an Options Trade!</div>
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
            <label className="formFieldLabel">Open Date</label>
            <input
              required
              type="datetime-local"
              onChange={(e) => this.setState({ openDate: e.target.value })}
              align="right"
              value={this.state.openDate}
            />
          </div>
          {this.state.strategyName === "Calendar" ||
          this.state.strategyName === "Double Calendar"
            ? null
            : this.renderExpireDate()}

          <div className="formField">
            <label className="formFieldLabel">Add Tags</label>
            <div className="formFiedlAddTags">
              <AddTags addTags={this.updateTags} />
            </div>
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
