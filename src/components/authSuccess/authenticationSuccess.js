import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { server_url } from "../../config";
import { setTweeterOAuthToken } from "../../helperFunctions/localstorage";
import { setTweeterOAuthVerifier } from "../../helperFunctions/localstorage";
const AuthenticationSuccess = (props) => {
  const [isVerified, setIsVerified] = useState(false);
  useEffect(() => {
    verifyToken();
  }, []);
  const verifyToken = async () => {
    const oauthToken = props.location.search
      .split("&")[0]
      .slice(1)
      .split("=")[1];
    const verifier = props.location.search.split("&")[1].split("=")[1];
    console.log(oauthToken, verifier);
    setIsVerified(true);

    try {
      const { data } = await axios.post(`${server_url}/oAuth/verifyToken`, {
        oauthToken,
        verifier,
      });
      console.log(data);
      setTweeterOAuthToken(data.oauth_token);
      setTweeterOAuthVerifier(data.oauth_verifier);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="authenticationSuccess">
      {isVerified ? (
        <div>
          {" "}
          You have successfuly authorized Trade journal with your Twitter
          account. Click
          <Link to={"/"}> Here </Link> to go back
        </div>
      ) : (
        <div>Verification under progress</div>
      )}
    </div>
  );
};

export default AuthenticationSuccess;
