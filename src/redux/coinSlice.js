import { createSlice } from '@reduxjs/toolkit';

const local = () => {
  let res = localStorage.getItem('coinBag');
  if (res !== null) {
    return JSON.parse(res);
  } else return [];
};

const initialState = {
  coins: local() || [],
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
    shopCoin: (state, action) => {
      if (action.payload.count === 0) {
        let t = state.coins.findIndex(e => e.id === action.payload.id);
        state.coins.splice(t, 1);
      }
      let t = state.coins.map(e => {
        if (e.id === action.payload.id) {
          return e = action.payload
        } else {
          return e;
        }
      });
      state.coins = t;
    },
    createBag: (state, action) => {
      state.initial.push(action.payload);
      state.coins = state.initial;
    },
  },
});

export const { addCoin, deleteCoin, createBag, shopCoin } = coinSlice.actions;
export const coinCount = state => state;
export default coinSlice.reducer;
