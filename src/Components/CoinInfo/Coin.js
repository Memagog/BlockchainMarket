import React, { useState, useEffect } from 'react';
import './Coin.scss';
import { useSelector, useDispatch } from 'react-redux';
import { mainData, getHistoryAsync } from '../../redux/mainSlice';
import Graphic from './Graphic';
import { Button, Spinner } from 'react-bootstrap';
import { FaBitcoin } from 'react-icons/fa';
import { useHistory } from 'react-router';

export default function Coin() {

  const history = useHistory();
  const data = useSelector(mainData);
  const dispatch = useDispatch();
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

  return (
    <div>
      <div className="info-container">
        <div className="info-container_info">
          <FaBitcoin className="info-container_info_icon" />
          <p>
            Rank: <span>{coin.rank}</span>
          </p>
          <p>
            CoinName: <span>{coin.name}</span>
          </p>
          <p>
            Symbol: <span>{coin.symbol}</span>
          </p>
          <p>
            MarketCapUsd:<span style={{ color: 'green' }}>{coin.marketCapUsd} $</span>
          </p>
          <p>
            supply:<span style={{ color: 'green' }}>{coin.supply} </span>
          </p>
          <p>
            VolumeUsd24Hr:<span style={{ color: 'green' }}>{coin.volumeUsd24Hr} $</span>
          </p>
          <p>
            Max Value in 24Hr:<span style={{ color: 'green' }}>{coin.vwap24Hr} $</span>
          </p>
        </div>
        {data.data.history ? (
          <div className="graphic">
            <Graphic />
          </div>
        ) : (
          <div className="graphic_failed-data">
            <Button
              variant="dark"
              onClick={() => dispatch(getHistoryAsync(coin.id))}
            >
              Reload Data
            </Button>
            <Spinner animation="border" role="status">
              <p className="visually-hidden">Loading...</p>
            </Spinner>
          </div>
        )}
      </div>
    </div>
  );
}
