import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import axios from "axios";

const RedirectModal = ({ url }) => {
  //Modal State visabilty
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Allow Authorization</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You will be taken to Twitter to authorize Trade journal{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn secondryBtn" onClick={handleClose}>
            Close
          </Button>

          <a href={url}>
            {" "}
            <Button className="btn primaryBtn">Allow Authorization</Button>
          </a>
        </Modal.Footer>
      </Modal>
    </>
  );
};

//   render(<Example />);
export default RedirectModal;
