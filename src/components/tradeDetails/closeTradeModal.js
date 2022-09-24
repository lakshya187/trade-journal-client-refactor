import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { Alert } from "@mui/material";
import history from "../../utils/history";
import { server_url } from "../../config";
import { getLocalStorage } from "../../helperFunctions/localstorage";
const CloseTradeModal = ({
  id,
  currentHoldings,
  openPrice,
  updateCurrentTrade,
}) => {
  //Modal State visabilty
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState(openPrice);
  const [quantity, setQuantity] = useState(currentHoldings);
  const clearState = () => {
    setMessage("");
    setPrice(openPrice);
    setQuantity(currentHoldings);
  };
  const onFormSubmit = async () => {
    try {
      const { data } = await axios.patch(
        `${server_url}/trades/updateClosing/${id}`,
        {
          data: { price, quantity },
        }
      );
      updateCurrentTrade(data.data.updatedTrade);
      setMessage("Trade was succesfully closed, you may close this window");
      //   history.push("/");
    } catch (err) {
      setMessage("Something went wrong, try again!");
      console.log(err);
    }
  };

  const renderAlert = () => {
    return <Alert severity="info">{message}</Alert>;
  };
  return (
    <>
      <Button
        className="btn primaryBtn"
        style={{ marginLeft: "20px" }}
        onClick={handleShow}
        disabled={currentHoldings === 0 ? true : false}
      >
        Close Trade
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="customModal" closeButton>
          <Modal.Title>Delete Trade</Modal.Title>
        </Modal.Header>
        <Modal.Body className="customModal">
          {message ? renderAlert() : null}
          <form className="">
            <div className="formField">
              <label className="formFieldLabel">Price</label>
              <input
                type="number"
                align="right"
                onChange={(e) => setPrice(+e.target.value)}
                value={price}
                className="modalFormField"
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel">Quantity</label>
              <input
                type="number"
                align="right"
                onChange={(e) => setQuantity(+e.target.value)}
                value={quantity}
                className="modalFormField"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="customModal">
          <Button
            className="btn primaryBtn "
            onClick={() => {
              clearState();
              handleClose();
            }}
          >
            Close
          </Button>
          <Button className="btn secondryBtn " onClick={() => onFormSubmit()}>
            Close Trade
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

//   render(<Example />);
export default CloseTradeModal;
