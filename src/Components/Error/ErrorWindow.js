import React from 'react';
import { Modal } from 'react-bootstrap';

export default function ErrorWindow(props) {
  return (
    <Modal
      size="sm"
      show={props.errorShow}
      onHide={props.errorView}
      aria-labelledby="example-modal-sizes-title-sm"
      centered
    >
      <Modal.Header closeButton style={{ backgroundColor: 'red' }}>
        <Modal.Title
          id="example-modal-sizes-title-sm"
          style={{ backgroundColor: 'red' }}
        >
          Error
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: 'red' }}>
        {props.errorText}
      </Modal.Body>
    </Modal>
  );
}
