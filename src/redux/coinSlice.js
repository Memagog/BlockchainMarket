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
            state.coins.splice(1,action.payload)
        },

    }
});

export const { addCoin, deleteCoin } = coinSlice.actions;
export const coinCount = (state) => state;
export default coinSlice.reducer