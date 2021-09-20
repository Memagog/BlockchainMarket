import React,{useState} from 'react'
import { ImPlus } from 'react-icons/im';
import { Button, Modal } from 'react-bootstrap';
import CoinBag from '../../CoinBag/CoinBag';
import BuyForm from '../BuyForm/BuyForm';
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
    const [coin, setCoin] = useState({})
    const handleClose = () => setShow(false);
    const handleShow = (target) =>{
        setShow(true);
        setCoin(target)
    } 
    return (
        <div>
          <table class="table table-dark table-hover">
                <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Coin</th>
                        <th scope="col">Price</th>
                        <th scope="col">Amount</th>
                        <th scope="col">%</th>
                        <th scope="col">Del</th>
                    </tr>
                </thead>
                <tbody>                      
                    {coinInfo.map((el,i)=>
                        <tr>
                            <th scope="row">{i+1}</th>
                            <td>{el.name}</td>
                            <td>{el.price}</td>
                            <td>{el.amount}</td>    
                            <td style={{textAlign:"left"}}>{el.percentage}</td>
                            <td><ImPlus className="button-plus" onClick={()=>handleShow(el)}></ImPlus></td>  
                        </tr>
                         
                    )}              
                </tbody>
            </table>
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Buy Modal Window</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                       <BuyForm></BuyForm>
                    </Modal.Body>
                    <Modal.Header> 
                        <Modal.Title>{coin.name + " "+  coin.price}</Modal.Title> 
                    </Modal.Header>
                </Modal>
            </>
        </div>
    )
}
