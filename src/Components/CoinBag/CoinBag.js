import React from 'react';
import './CoinBag.scss';
import { FiMinusSquare, FiPlusSquare } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { coinCount, deleteCoin, shopCoin } from '../../redux/coinSlice';
import { useEffect, useState } from 'react';
import { RiArrowUpDownFill } from 'react-icons/ri';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import ModalAgree from '../ModalAgree/ModalAgree';
import ErrorWindow from '../Error/ErrorWindow';

export default function CoinBag() { 

  const [errorShow, setErrorShow] = useState(false);
  const myBag = useSelector(coinCount);
  const dispatch = useDispatch();

  const [value, setValue] = useState('0');
  const [item, setItem] = useState({});
  const [storage, setStorage] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log(item)
    let local = JSON.parse(localStorage.getItem('coinBag'));
    if (local === null) {
      setStorage(myBag.coin.coins);
      console.log('localStorage error');
    } else setStorage(local);
  }, [myBag]);
  
  const shopCoinBag = () => {
    setShow(false);    
    dispatch(shopCoin(item));   
  };

  const endChose = e => {
    console.log()
    if (!isNaN(value - 0)&&(e.count-0)+(value-0)>= 0) {
      setItem({
        amount: e.price*((e.count-0) + (value-0)) ,
        changePercent24Hr: e.changePercent24Hr,
        count: (e.count - 0) + (value - 0),
        id: e.id,
        name: e.name,
        price: e.price,
      });
      setShow(true);
    } else {
      setErrorShow(true);
    }    
  };

  return (
    <div>
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Coin</th>
            <th scope="col">Price</th>
            <th scope="col">Amount</th>
            <th scope="col">
              <RiArrowUpDownFill style={{ marginLeft: '17px' }} />
            </th>
            <th scope="col">Count</th>
            <th scope="col">Change</th>          
          </tr>
        </thead>
        <tbody>
          {storage.map((el, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{el.name}</td>
              <td>{el.price}</td>
              <td>{(el.amount - 0).toFixed(4)}</td>
              {el.changePercent24Hr - 0 < 0 ? (
                <td style={{ color: 'red' }}>
                  {(el.changePercent24Hr - 0).toFixed(2)} %
                </td>
              ) : (
                <td style={{ color: 'green', paddingLeft: '14px' }}>
                  {(el.changePercent24Hr - 0).toFixed(2)} %
                </td>
              )}
              <td>{el.count - 0}</td>
              <td>
                <FiPlusSquare
                  className="button-plus"
                  onClick={() => endChose(el)}
                />
              </td>
              {/* <td>
                <FiMinusSquare
                  className="button-minus"
                  onClick={() => endChose(el)}
                />
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
       <InputGroup className="mb-3">
            <InputGroup.Text >
              Value
            </InputGroup.Text>
            <FormControl
              onChange={e => {
                setValue(e.target.value);
              }}
              aria-label="Coin name"
            />
        </InputGroup>
      <ErrorWindow errorShow={errorShow} errorView={()=>setErrorShow(false)} errorText={`Error`}/>   
      <ModalAgree show={show} onHide={() => setShow(false)} func = {() => shopCoinBag()}/>
    </div>
  );
}
