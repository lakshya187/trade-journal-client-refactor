import { render } from "@testing-library/react";
import React, { useEffect, Component } from "react";
import { connect } from "react-redux";
import { getSingleOptionsTrade } from "../../actions/index";
import CloseOptionItem from "./closeOptionItem";
import "./closeOptions.css";
class CloseOption extends Component {
  state = {
    price: 0,
    quantity: 0,
    optionType: "",
    strike: "",
  };
  componentDidMount() {
    this.props.getSingleOptionsTrade(this.props.match.params.id);
  }
  renderItem = () => {
    return this.props.trade.leg.map((l, i) => {
      return (
        <CloseOptionItem
          key={`${l.strike}${l.optionType}`}
          id={this.props.trade._id}
          l={l}
          i={i}
        />
      );
    });
  };
  render() {
    if (!this.props.trade) return <div>Loading</div>;
    // console.log(this.props.trade);
    return (
      <div className="closeOption">
        <div className="closeOptionContainer">
          <div className="optionDetailStratName">
            <div>{this.props.trade.strategyName}</div>
          </div>
          <div className="optionsDetailFormContainer">
            <div>{this.renderItem()}</div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    trade: state.singleOptiontrade,
  };
};
export default connect(mapStateToProps, { getSingleOptionsTrade })(CloseOption);
