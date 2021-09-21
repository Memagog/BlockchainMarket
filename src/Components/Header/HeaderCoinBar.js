import React from 'react'
import { useSelector } from 'react-redux';
import { coinCount } from './../../redux/coinSlice';


export default function HeaderCoinBar() {
    const popCoin = useSelector(coinCount)
    
    return (
        <div className="header__coin-bar_container">
            {
                popCoin.data.coins.slice(0,3).map((e,i) =>                    
                    <div>
                        <div className="coin">{e.name}  {(e.priceUsd-0).toFixed(2)}</div>                                          
                    </div>                                                              
                )
            }
        </div>
    )
}
