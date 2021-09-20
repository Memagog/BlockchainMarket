import { createSlice } from "@reduxjs/toolkit";

const initialState = []



export const coinSlice = createSlice({
    name: "coin",
    initialState,
    reducers: {
        addCoin: (state, action)=>{           
            state.push(action.payload)
        },
        deleteCoin: (state, action)=>{
            state.price += action.payload
        },

    }
});

export const { addCoin, deleteCoin } = coinSlice.actions;
export const coinCount = (state) => state;
export default coinSlice.reducer