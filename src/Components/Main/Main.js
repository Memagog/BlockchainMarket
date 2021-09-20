import React from 'react'
import './Main.scss'
import Header from './../Header/Header';
import MainTable from './Table/MainTable';

export default function Main() {
    return (
        <div className="container">
            <div className="header">
                <Header/>
            </div>
            <div className="table">
                <MainTable/>
            </div>
        </div>
    )
}
