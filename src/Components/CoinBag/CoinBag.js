import React from 'react';
import './CoinBag.scss';
import { FiMinusSquare } from 'react-icons/fi';

const myBag = [
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
export default function CoinBag() {  
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
                    {myBag.map((el,i)=>
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
