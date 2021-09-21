import React, {useState, useEffect} from 'react'
import './Coin.scss'
import { useSelector } from 'react-redux';
import { mainData } from '../../redux/mainSlice';

export default function Coin() {
    const data = useSelector(mainData)
    const [coin, setCoin] = useState({
        rank: 1,
        name: "No Coin",
        symbol: "####",
        priceUsd: "0"
    })
    useEffect(() => {
        setCoin(data.data.select)
        console.log(data.data.select)
      
    }, [])
    return (
        <div className="info-container">            
                <div>
                    <p>{coin.rank}</p>
                    <p>{coin.name}</p>
                    <p>{coin.symbol}</p>
                    <p>{coin.priceUsd}</p>
                </div>             
        </div>
    )
}
