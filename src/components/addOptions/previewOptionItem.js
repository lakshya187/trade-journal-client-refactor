import React, { useState } from "react";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { connect } from "react-redux";
import Select from "react-select";
const options = [
  { value: "call", label: "Call" },
  { value: "put", label: "Put" },
];
const typeOfTrade = [
  { value: "short", label: "Short" },
  { value: "long", label: "Long" },
];

const PreviewOptionsItem = ({ l, i, trade }) => {
  const [showLeg, setShowLeg] = useState(false);
  const renderItems = () => {
    return (
      <div className="previewOptionsItemContainer">
        <div className="formField">
          <label className="formFieldLabel">Option Type</label>
          <Select
            required
            options={options}
            onChange={(e) => (l.optionType = e.value)}
            placeholder={l.optionType}
          />
        </div>
        <div className="formField">
          <label className="formFieldLabel">Type of Trade</label>
          <Select
            required
            options={typeOfTrade}
            onChange={(e) => (l.typeOfTrade = e.value)}
            placeholder={l.typeOfTrade}
          />
        </div>
        <div className="formField">
          <label className="formFieldLabel">Strike</label>
          <input
            type="number"
            onChange={(e) => (trade.leg[i].strike = +e.target.value)}
            align="right"
            defaultValue={l.strike}
          />
        </div>
        <div className="formField">
          <label className="formFieldLabel">Premium</label>
          <input
            type="number"
            onChange={(e) => (trade.leg[i].premium = +e.target.value)}
            align="right"
            defaultValue={l.premium}
          />
        </div>
        <div className="formField">
          <label className="formFieldLabel">Quantity</label>
          <input
            type="number"
            onChange={(e) => (trade.leg[i].quantity = +e.target.value)}
            align="right"
            defaultValue={l.quantity}
          />
        </div>
        <div className="formField">
          <label className="formFieldLabel">Lot Size</label>
          <input
            type="number"
            onChange={(e) => (trade.leg[i].lotSize = +e.target.value)}
            align="right"
            defaultValue={l.lotSize}
          />
        </div>
        <div className="formField">
          <label className="formFieldLabel">Date</label>
          <input
            type="datetime-local"
            onChange={(e) => (trade.leg[i].date = +e.target.value)}
            align="right"
            defaultValue={l.openDate}
          />
        </div>
      </div>
    );
  };
  console.log(trade);

  return (
    <div>
      <div
        className="previewOptionHeadContainer marginTop btn secondryBtn"
        onClick={() => setShowLeg(!showLeg)}
      >
        <span>Leg {i + 1}</span> <ArrowDropDownCircleIcon />
      </div>
      {showLeg ? renderItems() : ""}
    </div>
  );
};
const mapPropsToState = (state) => {
  return {
    trade: state.newOptionTrade,
  };
};
export default connect(mapPropsToState)(PreviewOptionsItem);
