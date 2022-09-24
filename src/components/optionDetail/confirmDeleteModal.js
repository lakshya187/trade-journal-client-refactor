import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { Alert } from "@mui/material";
import history from "../../utils/history";
import { server_url } from "../../config";
import { getLocalStorage } from "../../helperFunctions/localstorage";
import DeleteIcon from "@mui/icons-material/Delete";
const DeleteModal = ({ id }) => {
  //Modal State visabilty
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [message, setMessage] = useState("");
  const deleteTrade = async (e) => {
    try {
      const res = await axios.delete(`${server_url}/options/${id}`, {
        headers: {
          Authorization: `Bearer ${getLocalStorage()}`,
        },
      });
      setMessage(
        "Trade deleted Successfully, you may close this window to go back."
      );
      //   history.push("/options-dashboard");
    } catch (e) {
      setMessage("Something went wrong, please try again.");
      console.log(e);
    }
  };
  const renderAlert = () => {
    return <Alert severity="info">{message}</Alert>;
  };
  console.log(id);
  return (
    <>
      <Button
        className="btn tertiaryBtn"
        style={{ marginLeft: "20px" }}
        onClick={handleShow}
      >
        <DeleteIcon />
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="customModal" closeButton>
          <Modal.Title>Delete Trade</Modal.Title>
        </Modal.Header>
        <Modal.Body className="customModal">
          {!message ? null : renderAlert()}
          Are you sure you want to delete this trade?{" "}
        </Modal.Body>
        <Modal.Footer className="customModal">
          <Button
            className="btn primaryBtn "
            onClick={() => {
              handleClose();
              history.push("/options-dashboard");
            }}
          >
            Close
          </Button>{" "}
          <Button className="btn secondryBtn " onClick={() => deleteTrade()}>
            Delete Trade
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

//   render(<Example />);
export default DeleteModal;
