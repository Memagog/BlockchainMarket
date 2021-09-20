import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { InputGroup,FormControl,Button} from 'react-bootstrap';
import { coinCount, addCoin, deleteCoin, } from '../../../redux/coinSlice';
export default function BuyForm(props) {
    const coin = useSelector(coinCount);
    const dispatch = useDispatch();
    const [money, setMoney] = useState(0)
    const [bag, setBag] = useState({
        name: "",
        price: 0,
        amount: 0,
        percentage: "2.3%",
    })   
    const test = () => {
        setBag({
            name: props.name,
            price: props.price,
            amount: money,
            percentage: "2.3%",
        })
        dispatch(addCoin(bag));       
    }
    return (
        <div>
             <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <InputGroup.Text>0.00</InputGroup.Text>
                <FormControl aria-label="Dollar amount (with dot and two decimal places)" onChange={(e)=>{setMoney(e.target.value)}}/>
                <Button variant="outline-secondary" id="button-addon2" onClick={test}>
                    Buy
                </Button>
            </InputGroup>
        </div>
    )
}
