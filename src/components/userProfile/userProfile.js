import React, { useState } from "react";
import "./userProfile.css";
import axios from "axios";
import { server_url } from "../../config";
import Sidebar from "../sidebar/sidebar";
import RedirectModal from "../optionsDashboard/optionTradeItem/redirectUrlModal";
import { connect } from "react-redux";
import history from "../../utils/history";
import { logout } from "../../actions";
const UserProfile = ({ user, logout }) => {
  const [redirectUrl, setRedirectUrl] = useState(" ");
  const logoutFn = (e) => {
    logout();
    history.push("/login");
  };

  const handleOauthGetToken = async () => {
    try {
      const { data } = await axios.post(
        `${server_url}/oAuth/generateSignature`,
        null
      );
      console.log(data);
      setRedirectUrl(data.oauthString);
    } catch (e) {
      console.log(e);
    }
  };
  const redirectUser = () => {
    return <RedirectModal url={redirectUrl} />;
  };
  const renderGreetText = () => {
    if (!user) {
      return <div></div>;
    } else return <div className="welcomeText">Welcome, {user.name}🙂</div>;
  };
  return (
    <div className="userProfile">
      <div className="userProfileContainer">
        <div className="userProfileLeft">
          <Sidebar />
        </div>
        <div className="userProfileRight">
          {renderGreetText()}
          <button
            className="btn primaryBtn"
            onClick={() => handleOauthGetToken()}
          >
            Authorize Twitter
          </button>
          {redirectUrl !== " " ? redirectUser() : null}
          <button className="btn tertiaryBtn" onClick={() => logoutFn()}>
            {" "}
            Logout
          </button>
        </div>
        <div className=""></div>
      </div>
    </div>
  );
};

const mapPropsToState = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapPropsToState, { logout })(UserProfile);
