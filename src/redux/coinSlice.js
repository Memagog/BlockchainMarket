import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    coins: []
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