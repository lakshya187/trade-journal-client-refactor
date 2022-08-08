import React, { useState } from "react";
import axios from "axios";
import { server_url } from "../../../config";
import { getLocalStorage } from "../../../helperFunctions/localstorage";
import formatCash from "../../../utils/formatCash";
const AnalyticsField = ({ label, url }) => {
  const [gt, setMinimum] = useState(0);
  const [lt, setMaximum] = useState(0);
  const [result, setResult] = useState(0);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const range = { gt, lt };
      console.log(range);
      console.log(url);
      const { data } = await axios.post(url, range, {
        headers: {
          Authorization: `Bearer ${getLocalStorage()}`,
        },
      });
      console.log(data.data[0].profitLoss);
      setResult(data.data[0].profitLoss);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <form className="optionAnalyticsField ">
      <div className="optionAnalyticsHeadingContainer">
        <div className="headerMarker"></div>
        <div className="dashboardStatsDescription">{label}</div>
      </div>
      <div className="optionAnalyticsFieldsContainer">
        <div className="optionAnalyticsFieldContainer">
          <label className="formFieldLabel">Greater Than</label>
          <input
            type="number"
            onChange={(e) => setMinimum(+e.target.value)}
            value={gt}
            className="formFieldAnalytics"
          />
        </div>
        <div className="optionAnalyticsFieldContainer">
          <label className="formFieldLabel">Less than</label>
          <input
            type="number"
            onChange={(e) => setMaximum(+e.target.value)}
            value={lt}
          />
        </div>
        <button
          className="btn primaryBtn marginleft"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </button>
        <div className="optionAnalysisResult">${formatCash(result)}</div>
      </div>
    </form>
  );
};

export default AnalyticsField;
