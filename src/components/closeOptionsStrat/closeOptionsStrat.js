import React, { Component } from "react";
import { server_url } from "../../config";
import axios from "axios";
import "./closeOptionsStrat.css";
import { getLocalStorage } from "../../helperFunctions/localstorage";
import { CircularProgress } from "@mui/material";
import { closeOptionStrat } from "../../actions/index";
import { connect } from "react-redux";
import history from "../../utils/history";

import CloseOptionsItem from "./closeOptionsItem";

class CloseOptionsStrat extends Component {
  state = {
    trade: null,
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      data: this.props.t,
    };
    // console.log(this.props.t);
    const res = await axios.patch(
      `${server_url}/options/updateClosingStrat/${this.props.match.params.id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${getLocalStorage()}`,
        },
      }
    );
    console.log(res);
    history.push("/options-dashboard");
  };
  updateLegData = (i, p) => {
    this.props.t[i].data.premium = p;
  };

  loadData = async () => {
    const { data } = await axios.get(
      `${server_url}/options/${this.props.match.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${getLocalStorage()}`,
        },
      }
    );
    this.setState({ trade: data.data });
    const closeStart = this.state.trade.leg.map((l) => {
      return {
        strike: l.strike,
        optionType: l.optionType,
        data: {
          premium: l.premium,
          date: Date.now(),
          quantity: l.quantity,
        },
      };
    });
    // console.log
    this.props.closeOptionStrat(closeStart);
  };
  componentDidMount() {
    this.loadData();
  }
  renderFields = () => {
    if (!this.state.trade)
      return <div style={{ marginTop: "100px" }}> Loading</div>;
    return this.state.trade.leg.map((l, i) => {
      return (
        <CloseOptionsItem l={l} i={i} id={i} updateLeg={this.updateLegData} />
      );
    });
  };
  render() {
    if (!this.state.trade) return <CircularProgress />;
    return (
      <div className="closeOptionsStrat">
        <div className="closeOptionsStratContainer">
          <form>
            {this.renderFields()}
            <button
              className="btn primaryBtn marginTop marginBottom"
              onClick={(e) => this.handleSubmit(e)}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapPropsToState = (state) => {
  return {
    t: state.closeOptionStart,
  };
};
export default connect(mapPropsToState, { closeOptionStrat })(
  CloseOptionsStrat
);
