import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
  };
  handleFormSubmit = async () => {
    try {
      if (this.props.preData.leg.length === 3) {
        return;
      }
      const legData = { ...this.state };
      this.props.preData.leg.push(legData);
      this.setState({
        premium: 0,
        lotSize: 0,
        quantity: 0,
        optionType: "",
        strike: 0,
        typeOfTrade: "",
        openDate: "",
      });

      const res = await axios.post(
        `${server_url}/options`,
        this.props.preData,
        {
          headers: {
            Authorization: `Bearer ${getLocalStorage()}`,
          },
        }
      );
      console.log(res);
      console.log(this.props.preData);
    } catch (e) {
      console.log(e);
    }
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
      optionType: "",
      strike: 0,
      typeOfTrade: "",
      openDate: "",
    });
  };
  render() {
    // console.log(this.props.preData);
    return (
      <form>
        <ArrowBackIcon onClick={() => this.props.goBack()} />
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
            type="date"
            onChange={(e) => this.setState({ openDate: e.target.value })}
            align="right"
            value={this.state.openDate}
          />
        </div>
        <div className="formField">
          <label className="formFieldLabel">Type of Trade</label>
          <Select
            options={typeOfTrade}
            onChange={(e) => this.setState({ optionType: e.value })}
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
          <button
            onClick={(e) => {
              e.preventDefault();
              this.handleFormSubmit();
            }}
            className={"secondryBtn btn"}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

const mapPropsToState = (state) => {
  return {
    preData: state.newOptionTrade,
  };
};

export default connect(mapPropsToState)(Leg);
