import React, { useState } from 'react';
import { GiReceiveMoney } from 'react-icons/gi';
import { Button, Modal } from 'react-bootstrap';
import CoinBag from '../CoinBag/CoinBag';
import { useSelector } from 'react-redux';
import { coinCount } from '../../redux/coinSlice';
import { useMemo } from 'react';
import { useEffect } from 'react';


export default function HeaderBag() {
  
  const [show, setShow] = useState(false);
  const [proc, setProc] = useState(0);
  const [data, setData] = useState([]);
  const [dif, setDif] = useState();
  const myBag = useSelector(coinCount);

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    let local = JSON.parse(localStorage.getItem('coinBag'));   
    local === null? setData(myBag.coin.coins): setData(local);
  }, [myBag]);

  const myMoney = useMemo(() =>{
    let sum = 0;
    let count = 0;   
    data.forEach(e => {
      sum += e.amount - 0;
      count += e.changePercent24Hr - 0;
    });   
    setProc(count / data.length);
    return sum;
  }, [data,myBag]);

  const initialDif = useMemo(() => {
    let count = 0;
    let init = myBag.coin.initial;
    if (init !== null) {
      init.forEach((e)=>{
        count+=e.amount - 0;
      })
      console.log()
      return count;
    }
    else return 0
  }, [myBag]);

  const handleShow = () => setShow(true);

  return (
    <div>
      <div className="header__coin-bag" onClick={handleShow}>
        <span>{myMoney.toFixed(2)} USD </span>
        <div>
          <span className="pre-procentage">
            {isNaN(proc) ? 0 : proc.toFixed(3)}%
          </span>
          <span className="dif-procentage">
            ({isNaN((myMoney-initialDif)/initialDif*100)?'0.0':((myMoney-initialDif)/initialDif*100).toFixed(2)}%)
          </span>
        </div>        
      </div>
      <>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Coin Bag</Modal.Title>
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
  );
}
