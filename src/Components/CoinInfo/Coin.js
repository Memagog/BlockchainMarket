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
        priceUsd: "0",
        marketCapUsd: "",
        supply:"",
        volumeUsd24Hr: "",
        vwap24Hr: "",

    })
    useEffect(() => {
        setCoin(data.data.select)
        console.log(data.data.select)
      
    }, [])
    return (
        <div className="info-container">            
                <div className="info">
                    <p>Rank: <span>{coin.rank}</span></p>
                    <p>CoinName: <span>{coin.name}</span></p>
                    <p>Symbol: <span>{coin.symbol}</span></p>
                    <p>MarketCapUsd: <span>{coin.marketCapUsd}</span></p>
                    <p>supply: <span>{coin.supply}</span></p>
                    <p>VolumeUsd24Hr: <span>{coin.volumeUsd24Hr}</span></p>
                    <p>Max Value in 24Hr: <span>{coin.vwap24Hr}</span></p>
                </div>
                <div className="Graphic">
                    
                </div>             
        </div>
    )
}
