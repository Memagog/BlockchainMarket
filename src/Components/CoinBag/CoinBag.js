import React from 'react';
import './CoinBag.scss';
import { FiMinusSquare } from 'react-icons/fi';
import { useSelector, useDispatch} from 'react-redux';
import { coinCount ,deleteCoin} from '../../redux/coinSlice';
import { useEffect, useState } from 'react';
import { store } from './../../app/store';


export default function CoinBag() { 

    const myBag = useSelector(coinCount);
    const dispatch = useDispatch(); 
    const [test, setTest] = useState([]);

  
    useEffect(() => {
        store.subscribe(()=> localStorage.setItem('coinBag', JSON.stringify(store.getState().coin.coins) ));   
       
    }, [myBag])

    useEffect(() => {       
        let local = JSON.parse(localStorage.getItem('coinBag'));
        if(local === null){
            setTest(myBag.coin.coins)
            console.log("localStorage error")
        }
        else {
            setTest(local);
        }     
               
    }, [myBag])
    
    return (
       <div>
         <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Coin</th>
                        <th scope="col">Price</th>
                        <th scope="col">Amount</th>
                        <th scope="col">%</th>
                        <th scope="col">Del</th>
                    </tr>
                </thead>
                <tbody>                      
                    {test.map((el,i)=>
                        <tr key={i}>
                            <th scope="row">{i+1}</th>
                            <td>{el.name}</td>
                            <td>{el.price}</td>
                            <td>{el.amount}</td>    
                            <td >{el.percentage}</td>
                            <td><FiMinusSquare className="button-minus" onClick={()=>dispatch(deleteCoin(el.id))}/></td>  
                        </tr>
                         
                    )}              
                </tbody>
            </table>
       </div>
    );
}
