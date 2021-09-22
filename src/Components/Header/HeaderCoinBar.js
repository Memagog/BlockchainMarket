import React from 'react'
import { useSelector } from 'react-redux';
import { coinCount } from './../../redux/coinSlice';


export default function HeaderCoinBar() {
    const popCoin = useSelector(coinCount)
    
    return (
        <div className="header__coins_popular-list">
            {
                popCoin.data.coins.slice(0,3).map( (e,i)=>                   
                    <div key={i} className="header__coins_popular-list_coin">{e.name}  {(e.priceUsd-0).toFixed(2)}</div>                                          
                )
            }
        </div>
    )
}
