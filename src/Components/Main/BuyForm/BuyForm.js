import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { InputGroup,FormControl,Button} from 'react-bootstrap';
import { coinCount, addCoin } from '../../../redux/coinSlice';
export default function BuyForm(props) {    
    const dispatch = useDispatch();
    const [money, setMoney] = useState(0)
    const [bag, setBag] = useState({
        rank: 0,
        name: "",
        price: 0,
        amount: 0,
        changePercent24Hr: "2.3%",
    })   
    const num =  props.priceUsd -0;
    useEffect(() => {
                    
        setBag({
            rank: props.rank,
            name: props.name,
            price: num.toFixed(2),
            amount: money,
            changePercent24Hr: props.changePercent,
        })                  
    }, [money])
    
    const addCoinBag = () => {       
        dispatch(addCoin(bag))        
    }
    
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
