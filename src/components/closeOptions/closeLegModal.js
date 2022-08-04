import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { server_url } from "../../config";
import { getLocalStorage } from "../../helperFunctions/localstorage";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
const CloseLegModal = ({ leg, trade, updatedTrade }) => {
  //Modal State visabilty
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(leg, trade);
  //Leg state details
  const [showLeg, setShowLeg] = useState(false);
  const [price, setPrice] = useState(leg.premium);
  const [quantity, setQuantity] = useState(leg.currentHoldings / leg.lotSize);
  const [closeDate, setCloseDate] = useState("");
  const strike = leg.strike;
  const optionType = leg.optionType;
  console.log(leg.strike);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      optionType,
      strike,
      data: {
        premium: price,
        quantity: quantity,
        date: closeDate,
      },
    };
    try {
      const res = await axios.patch(
        `${server_url}/options/updateClosing/${trade}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${getLocalStorage()}`,
          },
        }
      );

      updatedTrade(res);
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Button className="btn " onClick={handleShow}>
        Close Leg
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Close Trade</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div>
            <div className="formFieldIdentifyOptionContainer">
              <div>
                {" "}
                <span className="textDescription">Strike : </span>
                {strike}
              </div>

              <div>
                <span className="textDescription">Option Type : </span>
                {optionType}
              </div>
            </div>

            <form>
              {" "}
              <div className="formField">
                <label className="formFieldLabel">Premium</label>
                <input
                  type="number"
                  onChange={(e) => setPrice(+e.target.value)}
                  align="right"
                  defaultValue={price}
                />
              </div>
              <div className="formField">
                <label className="formFieldLabel">Quantity</label>
                <input
                  type="number"
                  onChange={(e) => setQuantity(+e.target.value)}
                  align="right"
                  defaultValue={quantity}
                  // value={quantity}
                />
              </div>
              <div className="formField">
                <label className="formFieldLabel">Close Date</label>
                <input
                  type="datetime-local"
                  onChange={(e) => setCloseDate(e.target.value)}
                  align="right"
                  defaultValue={closeDate}
                  // value={quantity}
                />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn secondryBtn" onClick={handleClose}>
            Close
          </Button>
          <Button className="btn primaryBtn" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

//   render(<Example />);
export default CloseLegModal;
