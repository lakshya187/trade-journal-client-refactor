import React, { useState } from "react";
import "./userProfile.css";
import axios from "axios";
import { server_url } from "../../config";
import Sidebar from "../sidebar/sidebar";
import RedirectModal from "../optionsDashboard/optionTradeItem/redirectUrlModal";
const UserProfile = () => {
  const [redirectUrl, setRedirectUrl] = useState(" ");
  const handleOauthGetToken = async () => {
    try {
      const { data } = await axios.post(
        `${server_url}/oAuth/generateSignature`,
        null
      );
      console.log(data);
      // return <Redirect push to={data.oauthString} />;
      setRedirectUrl(data.oauthString);
    } catch (e) {
      console.log(e);
    }
  };
  const redirectUser = () => {
    return <RedirectModal url={redirectUrl} />;
  };
  return (
    <div className="userProfile">
      <div className="userProfileContainer">
        <div className="userProfileLeft">
          <Sidebar />
        </div>
        <div className="userProfileRight">
          <button
            className="btn primaryBtn"
            onClick={() => handleOauthGetToken()}
          >
            Authorize Twitter
          </button>
          {redirectUrl !== " " ? redirectUser() : null}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
