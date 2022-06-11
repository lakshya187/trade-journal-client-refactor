import React, { useState } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import axios from "axios";
import { server_url } from "../../config";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { getLocalStorage } from "../../helperFunctions/localstorage";
import history from "../../utils/history";
const typeOfTrade = [
  { value: "short", label: "Short" },
  { value: "long", label: "Long" },
];

const CloseOptionItem = ({ l, i, closeTrade, id }) => {
  const [showLeg, setShowLeg] = useState(false);
  const [price, setPrice] = useState(l.premium);
  const [quantity, setQuantity] = useState(l.currentHoldings / l.lotSize);
  const strike = +l.strike;
  const optionType = l.optionType;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      optionType,
      strike,
      data: {
        premium: price,
        quantity: quantity,
      },
    };
    try {
      const res = await axios.patch(
        `${server_url}/options/updateClosing/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${getLocalStorage()}`,
          },
        }
      );
      history.push("/options-dashboard");
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const renderItem = () => {
    return (
      <div>
        <div className="formFieldIdentifyOptionContainer">
          <div>
            {" "}
            <span className="textDescription">Strike : </span>
            {strike}
          </div>

          <div>
            <span className="textDescription">Option Type : </span>
            {optionType}
          </div>
        </div>

        <form>
          {" "}
          <div className="formField">
            <label className="formFieldLabel">Premium</label>
            <input
              type="number"
              onChange={(e) => setPrice(+e.target.value)}
              align="right"
              defaultValue={price}
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel">Quantity</label>
            <input
              type="number"
              onChange={(e) => setQuantity(+e.target.value)}
              align="right"
              defaultValue={quantity}
              // value={quantity}
            />
          </div>
          <button className="btn primaryBtn marginTop" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    );
  };
  return (
    <div>
      <div
        className="previewOptionHeadContainer marginTop btn secondryBtn"
        onClick={() => setShowLeg(!showLeg)}
      >
        <span>Close Leg {i + 1}</span>{" "}
        {/* <ArrowDropDownCircleIcon className={"marginLeft"} /> */}
      </div>
      {showLeg ? renderItem() : ""}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    closeTrade: state.closeOption,
  };
};

export default connect(mapStateToProps)(CloseOptionItem);
