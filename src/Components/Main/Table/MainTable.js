import React, { useState, useEffect } from 'react';
import { ImPlus } from 'react-icons/im';
import { mainData, selectCoin } from './../../../redux/mainSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import './Pagination.scss';
import Reload from '../Reload/Reload';
import BuyModalWindow from '../Buy/BuyModalWindow';
import PaginationComponent from './PaginationComponent';
import InitialCoinBuy from '../InitialBag/InitialCoinBuy';

export default function MainTable() {
  const history = useHistory();

  const dispatch = useDispatch();
  const main = useSelector(mainData);
  const [len, setLen] = useState(0);
  const [showByModal, setShowByModal] = useState(false);
  const [showInitialModal, setShowInitialModal] = useState(false);
  const [coin, setCoin] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(20);
  const pageVisited = currentPage * perPage;
  const pageCount = Math.ceil(len / perPage);

  useEffect(() => {
    let initial = JSON.parse(localStorage.getItem('coinBag'));
    if ( initial.length === 0 ){
      setShowInitialModal(true);     
    }
    console.log('initial')
    console.log(initial.length === 0)
  }, [])
  useEffect(() => {
    if (main.data.status === 'fin' && main.data.coins !== undefined) {
      setLen(main.data.coins.length);
    }
  }, [main]);

  const handleShow = target => {
    setCoin(target);
    setShowByModal(true);
  };

  const checkCoin = target => {
    localStorage.setItem('select-coin', JSON.stringify(target));
    dispatch(selectCoin(target));
    history.push('/coin');
  };
  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      {main.data.coins ? (
        <div>
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col">№</th>
                <th scope="col">Coin</th>
                <th scope="col">Price</th>
                <th scope="col">Max value</th>
                <th scope="col">Days change</th>
                <th scope="col">Symbol</th>
                <th scope="col">Add</th>
              </tr>
            </thead>
            <tbody>
              {main.data.coins
                .slice(pageVisited, pageVisited + perPage)
                .map((el, i) => (
                  <tr key={i}>
                    <th scope="row" onClick={() => checkCoin(el)}>{el.rank}</th>
                    <td onClick={() => checkCoin(el)}>{el.name}</td>
                    <td onClick={() => checkCoin(el)}>
                      <div className = 'price-row' data-hover={`${el.priceUsd} $`}>{el.priceUsd.substring(0, 9)} $</div> 
                    </td>
                    <td onClick={() => checkCoin(el)}>
                      {el.vwap24Hr.substring(0, 7)} $
                    </td>
                    {((el.vwap24Hr - el.priceUsd) * 100) / el.vwap24Hr > 0 ? (
                      <td
                        style={{ color: 'green', paddingLeft: '14px' }}
                        onClick={() => checkCoin(el)}
                      >
                        {(
                          (el.vwap24Hr - el.priceUsd) * 100 / el.vwap24Hr
                        ).toFixed(4)}
                        %
                      </td>
                    ) : (
                      <td
                        style={{ color: 'red' }}
                        onClick={() => checkCoin(el)}
                      >
                        {(
                          ((el.vwap24Hr - el.priceUsd) * 100) /
                          el.vwap24Hr
                        ).toFixed(4)}
                        %
                      </td>
                    )}
                    <td onClick={() => checkCoin(el)}>{el.symbol}</td>
                    <td>
                      <ImPlus
                        className="button-plus"
                        onClick={() => handleShow(el)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <PaginationComponent
            pageVisited={pageVisited}
            perPage={perPage}
            pageCount={pageCount}
            changePage={changePage}
          />
          <BuyModalWindow
            show={showByModal}
            handleClose={() => setShowByModal(false)}
            name={coin.name}
            priceUsd={coin.priceUsd}
            changePercent={coin.changePercent24Hr}
          />
          <InitialCoinBuy show={showInitialModal} handleClose={() => setShowInitialModal(false)}/>
        </div>
      ) : (
        <Reload />
      )}
    </div>
  );
}
