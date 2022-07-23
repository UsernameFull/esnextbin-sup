import { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const AddFileModal = (props: any) => {
  const { show, onHide, onSubmit } = props;
  const [fileName, setFileName] = useState("");

  const handleClose = () => onHide();
  const handleSubmit = () => {
    onSubmit(fileName);
    setFileName("");
    handleClose();
  };
  const handleFileName = (e: any) => {
    setFileName(e.target.value);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>add File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <Form.Control
              value={fileName}
              onChange={handleFileName}
              placeholder="New ts file name"
              aria-label="New ts file name"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Text id="basic-addon2">.ts</InputGroup.Text>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add File
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
