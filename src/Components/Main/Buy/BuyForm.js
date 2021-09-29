import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { addCoin, createBag } from '../../../redux/coinSlice';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import ErrorWindow from './../../Error/ErrorWindow';
export default function BuyForm(props) {
  const dispatch = useDispatch();
  const [errorShow, setErrorShow] = useState(false);
  const [count, setCount] = useState(0);
  const [bag, setBag] = useState({});
  const [flag, setFlag] = useState(false);
  const num = props.priceUsd - 0;

  const errorView = () => {
    setErrorShow(false);
  };

  const addCoinBag = () => {
    setFlag(!flag);
    if (!isNaN(count - 0) && count > 0) {
      if (props.init === 'buy') {
        dispatch(addCoin(bag));
      } else {
        dispatch(createBag(bag));
      }
    } else {
      setErrorShow(true);
    }
  };

  useEffect(() => {
    setBag({
      id: uuidv4(),
      rank: props.rank,
      name: props.name,
      price: num.toFixed(2),
      amount: count * num,
      count: count,
      symbol: props.symbol,
      changePercent24Hr: props.changePercent,
    });
  }, [count, flag]);

  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text>0.00</InputGroup.Text>
        <FormControl
          aria-label="Dollar amount (with dot and two decimal places)"
          onChange={e => {
            setCount(e.target.value);
          }}
          style={errorShow ? { color: 'red' } : { color: 'black' }}
        />
        <Button
          variant="outline-secondary"
          id="button-addon2"
          onClick={addCoinBag}
        >
          Buy
        </Button>
      </InputGroup>
      <ErrorWindow
        errorShow={errorShow}
        errorView={errorView}
        errorText={`Input only Numbers: (1.2) or (1)`}
      />
    </div>
  );
}
BuyForm.propTypes = {
  name: PropTypes.string,
  priceUsd: PropTypes.string,
  rank: PropTypes.string,
  changePercent: PropTypes.string,
};