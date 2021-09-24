import { createSlice } from "@reduxjs/toolkit";

const local = () => {   
        let res = localStorage.getItem("coinBag");
        if(res!==null&&res!==undefined){
            return JSON.parse(res);
        }
        else return [];  
}
const initialState = {
    coins: local(),
}

export const coinSlice = createSlice({
    name: "coin",
    initialState,
    reducers: {
        addCoin: (state, action)=>{           
            state.coins.push(action.payload)
        },
        deleteCoin: (state, action)=>{               
            let t = state.coins.findIndex((e)=>e.id === action.payload)
            state.coins.splice(t,1)           
        },

    }
});

export const { addCoin, deleteCoin } = coinSlice.actions;
export const coinCount = (state) => state;
export default coinSlice.reducer