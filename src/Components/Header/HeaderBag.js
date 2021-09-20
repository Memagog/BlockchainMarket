import React,{useState} from 'react'
import { GiReceiveMoney } from 'react-icons/gi';
import { Button, Modal } from 'react-bootstrap';
import CoinBag from '../CoinBag/CoinBag';

export default function HeaderBag() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
           
            <div className="header__bag-container" onClick={handleShow}>
                <GiReceiveMoney/>
                <span>135 USD</span>
                <span>+100%</span>
            </div>
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CoinBag></CoinBag>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </div>
       
    )
}
