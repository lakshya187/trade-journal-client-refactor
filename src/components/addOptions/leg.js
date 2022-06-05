import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

import { createOptionsTrade } from "../../actions";
import { server_url } from "../../config";
import { getLocalStorage } from "../../helperFunctions/localstorage";

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
    premium: 0,
    lotSize: 0,
    quantity: 0,
    optionType: "",
    strike: 0,
    typeOfTrade: "",
    openDate: "",
    formDone: false,
  };
  handleFormSubmit = () => {
    console.log("worked");
    if (this.props.preData.leg.length === 3) {
      return;
    }
    const legData = { ...this.state };
    this.props.preData.leg.push(legData);
    this.setState({
      premium: 0,
      lotSize: 0,
      quantity: 0,
      strike: 0,
      openDate: "",
    });
    console.log(this.props.preData);
  };
  handleAddNewLeg = () => {
    if (this.props.preData.leg.length === 3) {
      return;
    }
    const legData = { ...this.state };
    this.props.preData.leg.push(legData);
    this.setState({
      premium: 0,
      lotSize: 0,
      quantity: 0,
      strike: 0,
      openDate: "",
    });
    console.log(this.props.preData);
  };
  handleRender = () => {
    if (!this.state.formDone) {
      return (
        <form>
          <ArrowBackIcon onClick={() => this.props.goBack()} />
          <div className="subHeading marginBottom marginTop">Add Legs</div>
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
            <label className="formFieldLabel">Lot Size</label>
            <input
              type="number"
              onChange={(e) => this.setState({ lotSize: +e.target.value })}
              align="right"
              value={this.state.lotSize}
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
            <label className="formFieldLabel">Option Type</label>
            <Select
              options={options}
              onChange={(e) => this.setState({ optionType: e.value })}
              // placeholder={this.state.typeOfTrade}
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
          <div className="formField">
            <label className="formFieldLabel">Open Date</label>
            <input
              type="datetime-local"
              onChange={(e) => this.setState({ openDate: e.target.value })}
              align="right"
              value={this.state.openDate}
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel">Type of Trade</label>
            <Select
              options={typeOfTrade}
              onChange={(e) => this.setState({ typeOfTrade: e.value })}
              // defaultInputValue={this.state.typeOfTrade}
            />
          </div>
          <div className="submitBtnContainer">
            <button
              onClick={(e) => {
                e.preventDefault();
                this.handleAddNewLeg();
              }}
              className={"primaryBtn btn"}
            >
              Add Another leg
            </button>
            <Link
              to={"/preview-option-trade"}
              onClick={(e) => {
                e.preventDefault();
                this.handleFormSubmit();
              }}
              className={"secondryBtn btn"}
            >
              Submit
            </Link>
          </div>
        </form>
      );
    }
  };
  render() {
    return <div className="addLegContainer">{this.handleRender()}</div>;
  }
}

const mapPropsToState = (state) => {
  return {
    preData: state.newOptionTrade,
  };
};

export default connect(mapPropsToState, { createOptionsTrade })(Leg);
