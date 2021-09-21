import React,{useState, useEffect} from 'react'
import { ImPlus } from 'react-icons/im';
import { Modal } from 'react-bootstrap';
import BuyForm from '../BuyForm/BuyForm';
import { getDataAsync, mainData , selectCoin } from './../../../redux/mainSlice';
import { useDispatch , useSelector } from 'react-redux';
import { useHistory } from 'react-router';

export default function MainTable() {
    const history  = useHistory();
    const dispatch = useDispatch();  
    const [show, setShow] = useState(false);
    const [coin, setCoin] = useState({});   
    const handleClose = () => setShow(false);
    const main = useSelector(mainData);
    const handleShow = (target) =>{
        setCoin(target);         
        setShow(true);       
    }     
    const checkCoin = (target) => {
        dispatch(selectCoin(target))
        history.push("/coin")
    }
     
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
                            <tr onClick={()=>checkCoin(el)}>
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
