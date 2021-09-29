import React from 'react';
import { Modal } from 'react-bootstrap';
import BuyForm from './BuyForm';

export default function BuyModalWindow(props) {
  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Buy Modal Window</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BuyForm
            name={props.name}
            priceUsd={props.priceUsd}
            changePercent={props.changePercent}
            symbol={props.symbol}
            init={props.init}
          ></BuyForm>
        </Modal.Body>
        <Modal.Header>
          <Modal.Title>
            {props.name} ${props.priceUsd}
          </Modal.Title>
        </Modal.Header>
      </Modal>
    </div>
  );
}
