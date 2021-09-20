import React from 'react'
import { useHistory } from "react-router-dom";
import { GiReceiveMoney } from 'react-icons/gi';
export default function HeaderBag() {
    const history = useHistory();
    return (
        <div className="header__bag-container" onClick={()=>history.push("/bag")}>
            <GiReceiveMoney/>
            <span>135 USD</span>
            <span>+100%</span>
        </div>
    )
}
