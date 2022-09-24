import React, { Component, useEffect, useState } from "react";
import { server_url } from "../../config";
import axios from "axios";
import "./closeOptionsStrat.css";
import { getLocalStorage } from "../../helperFunctions/localstorage";
import { CircularProgress } from "@mui/material";
import { closeOptionStrat } from "../../actions/index";
import { connect } from "react-redux";
import history from "../../utils/history";

import CloseOptionsItem from "./closeOptionsItem";

const CloseOptionsStrat = ({ t, closeOptionStrat, match }) => {
  const [trade, setTrade] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      data: t,
    };

    const res = await axios.patch(
      `${server_url}/options/updateClosingStrat/${match.params.id}`,
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
  const updateLegData = (i, p) => {
    t[i].data.premium = p;
  };

  const loadData = async () => {
    const { data } = await axios.get(
      `${server_url}/options/${match.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${getLocalStorage()}`,
        },
      }
    );
    console.log(data.data);
    // this.setState({ trade: data.data });
    setTrade(data.data);
    console.log(trade);
    const closeStart = trade.leg.map((l) => {
      console.log("destructuring ...");
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

    console.log({ closeStart });
    closeOptionStrat(closeStart);
  };

  useEffect(() => {
    loadData();
  }, []);
  const renderFields = () => {
    if (!trade)
      return <div style={{ marginTop: "100px", color: "#fff" }}> Loading</div>;
    return trade.leg.map((l, i) => {
      return <CloseOptionsItem l={l} i={i} id={i} updateLeg={updateLegData} />;
    });
  };
  if (!trade) return <CircularProgress />;

  return (
    <div className="closeOptionsStrat">
      <div className="closeOptionsStratContainer">
        <form>
          {renderFields()}
          <button
            className="btn primaryBtn marginTop marginBottom"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

const mapPropsToState = (state) => {
  return {
    t: state.closeOptionStart,
  };
};
export default connect(mapPropsToState, { closeOptionStrat })(
  CloseOptionsStrat
);
