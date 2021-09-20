import React from 'react'

const coin = [
    {
        name: "BTC",
        price: 42000
    },
    {
        name: "EHT",
        price: 4200
    },
    {
        name: "DOG",
        price: 1000000
    },
]
export default function HeaderCoinBar() {
    return (
        <div className="header__coin-bar_container">
            {coin.map((e) =>                
                    <div>
                        <div className="coin">{e.name}  {e.price}</div>                                          
                    </div>                
            )}
        </div>
    )
}
