import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ModalPopUp = ({ show, handleClose, onModalClose, onModalOk }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>Confirm the details!!!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onModalClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onModalOk}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPopUp;
