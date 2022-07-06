import React, { useState } from "react";
import axios from "axios";
import { server_url } from "../../../config";
import { getLocalStorage } from "../../../helperFunctions/localstorage";
const AnalyticsField = ({ label, endpoint }) => {
  const [gt, setMinimum] = useState(null);
  const [lt, setMaximum] = useState(null);
  const handleSubmit = async () => {};
  return (
    <form className="optionAnalyticsField ">
      <div className="dashboardStatsDescription">{label}</div>
      <div className="optionAnalyticsFieldsContainer">
        <div className="optionAnalyticsFieldContainer">
          <label className="formFieldLabel">Greater Than</label>
          <input
            type="number"
            onChange={(e) => setMinimum(+e.target.value)}
            value={gt}
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
      </div>
    </form>
  );
};

export default AnalyticsField;
