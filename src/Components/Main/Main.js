import React from 'react';
import './Main.scss';
import Header from './../Header/Header';
import MainTable from './Table/MainTable';
import { useDispatch, useSelector } from 'react-redux';
import { getDataAsync } from '../../redux/mainSlice';
import { useEffect } from 'react';

export default function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataAsync());
  }, []);

  return (
    <div className="container">
      <div className="header">
        <Header />
      </div>
      <div className="table">
        <MainTable />
      </div>
    </div>
  );
}
