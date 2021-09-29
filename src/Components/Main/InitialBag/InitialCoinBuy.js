import React from 'react';
import { FormControl, InputGroup, Modal } from 'react-bootstrap';
import { ImPlus } from 'react-icons/im';
import { RiArrowUpDownFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { mainData } from './../../../redux/mainSlice';
import { useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import BuyModalWindow from '../Buy/BuyModalWindow';

export default function InitialCoinBuy(props) {
  const filter = useSelector(mainData);
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
      priceUsd: target.priceUsd,
      changePercent24Hr: target.changePercent24Hr,
      symbol: target.symbol,
    });
    setShow(true);
  };

  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Initial Coin Bag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup>
            <InputGroup.Text>Coin name</InputGroup.Text>
            <FormControl
              onChange={e => {
                setName(e.target.value);
              }}
              aria-label="Coin name"
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer style={{ paddingTop: '40px' }}>
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
      <BuyModalWindow
        show={show}
        handleClose={() => setShow(false)}
        name={coin.name}
        priceUsd={coin.priceUsd}
        changePercent={coin.changePercent24Hr}
        symbol={coin.symbol}
        init={'initialBuy'}
      />
    </div>
  );
}
