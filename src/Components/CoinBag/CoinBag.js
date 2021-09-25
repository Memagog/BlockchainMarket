import React from 'react';
import './CoinBag.scss';
import { FiMinusSquare } from 'react-icons/fi';
import { useSelector, useDispatch} from 'react-redux';
import { coinCount ,deleteCoin} from '../../redux/coinSlice';
import { useEffect, useState } from 'react';
import { RiArrowUpDownFill } from 'react-icons/ri';
import { Modal, Button } from 'react-bootstrap';

export default function CoinBag() { 

    const myBag = useSelector(coinCount);
    const dispatch = useDispatch();

    const [item, setItem] = useState("")
    const [okay, setOkay] = useState(false);
    const [storage, setStorage] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {       
        let local = JSON.parse(localStorage.getItem('coinBag'));
        if(local === null){
            setStorage(myBag.coin.coins)
            console.log("localStorage error")
        }
        else {
            setStorage(local);
        }           
    }, [myBag])
    
    const removeCoinBag = () => {
        setShow(false);        
        dispatch(deleteCoin(item));                
    }
    const endChose = (e) => {
        setItem(e);
        setShow(true);
    }
    return (
       <div>
         <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Coin</th>
                        <th scope="col">Price</th>
                        <th scope="col">Amount</th>
                        <th scope="col"><RiArrowUpDownFill style={{marginLeft: "17px"}}/></th>
                        <th scope="col">Count</th>
                        <th scope="col">Del</th>
                    </tr>
                </thead>
                <tbody>                      
                    {storage.map((el,i)=>
                        <tr key={i}>
                            <th scope="row">{i+1}</th>
                            <td>{el.name}</td>
                            <td>{el.price}</td>
                            <td>{(el.amount-0).toFixed(4)}</td>    
                           {(el.changePercent24Hr-0)<0?<td style={{color:"red"}}>{(el.changePercent24Hr-0).toFixed(2)} %</td>:<td style={{color:"green"}}>{(el.changePercent24Hr-0).toFixed(2)} %</td>}
                            <td>{(el.count-0)}</td>  
                            <td><FiMinusSquare className="button-minus" onClick={()=>endChose(el.id)}/></td>  
                        </tr>                         
                    )}              
                </tbody>
            </table>
            <div>
                <Modal
                    size="sm"
                    show={show}
                    onHide={() => setShow(false)}
                    aria-labelledby="example-modal-sizes-title-sm"
                    style={{marginTop:"50px"}}
                >
                    <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Are you sure ?
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Button onClick={()=>removeCoinBag()}>Yes</Button> <Button onClick={()=>setShow(false)} >No</Button>
                    </Modal.Body>
                </Modal>
            </div>
       </div>
    );
}
