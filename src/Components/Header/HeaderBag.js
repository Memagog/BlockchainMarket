import React,{ useState, useEffect} from 'react'
import { GiReceiveMoney } from 'react-icons/gi';
import { Button, Modal } from 'react-bootstrap';
import CoinBag from '../CoinBag/CoinBag';
import { useSelector} from 'react-redux';
import { coinCount } from '../../redux/coinSlice'
import { useMemo } from 'react';

export default function HeaderBag() {
    const [show, setShow] = useState(false);
    const [proc, setProc] = useState(0)
    const myBag = useSelector(coinCount)
    const handleClose = () => {
        setShow(false)
    };
    useEffect(() => {
        myBag.coin.coins.forEach(e => {
            
          console.log()
        })
    }, [myBag])
    const myMoney = useMemo(() =>{
        let sum = 0;  
        let count = 0;         
        myBag.coin.coins.forEach(e => {
            sum+=(e.amount-0);  
            count+=(e.changePercent24Hr-0);         
        })
        setProc(count/myBag.coin.coins.length)
       return sum;
    }, [myBag]);
    const handleShow = () => setShow(true);      
    const saveSubmit = () => {
        // localStorage.setItem('myBag', JSON.stringify(myBag.coin.coins)); 
        handleClose()
    }
    return (
        <div>
           
            <div className="header__bag-container" onClick={handleShow}>
                <GiReceiveMoney/>
                <span>{myMoney} USD </span>
                <span style={{paddingLeft: "10px"}}>{isNaN(proc)?0:proc.toFixed(3)} %</span>
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
