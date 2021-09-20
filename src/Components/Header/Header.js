import React from 'react'
import './Header.scss'
import HeaderBag from './HeaderBag'
import HeaderCoinBar from './HeaderCoinBar'
export default function Header() {
    return (
        <div className="header">
            <HeaderCoinBar></HeaderCoinBar>
            <HeaderBag></HeaderBag>
        </div>
    )
}
