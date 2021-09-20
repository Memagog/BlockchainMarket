import React,{useState, useEffect, useRef} from 'react'
import { ImPlus } from 'react-icons/im';
import { Button, Modal } from 'react-bootstrap';
import CoinBag from '../../CoinBag/CoinBag';
import BuyForm from '../BuyForm/BuyForm';
import { getDataAsync, mainData , selectCoin } from './../../../redux/mainSlice';
import { useDispatch , useSelector } from 'react-redux';
const coinInfo = [
    {
        name: "BTC",
        price: 46000,
        amount: 1.200,
        percentage: "2.3%"
    },
    {
        name: "ETH",
        price: 4000,
        amount: 1.200,
        percentage: "5.3%"
    },
    {
        name: "DOG",
        price: 1000,
        amount: 1.200,
        percentage: "4.3%"
    },
    {
        name: "CHIA",
        price: 1200,
        amount: 1.200,
        percentage: "12.3%"
    },
    {
        name: "XHR",
        price: 0.333,
        amount: 2200,
        percentage: "45.3%"
    }
]
export default function MainTable() {
    const [show, setShow] = useState(false);
    const [coin, setCoin] = useState({});
    const [data, setData] = useState()
    const handleClose = () => setShow(false);
    const main = useSelector(mainData);
    const handleShow = (target) =>{
        setCoin(target);         
        setShow(true);       
    }     
    const dispatch = useDispatch();  
     
    useEffect(() => {
      dispatch(getDataAsync());          
    }, [])      
    return (
        <div>
          <table class="table table-dark table-hover">
                <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Coin</th>
                        <th scope="col">Price</th>
                        <th scope="col">Max value</th>
                        <th scope="col">Symbol</th>
                        <th scope="col">Add</th>
                    </tr>
                </thead>
                <tbody>
                    {
                       main.data.coins.map((el,i)=>
                            <tr onClick={()=>dispatch(selectCoin(el))}>
                                <th scope="row">{el.rank}</th>
                                    <td>{el.name}</td>
                                    <td>{el.priceUsd}</td>
                                    <td>{el.vwap24Hr}</td>    
                                    <td>{el.symbol}</td>
                                    <td><ImPlus className="button-plus" onClick={()=>handleShow(el)}></ImPlus></td>  
                            </tr>           
                        )                          
                    }                                
                </tbody>
            </table>
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Buy Modal Window</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                       <BuyForm name={coin.name} priceUsd={coin.priceUsd}></BuyForm>
                    </Modal.Body>
                    <Modal.Header> 
                        <Modal.Title>{coin.name} ${coin.priceUsd|0}</Modal.Title> 
                    </Modal.Header>
                </Modal>
            </>
        </div>
    )
}
