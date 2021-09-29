import React, { useState, useEffect } from 'react';
import './Coin.scss';
import { useSelector, useDispatch } from 'react-redux';
import { mainData, getHistoryAsync } from '../../redux/mainSlice';
import Graphic from './Graphic/Graphic';
import { Button, Spinner } from 'react-bootstrap';
import { FaBitcoin } from 'react-icons/fa';
import ErrorWindow from './../Error/ErrorWindow';

export default function Coin() {

  const data = useSelector(mainData);
  const dispatch = useDispatch();
  const [errorShow, setErrorShow] = useState(true);
  const [coin, setCoin] = useState({
    rank: 1,
    id: '',
    name: 'No Coin',
    symbol: '####',
    priceUsd: '0',
    marketCapUsd: '',
    supply: '',
    volumeUsd24Hr: '',
    vwap24Hr: '',
  });

  const errorView = () => {    
    try {
       dispatch(getHistoryAsync(coin.id))
    } catch (error) {
      setErrorShow(false)
    }   
  };

  const getLocalData = () => {
    try {
      let coin = JSON.parse(localStorage.getItem('select-coin'));
      return coin;
    } catch (error) {
      return undefined;
    }
  };

  useEffect(() => {    
    let local = getLocalData();
    if (local !== null && local !== undefined) {
      setCoin(local);
      dispatch(getHistoryAsync(local.id));
    } else {
      setCoin(data.data.select);
      dispatch(getHistoryAsync(data.data.select.id));
    }
  }, []);
  useEffect(() => {
    if (!data.data.history) {
      setErrorShow(true);
    }
  }, [])
  return (
    <div>
      <div className="info-container">
        <div className="info-container_info">
         
          <p>
             <FaBitcoin className="info-container_info_icon" />
             <span>{coin.name}</span>
          </p>
          <p>           
             <span>Rank: </span> <span>{coin.rank}</span>
          </p>
          <p>
            <span>Symbol: </span> <span>{coin.symbol}</span>
          </p>
          <p>
            <span>Capital: </span><span style={{ color: 'green' }}>{(coin.marketCapUsd-0).toFixed(2)}$</span>
          </p>
          <p>
            <span>supply: </span><span style={{ color: 'green' }}>{(coin.supply-0).toFixed(4)} </span>
          </p>
          <p>
            <span>Volume: </span><span style={{ color: 'green' }}>{(coin.volumeUsd24Hr-0).toFixed(2)}$</span>
          </p>
          <p>
            <span>Max Value: </span><span style={{ color: 'green' }}>{(coin.vwap24Hr-0).toFixed(2)}$</span>
          </p>
        </div>
        {data.data.history ? (
          <div className="graphic">
            <Graphic />
          </div>
        ) : (
          <div className="graphic_failed-data" >
            {/* <Button
              variant="dark"
              onClick={() => dispatch(getHistoryAsync(coin.id))}
            >
              Reload Data
            </Button>
            <Spinner animation="border" role="status" >
              <p className="visually-hidden">Loading...</p>
            </Spinner> */}
          
            <div className="error-window">
              <ErrorWindow errorShow={errorShow} errorView={errorView} errorText={`Failed data loaded`}/>
            </div>
           </div>
        )}
      </div>
     
    </div>
  );
}
