import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { server_url } from "../../../config";
import { getLocalStorage } from "../../../helperFunctions/localstorage";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
const DateRangeModal = ({ leg, trade, setCustomData }) => {
  //Modal State visabilty
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Leg state details
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = async () => {
    try {
      // const {data }
      const range = { start, end };
      const { data } = await axios.post(
        `${server_url}/options/getDataCustom`,
        range,
        {
          headers: {
            Authorization: `Bearer ${getLocalStorage()}`,
          },
        }
      );

      console.log(data.modData);
      setCustomData(data.modData, "custom");
      handleClose(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Button className="btn secondryBtn" onClick={handleShow}>
        Custom Date
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Date Range</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="formField">
              <label className="formFieldLabel">Start</label>
              <input
                type="date"
                onChange={(e) => setStart(e.target.value)}
                align="right"
                value={start}
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel">End</label>
              <input
                type="date"
                onChange={(e) => setEnd(e.target.value)}
                align="right"
                value={end}
              />
            </div>
          </form>
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
export default DateRangeModal;
