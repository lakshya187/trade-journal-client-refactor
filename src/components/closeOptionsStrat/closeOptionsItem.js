import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const CloseOptionItem = ({ l, i, trade, updateLeg }) => {
  const formatYmd = (date) => date.toISOString().slice(0, 10);

  const [premium, setPremium] = useState(l.premium);
  const { strike } = l;
  const { optionType } = l;
  const date = formatYmd(new Date());
  const { quantity } = l;

  if (!trade) return <div>Loading</div>;

  return (
    <div className="marginTop" id="i">
      <div className="closeOptionsStartHeadingContaienr">
        <div>Leg {i + 1}</div>
      </div>
      <div className="formField" id={i}>
        <label className="formFieldLabel">Premium</label>
        <input
          type="number"
          align="right"
          value={premium}
          onChange={(e) => {
            setPremium(+e.target.value);
            trade[i].premium = +e.target.value;
            updateLeg(i, +e.target.value);
          }}
        />
      </div>
      <div className="formField" id={i}>
        <label className="formFieldLabel">Quantity</label>
        <input
          type="text"
          align="right"
          disabled={true}
          defaultValue={quantity}
        />
      </div>
      <div className="formField" id={i}>
        <label className="formFieldLabel ">Close Date</label>
        <input type="date" align="right" defaultValue={date} disabled={true} />
      </div>
      <div className="formField" id={i}>
        <label className="formFieldLabel">Option Type</label>
        <input
          type="text"
          align="right"
          defaultValue={optionType}
          disabled={true}
        />
      </div>
      <div className="formField" id={i}>
        <label className="formFieldLabel">Strike</label>
        <input
          type="text"
          align="right"
          defaultValue={strike}
          disabled={true}
        />
      </div>
      <hr style={{ marginTop: "20px" }} />
    </div>
  );
};

const mapPropsToState = (state) => {
  return {
    trade: state.closeOptionStart,
  };
};
export default connect(mapPropsToState)(CloseOptionItem);
