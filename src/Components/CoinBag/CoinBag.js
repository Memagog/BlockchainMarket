import React,{useEffect} from 'react';
import './CoinBag.scss';
import { FiMinusSquare } from 'react-icons/fi';
import { useSelector} from 'react-redux';
import { coinCount } from '../../redux/coinSlice'
export default function CoinBag() { 
    const myBag = useSelector(coinCount)    
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
                    {myBag.coin.map((el,i)=>
                        <tr>
                            <th scope="row">{i+1}</th>
                            <td>{el.name}</td>
                            <td>{el.price}</td>
                            <td>{el.amount}</td>    
                            <td style={{textAlign:"left"}}>{el.percentage}</td>
                            <td><FiMinusSquare className="button-minus"/></td>  
                        </tr>
                         
                    )}              
                </tbody>
            </table>
       </div>
    );
}
