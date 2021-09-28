import { createSlice } from "@reduxjs/toolkit";

const local = () => {
  let res = localStorage.getItem('coinBag');
  if (res !== null || res !== undefined) {
    return JSON.parse(res);
  } else return [];
};
const initialState = {
  coins: local(),
  initial: [],
};

export const coinSlice = createSlice({
  name: 'coin',
  initialState,
  reducers: {
    addCoin: (state, action) => {
      state.coins.push(action.payload);
    },
    deleteCoin: (state, action) => {
      let t = state.coins.findIndex(e => e.id === action.payload);
      state.coins.splice(t, 1);
    },
    createBag: (state, action) => {     
      state.initial.push(action.payload);                  
      state.coins = state.initial;
    },
  },
});

export const { addCoin, deleteCoin, createBag } = coinSlice.actions;
export const coinCount = state => state;
export default coinSlice.reducer;