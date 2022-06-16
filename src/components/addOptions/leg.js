import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

import { createOptionsTrade } from "../../actions";

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
    openDate: "",
    formDone: false,
    expireDate: "",
  };
  handleFormSubmit = () => {
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
      expireDate: "",
      formDone: true,
    });
  };

  handleAddNewLeg = () => {
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
    // this.setState({ formDone: true });
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
      expireDate: "",
    });
    console.log(this.props.preData);
  };

  validateForm = () => {
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
    this.setState({ formDone: true });
    // this.handleAddNewLeg();
  };
  handleRender = () => {
    if (!this.state.formDone) {
      return (
        <form>
          <ArrowBackIcon onClick={() => this.props.goBack()} />
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
                  onChange={(e) =>
                    this.setState({ expireDate: e.target.value })
                  }
                  align="right"
                  value={this.state.expireDate}
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
                  defaultValue={this.props.preData.openDate}
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
                // this.validateForm();
                this.handleAddNewLeg();
              }}
              className={"secondryBtn btn"}
            >
              Add Another leg
            </button>
            {this.state.formDone ? (
              <Link
                to={this.state.formDone ? "/preview-option-trade" : ""}
                onClick={(e) => {
                  this.validateForm();
                }}
                className={"primaryBtn btn"}
              >
                Submit
              </Link>
            ) : (
              <button disabled className="disabledBtn btn">
                Submit
              </button>
            )}
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
