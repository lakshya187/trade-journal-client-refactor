import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import TwitterIcon from "@mui/icons-material/Twitter";
import { getTweeterToken } from "../../../helperFunctions/localstorage";
import { getTweeterVerifier } from "../../../helperFunctions/localstorage";
import RedirectModal from "./redirectUrlModal";
import { Redirect } from "react-router-dom";
import { server_url } from "../../../config";
import axios from "axios";

const TweetTrade = ({ id }) => {
  //Modal State visabilty
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [message, setMessage] = useState("");
  const handleTweet = async () => {
    try {
      const token = getTweeterToken();
      const verifier = getTweeterVerifier();
      console.log(token, verifier);
      const response = await axios.post(`${server_url}/oAuth/tweetImage`, {
        token,
        verifier,
        id,
        message,
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
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
