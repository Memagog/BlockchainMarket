import React,{useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { InputGroup,FormControl,Button} from 'react-bootstrap';
import { addCoin } from '../../../redux/coinSlice';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
export default function BuyForm(props) {  

    const dispatch = useDispatch();

    const [money, setMoney] = useState(0)
    const [bag, setBag] = useState({
        id: uuidv4(),
        rank: 0,
        name: "",
        price: 0,
        amount: 0,
        changePercent24Hr: "2.3%",
    })   

    const num =  props.priceUsd - 0;

    const addCoinBag = () => {     
        dispatch(addCoin(bag))      
    }
    useEffect(() => {                    
        setBag({
            id: uuidv4(),
            rank: props.rank,
            name: props.name,
            price: num.toFixed(2),
            amount: money,
            changePercent24Hr: props.changePercent,
        });       
    }, [money])

    return (
        <div>
             <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <InputGroup.Text>0.00</InputGroup.Text>
                <FormControl aria-label="Dollar amount (with dot and two decimal places)" onChange={(e)=>{setMoney(e.target.value)}}/>
                <Button variant="outline-secondary" id="button-addon2" onClick={addCoinBag}>
                    Buy
                </Button>
            </InputGroup>
        </div>
    )
}
BuyForm.propTypes = {
    name: PropTypes.string,
    priceUsd: PropTypes.string,
    rank: PropTypes.string,
    changePercent: PropTypes.string,
};