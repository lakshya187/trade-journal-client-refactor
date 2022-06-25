import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

import { createOptionsTrade } from "../../actions";
import PreviewTrade from "./previewTrade";
const options = [
  { value: "call", label: "Call" },
  { value: "put", label: "Put" },
];
const typeOfTrade = [
  { value: "short", label: "Short" },
  { value: "long", label: "Long" },
];

class Leg extends Component {
  state = {
    premium: "",
    lotSize: 100,
    quantity: 1,
    optionType: "",
    strike: "",
    typeOfTrade: "",
    openDate: this.props.preData.openDate,
    expireDate: this.props.preData.expireDate,
    formDone: false,
  };
  handleFormSubmit = (e) => {
    if (this.props.preData.leg.length === 3) {
      return;
    }
    const legData = { ...this.state };
    this.props.preData.leg.push(legData);
    this.setState({
      premium: "",
      lotSize: "",
      quantity: "",
      strike: "",
      openDate: this.props.preData.openDate,
      expireDate: this.props.preData.expireDate,
      formDone: true,
    });

    this.renderPreviewTrade();
  };

  handleAddNewLeg = () => {
    if (this.props.preData.leg.length === 3) {
      return;
    }
    const legData = { ...this.state };
    this.props.preData.leg.push(legData);
    this.setState({
      premium: "",
      lotSize: 100,
      quantity: 1,
      strike: "",
      openDate: this.props.preData.openDate,
      expireDate: this.props.preData.expireDate,
    });
    console.log(this.props.preData);
  };

  validateForm = (handler) => {
    console.log(this.state);
    if (
      this.state.premium === "" ||
      this.state.openDate === "" ||
      this.state.optionType === "" ||
      this.state.expireDate === "" ||
      this.state.openDate === "" ||
      this.state.strike === "" ||
      this.state.optionType === ""
    ) {
      console.log("Form validation failed");
      return;
    }
    handler();
  };
  goBack = () => {
    this.setState({ formDone: true });
  };
  renderPreviewTrade = () => {
    return <PreviewTrade goBack={this.goBack} />;
  };
  setPremium = (type) => {
    console.log(type);
    let pre = this.state.premium;
    if (type === "short") {
      pre = -this.state.premium;
      console.log(pre);
      this.setState({ premium: pre });
    }
    if (type === "long" && this.state.premium < 0) {
      pre = -1 * this.state.premium;
      this.setState({ premium: pre });
    }
  };
  handleRender = () => {
    return (
      <form>
        <ArrowBackIcon onClick={() => this.props.goBack()} />
        <div className="addNewLegGenDetails">
          <div className="bodyCopy">
            {`${this.props.preData.underlying}-${this.props.preData.strategyName}`}
          </div>
        </div>
        <div className="subHeading  addOptionLegHeading  marginTop">
          Add Legs
        </div>
        <div className="addOptionLeg">
          <div className="addOptionsLegLeft">
            <div className="formField">
              <label className="formFieldLabel">Option Type</label>
              <Select
                options={options}
                onChange={(e) => this.setState({ optionType: e.value })}
                // placeholder={this.state.typeOfTrade}
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel">Expiry Date</label>
              <input
                type="date"
                onChange={(e) => this.setState({ expireDate: e.target.value })}
                align="right"
                value={this.state.expireDate}
                // defaultValue={}
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel">Premium</label>
              <input
                type="number"
                align="right"
                onChange={(e) => this.setState({ premium: +e.target.value })}
                value={this.state.premium}
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel">Strike</label>
              <input
                type="number"
                onChange={(e) => this.setState({ strike: +e.target.value })}
                align="right"
                value={this.state.strike}
              />
            </div>
          </div>
          <div className="addOptionsLegRight">
            <div className="formField">
              <label className="formFieldLabel">Open Date</label>
              <input
                type="datetime-local"
                onChange={(e) => this.setState({ openDate: e.target.value })}
                align="right"
                value={this.state.openDate}
                // defaultValue={this.props.preData.openDate}
              />
            </div>

            <div className="formField">
              <label className="formFieldLabel">Type of Trade</label>
              <Select
                options={typeOfTrade}
                onChange={(e) => {
                  this.setState({ typeOfTrade: e.value });
                  this.setPremium(e.value);
                }}
                // defaultInputValue={this.state.typeOfTrade}
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel">Quantity</label>
              <input
                type="number"
                onChange={(e) => this.setState({ quantity: +e.target.value })}
                align="right"
                value={this.state.quantity}
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel">Lot Size</label>
              <input
                type="number"
                onChange={(e) => this.setState({ lotSize: +e.target.value })}
                align="right"
                value={this.state.lotSize}
              />
            </div>
          </div>
        </div>
        <div className="submitBtnContainer">
          <button
            onClick={(e) => {
              e.preventDefault();
              this.validateForm(this.handleAddNewLeg);
            }}
            className={"secondryBtn btn"}
          >
            Add Another leg
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              this.validateForm(this.handleFormSubmit);
            }}
            className={"primaryBtn btn"}
          >
            Submit
          </button>
        </div>
      </form>
    );
  };
  render() {
    return (
      <div className="addLegContainer">
        {!this.state.formDone ? this.handleRender() : this.renderPreviewTrade()}
      </div>
    );
  }
}

const mapPropsToState = (state) => {
  return {
    preData: state.newOptionTrade,
  };
};

export default connect(mapPropsToState, { createOptionsTrade })(Leg);
