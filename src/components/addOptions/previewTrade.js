import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { getLocalStorage } from "../../helperFunctions/localstorage";
import { server_url } from "../../config";
import history from "../../utils/history";
import PreviewOptionsItem from "./previewOptionItem";
import { optionStrats } from "../../utils/staticData";
class PreviewTrade extends Component {
  renderLeg = () => {
    // this.calcStratLevelPremium();
    if (!this.props.trade) {
      history.push("/add-option");
    }
    return this.props.trade.leg.map((l, i) => {
      return <PreviewOptionsItem l={l} i={i} />;
    });
  };
  // calcStratLevelPremium = () => {
  //   let premium = 0;
  //   this.props.trade.leg.forEach((l) => {
  //     premium += l.premium;
  //   });
  //   premium < 0
  //     ? (this.props.trade.typeOfTrade = "short")
  //     : (this.props.trade.typeOfTrade = "long");
  //   this.props.trade.netPremium = premium;
  // };

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
            <h1 className="subHeading ">Preview Your Trade</h1>
            <ArrowBackIcon />
            <div className="previewOptionsTradeFormContainer">
              <div>
                <div className="formField">
                  <label className="formFieldLabel">Underlying</label>
                  <input
                    type="text"
                    onChange={(e) =>
                      (this.props.trade.underlying = e.target.value)
                    }
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
                    onChange={(e) =>
                      (this.props.trade.openDate = e.target.value)
                    }
                    align="right"
                    defaultValue={this.props.trade.openDate}
                  />
                </div>
                <div className="formField">
                  <label className="formFieldLabel">Strategy name</label>
                  <Select
                    required
                    options={optionStrats}
                    onChange={(e) => (this.props.trade.strategyName = e.value)}
                    placeholder={this.props.trade.strategyName}
                  />
                </div>
              </div>
              <div className="previewOptionsLegContainer marginTop">
                <div>{this.renderLeg()}</div>
              </div>
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
