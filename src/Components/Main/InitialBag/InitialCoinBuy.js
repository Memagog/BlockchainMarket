import React from 'react'
import { FormControl, InputGroup, Modal, ModalTitle } from 'react-bootstrap';
import { ImPlus } from 'react-icons/im';
import { RiArrowUpDownFill } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import { mainData } from './../../../redux/mainSlice';
import { useMemo, useState, useEffect } from 'react';
import { coinCount, createBag } from '../../../redux/coinSlice';
import { v4 as uuidv4 } from 'uuid';
import ModalAgree from './../../ModalAgree/ModalAgree';

export default function InitialCoinBuy(props) {
  const dispatch = useDispatch();
  const filter = useSelector(mainData);
  const initialData = useSelector(coinCount);
  const [money, setMoney] = useState(0);
  const [show, setShow] = useState(false);
  const [coin, setCoin] = useState({});
  const [name, setName] = useState('');

  const arr = useMemo(() => {
    let res = [];
    res = filter.data.coins.filter(e => e.symbol === name.toLocaleUpperCase());
    return res;
  }, [name]);

  const createInitialCoinBag = target => {
    setCoin({
      id: uuidv4(),
      rank: target.rank,
      name: target.name,
      price: target.priceUsd,
      amount: money * target.priceUsd,
      count: money,
      changePercent24Hr: target.changePercent24Hr,
      symbol: target.symbol
    });    
    setShow(true);
  };
  
  const dispatchInitialBag = () => {
    dispatch(createBag(coin));
    localStorage.setItem('coinBag', JSON.stringify(initialData.coin.initial));
    localStorage.setItem('initialCoinBag', JSON.stringify(initialData.coin.initial));
    setShow(false);
    console.log(initialData.coin.initial);
  };
  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Initial Coin Bag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text >
              Coin name
            </InputGroup.Text>
            <FormControl
              onChange={e => {
                setName(e.target.value);
              }}
              aria-label="Coin name"
            />
            <InputGroup.Text>Value</InputGroup.Text>
            <FormControl
              onChange={e => {
                setMoney(e.target.value);
              }}
              aria-label="value"
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Coin</th>
                <th scope="col">Price</th>
                <th scope="col">
                  <RiArrowUpDownFill style={{ marginLeft: '17px' }} />
                </th>
                <th scope="col">Buy</th>
              </tr>
            </thead>
            <tbody>
              {arr.map((el, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{el.symbol}</td>
                  <td>{el.priceUsd.substring(0, 8)}</td>
                  {el.changePercent24Hr - 0 < 0 ? (
                    <td style={{ color: 'red' }}>
                      {(el.changePercent24Hr - 0).toFixed(2)} %
                    </td>
                  ) : (
                    <td style={{ color: 'green', paddingLeft: '14px' }}>
                      {(el.changePercent24Hr - 0).toFixed(2)} %
                    </td>
                  )}
                  <td>
                    <ImPlus
                      className="button-plus"
                      onClick={() => createInitialCoinBag(el)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Footer>
      </Modal>
      <ModalAgree show={show} onHide={() => setShow(false)} func = {()=>dispatchInitialBag()}/>
    </div>
  );
}
