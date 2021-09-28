import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function ModalAgree(props) {
  return (
    <div>
      <Modal
        size="sm"
        show={props.show}
        onHide={props.onHide}
        aria-label="example-modal-sizes-title-sm"
        style={{ marginTop: '50px' }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Are you sure ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-container">
          <Button
            onClick={props.onHide}
            className="modal-body-container_button-no"
          >
            No
          </Button>{' '}
          <Button onClick={props.func}>Yes</Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
