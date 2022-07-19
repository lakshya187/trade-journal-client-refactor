import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Alert } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import { getTweeterToken } from "../../../helperFunctions/localstorage";
import { getTweeterVerifier } from "../../../helperFunctions/localstorage";
import RedirectModal from "./redirectUrlModal";
import { Redirect } from "react-router-dom";
import { tweetServer } from "../../../config";
import axios from "axios";

const TweetTrade = ({ trade }) => {
  //Modal State visabilty
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const handleTweet = async () => {
    try {
      const token = getTweeterToken();
      const verifier = getTweeterVerifier();
      console.log(token, verifier);
      const response = await axios.post(`${tweetServer}/tweet`, {
        token,
        verifier,
        trade,
        message,
      });

      console.log(response);
      setStatus("Your trade has been tweeted! You can close this window now");
    } catch (e) {
      setStatus(
        "An error occured, make sure to authorize Trade journal on your twitter account and try again!"
      );
      console.log(e);
    }
  };
  const renderMessage = () => {
    if (!status) return;
    return <Alert severity="info">{status}</Alert>;
  };

  return (
    <>
      <Button
        style={{
          padding: "10px",
          marginTop: "20px",
          background: "#fff",
          border: "none",
        }}
        onClick={handleShow}
      >
        <TwitterIcon style={{ color: "#2d2d2d" }} />
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tweet!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderMessage()}
          <form>
            {" "}
            <div className="formField">
              <label className="formFieldLabel">
                What will be your status?
              </label>
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                align="right"
                defaultValue={message}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn secondryBtn" onClick={handleClose}>
            Close
          </Button>
          <Button className="btn primaryBtn" onClick={() => handleTweet()}>
            Tweet!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

//   render(<Example />);
export default TweetTrade;
