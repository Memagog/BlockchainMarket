import React from 'react';
import { useSelector } from 'react-redux';
import { coinCount } from './../../redux/coinSlice';
import { useEffect, useState, setState } from 'react';

export default function HeaderCoinBar() {
  const popCoin = useSelector(coinCount);
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    setPopular(popCoin.data.coins);
  }, [popCoin]);

  return (
    <div className="header__coins_popular-list">
      {popular ? (
        popular.slice(0, 3).map((e, i) => (
          <div key={i} className="header__coins_popular-list_coin">{e.name} {(e.priceUsd-0).toFixed(2)}$</div>
        ))
      ) : (
        <div className="header__coins_popular-list_coin">
          Filled do loading data
        </div>
      )}
    </div>
  );
}
