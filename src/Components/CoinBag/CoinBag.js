import React,{useEffect,useState} from 'react';
import './CoinBag.scss';
import { FiMinusSquare } from 'react-icons/fi';
import { useSelector, useDispatch} from 'react-redux';
import { coinCount ,deleteCoin} from '../../redux/coinSlice'
export default function CoinBag() { 
    const myBag = useSelector(coinCount)
    const dispatch = useDispatch();     
    useEffect(() => {       
       
     }, [myBag])
     
    return (
       <div>
         <table class="table table-dark table-hover">
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
                    {myBag.coin.coins.map((el,i)=>
                        <tr>
                            <th scope="row">{i+1}</th>
                            <td>{el.name}</td>
                            <td>{el.price}</td>
                            <td>{el.amount}</td>    
                            <td >{el.percentage}</td>
                            <td><FiMinusSquare className="button-minus" onClick={()=>dispatch(deleteCoin(i))}/></td>  
                        </tr>
                         
                    )}              
                </tbody>
            </table>
       </div>
    );
}
