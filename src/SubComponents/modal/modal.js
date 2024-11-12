import React from 'react';
import { Modal } from 'react-bootstrap';

const DefaultModal = ({ show, onClose, title, children }) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      dialogClassName="modal-90w" // You can adjust the class if needed to control width
    >
      <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children} {/* Children content */}
      </Modal.Body>
    </Modal>
  );
}

export default DefaultModal;
