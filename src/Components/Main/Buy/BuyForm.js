import React,{ useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { InputGroup, FormControl, Button, Modal } from 'react-bootstrap';
import { addCoin } from '../../../redux/coinSlice';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
export default function BuyForm(props) {
  const dispatch = useDispatch();
  const [errorShow, setErrorShow] = useState(false);
  const [money, setMoney] = useState(0)
  const [bag, setBag] = useState({
    id: uuidv4(),
    rank: 0,
    name: '',
    price: 0,
    amount: 0,
    changePercent24Hr: '',
  });

  const num = props.priceUsd - 0;

  const addCoinBag = () => {
    if (!isNaN(money - 0) && money > 0) {
      dispatch(addCoin(bag));
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
      amount: money * num,
      count: money,
      changePercent24Hr: props.changePercent,
    });
  }, [money]);

  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text>0.00</InputGroup.Text>
        <FormControl
          aria-label="Dollar amount (with dot and two decimal places)"
          onChange={e => {
            setMoney(e.target.value);
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
      <Modal
        size="sm"
        show={errorShow}
        onHide={() => setErrorShow(false)}
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
          Please Input only Numbers <br /> Example (1.2) or (1)
        </Modal.Body>
      </Modal>
    </div>
  );
}
BuyForm.propTypes = {
  name: PropTypes.string,
  priceUsd: PropTypes.string,
  rank: PropTypes.string,
  changePercent: PropTypes.string,
};
