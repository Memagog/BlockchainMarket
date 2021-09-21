import React,{useState,useEffect} from 'react'
import { GiReceiveMoney } from 'react-icons/gi';
import { Button, Modal } from 'react-bootstrap';
import CoinBag from '../CoinBag/CoinBag';
import { useSelector} from 'react-redux';
import { coinCount } from '../../redux/coinSlice'
export default function HeaderBag() {
    const [show, setShow] = useState(false);
    const myBag = useSelector(coinCount)
    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => setShow(true);      
    const saveSubmit = () => {
        localStorage.setItem('myBag', JSON.stringify(myBag.coin.coins)); 
        handleClose()
    }
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
                    <Button variant="primary" onClick={saveSubmit}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </div>
       
    )
}
