import React, { useState } from "react";
// import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import EditIcon from "@mui/icons-material/Edit";
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
        <div className="formFieldPreview">
          <label className="formFieldLabel">Option Type</label>
          <Select
            required
            options={options}
            onChange={(e) => (l.optionType = e.value)}
            placeholder={l.optionType}
          />
        </div>
        <div className="formFieldPreview">
          <label className="formFieldLabel">Type of Trade</label>
          <Select
            required
            options={typeOfTrade}
            onChange={(e) => (l.typeOfTrade = e.value)}
            placeholder={l.typeOfTrade}
          />
        </div>
        <div className="formFieldPreview">
          <label className="formFieldLabel">Strike</label>
          <input
            type="number"
            onChange={(e) => (trade.leg[i].strike = +e.target.value)}
            align="right"
            defaultValue={l.strike}
          />
        </div>
        <div className="formFieldPreview">
          <label className="formFieldLabel">Premium</label>
          <input
            type="number"
            onChange={(e) => (trade.leg[i].premium = +e.target.value)}
            align="right"
            defaultValue={l.premium}
          />
        </div>
        <div className="formFieldPreview">
          <label className="formFieldLabel">Quantity</label>
          <input
            type="number"
            onChange={(e) => (trade.leg[i].quantity = +e.target.value)}
            align="right"
            defaultValue={l.quantity}
          />
        </div>
        <div className="formFieldPreview">
          <label className="formFieldLabel">Lot Size</label>
          <input
            type="number"
            onChange={(e) => (trade.leg[i].lotSize = +e.target.value)}
            align="right"
            defaultValue={l.lotSize}
          />
        </div>
        <div className="formFieldPreview">
          <label className="formFieldLabel">Open Date</label>
          <input
            type="datetime-local"
            onChange={(e) => (trade.leg[i].date = +e.target.value)}
            align="right"
            defaultValue={l.openDate}
          />
        </div>
        <div className="formFieldPreview">
          <label className="formFieldLabel">Expiry Date</label>
          <input
            type="date"
            onChange={(e) => (trade.leg[i].expireDate = +e.target.value)}
            align="right"
            defaultValue={l.expireDate}
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      <div
        className="previewOptionHeadContainer marginTop previewBtn secondryBtn"
        onClick={() => setShowLeg(!showLeg)}
      >
        <span>Leg {i + 1}</span>{" "}
        <EditIcon style={{ color: "#42E6FF", marginLeft: "20px" }} />
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
